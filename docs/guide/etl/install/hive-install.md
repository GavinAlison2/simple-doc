# Hive Install

## 1. 安装 Hadoop 

见 [hadoop-install](hadoop-install.md)

## 2. 安装 MySQL

运行docker-compose-mysql.yml文件，启动MySQL服务。

```yml
services:
  mysql:
    image: mysql:8.0
    container_name: mysql     
    ports:
      - "3306:3306"
    # restart: always
    # 容器日志大小配置
    logging:
      driver: 'json-file'
      options:
        max-size: '10m'
        max-file: '3'
    environment:
      - TZ=Asia/Shanghai
      - LANG=en_US.UTF-8
      - MYSQL_ROOT_PASSWORD=root
      # - MYSQL_USER=root
      - MYSQL_ROOT_HOST=%
      - default-authentication-plugin=mysql_native_password
    volumes:  
      - mysql-data:/var/lib/mysql
      - ./mysql/config/my.cnf:/etc/mysql/my.cnf
    networks:
      - mysql-network
volumes:
  mysql-data:
networks:
  mysql-network:
    driver: bridge
```

my.cnf文件配置如下：
```cnf
# 服务端参数配置
[mysqld]
user=mysql                     # MySQL启动用户
default-storage-engine=INNODB  # 创建新表时将使用的默认存储引擎
character-set-server=utf8mb4   # 设置mysql服务端默认字符集
collation-server = utf8mb4_general_ci # 数据库字符集对应一些排序等规则，注意要和character-set-server对应

pid-file        = /var/lib/mysql/mysqld.pid  # pid文件所在目录
#socket          = /var/lib/mysql/mysqld.sock # 用于本地连接的socket套接字
socket = /var/lib/mysql/mysql.sock
datadir         = /var/lib/mysql             # 数据文件存放的目录
bind-address    = 0.0.0.0                   # MySQL绑定IP
mysqlx_bind_address=0.0.0.0

expire_logs_days=7                            # 定义清除过期日志的时间(这里设置为7天)

# 设置client连接mysql时的字符集,防止乱码
init_connect='SET NAMES utf8mb4'

# 是否对sql语句大小写敏感，1表示不敏感
lower_case_table_names = 1

# 执行sql的模式，规定了sql的安全等级, 暂时屏蔽，my.cnf文件中配置报错
#sql_mode = STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION

# 事务隔离级别，默认为可重复读，mysql默认可重复读级别（此级别下可能参数很多间隙锁，影响性能）
transaction_isolation = READ-COMMITTED

# TIMESTAMP如果没有显示声明NOT NULL，允许NULL值
explicit_defaults_for_timestamp = true

#它控制着mysqld进程能使用的最大文件描述(FD)符数量。
#需要注意的是这个变量的值并不一定是你设定的值，mysqld会在系统允许的情况下尽量获取更多的FD数量
open_files_limit    = 65535

# 允许最大连接数
max_connections=200

#最大错误连接数
max_connect_errors = 600


[client]
default-character-set=utf8mb4  # 设置mysql客户端默认字符集
```


执行脚本，创建hive数据库， hive用户，并赋予权限。

```bash
mysql -uroot -proot -e "
create user 'hive'@'%' identified WITH mysql_native_password by '123456'; 
grant all privileges on *.* to 'hive'@'%'; 
flush privileges;"
```

## 3. 安装 Hive

下载最新版本的Hive安装包，解压到指定目录，并配置环境变量。

```bash
cd /opt/soft/bigdata/
wget https://archive.apache.org/dist/hive/hive-3.1.2/apache-hive-3.1.2-bin.tar.gz
tar -zxvf apache-hive-3.1.2-bin.tar.gz -C /opt/soft/bigdata/
rm -rf apache-hive-3.1.2-bin.tar.gz
mv /opt/soft/bigdata/apache-hive-3.1.2-bin /opt/soft/bigdata/hive
```


## 4. 配置环境变量：

hive-site.xml文件配置如下：
```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <property>
        <name>javax.jdo.option.ConnectionURL</name>
        <value>jdbc:mysql://localhost:3306/hive?useSSL=false&amp;createDatabaseIfNotExist=true&amp;allowPublicKeyRetrieval=true</value>
    </property>
    <property>
        <name>javax.jdo.option.ConnectionDriverName</name>
        <value>com.mysql.jdbc.Driver</value>
    </property>
    <property>
        <name>javax.jdo.option.ConnectionUserName</name>
        <value>hive</value>
    </property>
    <property>
        <name>javax.jdo.option.ConnectionPassword</name>
        <value>123456</value>
    </property>
    <property>
        <name>hive.metastore.db.type</name>
        <value>mysql</value>
    </property>
    <property>
        <name>hive.metastore.db.type</name>
        <value>mysql</value>
    </property>
    <property>
        <name>hive.server2.enable.doAs</name>
        <value>false</value>
    </property>
    <property>
        <name>hive.tez.exec.inplace.progress</name>
        <value>false</value>
    </property>
    <property>
        <name>hive.exec.scratchdir</name>
        <value>/opt/hive/scratch_dir</value>
    </property>
    <property>
        <name>hive.user.install.directory</name>
        <value>/opt/hive/install_dir</value>
    </property>
    <property>
        <name>tez.runtime.optimize.local.fetch</name>
        <value>true</value>
    </property>
    <property>
        <name>hive.exec.submit.local.task.via.child</name>
        <value>false</value>
    </property>
    <property>
        <name>mapreduce.framework.name</name>
        <value>local</value>
    </property>
    <property>
        <name>tez.local.mode</name>
        <value>true</value>
    </property>
    <property>
        <name>hive.execution.engine</name>
        <value>tez</value>
    </property>
    <property>
        <name>hive.metastore.warehouse.dir</name>
        <value>/opt/hive/data/warehouse</value>
    </property>
    <property>
        <name>metastore.metastore.event.db.notification.api.auth</name>
        <value>false</value>
    </property>
    <property>
        <name>hive.server2.active.passive.ha.enable</name>
        <value>true</value>
    </property>
    <property>
        <name>hive.server2.thrift.bind.host</name>
        <value>0.0.0.0</value>
    </property>
    <property>
        <name>hive.server2.thrift.port</name>
        <value>10000</value>
    </property>
</configuration>
```

修改jar包

```
rm -rf /opt/soft/bigdata/hive/lib/guava-11.0.2.jar
cp /opt/soft/bigdata/hadoop-3.3.0/share/hadoop/common/lib/guava-27.0-jre.jar /opt/soft/bigdata/hive/lib/
```

## 5. 添加 tez 引擎

```bash
cd /opt/soft/bigdata/
curl -O https://dlcdn.apache.org/tez/0.10.1/apache-tez-0.10.1-bin.tar.gz
tar -zxvf apache-tez-0.10.1-bin.tar.gz 
mv apache-tez-0.10.1  tez-0.10.1

hadoop fs -mkdir -p /tez
hadoop fs -put /opt/soft/bigdata/apache-tez-0.10.1-bin.tar.gz /tez/

cd /opt/soft/bigdata/hadoop-3.3.0/etc/hadoop/

touch tez-site.xml
cat <<"EOF" | tee -a ./tez-site.xml 
<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="configuration.xsl"?>
<configuration>
	<!--将 tez 包上传到hsfs上的位置-->
	<property>
		<name>tez.lib.uris</name>
		<value>${fs.defaultFS}/tez/apache-tez-0.10.1-bin.tar.gz</value>
	</property>
	<property>
		<name>tez.use.cluster.hadoop-libs</name>
		<value>true</value>
	</property>
	<!--AM 容器大小（MB），建议大于等于yarn.scheduler.minimum-allocation-mb值-->
	<property>
		<name>tez.am.resource.memory.mb</name>
		<value>1024</value>
	</property>
	<!--每个AM 容器的虚拟核数-->
	<property>
		<name>tez.am.resource.cpu.vcores</name>
		<value>1</value>
	</property>
	<!--Tez容器占用Java堆空间最大的比例-->
	<property>
		<name>tez.container.max.java.heap.fraction</name>
		<value>0.8</value>
	</property>
	<!-- 为Tez 任务容器分配的内存大小（MB），如果太小可能导致Tez任务运行不起来-->
	<property>
		<name>tez.task.resource.memory.mb</name>
		<value>1024</value>
	</property>
	<!-- 为Tez 任务容器分配的虚拟核数-->
	<property>
		<name>tez.task.resource.cpu.vcores</name>
		<value>1</value>
	</property>
</configuration>

EOF


cat >> $HADOOP_HOME/etc/hadoop/shellprofile.d/tez.sh <<"EOF"

hadoop_add_profile tez
function _tez_hadoop_classpath
{
 hadoop_add_classpath "$HADOOP_HOME/etc/hadoop" after
 hadoop_add_classpath "/opt/soft/bigdata/tez-0.10.1/*" after
 hadoop_add_classpath "/opt/soft/bigdata/tez-0.10.1/lib/*" after
}

EOF

#  config  hive
touch $HIVE_HOME/conf/hive-env.sh
cat >> $HIVE_HOME/conf/hive-env.sh <<"EOF"
export TEZ_HOME=/opt/soft/bigdata/tez-0.10.1  
export TEZ_JARS=$TEZ_HOME/*:$TEZ_HOME/lib/*
export HADOOP_CLASSPATH=${HADOOP_CLASSPATH}:${TEZ_JARS}

EOF

source $HIVE_HOME/conf/hive-env.sh


# 删除jar包，解决日志jar包冲突

rm -rf /opt/bigdata/tez-0.10.1/lib/slf4j-log4j12-1.7.10.jar

# 确保 tez 包有 hadoop-shaded-protobuf_3_7-1.0.0.jar

cp /opt/soft/bigdata/hadoop-3.3.0/share/hadoop/common/lib/hadoop-shaded-protobuf_3_7-1.0.0.jar /opt/soft/bigdata/tez-0.10.1/lib/

# 确保 hive 删除冲突的 protobuf 包
mv /opt/soft/bigdata/hive/lib/protobuf-java-2.5.0.jar /opt/soft/bigdata/hive/lib/protobuf-java-2.5.0.jar.bak

```
# 配置hive-site.xml 
这里支持 tez 引擎

```xml
<configuration>
    <property>
        <name>javax.jdo.option.ConnectionURL</name>
        <value>jdbc:mysql://localhost:3306/hive?useSSL=false&amp;createDatabaseIfNotExist=true&amp;allowPublicKeyRetrieval=true</value>
    </property>
    <property>
        <name>javax.jdo.option.ConnectionDriverName</name>
        <value>com.mysql.jdbc.Driver</value>
    </property>
    <property>
        <name>javax.jdo.option.ConnectionUserName</name>
        <value>hive</value>
    </property>
    <property>
        <name>javax.jdo.option.ConnectionPassword</name>
        <value>123456</value>
    </property>
    <property>
        <name>hive.metastore.db.type</name>
        <value>mysql</value>
    </property>
    <property>
        <name>hive.metastore.db.type</name>
        <value>mysql</value>
    </property>
    <property>
        <name>hive.server2.enable.doAs</name>
        <value>false</value>
    </property>
    <property>
        <name>hive.tez.exec.inplace.progress</name>
        <value>false</value>
    </property>
    <property>
        <name>hive.exec.scratchdir</name>
        <value>/opt/hive/scratch_dir</value>
    </property>
    <property>
        <name>hive.user.install.directory</name>
        <value>/opt/hive/install_dir</value>
    </property>
    <property>
        <name>hive.exec.submit.local.task.via.child</name>
        <value>false</value>
    </property>
    <property>
        <name>mapreduce.framework.name</name>
        <value>local</value>
    </property>
    
    <property>
        <name>tez.runtime.optimize.local.fetch</name>
        <value>true</value>
    </property>
    <property>
        <name>tez.local.mode</name>
        <value>true</value>
    </property>
    <property>
        <name>hive.execution.engine</name>
        <value>tez</value>
    </property>
    <property>
        <name>hive.tez.container.size</name>
        <value>1024</value>
    </property>
    <property>
        <name>hive.tez.am.task.max.failed.attempts</name>
        <value>10</value>
    </property>
    <property>
        <name>hive.tez.am.max.app.attempts</name>
        <value>5</value>
    </property>

    <property>
        <name>hive.metastore.warehouse.dir</name>
        <value>/opt/hive/data/warehouse</value>
    </property>
    <property>
        <name>metastore.metastore.event.db.notification.api.auth</name>
        <value>false</value>
    </property>
    <property>
        <name>hive.server2.active.passive.ha.enable</name>
        <value>true</value>
    </property>
    <property>
        <name>hive.server2.thrift.bind.host</name>
        <value>0.0.0.0</value>
    </property>
    <property>
        <name>hive.server2.thrift.port</name>
        <value>10000</value>
    </property>
</configuration>
```

配置 hadoop core-site.xml 文件

```xml
<property>
    <name>hadoop.proxyuser.hive.groups</name>
    <value>*</value>
</property>

<property>
    <name>hadoop.proxyuser.hive.hosts</name>
    <value>*</value>
</property>
```



## 6. 启动 Hive 服务

```bash
# 启动 hive 服务 本身的 hive cli 客户端
# $HIVE_HOME/bin/hive

# 启动 Hive 服务 hiveserver2, 支持jdbc
mkdir $HIVE_HOME/logs
nohup $HIVE_HOME/bin/hive --service metastore > $HIVE_HOME/logs/hive-metastore.log 2>&1 &
nohup $HIVE_HOME/bin/hiveserver2 > $HIVE_HOME/logs/hiveserver2.log 2>&1 &

# 启动成功后，查看日志
``` 
## 7. 使用beeline连接hiveserver2

```bash
# 连接 Hive
$HIVE_HOME/bin/beeline -u jdbc:hive2://0.0.0.0:10000

# 测试
create database test;
use test;
create table test(a string);
insert into test values("tom");
select * from test group by a;


$HIVE_HOME/bin/beeline -u jdbc:hive2://localhost:10000 -e 'use test;insert into test values("tom");'
```


- https://kontext.tech/article/448/install-hadoop-330-on-linux   
- https://kontext.tech/article/561/apache-hive-312-installation-on-linux-guide
