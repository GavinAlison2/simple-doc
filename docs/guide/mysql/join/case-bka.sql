-- Active: 1746836906323@@127.0.0.1@3306@join_example
-- 创建测试表和数据
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS customers;

CREATE TABLE customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    age INT,
    INDEX idx_age (age)
) ENGINE=InnoDB;

CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    amount DECIMAL(10,2),
    INDEX idx_customer_id (customer_id)
) ENGINE=InnoDB;

-- 插入测试数据
DELIMITER $$
CREATE PROCEDURE populate_data()
BEGIN
    DECLARE i INT DEFAULT 1;
    -- 插入10万客户
    WHILE i <= 100000 DO
        INSERT INTO customers (name, age) VALUES (CONCAT('Customer_', i), FLOOR(RAND() * 50) + 18);
        SET i = i + 1;
    END WHILE;
    
    SET i = 1;
    -- 为每个客户插入10个订单
    WHILE i <= 100000 DO
        INSERT INTO orders (customer_id, amount) VALUES (i, RAND() * 1000);
        SET i = i + 1;
    END WHILE;
END$$
DELIMITER ;

CALL populate_data();
ANALYZE TABLE customers;
ANALYZE TABLE orders;

-- 测试BKA优化
SET optimizer_switch = 'batched_key_access=on, mrr=on';
SET optimizer_trace="enabled=on";

EXPLAIN
SELECT c.name, o.amount
FROM customers c
JOIN orders o 
  ON c.id = o.customer_id
WHERE c.age BETWEEN 25 AND 30;

-- 执行查询并测量时间
SET @start_time = NOW(6);
SELECT c.name, o.amount
FROM customers c
JOIN orders o 
  ON c.id = o.customer_id
WHERE c.age BETWEEN 25 AND 30;
SELECT TIMESTAMPDIFF(MICROSECOND, @start_time, NOW(6)) AS execution_time_microseconds;

-- 检查优化器追踪
SELECT * FROM information_schema.OPTIMIZER_TRACE\G;

-- 禁用BKA并对比
SET optimizer_switch = 'batched_key_access=off';

EXPLAIN
SELECT c.name, o.amount
FROM customers c
JOIN orders o 
  ON c.id = o.customer_id
WHERE c.age BETWEEN 25 AND 30;

SET @start_time = NOW(6);
SELECT c.name, o.amount
FROM customers c
JOIN orders o 
  ON c.id = o.customer_id
WHERE c.age BETWEEN 25 AND 30;
SELECT TIMESTAMPDIFF(MICROSECOND, @start_time, NOW(6)) AS execution_time_microseconds;

-- 恢复默认设置
SET optimizer_switch = 'batched_key_access=on, mrr=on';
SET optimizer_trace="enabled=off";    