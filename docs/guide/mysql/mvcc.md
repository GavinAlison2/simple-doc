# MVCC

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
