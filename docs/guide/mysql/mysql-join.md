# MySQL Join- Nested-loop Join 和 MRR

> 原文： https://blog.csdn.net/liuxiao723846/article/details/129315753

## Nested-loop Join

### 1、mysql驱动表与被驱动表及join优化

先了解在join连接时哪个表是驱动表（也叫外表），哪个表是被驱动表（也叫内内表）：
当使用left join时，左表是驱动表，右表是被驱动表
当使用right join时，右表时驱动表，左表是驱动表
当使用join时，mysql优化器会选择数据量比较小的表作为驱动表，大表作为被驱动表

### 2. join查询如何选择驱动表与被驱动表

在sql优化中，永远是以小表驱动大表。例如: A是小表，B是大表，使用left join 时，则应该这样写：

```sql
select * from A a left join B b on a.code=b.code
```

这样A表时驱动表，B表是被驱动表。

1）驱动表的含义：

在嵌套循环连接和哈希连接中，用来最先获得数据，并以此表的数据为依据，逐步获得其他表的数据，直至最终查询到所有满足条件的数据的第一个表，叫做驱动表。

驱动表不一定是表，有可能是数据集，即由某个表中满足条件的数据行，组成子集合后，再以此子集合作为连接其他表的数据来源。这个子集合，才是真正的驱动表，有时候为了简洁，直接将最先按照条件或得子集合的那张表叫做驱动表。

如果有三个及以上的表，则会先使用join算法得到一、二个表的结果集，并将该结果集作为外层数据，遍历结果集到后第三个表中查询数据。

2）小表作为驱动表：

我们常说，驱动表一定是小表，指的是根据条件获得的子集合一定要小，而不是说实体表本身一定要小，大表如果获得的子集合小，一样可以简称这个大表为驱动表。因为：

```sh
小表驱动大表：需要通过140多次的扫描
for(140条){
  for(20万条){

  }
}
大表驱动小表：要通过20万次的扫描
for(20万条){
  for(140条){

  }
}
```

所以也可以得出结论：如果A表，B表数据量差不多大的时候，那么选择谁作为驱动表也是无所谓了。

看一个例子：A表140多条数据，B表20万左右的数据量

```sql
select * from A a left join B b on a.code=b.code
执行时间：7.5s
 
select * from B b left join A a ·on a.code=b.code
执行时间：19s
```

```md
nested-loop join 嵌套循环连接
simple nested-loop join  简单嵌套循环连接
index nested-loop join  索引嵌套循环连接
block nested-loop join  块嵌套循环连接

hash join 哈希连接

优化连接速度：
1. 小结果集驱动大结果集， 减少外层循环的数据量
2. 为匹配的条件增加索引， 使用索引嵌套循环连接，减少内层表的循环次数
3. 增大join buffer size, 当使用块嵌套循环连接时，一次缓存的数据越多，外层表循环的次数就越少
4. 减少不必要的字段查询, 字段越少，join buffer缓存的数据就越多，外层表缓存次数越少

snlj-n . m
inlj-n . log(2)m
blkj-n/block_size . m
hash join-n . m 等值查询，= 
merge join 非等值查询，>、<、>=、<=, 没有<>、!=

nlp

for i in (select * from t1) loop
  for j in (select * from t2) loop
    if j.col3=i.col4 then
      result.add(i,j)
    end if
    end loop
end loop
```

### 3. 小表驱动大表

- left join 中， left 左边是小表， left 右边是大表
- left 左边是驱动表， left 右边是被驱动表
- left join 中，explain   第一行是驱动表，第二行是被驱动表
- 给被驱动表建立索引，可以提高查询效率， 底层使用index nested-loop join,相对于nested-loop join，查询效率提升10倍左右
- inner join 中，优化器自动选择小表为驱动表，explain中第一行是驱动表，第二行是被驱动表

### 4. simple Nested-Loop Join (SNLJ)

Simple Nested-Loop Join（简单的嵌套循环连接）

```md
for i in (select * from t1) loop
  for j in (select * from t2) loop
    if j.col3=i.col4 then
      result.add(i,j)
      end if
    end loop
end loop

其复杂度 O(n * m)， 查询效率会非常慢

mysql 不会选择
```

### 5. Nested-Loop Join with Index（索引嵌套循环连接）

优化的思路

1. 先对被驱动表建立索引，提高查询效率
2. 遍历驱动表，查询被驱动表，并与驱动表的索引进行匹配，匹配成功则添加到结果集

### 6. Batched Key Access (BKA)

#### 场景

如果和被驱动表关联的索引是辅助索引，并且查询字段无法做到索引覆盖，那么在组装数据的时候就需要回表操作。
而如果匹配每条记录都去回表，效率肯定不高，虽然回表能够使用到主键索引，但是因为这里id不一定有序，所以也属于随机分散读取。
对于这种情况，MySQL提供了一种优化措施，提供了一种叫做Batched Key Access join的算法，即批量主键访问连接算法。

#### 优化过程

开启mrr,开启bka

在普通索引进行join on 关联字段时，查询的字段包含非索引字段，则会使用到回表操作，此时开启mrr和bka可以优化查询。

0. 开启mrr, 开启bka
1. 先在驱动表中根据条件查询出符合条件的记录存入join buffer中
2. 然后根据索引获取被驱动表的索引记录，将其存入read_rnd_buffer中. 存储的是主键索引字段值
3. 如果join buffer或read_rnd_buffer有一个满了，那么就先处理buffer中的数据
4. 将read_rnd_buffer中的被驱动表索引记录按照主键进行升序排序，然后依赖这个有序的记录去回表查询, 由于主键索引中的记录是按照主键升序排序的，这样能提高回表效率。要启用BKA算法，需要开启batched_key_access。

#### 失效场景

- 被join的表没有索引
- 被join的表使用的二级索引，但是查询字段只是索引字段，不存在回表查询， 联合索引覆盖索引

```md
<!-- 关闭 batched_key_access -->
mysql> set optimizer_switch='batched_key_access=off';

mysql> explain select s.*,l.* from small_table s join large_table l on s.key_col=l.key_col;
+----+-------------+-------+------------+------+---------------+-------------+---------+------------------------+------+----------+-------------+
| id | select_type | table | partitions | type | possible_keys | key         | key_len | ref                    | rows | filtered | Extra       |
+----+-------------+-------+------------+------+---------------+-------------+---------+------------------------+------+----------+-------------+
|  1 | SIMPLE      | s     | NULL       | ALL  | idx_key_col   | NULL        | NULL    | NULL                   |  100 |   100.00 | Using where |
|  1 | SIMPLE      | l     | NULL       | ref  | idx_key_col   | idx_key_col | 5       | join_example.s.key_col |  206 |   100.00 | NULL        |
+----+-------------+-------+------------+------+---------------+-------------+---------+------------------------+------+----------+-------------+

<!-- 开启 batched_key_access -->
mysql> set optimizer_switch='batched_key_access=on';
mysql> explain select s.*,l.* from small_table s join large_table l on s.key_col=l.key_col ;


<!-- 开启batched_key_access, 查询被驱动表的id主键或者索引字段,bka失效，回归到inlj -->
mysql> explain select s.*,l.id from small_table s join large_table l on s.key_col=l.key_col;

```

### 7. Block Nested-Loop Join (BNLJ)

Block Nested-Loop Join（块嵌套循环连接）

如果被驱动表关联字段没有可用的索引，那么就要使用BNL算法了

bnlj 算法：

1. 先根据条件查出驱动表中符合条件的记录，存入join buffer中
2. 如果join buffer只能存100条数据，但是驱动表符合条件的就结果集超过100条，那么也只能取到100条，称为一个批次(batch)
3. 然后查找被驱动表，将被驱动表的每行记录都和join buffer中的记录进行匹配，将匹配到的记录放到最终结果集中
4. 被驱动表扫描完之后，清空join buffer
5. 再次重复从驱动表中获取剩余记录存入join buffer, 重复步骤3，4，直到驱动表中没有记录可获取

```md
select * from r join s on r.code = s.code

# 伪代码
for i in R do                                             # 扫描外表R
  store used columns as p from R in into join buffer      # 将部分或者全部R记录保存到join buffer中，记为p
  for j in S do                                           # 扫描内表S
    if j.code = p.code with join buffer and S columns then # 根据join buffer中的记录和S表的code字段进行匹配
      add j to result set                                # 将匹配到的记录添加到结果集
    end if                                              # 结束内表扫描                                
  end loop                                              # 结束外表扫描
end loop                                                # 结束查询,将所有的结果集汇总返回给客户端
```

处理流程：

1. 遍历满足过滤条件的驱动表中所有的记录（参与join 的列字段， 并非整个数据行），并放入至 join buffer
2. 若所有驱动表满足条件记录放入 join buffer，遍历被驱动表所有记录，获取满足join 条件的记录结果集
3. 若join buffer 无法一次性存储全部驱动表记录，可分批读取记录至join buffer， 重复第二步骤

体现：

explain 结果中extra 显示 Using join buffer (Block Nested-Loop)，type 是All、index、range时,
驱动表是小表，被驱动表是大表，使用了块嵌套循环连接，即 block nested-loop join。

什么时候使用：

- 使用join , on 列字段无索引，或者索引失效，由simple nested-loop join 变为block nested-loop join

性能体现：

- 提高 join_buffer_size， 减少外层循环次数， 减少内存消耗， 加快查询速度

```sh
# 手动调整 join_buffer_size 
mysql> show variables like 'join_buffer_size';
+----------+----------+
| Variable_name      | Value    |
+----------+----------+
| join_buffer_size   | 128K     |
+----------+----------+
1 row in set (0.00 sec)
mysql> set  join_buffer_size=1024*1024;

```

```md
snlj- n . m 笛卡尔积， 内层行数 * 外层行数
inlj- n . log(2)m 索引匹配，减少内层匹配次数，内层行数 * 外层行数 -> 外层行数 * 内层索引高度
bnlj- n/block_size . m 块嵌套循环连接，减少外层扫描次数， 外层行数 / block_size * 内层行数 + 外层行数
```

## MRR

MRR(Multi Range Read) 多范围读，是一种优化查询的算法，可以减少磁盘IO，提高查询效率。

是MySQL 5.6的新特性，简单说：MRR 通过把「随机磁盘读」，转化为「顺序磁盘读」，从而提高了索引查询的性能。

使用场景：

适用于基于范围扫描和等值连接等需要回表访问的场景，特别是在包含范围条件的查询以及通过辅助索引访问表数据的情况下。

开启mrr的条件:

- 开启mrr, `set optimizer_switch='mrr=on,mrr_cost_based=off';`,mrr_cost_based=off 强制开启
- sql 语句中存在索引范围查询
- sql 语句中存在回表查询,查询的字段不在索引列中
- explain 结果中extra 显示 Using index condition, Using MRR

### mysql 是如何从磁盘中读取范围数据的？

```md
mysql> explain select * from t where age between 10 and 30 and name like 'abc%';
+----+-------------+-------+------------+------+---------------+---------+-------+------+----------+-------------+
| id | select_type | table | partitions | type | possible_keys | key     | key_len | ref   | rows | filtered | Extra       |
+----+-------------+-------+------------+------+---------------+-------+------+----------+-------------+
|  1 | SIMPLE      | t     | NULL       | range  | idx_age       | idx_age | 5     | const |   960 |   100.00 | Using index condition |
+----+-------------+-------+------------+------+---------------+-------+------+----------+-------------+
1 row in set (0.00 sec)
```

当执行sql时，mysql 逻辑上的B-tree树查看数据，在磁盘上检索数据行，这个磁盘的数据行地址是随机的。

MRR 优化了这个过程，通过把随机磁盘读，转化为顺序磁盘读，从而提高了索引查询的性能。

### 原理

1. 执行包含范围条件的查询时，先扫描辅助索引收集满足条件的索引元组对应的主键值，
2. 将这些主键值放入内存缓冲区（read_rnd_buffer），缓冲区满或查询结束时对主键值排序。
3. 最后用排序后的主键值顺序访问基表，从而避免随机磁盘读。
4. 还有顺序读，磁盘预读机制

### 参数

```md
mrr: on/off # 开启或关闭MRR优化
mrr_cost_based: on/off # 开启或关闭基于成本的MRR优化
read_rnd_buffer_size: 16M # 内存缓冲区大小，默认16M, 针对 myisam 引擎，会找出rowid并对其排序，对于innodn引擎，会直接排序主键值. 
```

```md
索引扫描--> 生成rowid 列表 → 按物理顺序排序 rowid → 批量读取数据行
```

```md
select * from a join b on a.id = b.id where a.id between 1 and 1000000000; -- 笛卡尔积 simple nested-loop join,优化成 block nested-loop join 
select * from a left join b on a.id = b.id   -- 左连接 left join, 无索引或者a有索引,都是笛卡尔积,优化成 block nested-loop join , block nested-loop join 需要驱动表读取部分数据到join buffer中


select * from a where a.age between 1 and 100000; -- 无索引,全表扫描,有索引,使用using index condition

select * from a where a.age betwween 1 and 100000 and a.name like 'abc%'; -- 范围条件, 优化成 index nested-loop join, 范围条件索引, 回表查询, 使用mrr优化, 实际都是基于cbo算法选择索引, 并不是mrr优化

select * from a left join b on a.id = b.id where a.id between 1 and 1000000000; -- 左连接, 范围条件, 优化成 index nested-loop join , 如果存在回表查询, 则使用mrr+bka优化

bka 都是基于mrr的优化， 优化范围查询，回表查询， 减少回表查询， 提高查询效率
bka 存在两个缓存区域 , join buffer 和 read_rnd_buffer, join buffer 存放部分数据， read_rnd_buffer 存放排序后的主键值， 减少回表查询， 提高查询效率

效率:
- 方式, 时间, 优点, 缺点 
- 无优化, 13s, 没有优点, 时间复杂度指数级别，特别慢
- BNL算法的join buffer优化, 5.2s, 使用join buffer减少访问被驱动表次数, 增加join buffer缓冲池的开销
- 被驱动表增加索引, 2.02s, 被驱动表关联条件的列建立索引, 将查询关联条件从无序查询优化为有序查询, 由于ID无序查询被驱动表会出现随机IO
- BKA算法优化, 1.5s, 优化范围查询, 回表查询, 使用BKA算法将访问被驱动表索引的随机IO转换成顺序IO, 需要被驱动表建立索引和使用MRR，默认情况下使用MRR成本估算很大 
```

## Hash Join

Hash Join 算法是一种基于哈希表的连接算法，它将两个表的数据分别存入哈希表中，然后在哈希表中进行连接操作。

Hash Join的基本思想是将较小的表（称为build table）构建成一个哈希表，然后用较大的表（称为probe table）来探测这个哈希表。

select * from small_table s join large_table l on s.key_col=l.key_col;

- 高效处理大数据集
- 无需索引
- 内存消耗大
- 不支持范围连接

```md
构建阶段（Build Phase）：
- 选择较小的表（驱动表）作为构建表。
- 遍历构建表的每一行，对连接键计算哈希值，将记录存入哈希表中。
- 哈希表的每个桶可以存储多个记录（处理哈希冲突）。

探测阶段（Probe Phase）：
- 遍历较大的表（被驱动表）的每一行。
- 对连接键计算相同的哈希值，定位到哈希表中的对应桶。
- 在桶内逐行比较连接键，匹配成功则输出到结果集。

```

## 总结

- 普通join, 算法, simple nested-loop join
- 块嵌套循环连接, 算法, block nested-loop join, join buffer
- 索引嵌套循环连接, 算法, index nested-loop join，针对主键索引, index
- MRR, 优化, 随机磁盘读转化为顺序磁盘读，提高查询效率， 范围查找，回表查询, mrr收集到的主键rowid排序， 随机IO转顺序IO
- bka, 结合mrr, join buffer, 优化, 批量主键访问连接算法， 减少回表查询，提高查询效率
- 哈希连接, 算法, hash join, 表连接使用hash join, 等值比较, 在mysql8.0.17之前默认使用hash join, 8.0.17之后默认使用block nested-loop join
