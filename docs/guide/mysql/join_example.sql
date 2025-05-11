-- Active: 1746836906323@@127.0.0.1@3306@join_example
create DATABASE if not EXISTS join_example;
use join_example;

drop table if EXISTS small_table;
create table if not exists small_table (
    id int primary key,
    key_col int,
    data_col varchar(255)
);

drop table if EXISTS large_table;
create table if not exists large_table (
    id int primary key,
    key_col int,
    data_col varchar(255)
);

-- 为large_table的连接键创建索引（用于测试index nested-loop join）
CREATE INDEX idx_large_key ON large_table(key_col);

select version(); -- 8.0.11
DELIMITER $$

drop PROCEDURE if exists generate_series;
CREATE PROCEDURE generate_series(
    IN start_val INT, 
    IN end_val INT, 
    IN step_val INT)
BEGIN
    -- 检查步长是否为0
    IF step_val = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Step value cannot be zero';
    END IF;
    
    -- 创建临时表存储结果
    DROP TEMPORARY TABLE IF EXISTS temp_series;
    CREATE TEMPORARY TABLE temp_series (value INT);
    
    -- 根据步长方向生成序列
    IF step_val > 0 THEN
        WHILE start_val <= end_val DO
            INSERT INTO temp_series VALUES (start_val);
            SET start_val = start_val + step_val;
        END WHILE;
    ELSE
        WHILE start_val >= end_val DO
            INSERT INTO temp_series VALUES (start_val);
            SET start_val = start_val + step_val;
        END WHILE;
    END IF;
    
    -- 返回结果
    SELECT value FROM temp_series;
END$$

drop Procedure if exists generate_series2;
create Procedure generate_series2(
    in start_val int,
    in end_val int)
BEGIN
    call generate_series(start_val, end_val, 1);
    select value from temp_series;
end$$

DELIMITER ;   

CALL generate_series(1, 10, 1);
CALL generate_series2(1, 10);
-- 生成2到10的偶数序列
CALL generate_series(2, 10, 2);
-- 生成5到1的倒序序列
CALL generate_series(5, 1, -1);

call generate_series(1,100,1) -- temp_series 表中有100条数据

-- 插入测试数据（模拟小表和大表）
INSERT INTO small_table (id, key_col, data_col)
SELECT s.value,  -- 100行数据
       FLOOR(RAND() * 50) + 1,
       concat('data_', s.value)
FROM temp_series s;

select * from small_table;
-- select * from small_table order by key_col;
call generate_series(1, 10000, 1);


INSERT INTO large_table (id, key_col, data_col)
SELECT s.value,  -- 100行数据
       FLOOR(RAND() * 50) + 1,
       concat('data_', s.value)
FROM temp_series s;

call generate_series(1, 5000000, 1);

SET GLOBAL local_infile = 1;
create table large_table2 like large_table;


select sql_no_cache count(1) from small_table;
select sql_no_cache count(id) from small_table;
select sql_no_cache count(*) from small_table;
select sql_no_cache count(1) from large_table;
select sql_no_cache count(id) from large_table;
select sql_no_cache count(*) from large_table;


select count(1) from small_table; -- 100
select count(1) from large_table; -- 10000

-- select generate_series(1, 100);   -- 报错

-- ++++++++++++++++++++++++++++++++++++++++++++++++
-- case1: simple nested-loop join
-- ++++++++++++++++++++++++++++++++++++++++++++++++
SET optimizer_switch = 'index_merge=off,index_merge_union=off,index_merge_sort_union=off,index_merge_intersection=off,engine_condition_pushdown=off,index_condition_pushdown=off,derived_merge=off';

-- 查看当前optimizer_switch设置
SELECT @@optimizer_switch;

EXPLAIN FORMAT=JSON
SELECT *
FROM small_table s
JOIN large_table l ON s.key_col = l.key_col;

explain 
SELECT *
FROM small_table s
JOIN large_table l ON s.key_col = l.key_col;


-- 执行实际查询以获取时间统计
SET @start_time = NOW(6);
SELECT *
FROM small_table s
JOIN large_table l ON s.key_col = l.key_col
LIMIT 0;
SET @end_time = NOW(6);
SELECT TIMESTAMPDIFF(MICROSECOND, @start_time, @end_time) AS execution_time_ms;
-- +-------------------+
-- | execution_time_ms |
-- +-------------------+
-- |             21440 |
-- +-------------------+

-- ++++++++++++++++++++++++++++++++++++++++++++++++
-- case2: index nested-loop join
-- ++++++++++++++++++++++++++++++++++++++++++++++++
SET optimizer_switch = 'index_merge=on,index_merge_union=on,index_merge_sort_union=on,index_merge_intersection=on,engine_condition_pushdown=on,index_condition_pushdown=on,derived_merge=on';
-- 查看当前optimizer_switch设置
SELECT @@optimizer_switch;

alter table small_table add index idx_key_col (key_col);

-- EXPLAIN FORMAT=JSON
explain
SELECT *
FROM small_table s
left JOIN large_table l ON s.key_col = l.key_col;

-- 执行实际查询以获取时间统计
SET @start_time = NOW(6);
SELECT *
FROM small_table s
JOIN large_table l ON s.key_col = l.key_col
LIMIT 0;
SET @end_time = NOW(6);
SELECT TIMESTAMPDIFF(MICROSECOND, @start_time, @end_time) AS execution_time_ms;

-- join, inner.join, left.join, right.join, full.join



