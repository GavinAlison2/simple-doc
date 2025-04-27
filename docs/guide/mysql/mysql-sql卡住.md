# MySQL SQL卡住

## 问题描述

MySQL SQL语句执行卡住，无法执行，一直处于等待状态，无法返回结果。

## 解决方法

- 检查MySQL服务是否正常运行，如果服务异常，请重启MySQL服务。
- `show processlist;`查看当前正在执行的SQL语句，如果有SQL语句执行时间过长，请及时终止该SQL语句。
- `SELECT * FROM INFORMATION_SCHEMA.INNODB_TRX;`查看InnoDB事务信息，如果有长时间处于等待状态的事务，请及时处理。
- `SELECT * FROM INFORMATION_SCHEMA.INNODB_LOCK_WAITS;`查看InnoDB锁等待信息，如果有长时间等待锁的情况，请及时处理。
- `SELECT * FROM performance_schema.data_locks WHERE ENGINE_TRANSACTION_ID = '21596';`查看MySQL性能schema数据锁信息.

