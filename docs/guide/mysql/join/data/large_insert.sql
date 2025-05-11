use join_example;

select * from large_table2 limit 10;
show  create table large_table2;

select @@innodb_buffer_pool_size;

drop index 

DELIMITER //

CREATE PROCEDURE generate_random_data_optimized(IN num_records INT)
BEGIN
    DECLARE i INT DEFAULT 0;
    DECLARE batch_size INT DEFAULT 10000;
    DECLARE total_batches INT DEFAULT CEIL(num_records / batch_size);

    SET foreign_key_checks = 0;
    SET unique_checks = 0;

    WHILE i < total_batches DO
        INSERT INTO large_table2 (id, key_col, data_col)
        SELECT
            (i * batch_size) + t1.n + 1,
            FLOOR(1 + (RAND() * 1000000)),
            CONCAT(
                CHAR(FLOOR(65 + (RAND() * 26))),
                CHAR(FLOOR(65 + (RAND() * 26))),
                CHAR(FLOOR(65 + (RAND() * 26))),
                CHAR(FLOOR(65 + (RAND() * 26))),
                CHAR(FLOOR(65 + (RAND() * 26))),
                CHAR(FLOOR(65 + (RAND() * 26))),
                CHAR(FLOOR(65 + (RAND() * 26))),
                CHAR(FLOOR(65 + (RAND() * 26))),
                CHAR(FLOOR(65 + (RAND() * 26))),
                CHAR(FLOOR(65 + (RAND() * 26))),
                CHAR(FLOOR(65 + (RAND() * 26))),
                CHAR(FLOOR(65 + (RAND() * 26))),
                CHAR(FLOOR(65 + (RAND() * 26))),
                CHAR(FLOOR(65 + (RAND() * 26))),
                CHAR(FLOOR(65 + (RAND() * 26))),
                CHAR(FLOOR(65 + (RAND() * 26))),
                CHAR(FLOOR(65 + (RAND() * 26))),
                CHAR(FLOOR(65 + (RAND() * 26))),
                CHAR(FLOOR(65 + (RAND() * 26))),
                CHAR(FLOOR(65 + (RAND() * 26)))
            )
        FROM (
            SELECT 0 AS n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL
            SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
        ) t1,
        (
            SELECT 0 AS n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL
            SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
        ) t2,
        (
            SELECT 0 AS n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL
            SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
        ) t3
        LIMIT batch_size;

        SET i = i + 1;
    END WHILE;

    SET foreign_key_checks = 1;
    SET unique_checks = 1;
    
END //

DELIMITER ;

drop table if EXISTS large_table2;
create table large_table2 like large_table;

OPTIMIZE TABLE large_table2;

-- cost time: 1m4s
LOAD DATA LOCAL INFILE 'D:\\workspace\\bigdata\\simple-doc\\docs\\guide\\mysql\\join-data\\random_data.csv' INTO TABLE large_table2 FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS;

alter table large_table2 drop PRIMARY KEY;
SET foreign_key_checks = 0;
SET unique_checks = 0;
-- cost time: 52s
LOAD DATA LOCAL INFILE 'D:\\workspace\\bigdata\\simple-doc\\docs\\guide\\mysql\\join-data\\random_data.csv' INTO TABLE large_table2 FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS;

SET foreign_key_checks = 1;
SET unique_checks = 1;
alter table large_table2 add PRIMARY KEY(id);

