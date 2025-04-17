# Spark Standalone Installation

独立部署（Standalone）模式。Spark 的 Standalone 模式体现了经典的 master-slave 模式。
master node: 负责调度
worker node: 负责执行任务

集群规划:

- linux1, worker1, master
- linux2, worker2
- linux3, worker3

## 准备工作

- 安装JDK
- 安装Spark
- 配置环境变量

```
vi /etc/hosts

192.168.1.101 linux1
192.168.1.102 linux2
192.168.1.103 linux3

```

```
cd /opt
wget https://archive.apache.org/dist/spark/spark-3.4.1/spark-3.4.1-bin-hadoop3.tgz
tar -zxvf spark-3.4.1-bin-hadoop3.tgz 
mv spark-3.4.1-bin-hadoop3 spark
cp spark-env.sh.template spark-env.sh 
vi spark-env.sh

export JAVA_HOME=/opt/module/jdk1.8.0_144
export SPARK_MASTER_HOST=linux1
export SPARK_MASTER_PORT=7077

cp workers.template workers
vi workers

linux1
linux2
linux3

#分发到其他linux节点
scp -r /opt/spark linux2:/opt/
scp -r /opt/spark linux3:/opt/
```

## 启动Spark

```
cd /opt/spark
sbin/start-all.sh
```

## 验证Spark

```
jps

================linux1================
3330 Jps
3238 Worker
3163 Master

================linux2================
2966 Jps
2908 Worker

================linux3================
2978 Worker
3036 Jps
```

查看 Master 资源监控 Web UI 界面: http://linux1:8080

如果看到spark-master, spark-worker, spark-submit等进程，说明启动成功。

## 提交应用

```
cd /opt/spark
./bin/spark-submit 
--class org.apache.spark.examples.SparkPi 
--master spark://linux1:7077 
/opt/spark/examples/jars/spark-examples_2.12-3.4.1.jar 
10
```

## 停止Spark

```
sbin/stop-all.sh
```
