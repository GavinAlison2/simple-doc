# Spark Shell Quick Start

## 启动 Local Spark Shell

```bash
tar -zxvf spark-3.5.1-bin-hadoop3.2.tgz -C /opt/
cd /opt/spark-3.5.1-bin-hadoop3.2
./bin/spark-shell
```

启动成功之后可以查看 Web UI 的监控页面

http://localhost:4040/

## 启动 Remote Spark Shell  

```bash
./bin/spark-shell --master spark://<master-ip>:7077
```

## 执行

data/word.txt 文件内容如下：

```txt
hello world
scala spark
hadoop mapreduce
```

```scala
scala> sc.textFile("data/word.txt").flatMap(_.split("")).map((_,1)).reduceByKey(_+_).collect
```

输出结果：

```
(hello,1)
(world,1)
(scala,1)
(spark,1)
(hadoop,1)
(mapreduce,1)
```

查看 Web UI 的监控页面可以看到任务执行情况。
https://localhost:4040/

## 停止 Spark Shell

```scala
:quit
```
