# 自增id用完怎么办

表定义自增值 id
表定义的自增值达到上限后的逻辑是：再申请下一个 id 时，得到的值保持不变。

```sql
create table t(id int unsigned auto_increment primary key) auto_increment=4294967295;
insert into t values(null);
// 成功插入一行 4294967295
show create table t;
/* CREATE TABLE `t` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4294967295;
*/

insert into t values(null);
//Duplicate entry '4294967295' for key 'PRIMARY'
123456789101112
```

主键冲突，如果 4 个字节无符号整型 (unsigned int) 不够用的情况下，可以使用 8 个字节的 bigint unsigned。

## InnoDB 系统自增 row_id

如果你创建的InnoDB表没有指定主键， 那么InnoDB会给你创建一个不可见的， 长度为6个字节的row_id。 InnoDB维护了一个全局的dict_sys.row_id值， 所有无主键的InnoDB表， 每插入一行数据， 都将当前的dict_sys.row_id值作为要插入数据的row_id， 然后把dict_sys.row_id的值加1。

## Xid

redo log 和 binlog 相配合的时候，它们有一个共同的字段叫作 Xid。它在 MySQL 中是用来对应事务的。
MySQL 内部维护了一个全局变量 global_query_id，每次执行语句的时候将它赋值给 Query_id，然后给这个变量加 1。如果当前语句是这个事务执行的第一条语句，那么 MySQL 还会同时把 Query_id 赋值给这个事务的 Xid。
而 global_query_id 是一个纯内存变量，重启之后就清零了。所以你就知道了，在同一个数据库实例中，不同事务的 Xid 也是有可能相同的。但是 MySQL 重启之后会重新生成新的 binlog 文件，这就保证了，同一个 binlog 文件里，Xid 一定是唯一的。
不过 global_query_id 达到上限后，会继续从 0 开始计数，由于 global_query_id 为8个字节，所以一般不会出现到达上限的情况。

## Innodb trx_id

Xid 是由 server 层维护的。InnoDB 内部使用 Xid ，就是为了能够在 InnoDB 事务和 server 之间做关联。但是，InnoDB 自己的 trx_id，是另外维护的。
InnoDB 内部维护了一个 max_trx_id 全局变量，每次需要申请一个新的 trx_id 时，就获得 max_trx_id 的当前值，然后并将 max_trx_id 加 1。
InnoDB 数据可见性的核心思想是：每一行数据都记录了更新它的 trx_id，当一个事务读到一行数据的时候，判断这个数据是否可见的方法，就是通过事务的一致性视图与这行数据的 trx_id 做对比。
对于正在执行的事务，你可以从 information_schema.innodb_trx 表中看到事务的 trx_id。
但是对于只读事务，InnoDB 并不会分配 trx_id。

max_trx_id 会持久化存储，重启也不会重置为 0，那么从理论上讲，只要一个 MySQL 服务跑得足够久，就可能到达上限，然后从 0 开始的情况。然后就会导致脏读。但只存在理论上，如果一个 MySQL 实例的 TPS 是每秒 50 万，持续这个压力的话，在 17.8 年后，就会出现这个情况。

## thread_id

show processlist 里面的第一列，就是 thread_id。
系统保存了一个全局变量 thread_id_counter，每新建一个连接，就将 thread_id_counter 赋值给这个新连接的线程变量。
thread_id_counter 定义的大小是 4 个字节，到达上限则从0开始。

## 总结

每种自增id有各自的应用场景， 在达到上限后的表现也不同：
1. 表的自增id达到上限后， 再申请时它的值就不会改变， 进而导致继续插入数据时报主键冲突的错误。
2. row_id达到上限后， 则会归0再重新递增， 如果出现相同的row_id， 后写的数据会覆盖之前的数据。
3. Xid只需要不在同一个binlog文件中出现重复值即可。 虽然理论上会出现重复值， 但是概率极小， 可以忽略不计。
4. InnoDB的max_trx_id 递增值每次MySQL重启都会被保存起来， 所以我们文章中提到的脏读的例子就是一个必现的bug， 好在留给我们的时间还很充裕。
5. thread_id是我们使用中最常见的， 而且也是处理得最好的一个自增id逻辑了。


