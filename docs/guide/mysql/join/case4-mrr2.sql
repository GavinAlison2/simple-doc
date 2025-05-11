-- 创建测试表
CREATE TABLE test_mrr (
    id INT PRIMARY KEY AUTO_INCREMENT,
    key_col INT NOT NULL,
    data_col VARCHAR(100),
    INDEX idx_key_col (key_col)
) ENGINE=InnoDB;

-- 插入测试数据（约10万行）
DELIMITER $$
CREATE PROCEDURE insert_test_data()
BEGIN
    DECLARE i INT DEFAULT 1;
    WHILE i <= 100000 DO
        INSERT INTO test_mrr (key_col, data_col) VALUES (i % 10000, CONCAT('data_', i));
        SET i = i + 1;
    END WHILE;
END$$
DELIMITER ;

CALL insert_test_data(); -- cost time: 3m10s

select count(id) from test_mrr; -- 100,000

-- MySQL 8.0 的优化器对大范围扫描更可能启用 MRR
SET optimizer_switch = 'mrr=on,mrr_cost_based=off,index_condition_pushdown=on';
SET range_optimizer_max_mem_size = 8388608; -- 单独设置内存参数
select @@optimizer_switch;
-- 确保统计信息最新
ANALYZE TABLE test_mrr;
-- 更新统计信息并生成直方图
ANALYZE TABLE test_mrr UPDATE HISTOGRAM ON key_col WITH 100 BUCKETS;

-- 查看索引和数据分布
SHOW INDEX FROM test_mrr;
SELECT 
  COUNT(DISTINCT key_col) AS unique_keys,
  COUNT(*) AS total_rows,
  COUNT(*) / COUNT(DISTINCT key_col) AS avg_rows_per_key
FROM test_mrr;
-- 测试MRR查询（增加扫描行数和回表操作）
EXPLAIN
SELECT *
FROM test_mrr
WHERE key_col BETWEEN 1 AND 100000  -- 扩大查询范围
  AND data_col LIKE 'data_%'       -- 确保回表过滤
ORDER BY key_col;                  -- 按索引顺序排序
-- extra: using where; using filesort
-- 执行范围查询
EXPLAIN format=json SELECT SQL_NO_CACHE * FROM test_mrr WHERE key_col BETWEEN 1 AND 50000; -- using index condition pushdown,icp的花费代价比mrr小

SHOW STATUS LIKE 'Handler_read_rnd_next';
SELECT * 
FROM INFORMATION_SCHEMA.OPTIMIZER_TRACE 
WHERE QUERY LIKE 'SELECT * FROM test_mrr%' 
-- ORDER BY TRACE_ID DESC LIMIT 1;

-- 测试禁用MRR的情况
SET optimizer_switch = 'mrr=off';
select @@optimizer_switch;

EXPLAIN FORMAT=JSON
SELECT *
FROM test_mrr
WHERE key_col BETWEEN 1 AND 50000  -- 扩大查询范围
  AND data_col LIKE 'data_%'       -- 确保回表过滤
ORDER BY key_col;                 -- 按索引顺序排序

FLUSH STATUS;

-- 强制开启mrr
SET GLOBAL read_rnd_buffer_size = 1048576; -- 1M
-- 禁用基于成本的 MRR 判断，强制启用
SET optimizer_switch = 'mrr=on,mrr_cost_based=off';
-- 执行更大范围的查询
EXPLAIN FORMAT=JSON  SELECT test_mrr.* FROM test_mrr WHERE key_col BETWEEN 1 AND 50000;

## 性能测试
-- 启用 MRR 的性能测试
SET optimizer_switch = 'mrr=on,mrr_cost_based=on';
SELECT BENCHMARK(100, (SELECT * FROM test_mrr WHERE key_col BETWEEN 100 AND 200 LIMIT 100));

-- 禁用 MRR 的性能测试
SET optimizer_switch = 'mrr=off';
SELECT BENCHMARK(100, (SELECT * FROM test_mrr WHERE key_col BETWEEN 100 AND 200 LIMIT 100));


select version(); -- 8.0.27

SHOW VARIABLES LIKE 'read_rnd_buffer_size';
SHOW VARIABLES LIKE 'optimizer_switch';
select @@optimizer_switch;

FLUSH STATUS;
SET SESSION optimizer_trace="enabled=on";
-- explain
SELECT id, key_col, data_col FROM test_mrr WHERE key_col BETWEEN 1 AND 100000 and data_col like 'data_%' order by key_col;
select id, key_col,data_col from large_table2 where key_col between 1 and 100000 and data_col like 'C%' order by key_col;
SELECT * FROM information_schema.OPTIMIZER_TRACE\G

SET SESSION optimizer_trace="enabled=off";


