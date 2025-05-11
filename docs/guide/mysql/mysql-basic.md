# MySQL 基础

case1: database

```sql
create database dbname;
show databases;
use dbname;
drop database dbname;
```

case2: table

```sql


create table if not exists tablename (
    column1 datatype constraint,
    column2 datatype constraint,
    column3 datatype constraint,
   ...
);
create table tablename like existing_table_name;

CREATE TABLE actor (
  actor_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(45) NOT NULL,
  last_name VARCHAR(45) NOT NULL,
  last_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY  (actor_id),
  KEY idx_actor_last_name (last_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

case3: describe table

```sql
show tables;
desc tablename;
show create table tablename;
```

case4: table modification

```sql
alter table tablename add column columnname datatype constraint;
alter table tablename modify column columnname datatype constraint;
alter table tablename change column old_columnname new_columnname datatype constraint;
alter table tablename drop column columnname;

alter table tablename rename new_tablename;
alter table tablename character set utf8;


alter table tablename drop foreign key fk_name;
alter table tablename add foreign key (column1, column2) references other_table (column1, column2);
alter table tablename add index idx_column (column);
```

case5: data manipulation

```sql
insert into tablename (column1, column2,...) values (value1, value2,...);
insert into tablename (column1, column2,...) select * from other_table;

update tablename set column1=value1, column2=value2,... where condition;
delete from tablename where condition;

select * from tablename where condition;
select column1, column2,... from tablename where condition;
select column1, column2,... from tablename where condition group by column1, column2;
select column1, column2,... from tablename where condition group by column1, column2 having condition;
```

case6: data types

```sql
INT, TINYINT, SMALLINT, MEDIUMINT, BIGINT
FLOAT, DOUBLE, DECIMAL(M,D), NUMERIC(M,D)
CHAR(M), VARCHAR(M), TINYTEXT, TEXT, MEDIUMTEXT, LONGTEXT
DATE, TIME, DATETIME, TIMESTAMP
ENUM('value1', 'value2',...)
SET('value1', 'value2',...)
```

case7: constraints

```sql
NOT NULL, NULL, DEFAULT value, AUTO_INCREMENT
UNIQUE, PRIMARY KEY, FOREIGN KEY, CHECK (expression)
INDEX (column), KEY (column), FULLTEXT (column)
```
