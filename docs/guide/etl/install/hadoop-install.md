# Hadoop Install

## 1. download

```
cd /opt/soft/bigdata
curl -O https://archive.apache.org/dist/hadoop/common/hadoop-3.3.0/hadoop-3.3.0.tar.gz
tar -zxvf hadoop-3.3.0.tar.gz  
```

notice:  required, java, java enviroment

`java -version`

## 2. 如果以 其他用户启动 Hadoop

则需要修改 hadoop-env.sh 文件，设置 HADOOP_SECURE_DN_USER 变量为启动 Hadoop 的用户。

先配置用户
```
useradd hive
passwd hive
hive

usermod -aG wheel hive

su hive

ssh-keygen -t rsa -P '' -f ~/.ssh/id_rsa

cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
chmod 0600 ~/.ssh/authorized_keys

ssh localhost
exit

```

## 3. 以 root 用户启动 Hadoop

```
ssh-keygen -t rsa -P '' -f ~/.ssh/id_rsa

cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
chmod 0600 ~/.ssh/authorized_keys

ssh localhost
exit
```

##  4. setup enrvironment

```
cat <<-'EOF' | tee -a ~/.bashrc 
export HADOOP_HOME=/opt/soft/bigdata/hadoop-3.3.0
export PATH=$PATH:$HADOOP_HOME/bin:$HADOOP_HOME/sbin
export JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.432.b06-1.0.1.el7_9.x86_64/jre
EOF

source ~/.bashrc

```

## 5. xml config

```
cd /opt/soft/bigdata/hadoop-3.3.0/etc/hadoop/
#配置 core-site.xml

<configuration>
  <property>
    <name>fs.default.name</name>
    <value>hdfs://0.0.0.0:19000</value>
  </property>
  <property>
    <name>hadoop.http.staticuser.user</name>
    <value>root</value>
  </property>
  <property>
    <name>dfs.permissions.enabled</name>
    <value>false</value>
  </property>
  <property>
    <name>hadoop.proxyuser.hive.groups</name>
    <value>*</value>
  </property>

  <property>
      <name>hadoop.proxyuser.hive.hosts</name>
      <value>*</value>
  </property>
</configuration>
```

## 6. Configure HDFS

```
cd /opt/soft/bigdata/hadoop-3.3.0/
mkdir -p data/namenode
mkdir -p data/datanode

#配置 hdfs-site.xml

<configuration>
   <property>
     <name>dfs.name.dir</name>
     <value>file:///opt/soft/bigdata/hadoop-3.3.0/data/namenode</value>
   </property>
   <property>
     <name>dfs.data.dir</name>
     <value>file:///opt/soft/bigdata/hadoop-3.3.0/data/datanode</value>
   </property>

   <property>
     <name>dfs.replication</name>
     <value>1</value>
   </property>
</configuration>

# 配置 core-site.xml

<configuration>
   <property>
     <name>fs.default.name</name>
     <value>hdfs://0.0.0.0:19000</value>
   </property>
</configuration>

# 配置 yarn-site.xml

<configuration>
   <property>
        <name>yarn.nodemanager.aux-services</name>
        <value>mapreduce_shuffle</value>
    </property>
    <property>
        <name>yarn.nodemanager.env-whitelist</name>
        <value>JAVA_HOME,HADOOP_COMMON_HOME,HADOOP_HDFS_HOME,HADOOP_CONF_DIR,CLASSPATH_PREPEND_DISTCACHE,HADOOP_YARN_HOME,HADOOP_MAPRED_HOME</value>
    </property>
</configuration>

# 配置 mapred-site.xml

<configuration>
    <property>
        <name>mapreduce.framework.name</name>
        <value>yarn</value>
    </property>
    <property> 
        <name>mapreduce.application.classpath</name>
        <value>%HADOOP_HOME%/share/hadoop/mapreduce/*,%HADOOP_HOME%/share/hadoop/mapreduce/lib/*,%HADOOP_HOME%/share/hadoop/common/*,%HADOOP_HOME%/share/hadoop/common/lib/*,%HADOOP_HOME%/share/hadoop/yarn/*,%HADOOP_HOME%/share/hadoop/yarn/lib/*,%HADOOP_HOME%/share/hadoop/hdfs/*,%HADOOP_HOME%/share/hadoop/hdfs/lib/*</value>
    </property>
</configuration>


```

## 7. 如果以root 用户启动

则需要修改 hadoop-env.sh 文件，设置 HADOOP_SECURE_DN_USER 变量为启动 Hadoop 的用户。

```
#配置 hadoop-env.sh

#修改start-yarn.sh 和 stop-yarn.sh
#设置以下参数，尽量在脚本靠前部分，保证变量生效
YARN_RESOURCEMANAGER_USER=root
YARN_NODEMANAGER_USER=root

#修改start-dfs.sh 和 stop-dfs.sh
HDFS_DATANODE_USER=root
#HDFS_DATANODE_SECURE_USER=hive# 这千万不可填
HDFS_NAMENODE_USER=root
HDFS_SECONDARYNAMENODE_USER=root

# 设置 NameNode 最大堆内存为 1GB
export HDFS_NAMENODE_OPTS="-Xmx1g $HDFS_NAMENODE_OPTS"

# 设置 DataNode 最大堆内存为 512MB
export HDFS_DATANODE_OPTS="-Xmx512m $HDFS_DATANODE_OPTS"

# 设置 SecondaryNameNode 最大堆内存为 512MB
export HDFS_SECONDARYNAMENODE_OPTS="-Xmx512m $HDFS_SECONDARYNAMENODE_OPTS"
```

## 问题: DataNode 启动失败

一定不要配置 hadoop-env.sh 中的 HADOOP_SECURE_DN_USER 变量，否则 DataNode 启动失败。

```
localhost: ERROR: Cannot set priority of datanode process

调整内核参数
cat >>  /etc/sysctl.conf  <<EOF
kernel.sched_rt_runtime_us = -1
EOF

sysctl -p

```

## Initialise HDFS 

1. format namenode

```
cd /opt/soft/bigdata/hadoop-3.3.0/
bin/hdfs namenode -format
```

2. start namenode and datanode

```
./sbin/start-dfs.sh
```

## Start YARN

```
./sbin/start-yarn.sh
```

## Test

```
bin/hdfs dfs -mkdir /user
bin/hdfs dfs -mkdir /user/root
bin/hdfs dfs -put /etc/passwd /user/root/
bin/hdfs dfs -ls /user/root/
```

## UI Test

1. http://localhost:9870
2. http://localhost:8088


```hadoop-2.7.3
1. localhost:50070
2. localhost:8088
```
