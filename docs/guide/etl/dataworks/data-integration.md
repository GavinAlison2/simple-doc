# Data Integration

- 数据源管理

```md
字段

- 数据源名称,数据源类型,链接信息(json), 数据源描述, 创建时间, 连通状态, 使用环境, 操作, 操作人id, 操作时间

链接信息

- 数据库名
- 用户名
- 密码

```

支持的数据源: 40+种

- 关系型数据库(MySQL, Oracle, SQL Server, PostgreSQL, DB2, SQLite)
- NoSQL数据库(MongoDB, Cassandra, HBase, Couchbase)
- 文件系统(HDFS, S3, NFS, FTP, SFTP)
- 云存储(AWS S3, Redshift, Azure Blob Storage, Google Cloud Storage)

- Amazon S3, Redshift, AnalyticDB for MySQL 2/3, PostgreSQL, OceanBase
- BigQuery, ClickHouse, DataHub, Data Lake
- DB2, Doris, DM, DRDS
- Elasticsearch, Hive

离线任务配置

- 通过向导模型配置离线同步任务
- 通过脚本模型配置离线同步任务
