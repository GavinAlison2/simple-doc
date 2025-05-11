# MySQL慢日志

## pt-query-digest

```md
pt-query-digest 属于 Percona Toolkit 的一个工具，也是使用较多的一个；
用于分析slow log,也可以分析MySQL的 binary log 、 general log 日志。
```

本文通过pt-query-digest实现慢sql的分析，优化sql

## 一，安装percona-toolkit

```sh
cd /opt/
wget percona.com/get/percona-toolkit.tar.gz
tar zxf percona-toolkit.tar.gz
cd percona-toolkit-3.3.1/
perl Makefile.PL PREFIX=/usr/local/percona-toolkit
make && make install
```

MySQL开启慢查询日志并设置慢查询时间

```sql
mysql> show variables like '%slow_query_log%';
+---------------------------+-------------------------------+
| Variable_name             | Value                         |
+---------------------------+-------------------------------+
| slow_query_log            | ON                            |
| slow_query_log_file       | /var/lib/mysql/mysql-slow.log |
+---------------------------+-------------------------------+

-- 超过一秒的记录到日志中
mysql> set global slow_query_log_time=1;

```

开启慢查询之后，在程序运行一段时间之后，可以拿到记录的日志使用命令直接分析慢查询日志直接拿到的mysql-slow.log看着没有条理，
不容易分析使用命令分析并生成slow_report.log ： ` pt-query-digest  slow.log > slow_report.log` 
然后我们可以导出这个文件，查看其中内容

## 二，分析慢查询日志

文件中总共包含三部分：总体统计，sql统计，单个sql的统计

1. 总体统计

```md
作者：ajisun
链接：https://zhuanlan.zhihu.com/p/382967503
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

# 85.8s user time, 990ms system time, 30.71M rss, 193.21M vsz
# Current date: Mon May 10 11:47:39 2021
# Hostname: xxxx.xxx-xxx.com
# Files: /var/lib/mysql/mysql-slow.log
# Overall: 87.23k total, 73 unique, 0.05 QPS, 0.37x concurrency __________
# Time range: 2021-04-16T03:15:31 to 2021-05-07T08:38:15

# 属性            总计       最小    最大    平均      95%  标准     中等

# Attribute       total     min     max     avg     95%  stddev  median
# ============    ======= ======= ======= ======= ======= ======= =======
# Exec time       676605s    2s    905s      8s     23s     12s      4s
# Lock time       242s       0      1s     3ms     4ms    17ms   839us
# Rows sent       8.90M       0  15.53k  107.02  400.73  616.06    8.91
# Rows examine    7.13G       0   8.94M  85.77k  46.68k 412.27k   2.38k
# Query size      161.99M     6  24.91k   1.90k   1.96k  682.67   1.96k
```

2. sql统计

```md
作者：ajisun
链接：https://zhuanlan.zhihu.com/p/382967503
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

# Profile
# Rank Query ID                            Response time    Calls R/Call  
# ==== =================================== ================ ===== ======= 
#    1 0x8EBD7078F62A82A7C578540C76F46BC4  602766.9262 8... 75091  8.0272 13.94 SELECT xxxx
#    2 0x40A63F5C50A2324033DB9FCAA2719C4E  18044.3571  2.7%  4131  4.3680  3.07 SELECT xxxx
#    3 0xFB8F32AE0EFAA83C665B91B6E5862D2F  16215.4058  2.4%  2335  6.9445  6.22 SELECT xxxx 
#    4 0x2CF3802FA98AFCE8DA5C85F6E8424DCE  12951.3375  1.9%  2390  5.4190  6.56 SELECT xxxx
#    5 0x56A24EC2EC1FFDB2F49A123C34D5E0BD   8612.3662  1.3%   479 17.9799 31... SELECT xxxx
#    6 0x6D73ABA4D5097101273AA5ADB2259759   8328.1423  1.2%   858  9.7065 12.72 SELECT xxxx
#    7 0x75A04B6CA2CBDE5EB7A27A7FC15FFCC1   3864.3549  0.6%   615  6.2835  5.72 SELECT xxxx
#    8 0x886F3B1A59BD9900A6688314B0A3E4E0   3050.7563  0.5%   614  4.9687  2.93 SELECT xxxx
#    9 0xE6AA1C4FE828263924B7C26F5160BD60    680.7256  0.1%   171  3.9809  1.06 SELECT xxxx
#    10 .............
Rank: 排名
Query ID: 语句ID（去掉多余空格和文本字符，计算hash值）
Response time: 总的响应时间和 该查询在本次分析中总的时间占比
Calls: 执行次数
R/Call: 平均每次执行的响应时间
```

3. 单个sql的统计

```md
# Query 1: 0.04 QPS, 0.33x concurrency, ID 0x8EBD7078F62A82A7C578540C76F46BC4 at byte 66396962
# This item is included in the report because it matches --limit.
# Scores: V/M = 13.94
# Time range: 2021-04-16T03:15:31 to 2021-05-07T08:38:15
# Attribute    pct   total     min     max     avg     95%  stddev  median
# ============ === ======= ======= ======= ======= ======= ======= =======
# Count         86   75091
# Exec time     89 602767s      2s    281s      8s     23s     11s      4s
# Lock time     64    156s   352us   730ms     2ms     4ms    10ms   839us
# Rows sent      6 554.55k       0      31    7.56   16.81    5.75    5.75
# Rows examine   4 294.12M     110  77.33k   4.01k  10.29k   5.80k   2.38k
# Query size    89 145.64M   1.98k   1.99k   1.99k   1.96k    0.00   1.96k
# Tables
#   设计到的表
# EXPLAIN /*!50100 PARTITIONS*/
#       具体执行的sql语句
SELECT
    hg.group_id,
    MAX( ham.app_message_id ) latest_message,
    COALESCE ( hgrf.last_read_message_id, 0 ) last_read_message_id,
    SUM(
    CASE
            WHEN app_message_id > COALESCE ( last_read_message_id, 0 ) 
            AND ham.receiver_type = 'USER' THEN
                1 ELSE 0 
            END 
            ) unread_message_count 
        FROM
            h_group hg
            INNER JOIN h_message hm ON hm.group_id = hg.group_id
            INNER JOIN h_app_message ham ON ham.message_id = hm.message_id 
            AND ham.user_id = 2084
            LEFT JOIN h_group_read_flag hgrf ON hg.group_id = hgrf.group_id 
            AND hgrf.user_id = ham.user_id 
            AND hgrf.user_type = 0 
        WHERE
            ham.deleted = 0 
            AND hm.send_flag = 1 
        GROUP BY
        hg.group_id,
    hgrf.last_read_message_id
```

通过以上日志我们可以看出哪些sql执行较慢，哪些sql执行次数较多，然后根据不同的业务需求去分析有问题的sql进行优化，例如：

对于执行慢的sql:

- 使用explain查询执行计划，确认索引是否正常使用
- 关联表太多，是否使用冗余字段减少没必要的表关联
- 查询条件复杂，查询数据量较多，是否可以在业务层分多次查询(有时候多次并不比一次慢)

对于执行频率高的sql:

- 数据尝试使用缓存，较少数据库的查询

三，实际案例分析

> SQL分析：执行次数75091，总时间耗费602767s,平均单次8s，最大一次281s，最少也是2s

a. 首先根据SQL 去优化，研究很久SQL没有优化空间

​ 调试很久，索引都是正常使用，时间始终在2s左右，如果某个用户未读数量大，那花费时间更长

b. 根据业务逻辑拆解SQL, 减少数据量，减少表关联

场景描述和分析：

```md
公司每天会有不定量的推文推送到每个用户,app_message 会存储用户和消息的关联( count=消息数x用户数) 
总共4张表： 
app_message(用户消息关联表， 主要字段：app_message_id,message_id,user_id),数据量1千万 
message(消息表，主要字段：message_id，group_id) 数据量近2百万 
h_group(频道表，主要字段：group_id) 每条推文都有所属的频道，数据量较少 
h_group_read_flag(用户频道最新已读表，主要字段：last_read_message_id，group_id,user_id) 
存储用户每个频道最新已读消息记录 (last_read_message_id=app_message_id)，数据量较少 

每次用户打开APP都会通过这4个表关联查询用户的未读数量以及最新的消息
```

解决分析：

b. 1: 首先h_group 只是用来关联group_id ,可以在h_app_message 中冗余group_id字段，去掉h_group表的关联；
b. 2: h_message的send_flag是撤回推文是0，否则是1（没有这个关联即可去除h_message表）在撤回推文之后就把h_app_message中相关数据删除，这样h_message也可以不用使用
b. 3: 最后主要是h_app_message表，数量级较大，然后减少数量（将跨度较远的数据按年归档处理）
