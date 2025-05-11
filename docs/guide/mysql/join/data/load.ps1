$sql = @"
LOAD DATA LOCAL INFILE 'D:/workspace/bigdata/simple-doc/docs/guide/mysql/join-data/random_data.csv'
INTO TABLE large_table2
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
"@

# 执行 mysql 命令
& mysql -uroot -proot --local-infile=1 "-e $sql"


mysql -uroot -proot -e "use join_example; select * from large_table order by id limit 10;"
mysql -uroot -proot --local-infile=1 -e "use join_example; LOAD DATA LOCAL INFILE 'D:\\workspace\\bigdata\\simple-doc\\docs\\guide\\mysql\\join-data\\random_data.csv' INTO TABLE large_table2 FIELDS TERMINATED BY ',' ENCLOSED BY '\"' LINES TERMINATED BY '\\n' IGNORE 1 ROWS;"
