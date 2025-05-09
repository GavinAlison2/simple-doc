# MySQL 思考整理

## Buffer Pool

- buffer pool
- free 链表
- flush 链表
- lru 链表
- change buffer
- adapter hash index
- double writer
- 2pc
- log buffer
- redo log
- undo log
- binlog
- index
- mvcc, read view

## 索引

- B+树
- 聚簇索引
- 二级索引
- 普通索引
- 联合索引
- 覆盖索引
- 前缀索引
- hash索引
- 索引失效

## 锁

- 表锁
  - S锁
  - X锁
  - IS锁
  - IX锁
- 行锁
  - record lock
  - gap lock
  - next-key lock
- 主键锁
- 死锁
  - 死锁检测
  - 死锁超时
- 锁粒度
- 锁的优化
- 事务隔离级别

## 一些图

![mysql1](assets/mysl-th01.png)

```md
sql
buffer pool
缓存页
dirty page

io刷脏页

buffer pool
free 链表
flush 链表
lru 链表

redo log
  ib_logfile0
  wal write to disk
  innodb_flush_log_at_trx_commit=1

undo log
  undo_001

binlog
  binlog_001
```
