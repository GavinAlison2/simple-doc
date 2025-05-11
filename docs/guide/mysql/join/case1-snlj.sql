-- ++++++++++++++++++++++++++++++++++++++++++++++++
-- case1: simple nested-loop join , block nested loop join
-- ++++++++++++++++++++++++++++++++++++++++++++++++
SET optimizer_switch = 'index_merge=off,index_merge_union=off,index_merge_sort_union=off,index_merge_intersection=off,engine_condition_pushdown=off,index_condition_pushdown=off,derived_merge=off';

-- 查看当前optimizer_switch设置
SELECT @@optimizer_switch;

show create table small_table;

/*
CREATE TABLE `small_table` (
  `id` int(11) NOT NULL,
  `key_col` int(11) DEFAULT NULL,
  `data_col` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_key_col` (`key_col`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
*/

alter table small_table drop index idx_key_col;

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
JOIN large_table l ON s.key_col = l.key_col;

/*
+----+-------------+-------+------------+------+---------------+------+---------+------+-------+----------+----------------------------------------------------+
| id | select_type | table | partitions | type | possible_keys | key  | key_len | ref  | rows  | filtered | Extra                                              |
+----+-------------+-------+------------+------+---------------+------+---------+------+-------+----------+----------------------------------------------------+
|  1 | SIMPLE      | s     | NULL       | ALL  | NULL          | NULL | NULL    | NULL |   100 |   100.00 | NULL                                               |
|  1 | SIMPLE      | l     | NULL       | ALL  | NULL          | NULL | NULL    | NULL | 10302 |    10.00 | Using where; Using join buffer (Block Nested Loop) |
+----+-------------+-------+------------+------+---------------+------+---------+------+-------+----------+----------------------------------------------------+
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
*/
/*
为什么是 BNL 而非 SNL？

1.内存优化机制

BNL 是 MySQL 的默认连接算法，它会将驱动表（这里是 small_table）的数据分块读入连接缓冲区（Join Buffer），然后批量与被驱动表（large_table）进行比较。这种方式减少了对被驱动表的扫描次数，比 SNL 更高效。

2. SNL 的使用场景

SNL 是最原始的嵌套循环算法，即驱动表每读一行就去扫描一次被驱动表。这种算法在表数据量较大时效率极低（时间复杂度为 O (M×N)），因此 MySQL 仅在连接缓冲区无法分配或表数据极小时才会使用 SNL。

3. 参数影响

BNL 的触发与 join_buffer_size 参数有关。如果该参数足够大，驱动表可以完全放入缓冲区，BNL 的效率会显著提升；反之，如果参数过小，BNL 的性能可能接近 SNL，但 MySQL 仍会优先选择 BNL。
*/