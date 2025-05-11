-- Active: 1746836906323@@127.0.0.1@3306
-- ++++++++++++++++++++++++++++++++++++++++++++++++
-- case2: index nested-loop join
-- ++++++++++++++++++++++++++++++++++++++++++++++++
SET optimizer_switch = 'index_merge=on,index_merge_union=on,index_merge_sort_union=on,index_merge_intersection=on,engine_condition_pushdown=on,index_condition_pushdown=on,derived_merge=on';

-- 查看当前optimizer_switch设置
SELECT @@optimizer_switch;


alter table small_table add index idx_key_col(key_col);
show create table small_table;
/*
CREATE TABLE `small_table` (
  `id` int(11) NOT NULL,
  `key_col` int(11) DEFAULT NULL,
  `data_col` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_key_col` (`key_col`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4;
*/


show create table large_table;
/*
CREATE TABLE `large_table` (
  `id` int(11) NOT NULL,
  `key_col` int(11) DEFAULT NULL,
  `data_col` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
*/

explain
SELECT *
FROM small_table s
left JOIN large_table l ON s.key_col = l.key_col;
/*
+----+-------------+-------+------------+------+---------------+------+---------+------+-------+----------+----------------------------------------------------+
| id | select_type | table | partitions | type | possible_keys | key  | key_len | ref  | rows  | filtered | Extra                                              |
+----+-------------+-------+------------+------+---------------+------+---------+------+-------+----------+----------------------------------------------------+
|  1 | SIMPLE      | s     | NULL       | ALL  | NULL          | NULL | NULL    | NULL |   100 |   100.00 | NULL                                               |
|  1 | SIMPLE      | l     | NULL       | ALL  | NULL          | NULL | NULL    | NULL | 10302 |   100.00 | Using where; Using join buffer (Block Nested Loop) |
+----+-------------+-------+------------+------+---------------+------+---------+------+-------+----------+----------------------------------------------------+

为什么没有使用index nested-loop join？

left join 的方向性影响

在LEFT JOIN中，MySQL 必须返回左表 (small_table) 的所有记录，无论右表 (large_table) 是否有匹配。
INL 要求通过索引访问右表，但你只在左表 (small_table) 上创建了索引，右表 (large_table) 没有索引。
优化器无法利用左表的索引来加速右表的查找，因此 INL 不可行

如何启用 Index Nested-Loop Join？

1. 在右表的连接列上创建索引
2. 考虑查询类型,  inner...join, 
*/


explain
SELECT *
FROM small_table s
JOIN large_table l ON s.key_col = l.key_col;     
/*
+----+-------------+-------+------------+------+---------------+-------------+---------+------------------------+-------+----------+-------------+
| id | select_type | table | partitions | type | possible_keys | key         | key_len | ref                    | rows  | filtered | Extra       |
+----+-------------+-------+------------+------+---------------+-------------+---------+------------------------+-------+----------+-------------+
|  1 | SIMPLE      | l     | NULL       | ALL  | NULL          | NULL        | NULL    | NULL                   | 10302 |   100.00 | Using where |
|  1 | SIMPLE      | s     | NULL       | ref  | idx_key_col   | idx_key_col | 5       | join_example.l.key_col |     2 |   100.00 | NULL        |
+----+-------------+-------+------------+------+---------------+-------------+---------+------------------------+-------+----------+-------------+

此时，优化器可以利用索引 idx_key_col 来加速右表的查找，因此使用了 Index Nested-Loop Join。

*/

-- ++++++++++++++++++++++++++++++++++
-- 当small_table 有idx_key_col索引，large_table 没有索引时，left join 优化器会使用 Block Nested-Loop Join。
-- 当small_table 没有idx_key_col索引，large_table 有索引时，left join 优化器会使用 Index Nested-Loop Join。
-- ++++++++++

alter table large_table add index idx_key_col(key_col);

explain
SELECT *
FROM small_table s
left JOIN large_table l ON s.key_col = l.key_col;
/*
+----+-------------+-------+------------+------+---------------+-------------+---------+------------------------+------+----------+-------+
| id | select_type | table | partitions | type | possible_keys | key         | key_len | ref                    | rows | filtered | Extra |
+----+-------------+-------+------------+------+---------------+-------------+---------+------------------------+------+----------+-------+
|  1 | SIMPLE      | s     | NULL       | ALL  | NULL          | NULL        | NULL    | NULL                   |  100 |   100.00 | NULL  |
|  1 | SIMPLE      | l     | NULL       | ref  | idx_key_col   | idx_key_col | 5       | join_example.s.key_col |  206 |   100.00 | NULL  |
+----+-------------+-------+------------+------+---------------+-------------+---------+------------------------+------+----------+-------+
*/

SET @start_time = NOW(3);
SELECT *
FROM small_table s
left JOIN large_table l ON s.key_col = l.key_col
LIMIT 0;
SET @end_time = NOW(3);
SELECT TIMESTAMPDIFF(MICROSECOND, @start_time, @end_time) AS execution_time_ms;

SET @start_time = NOW(3);
SELECT *
FROM large_table l
left JOIN small_table s ON s.key_col = l.key_col
LIMIT 0;
SET @end_time = NOW(3);
SELECT TIMESTAMPDIFF(MICROSECOND, @start_time, @end_time) AS execution_time_ms;

/* 
select * from small_table s left join large_table l on s.key_col = l.key_col limit 0;
execution_time_ms: 21,237ms

select * from large_table l left join small_table s on s.key_col = l.key_col limit 0;
execution_time_ms: 40,000ms
*/


