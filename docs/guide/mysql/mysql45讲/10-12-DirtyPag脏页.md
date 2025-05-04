# 10-12-DirtyPag脏页

## 10 | MySQL为什么有时候会选错索引？

平常不断地删除历史数据和新增数据的场景，mysql有可能会选错索引。

### 优化器的逻辑

优化器选择索引的目的就是选择一个扫描行数最少的方案。行数越少，磁盘读取越少。
扫描行数不是唯一标准，优化器还会结合是否使用临时表，是否排序等因素。

扫描行数怎么判断？

真正执行语句之前，mysql不知道具体有多少条，只能根据统计信息估算。

这个统计信息就是索引的“区分度”。索引上不同值越多，区分度越好。而一个索引上不同值的个数称为“基数”。

使用show index可以查看。下图中，每行三个字段值都是一样的，但在统计信息中，基数值都不准确。

### mysql怎么得到索引的基数？

mysql采用采样统计，InnoDB 默认会选择 N 个数据页，统计这些页面上的不同值，得到一个平均值，然后乘以这个索引的页面数，就得到了这个索引的基数。当变更的数据行数超过 1/M 的时候，会自动触发重新做一次索引统计。
参数 innodb_stats_persistent有两种不同的模式

- 设置为 on 的时候，表示统计信息会持久化存储。默认 N 是 20，M 是 10。
- 设置为 off 的时候，表示统计信息只存储在内存中。默认 N 是 8，M 是 16。

如果统计信息不对，可以使用analyze table t 命令重新统计。

索引选择异常和处理

- force index 强行选择一个索引
- 修改语句，引导 MySQL 使用我们期望的索引
- 新建索引，或者删除误用的索引

这章老师举了几个例子，就不写了。sql太慢就用explain看看，有可能就是索引选错了。

## 11 | 怎么给字符串字段加索引

mysql支持前缀索引，可以以字符串一部分作为索引。默认包含整个字符串。

`alter table t index idx(a(6));`

使用前缀索引虽然可以减少存储空间，但有可能会增加回表次数。

建前缀索引前可以使用下面的sql统计一下重复数：

`select count(distinct left(a,字符长度));`

并且前缀索引会影响覆盖索引。

其他方式

1. 倒序存储
由于身份证前面的地区码都是相同的，所以存储身份证时，可以将它倒过来存。身份证后6位作为前缀索引有一定的区分度。

`select field_list from t where id_card = reverse('input_id_card_string');`

2. 使用hash字段

可以在表上再创建一个整数字段，来保存身份证的校验码，同时在这个字段上创建索引。
插入新数据，使用crc32()得到该字段填入。
查询语句如下：

`select field_list from t where id_card_crc=crc32('input_id_card_string') and id_card='input_id_card_string'；`

另外，如果前缀后缀都重复，可以考虑去掉前缀后缀，只存中间一部分数据。

## 12 | 为什么我的MySQL会有脏页

脏页的概念就不记了。
MySQL 偶尔慢一下的那个瞬间，可能在刷脏页（flush）。

什么时候会触发刷脏？

1. innodb的redo log写满了，这时候系统会停止所有更新。把checkpoint 往前推进。
2. buffer pool内存不足，此时需要淘汰一些数据页，有可能会淘汰脏页，就要先把脏页刷到磁盘。

刷脏页一定会写盘，就保证了每个数据页有两种状态：
    a. 内存里的一定是正确数据。
    b. 内存里没有，磁盘上的一定是正确数据。

3. mysql认为系统空闲时，会刷盘。当然系统繁忙时，也会见缝插针刷盘。
4. mysql正常关闭。

InnoDB 刷脏页的控制策略


告诉 InnoDB 所在主机的 IO 能力，正确地设置innodb_io_capacity 参数，使用fio工具统计：

```sh
fio -filename=$filename -direct=1 -iodepth 1 -thread -rw=randrw -ioengine=psync -bs=16k -size=500M -numjobs=10 -runtime=10 -group_reporting -name=mytest 
```

innodb_max_dirty_pages_pct是脏页比例上限，默认值是 75%。
平时要多关注脏页比例，不要让它经常接近 75%。
脏页比例是通过Innodb_buffer_pool_pages_dirty/Innodb_buffer_pool_pages_total 得到：

```sql
select VARIABLE_VALUE into @a from global_status where VARIABLE_NAME = 'Innodb_buffer_pool_pages_dirty';
select VARIABLE_VALUE into @b from global_status where VARIABLE_NAME = 'Innodb_buffer_pool_pages_total';
select @a/@b;
```

另外还有一个策略，当刷脏页时，该页边上也是脏页，也会把边上的脏页一起刷掉。而且该逻辑会一直蔓延。
innodb_flush_neighbors 参数就是来控制该行为的，值为1会有上述机制，0则不会。
机械硬盘可能会有不错的效果，但ssd建议设置为0。
并且mysql 8.0 innodb_flush_neighbors 默认为0。
