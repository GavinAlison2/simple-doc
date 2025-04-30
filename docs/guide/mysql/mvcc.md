# MVCC

## 事务四大特性 ACID

- Atomicity（原子性）：事务是一个不可分割的工作单位，事务中包括的诸操作要么都做，要么都不做。
- Consistency（一致性）：事务必须是使数据库从一个一致性状态变到另一个一致性状态。一致性与原子性是密切相关的。
- Isolation（隔离性）：一个事务的执行不能被其他事务干扰。即一个事务内部的操作及使用的数据对并发的其他事务是隔离的，并发执行的各个事务之间不能互相干扰。
- Durability（持久性）：持续性也称永久性，指一个事务一旦提交，它对数据库中数据的改变就应该是永久性的。接下来的其他操作或故障不应该对其有任何影响。

## 并发事务问题

- 丢失修改（Lost Update）：一个事务覆盖了另一个事务的更新数据。
- 脏读（Dirty Read）：一个事务读到了另一个事务未提交的更新数据。
- 幻读（Phantom Read）：一个事务在查询某一范围的数据时，会看到其他事务插入的数据行。
- 不可重复读（Non-Repeatable Read）：一个事务在同一查询条件下，多次读取同一数据，却返回了不同的数据值。

## 隔离级别

- Read Uncommitted（读未提交）：一个事务可以读到另一个事务未提交的更新数据，可能会导致脏读、幻读、不可重复读。
- Read Committed（读已提交）：一个事务只能读到另一个事务已提交的更新数据，可以避免脏读、幻读、不可重复读。
- Repeatable Read（可重复读）：一个事务在同一查询条件下，多次读取同一数据，返回同样的数据值。
- serializable（串行化）：最高的隔离级别，一个事务在执行过程中，其他事务都不能并发执行。

## NVCC 解决 幻读和不可重复读例子

数据准备

```sql
create DATABASE IF NOT EXISTS mvcc_test;
use mvcc_test;

CREATE TABLE user (
    id int auto_increment primary key,
    name varchar(50) not null,
    age int not null,
    version int not null
)engine=innodb default charset=utf8mb4;

INSERT INTO user (name, age, version) VALUES ('Alice', 25, 1);
INSERT INTO user (name, age, version) VALUES ('Bob', 30, 1);
INSERT INTO user (name, age, version) VALUES ('Charlie', 35, 1);
```

case1: 普通select 依赖 mvcc 机制，不会出现幻读和不可重复读, mvcc 的快照读

```case1
事务T1:                                     事务T2:                             事务T3:
begin;                                      begin;                              begin;  
select * from user where version = 1;       

+----+---------+-----+---------+
| id | name    | age | version |
+----+---------+-----+---------+
|  1 | Alice   |  25 |       1 |
|  2 | Bob     |  30 |       1 |
|  3 | Charlie |  35 |       1 |
+----+---------+-----+---------+

                                    update user set age = 35 where id = 2;
                                    select * from user where version = 1;
                                    +----+---------+-----+---------+
                                    | id | name    | age | version |
                                    +----+---------+-----+---------+
                                    |  1 | Alice   |  25 |       1 |
                                    |  2 | Bob     |  35 |       1 |
                                    |  3 | Charlie |  35 |       1 |
                                    +----+---------+-----+---------+

select * from user where version = 1;                                           
+---+---------+-----+---------+ 
| id | name    | age | version |
+----+---------+-----+---------+
|  1 | Alice   |  25 |       1 |
|  2 | Bob     |  30 |       1 |
|  3 | Charlie |  35 |       1 |
+----+---------+-----+---------+
-- 这里说明可以重复读，因为 T2 事务在 T1 事务提交后才开始执行，T1 事务的快照读，T2 事务的当前读。隔离级别是 Repeatable Read。

                                     commit;

                                                                            insert into user(name, age, version) values('David', 40, 1);
                                                                            select * from user where version =1;
                                                                            +----+---------+-----+---------+
                                                                            | id | name    | age | version |
                                                                            +----+---------+-----+---------+
                                                                            |  1 | Alice   |  25 |       1 |
                                                                            |  2 | Bob     |  35 |       1 |
                                                                            |  3 | Charlie |  35 |       1 |
                                                                            |  7 | David   |  40 |       1 |
                                                                            +----+---------+-----+---------+                          
select * from user where version = 1;                                           
+----+---------+-----+---------+ 
| id | name    | age | version |
+----+---------+-----+---------+
|  1 | Alice   |  25 |       1 |
|  2 | Bob     |  30 |       1 |
|  3 | Charlie |  35 |       1 |
+----+---------+-----+---------+
                                                                            commit;
                                                                        
select * from user where version = 1;                                           
+----+---------+-----+---------+ 
| id | name    | age | version |
+----+---------+-----+---------+
|  1 | Alice   |  25 |       1 |
|  2 | Bob     |  30 |       1 |
|  3 | Charlie |  35 |       1 |
+----+---------+-----+---------+
-- 这里说明可以解决幻读，因为 T3 事务在 T1 事务提交后才开始执行，T1 事务的快照读，T3 事务的当前读。隔离级别是 Repeatable Read。
commit;

select * from user where version = 1;                                           
+----+---------+-----+---------+ 
| id | name    | age | version |
+----+---------+-----+---------+
|  1 | Alice   |  25 |       1 |
|  2 | Bob     |  30 |       1 |
|  3 | Charlie |  35 |       1 |
|  7 | David   |  40 |       1 |
+----+---------+-----+---------+

-- 事务T1已经提交，读取mvcc 的最新版本信息，所以可以看到所有数据，包括 T2 事务插入的数据。

```

## 幻读的定义

“幻读” 指在同一个事务里面连续执行两次同样的select  sql 语句 ，可能导致不同结果的问题，第二次 sql 语句可能会返回之前不存在的行。返回的数量不同。


## MVCC 解决幻读案例

mvcc + next-key locking 机制，避免幻读。

在 MySQL 中，MVCC 在 “快照读”（如普通 SELECT 查询）的情况下能解决 “幻读”，它利用历史版本信息控制读取数据范围；
但在 “当前读”（如 UPDATE、INSERT、DELETE 及加锁查询）的某些场景下，MVCC 无法解决 “幻读”。

```markdown
-- 读取快照版本数据
select * from user where version = 1; 普通的读，只是读取快照版本数据

-- 加锁，读取当前数据
select * from user where age > 30 for update; 当前读，加锁，读取最新版本数据，并阻止其他事务对该行的更新或删除。
select * from user lock in share mode;
insert into user(name, age, version) values('David', 40, 1); 当前读，插入数据，并阻止其他事务对该行的更新或删除。
update user set age = 35 where id = 2; 当前读，更新数据，并阻止其他事务对该行的更新或删除。
delete from user where id = 2; 当前读，删除数据，并阻止其他事务对该行的更新或删除。
```

## MVCC 不能幻读案例

但在 “当前读”（如 UPDATE、INSERT、DELETE 及加锁查询）的某些场景下，MVCC 无法解决 “幻读”。
在可重复读隔离级别下，“当前读” 通过 next - key locking（行锁 + 范围锁）避免幻读，但唯一索引时 next - key locking 会降级成行锁。
在特定情况，如事务先查询、其他事务插入并提交，原事务再无条件更新时，MVCC 也会出现幻读。

case2, 两次查询中存在update 其他事务插入的数据，导致幻读

```sql
-- 事务T1:                                     事务T2:                             事务T3:
begin;                                      begin;                              begin;  
select * from user where version = 1;       
+----+---------+-----+---------+       
| id | name    | age | version |       
+----+---------+-----+---------+       
|  1 | Alice   |  25 |       1 |       
|  2 | Bob     |  30 |       1 |       
|  3 | Charlie |  35 |       1 |       
+----+---------+-----+---------+        
                                        insert into user(name, age, version) values('David', 40, 1);
                                        -- 此时事务T2 会加入一个gap锁，阻止其他事务对id=7的行的更新或删除。
                                        select * from user where version =1;
                                        +----+---------+-----+---------+
                                        | id | name    | age | version |
                                        +----+---------+-----+---------+
                                        |  1 | Alice   |  25 |       1 |
                                        |  2 | Bob     |  30 |       1 |
                                        |  3 | Charlie |  35 |       1 |
                                        |  7 | David   |  40 |       1 |
                                        +----+---------+-----+---------+    
                                        commit; -- 这里一定要提交，否则事务T1的更新操作会被阻塞，等待id=7的行锁释放                      
update user set age = 35 where id = 1;
-- 此时事务T1 读取最新版本数据，T2 事务插入数据，T1 事务更新数据，导致幻读。
select * from user where version = 1; 
+----+---------+-----+---------+ 
| id | name    | age | version |
+----+---------+-----+---------+
|  1 | Alice   |  35 |       2 |
|  2 | Bob     |  30 |       1 |
|  3 | Charlie |  35 |       1 |
|  7 | David   |  35 |       1 |
+----+---------+-----+---------+
-- 事务T1 读取最新版本数据，T2 事务插入数据，T1 事务更新数据，导致幻读。
```

### MVCC 基于 RC, RR 隔离级别的区别

mvcc, 读读，读写情况下， 解决幻读的问题，基于快照读.
一个事务读写读，另一个事务T2发生 写，此时无法解决幻读。

mysql 隔离级别默认是RR, 基于快照读,可以解决不可重复读和 select 语句的幻读问题。
如果设置成 RC ,基于当前读，则不能解决不可重复度问题， 也不能解决幻读问题。

## MVCC 原理

- undo log 构建版本链
- read view 构建快照

作用：快照读时通过mvcc找到对应的版本
对于delete、update的不会，因为他们是当前读，不经过mvcc，所以才会有RR级别还会有幻读的问题，

隐藏字段
undo log 版本链 + db+trx_id+db_roll_ptr(上个版本主键id-地址) + db_row_id(当前版本主键id)

```text
undo log回滚日志，在insert、update、delete的时候产生的便于数据回滚的日志。
当insert的时候，产生的undo log日志只在回滚时需要，在事务提交后，可被立即删除。【因为插入只有一次，trx_id = 1；】
而update、delete的时候，产生的undo log日志不仅在回滚时需要，在快照读时也需要，不会立即被删除。
```

### read view

```text
是快照读SQL执行时MVCC提供数据的依据
当前活跃的事务：未提交

如何确定返回哪一个版本 这是由read view决定返回 undo log 中的哪一个版本。

数据结构
1. m_ids, 当前活跃的事务id集合
2. m_min_trx_id, 当前活跃的最小事务id
3. m_max_trx_id, 当前活跃的最大事务id
4. created_trx_id, 创建该快照的事务id

RC隔离级别下，在事务中每一次执行select 语句快照读时生成ReadView。 RR隔离级别下，在事务中第一次执行begin 快照读时生成ReadView，后续会复用。

所以RC不可重复读就是因为每次生成的readview都是新的，会看到别的事务提交的内容；
RR只有事务开始才更新readview，所以别人提交事务也不会更新他的m_ids
```

### Read View 工作原理

读不到时，并不会读取这个版本的记录。而是沿着 undo log 链条往下找旧版本的记录

前提：
版本链记录

```text
undo log 记录, val(name), val(age), trx_id, db_roll_ptr, db_row_id

比如:
Alice, 25, 80, 0x00000101, 3 
↑
Bob, 30, 80, 0x0000001D, 2
↑
Charlie, 60, 25188, null, 1 

进行update/delete/insert 操作时，产生的undo log 记录，记录当前版本的记录，同时记录下一个版本的记录。
```

read view 记录

```text
m_ids, min_trx_id, max_trx_id, created_trx_id

m_ids: 当前活跃的事务id集合,未提交事务id, 生成read view时. 注意，不能包含当前事务id，因为要保持数据的一致性，不能多个事务对同一数据进行修改，所以要有隔离性
min_trx_id: 当前活跃的最小事务id
max_trx_id: 系统分配给下一个事务id
created_trx_id: 创建该快照的事务id
```

### Read View 寻找原理

用 undolog 版本链中一个版本记录的 trx_id 和 read view 中的 m_ids 集合比较

1. 如果 trx_id 在 m_ids 中，则trx_id 对应的记录是当前活跃的，对于当前新事务是不可见的，需要根据版本链向上找数据和数据trx_id进行比较。看不见的trx_id 对应的记录
2. 如果 trx_id 不在 m_ids 中，则 trx_id 对应的记录是历史版本，对于当前新事务是可见的。trx_id 启动时间早于readview生成之前，提交时间是生成readview那一刻，同时.
3. 如果 trx_id < min_trx_id，则 trx_id 对应的记录是历史版本，对于当前新事务是可见的。trx_id 提交时间早于readview生成之前. 看到见过的trx_id 对应的记录
4. 如果 trx_id > max_trx_id，则 trx_id 对应的记录是新版本，对于当前新事务是不可见的。trx_id 启动时间晚于readview生成之前. 看不见trx_id 对应的记录
5. trx_id = created_trx_id，则trx_id 对应的记录是当前版本，对于当前新事务是可见的。 

## 锁机制

### 行锁

这些都是 X 锁，排他锁，锁定某行，直到事务结束。

- record lock：对索引项加锁，锁定一行记录；
- gap lock：对索引项加锁，锁定一段范围，但不包括记录本身；
- next-key lock：对索引项加锁，锁定一段范围，包括记录本身；=record lock + gap lock。

MVCC 机制下，InnoDB 存储引擎使用 next-key locking（行锁 + 范围锁）来避免幻读。

next-key locking 机制是通过在索引上加范围条件，锁定范围内的记录，以避免幻读。

next-key locking 机制的实现原理是：

- 对于 SELECT 语句，InnoDB 会根据查询条件生成一个范围条件，并对范围条件加 next-key 锁；
- 对于 UPDATE、DELETE 语句，InnoDB 会对涉及的索引加 next-key 锁；
- 对于 INSERT 语句，InnoDB 会对索引上的范围条件加 next-key 锁；

###  Record Lock

Record Lock，记录锁，它是针对索引记录的锁，锁定的总是索引记录。在多用户数据库系统中，多个事务可能会同时尝试读取或修改同一条记录，Record Lock确保只有一个事务能在某一时刻修改该记录，其他事务只能读取，或者在写锁释放后再进行修改。

case3, 通过 next-key locking 加锁机制 解决幻读问题

```sql  
-- trx1 开始事务
BEGIN;

-- trx1 读取 id=1 的记录
SELECT * FROM t1 WHERE id = 1 for update;

                                            -- trx2 开始事务
                                            BEGIN;
                                            -- update id=1 set name='alice0001'
                                            UPDATE t1 SET name='alice0001' WHERE id = 1;
                                            -- wait trx1 commit

-- trx1 commit
COMMIT;
                                            -- trx2 can execute update id=1 set name='alice0002'
```

### Gap Lock

Gap Lock，间隙锁，它是一种行级锁，锁住两个索引记录之间的间隙，而不是实际的数据记录，由InnoDB隐式添加。
一般通过 `update/delete/insert/select..for update`等查询出一个不存在的记录，会被隐式加上gap锁，防止其他事务插入数据。

```sql
-- trx1 开始事务
BEGIN;
select * from user;
+----+---------+-----+---------+
| id | name    | age | version |
+----+---------+-----+---------+
|  1 | Alice   |  25 |       1 |
|  2 | Bob     |  30 |       1 |
|  3 | Charlie |  35 |       1 |
+----+---------+-----+---------+

select * from user where id = 10 for update;
-- 此时加了 gap lock，防止其他事务插入数据

-- trx2 开始事务
BEGIN;
insert into user(name, age, version) values('David', 40, 1);
-- 此时 trx2 被阻塞，等待 gap lock 释放

-- trx1 commit
COMMIT;
-- 此时 trx2 继续执行，插入数据
```

### Next-Key Lock

Next-Key Lock，称为临键锁，它是Record Lock + Gap Lock的组合，用来锁定一个范围，并且锁定记录本身锁，它是一种左开右闭的范围，可以用符号表示为：(a,b]

```text

等值查询且无对应记录
表中已有数据(1, 'a'), (3, 'c'), (5, 'e')
执行SELECT * FROM test WHERE id = 4 FOR UPDATE;时，由于表中不存在id = 4的记录。根据 next-key lock 的规则，它会锁定索引记录之间的间隙。在这个例子中，会锁定(3, 5)这个间隙，防止其他事务在该间隙插入数据 。如果此时有其他事务执行INSERT INTO test VALUES (4, 'd');，则会被阻塞，直到当前事务提交或回滚。

等值查询且有对应记录：
对于上述test表，当执行SELECT * FROM test WHERE id = 3 FOR UPDATE;时，会对id = 3的记录加上行锁，同时会对其前后的间隙(1, 3)和(3, 5)加上间隙锁。
这意味着其他事务不能修改id = 3的记录，也不能在(1, 3)和(3, 5)这两个间隙插入数据。
比如，若有事务尝试 UPDATE test SET name = 'new_c' WHERE id = 3;
（在未获取到锁的情况下）会被阻塞，INSERT INTO test VALUES (2, 'b');和INSERT INTO test VALUES (4, 'd');同样会被阻塞。

范围查询：
还是以test表为例，执行SELECT * FROM test WHERE id BETWEEN 2 AND 4 FOR UPDATE;
会对id = 3的记录加行锁，对(1, 3)和(3, 5)这两个间隙加间隙锁。
因为范围查询涵盖了id = 3这条记录以及相关的间隙，这样可以防止其他事务在查询范围内插入新记录，避免幻读现象。
若有事务执行INSERT INTO test VALUES (2, 'b');或INSERT INTO test VALUES (4, 'd');，会被阻塞。

唯一索引与非唯一索引的差异：
假设有表users，包含主键user_id（唯一索引）和普通索引age（非唯一索引），数据为(1, 20, 'user1'), (2, 25, 'user2'), (3, 20, 'user3')。
当执行SELECT * FROM users WHERE user_id = 2 FOR UPDATE;时，由于user_id是唯一索引，next-key lock 会退化为行锁，仅锁定user_id = 2的这一行记录。
而执行SELECT * FROM users WHERE age = 20 FOR UPDATE;时，
因为age是非唯一索引，会对所有age = 20的记录（即user_id = 1和 user_id = 3对应的记录）加行锁，同时对这些记录前后的间隙加间隙锁，防止其他事务在相关间隙插入数据。

```

## 总结

MVCC 机制是通过保存数据在某个时间点的快照，来实现读写并发控制。在读写并发场景下，MVCC 能够保证数据的一致性，避免了脏读、不可重复读、幻读等问题。

MVCC 不能解决所有场景下的幻读问题，如事务先查询、其他事务插入并提交，原事务再无条件更新时，MVCC 也会出现幻读。


## 参考

>https://blog.csdn.net/qq_35590091/article/details/107734005
>https://developer.aliyun.com/article/1619503?accounttraceid=399c39f68c2643508bb01fef71e72c46cmgc
>https://www.cnblogs.com/PgSheep/p/18208556
>https://juejin.cn/post/7056583607929798692#heading-8 
