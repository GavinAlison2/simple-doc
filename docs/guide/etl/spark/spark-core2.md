# Spark Core

三大数据结构

- RDD: 弹性分布式数据集
- 累加器: 分布式共享只写变量
- 广播变量: 分布式共享只读变量

## RDD 持久化

1. RDD Cache 缓存

​ RDD 通过 Cache 或者 Persist 方法将前面的计算结果缓存，默认情况下会把数据以缓存在 JVM 的堆内存中。但是并不是这两个方法被调用时立即缓存，而是触发后面的 action 算子时，该 RDD 将会被缓存在计算节点的内存中，并供后面重用。

2. RDD CheckPoint 检查点

​ 所谓的检查点其实就是通过将 RDD 中间结果写入磁盘,由于血缘依赖过长会造成容错成本过高，这样就不如在中间阶段做检查点容错，如果检查点之后有节点出现问题，可以从检查点开始重做血缘，减少了开销。对 RDD 进行 checkpoint 操作并不会马上被执行，必须执行 Action 操作才能触发。

```scala
// 设置检查点路径
sc.setCheckpointDir("./checkpoint1")
// 创建一个 RDD，读取指定位置文件:hello atguigu atguigu
val lineRdd: RDD[String] = sc.textFile("input/1.txt")
//业务逻辑
val wordRdd: RDD[String] = lineRdd.flatMap(line => line.split(" "))
val wordToOneRdd: RDD[(String, Long)] = wordRdd.map {
    word => {
        (word, System.currentTimeMillis())
    } 
}
//增加缓存,避免再重新跑一个 job 做 checkpoint
wordToOneRdd.cache()
//数据检查点：针对 wordToOneRdd 做检查点计算
wordToOneRdd.checkpoint()
//触发执行逻辑
wordToOneRdd.collect().foreach(println)
```

1. 缓存和检查点区别

1）Cache 缓存只是将数据保存起来，不切断血缘依赖。Checkpoint 检查点切断血缘依赖。

2）Cache 缓存的数据通常存储在磁盘、内存等地方，可靠性低。Checkpoint 的数据通常存储在 HDFS 等容错、高可用的文件系统，可靠性高。

3）建议对 checkpoint()的 RDD 使用 Cache 缓存，这样 checkpoint 的 job 只需从 Cache 缓存中读取数据即可，否则需要再从头计算一次 RDD。

## RDD 分区器

 Spark 目前支持 Hash 分区和 Range 分区，和用户自定义分区。Hash 分区为当前的默认分区。分区器直接决定了 RDD 中分区的个数、RDD 中每条数据经过 Shuffle 后进入哪个分区，进而决定了 Reduce 的个数。

- 只有 Key-Value 类型的 RDD 才有分区器，非 Key-Value 类型的 RDD 分区的值是 None
- 每个 RDD 的分区 ID 范围：0 ~ (numPartitions - 1)，决定这个值是属于那个分区的。

1. Hash 分区：对于给定的 key，计算其 hashCode,并除以分区个数取余

2. Range 分区：将 key 映射到一个范围区间，然后将区间划分为分区数，每个分区包含一个区间。

## RDD 文件读取与保存

Spark 的数据读取及数据保存可以从两个维度来作区分：文件格式以及文件系统。

文件格式分为：text 文件、csv 文件、sequence 文件以及 Object 文件；

文件系统分为：本地文件系统、HDFS、HBASE 以及数据库。

- text 文件
- sequence 文件, ​ SequenceFile 文件是 Hadoop 用来存储二进制形式的 key-value 对而设计的一种平面文件(FlatFile)
- object 对象文件,  对象文件是将对象序列化后保存的文件，采用 Java 的序列化机制。可以通过 `objectFile[T: ClassTag](path)`函数接收一个路径，读取对象文件，返回对应的 RDD，也可以通过调用saveAsObjectFile()实现对对象文件的输出。因为是序列化所以要指定类型

```scala
// 读取输入文件
val inputRDD: RDD[String] = sc.textFile("input/1.txt")
// 保存数据
inputRDD.saveAsTextFile("output")

// 保存数据为 SequenceFile
dataRDD.saveAsSequenceFile("output")
// 读取 SequenceFile 文件
sc.sequenceFile[Int,Int]("output").collect().foreach(println)


// 保存数据
dataRDD.saveAsObjectFile("output")
// 读取数据
sc.objectFile[Int]("output").collect().foreach(println)

```

## 累加器

### 1. 实现原理

​ 累加器用来把 Executor 端变量信息聚合到 Driver 端。在 Driver 程序中定义的变量，在Executor 端的每个 Task 都会得到这个变量的一份新的副本，每个 task 更新这些副本的值后，传回 Driver 端进行 merge。

### 2. 基础编程

```scala
val rdd = sc.makeRDD(List(1,2,3,4,5))
//声明累加器
var sum = sc.longAccumulator("sum");
rdd.foreach( num => {
    // 使用累加器
    sum.add(num)
})
// 获取累加器的值
println("sum = " + sum.value)
```

```自定义累加器
// 自定义累加器
// 1. 继承 AccumulatorV2，并设定泛型
// 2. 重写累加器的抽象方法
class WordCountAccumulator extends AccumulatorV2[String, mutable.Map[String, Long]]{
    var map : mutable.Map[String, Long] = mutable.Map()
    // 累加器是否为初始状态
    override def isZero: Boolean = {
        map.isEmpty
    }
    // 复制累加器
    override def copy(): AccumulatorV2[String, mutable.Map[String, Long]] = {
        new WordCountAccumulator
    }
    // 重置累加器
    override def reset(): Unit = {
        map.clear()
    }
    // 向累加器中增加数据 (In)
    override def add(word: String): Unit = {
        // 查询 map 中是否存在相同的单词
        // 如果有相同的单词，那么单词的数量加 1
        // 如果没有相同的单词，那么在 map 中增加这个单词
        map(word) = map.getOrElse(word, 0L) + 1L
    } 
    // 合并累加器
    override def merge(other: AccumulatorV2[String, mutable.Map[String, Long]]): Unit = {
        val map1 = map
        val map2 = other.value
        // 两个 Map 的合并
        map = map1.foldLeft(map2)(
            ( innerMap, kv ) => {
                innerMap(kv._1) = innerMap.getOrElse(kv._1, 0L) + kv._2
                innerMap
            }) 
    }
    // 返回累加器的结果 （Out）
    override def value: mutable.Map[String, Long] = map
}
```

## 广播变量

### 1. 实现原理

​ 广播变量用来高效分发较大的对象。向所有工作节点发送一个较大的只读值，以供一个或多个 Spark 操作使用。比如，如果你的应用需要向所有节点发送一个较大的只读查询表，广播变量用起来都很顺手。在多个并行操作中使用同一个变量，但是 Spark 会为每个任务分别发送。

### 2. 基础编程

```scala
val rdd1 = sc.makeRDD(List( ("a",1), ("b", 2), ("c", 3), ("d", 4) ),4)
val list = List( ("a",4), ("b", 5), ("c", 6), ("d", 7) )
// 声明广播变量
val broadcast: Broadcast[List[(String, Int)]] = sc.broadcast(list)
val resultRDD: RDD[(String, (Int, Int))] = rdd1.map {
    case (key, num) => {
        var num2 = 0
        // 使用广播变量
        for ((k, v) <- broadcast.value) {
            if (k == key) {
                num2 = v
            }
        }
        (key, (num, num2))
    } 
}
resultRDD.collect().foreach(println)
```
