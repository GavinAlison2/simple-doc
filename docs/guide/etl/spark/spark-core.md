# Spark Core

三大数据结构

- RDD: 弹性分布式数据集
- 累加器: 分布式共享只写变量
- 广播变量: 分布式共享只读变量

## RDD

​ RDD（Resilient Distributed Dataset）叫做弹性分布式数据集，是 Spark 中最基本的数据处理模型。代码中是一个抽象类，它代表一个弹性的、不可变、可分区、里面的元素可并行计算的集合。

弹性

- 存储的弹性：内存与磁盘的自动切换；
- 容错的弹性：数据丢失可以自动恢复；
- 计算的弹性：计算出错重试机制；
- 分片的弹性：可根据需要重新分片。

- 分布式：数据存储在大数据集群不同节点上
- 数据集：RDD 封装了计算逻辑，并不保存数据
- 数据抽象：RDD 是一个抽象类，需要子类具体实现
- 不可变：RDD 封装了计算逻辑，是不可以改变的，想要改变，只能产生新的 RDD，在新的 RDD 里面封装计算逻辑
- 可分区、并行计算

### 执行原理

​ 从计算的角度来讲，数据处理过程中需要计算资源（内存 & CPU）和计算模型（逻辑）。执行时，需要将计算资源和计算模型进行协调和整合。Spark 框架在执行时，先申请资源，然后将应用程序的数据处理逻辑分解成一个一个的计算任务。然后将任务发到已经分配资源的计算节点上, 按照指定的计算模型进行数据计算。最后得到计算结果。

RDD 是 Spark 框架中用于数据处理的核心模型，接下来我们看看，在 Yarn 环境中，RDD的工作原理:
1. 启动 Yarn 集群环境
2. Spark 通过申请资源创建调度节点和计算节点
3. Spark 框架根据需求将计算逻辑根据分区划分成不同的任务
4. 调度节点将任务根据计算节点状态发送到对应的计算节点进行计算

从以上流程可以看出 RDD 在整个流程中主要用于将逻辑进行封装，并生成 Task 发送给Executor 节点执行计算，接下来我们就一起看看 Spark 框架中 RDD 是具体是如何进行数据处理的。

### 基础编程

1. 创建 RDD

从集合（内存）中创建 RDD

```scala
val sparkConf = new SparkConf().setMaster("local[]").setAppName("spark")
val sparkContext = new SparkContext(sparkConf)
val rdd1 = sparkContext.parallelize( List(1,2,3,4))
val rdd2 = sparkContext.makeRDD( List(1,2,3,4))
rdd1.collect().foreach(println)
rdd2.collect().foreach(println)
sparkContext.stop() 
```
从底层代码实现来讲，makeRDD 方法其实就是 parallelize 方法
```scala
def makeRDD[T: ClassTag]( seq: Seq[T], numSlices: Int = defaultParallelism): RDD[T] = withScope {
    parallelize(seq, numSlices)
}
```
2. 从外部存储（文件）创建 RDD
由外部存储系统的数据集创建 RDD 包括：本地的文件系统，所有 Hadoop 支持的数据集，比如 HDFS、HBase 等。

```scala
val sparkConf = new SparkConf().setMaster("local[]").setAppName("spark")
val sparkContext = new SparkContext(sparkConf)
val rdd = sparkContext.textFile("file:///path/to/file")
rdd.collect().foreach(println)
sparkContext.stop() 
```
3. 从其他 RDD 创建
主要是通过一个 RDD 运算完后，再产生新的 RDD。详情请参考后续章节
4. 直接创建 RDD（new）
使用 new 的方式直接构造 RDD，一般由 Spark 框架自身使用。

### RDD 并行度与分区

 默认情况下，Spark 可以将一个作业切分多个任务后，发送给 Executor 节点并行计算，而能够并行计算的任务数量我们称之为并行度。这个数量可以在构建 RDD 时指定。记住，这里的并行执行的任务数量，并不是指的切分任务的数量，不要混淆了。

 ```scala
 val sparkConf = new SparkConf().setMaster("local[]").setAppName("spark")
val sparkContext = new SparkContext(sparkConf)
val dataRDD: RDD[Int] = sparkContext.makeRDD( List(1,2,3,4), 4)
val fileRDD: RDD[String] = sparkContext.textFile( "input", 2)
fileRDD.collect().foreach(println)
sparkContext.stop()
```

读取内存数据时，数据可以按照并行度的设定进行数据的分区操作，数据分区规则的
Spark 核心源码如下：
```scala
def positions(length: Long, numSlices: Int): Iterator[(Int, Int)] = {
    (0 until numSlices).iterator.map { i =>
        val start = ((i  length) / numSlices).toInt
        val end = (((i + 1)  length) / numSlices).toInt
        (start, end)
    } 
}
```

读取文件数据时，数据是按照 Hadoop 文件读取的规则进行切片分区，而切片规则和数据读取的规则有些差异，具体 Spark 核心源码如下
```scala
public InputSplit[] getSplits(JobConf job, int numSplits) throws IOException {
    long totalSize = 0; // compute total size
    for (FileStatus file: files) { // check we have valid files
        if (file.isDirectory()) {
            throw new IOException("Not a file: "+ file.getPath());
        }
        totalSize += file.getLen();
    }
    long goalSize = totalSize / (numSplits == 0 ? 1 : numSplits);
    long minSize = Math.max(job.getLong(org.apache.hadoop.mapreduce.lib.input. FileInputFormat.SPLIT_MINSIZE, 1), minSplitSize);
...
    for (FileStatus file: files) {
        ...
        if (isSplitable(fs, path)) {
            long blockSize = file.getBlockSize();
            long splitSize = computeSplitSize(goalSize, minSize, blockSize);
            ...
        }
        protected long computeSplitSize(long goalSize, long minSize,long blockSize) {
            return Math.max(minSize, Math.min(goalSize, blockSize));
        }
```

### RDD 转换算子

RDD 根据数据处理方式的不同将算子整体上分为 Value 类型、双 Value 类型和 Key-Value类型

1. Value 类型
- map：对每个元素进行转换操作，返回一个新的元素
- flatMap：对每个元素进行转换操作，返回多个元素


### RDD 序列化

1. 闭包检查

​ 从计算的角度, 算子以外的代码都是在 Driver 端执行, 算子里面的代码都是在 Executor端执行。那么在 scala 的函数式编程中，就会导致算子内经常会用到算子外的数据，这样就形成了闭包的效果，如果使用的算子外的数据无法序列化，就意味着无法传值给Executor端执行，就会发生错误，所以需要在执行任务计算前，检测闭包内的对象是否可以进行序列化，这个操作我们称之为闭包检测。Scala2.12 版本后闭包编译方式发生了改变

2. 序列化方法和属性

从计算的角度, 算子以外的代码都是在 Driver 端执行, 算子里面的代码都是在 Executor端执行，看如下代码:

```scala
object serializable02_function {
    def main(args: Array[String]): Unit = {
        //1.创建 SparkConf 并设置 App 名称
        val conf: SparkConf = new SparkConf().setAppName("SparkCoreTest").setMaster("local[]")
        //2.创建 SparkContext，该对象是提交 Spark App 的入口
        val sc: SparkContext = new SparkContext(conf)
        //3.创建一个 RDD
        val rdd: RDD[String] = sc.makeRDD(Array("hello world", "hello spark", "hive", "atguigu"))
        //3.1 创建一个 Search 对象
        val search = new Search("hello")
        //3.2 函数传递，打印：ERROR Task not serializable
        search.getMatch1(rdd).collect().foreach(println)
        //3.3 属性传递，打印：ERROR Task not serializable
        search.getMatch2(rdd).collect().foreach(println)
        //4.关闭连接
        sc.stop()
    } 
}

class Search(query:String) extends Serializable {
    def isMatch(s: String): Boolean = {
        s.contains(query)
    }
    // 函数序列化案例
    def getMatch1 (rdd: RDD[String]): RDD[String] = {
        //rdd.filter(this.isMatch)
        rdd.filter(isMatch)
    } 
    // 属性序列化案例
    def getMatch2(rdd: RDD[String]): RDD[String] = {
        //rdd.filter(x => x.contains(this.query))
        rdd.filter(x => x.contains(query))
        //val q = query
        //rdd.filter(x => x.contains(q))
    } 
}
```

3. Kryo 序列化框架

参考地址: https://github.com/EsotericSoftware/kryo

​ Java 的序列化能够序列化任何的类。但是比较重（字节多），序列化后，对象的提交也比较大。Spark 出于性能的考虑，Spark2.0 开始支持另外一种 Kryo 序列化机制。Kryo 速度是 Serializable 的 10 倍。当 RDD 在 Shuffle 数据的时候，简单数据类型、数组和字符串类型已经在 Spark 内部使用 Kryo 来序列化。

注意：即使使用 Kryo 序列化，也要继承 Serializable 接口。
```scala
object serializable_Kryo {
    def main(args: Array[String]): Unit = {
        val conf: SparkConf = new SparkConf().setAppName("SerDemo").setMaster("local[]")
        // 替换默认的序列化机制
        .set("spark.serializer", "org.apache.spark.serializer.KryoSerializer")
        // 注册需要使用 kryo 序列化的自定义类
        .registerKryoClasses(Array(classOf[Searcher]))
        val sc = new SparkContext(conf)
        val rdd: RDD[String] = sc.makeRDD(Array("hello world", "hello atguigu", "atguigu", "hahah"), 2)
        val searcher = new Searcher("hello")
        val result: RDD[String] = searcher.getMatchedRDD1(rdd)
        result.collect.foreach(println)
    } 
}

case class Searcher(val query: String) {
    def isMatch(s: String) = {
        s.contains(query)
    }
    def getMatchedRDD1(rdd: RDD[String]) = {
        rdd.filter(isMatch) 
    }
    def getMatchedRDD2(rdd: RDD[String]) = {
        val q = query
        rdd.filter(_.contains(q))
    } 
} 
```

### RDD 依赖关系

1. RDD 血缘关系

RDD 只支持粗粒度转换，即在大量记录上执行的单个操作。将创建 RDD 的一系列 Lineage（血统）记录下来，以便恢复丢失的分区。RDD 的 Lineage 会记录 RDD 的元数据信息和转换行为，当该 RDD 的部分分区数据丢失时，它可以根据这些信息来重新运算和恢复丢失的数据分区。

```scala
val fileRDD: RDD[String] = sc.textFile("input/1.txt")
println(fileRDD.toDebugString)
println("----------------------")
val wordRDD: RDD[String] = fileRDD.flatMap(_.split(" "))
println(wordRDD.toDebugString)
println("----------------------")
val mapRDD: RDD[(String, Int)] = wordRDD.map((_,1))
println(mapRDD.toDebugString)
println("----------------------")
val resultRDD: RDD[(String, Int)] = mapRDD.reduceByKey(_+_)
println(resultRDD.toDebugString)
resultRDD.collect()
```

2. RDD 依赖关系

这里所谓的依赖关系，其实就是两个相邻 RDD 之间的关系

```scala
val sc: SparkContext = new SparkContext(conf)
val fileRDD: RDD[String] = sc.textFile("input/1.txt")
println(fileRDD.dependencies)
println("----------------------")

val wordRDD: RDD[String] = fileRDD.flatMap(_.split(" "))
println(wordRDD.dependencies)
println("----------------------")

val mapRDD: RDD[(String, Int)] = wordRDD.map((_,1))
println(mapRDD.dependencies)
println("----------------------")

val resultRDD: RDD[(String, Int)] = mapRDD.reduceByKey(_+_)
println(resultRDD.dependencies)
resultRDD.collect()
```

3. RDD 窄依赖

窄依赖表示每一个父(上游)RDD 的 Partition 最多被子（下游）RDD 的一个 Partition 使用，窄依赖我们形象的比喻为独生子女。

`class OneToOneDependency[T](rdd: RDD[T]) extends NarrowDependency[T](rdd)`

4. RDD 宽依赖

宽依赖表示同一个父（上游）RDD 的 Partition 被多个子（下游）RDD 的 Partition 依赖，会引起 Shuffle，总结：宽依赖我们形象的比喻为多生。

```scala
class ShuffleDependency[K: ClassTag, V: ClassTag, C: ClassTag](
    @transient private val _rdd: RDD[_ <: Product2[K, V]],
    val partitioner: Partitioner,
    val serializer: Serializer = SparkEnv.get.serializer,
    val keyOrdering: Option[Ordering[K]] = None,
    val aggregator: Option[Aggregator[K, V, C]] = None,
    val mapSideCombine: Boolean = false)
extends Dependency[Product2[K, V]] 
```

5. RDD 阶段划分

DAG（Directed Acyclic Graph）有向无环图是由点和线组成的拓扑图形，该图形具有方向，不会闭环。例如，DAG 记录了 RDD 的转换过程和任务的阶段。

6. RDD 阶段划分源码

```scala
try {
    // New stage creation may throw an exception if, for example, jobs are run on a
    // HadoopRDD whose underlying HDFS files have been deleted.
    finalStage = createResultStage(finalRDD, func, partitions, jobId, callSite)
} catch {
    case e: Exception =>
    logWarning("Creating new stage failed due to exception - job: " + jobId, e)
    listener.jobFailed(e)
    return
}
……
private def createResultStage(
    rdd: RDD[_],
    func: (TaskContext, Iterator[_]) => _,
    partitions: Array[Int],
    jobId: Int,callSite: CallSite): ResultStage = {
    val parents = getOrCreateParentStages(rdd, jobId)
    val id = nextStageId.getAndIncrement()
    val stage = new ResultStage(id, rdd, func, partitions, parents, jobId, callSite)
    stageIdToStage(id) = stage
    updateJobIdStageIdMaps(jobId, stage)
    stage
} 
……
private def getOrCreateParentStages(rdd: RDD[_], firstJobId: Int): List[Stage] = {
    getShuffleDependencies(rdd).map { shuffleDep =>
        getOrCreateShuffleMapStage(shuffleDep, firstJobId)
    }.toList
}
……
private[scheduler] def getShuffleDependencies(rdd: RDD[_]): HashSet[ShuffleDependency[_, _, _]] = {
    val parents = new HashSet[ShuffleDependency[_, _, _]]
    val visited = new HashSet[RDD[_]]
    val waitingForVisit = new Stack[RDD[_]]
    waitingForVisit.push(rdd)
    while (waitingForVisit.nonEmpty) {
        val toVisit = waitingForVisit.pop()
        if (!visited(toVisit)) {
            visited += toVisit
            toVisit.dependencies.foreach {
                case shuffleDep: ShuffleDependency[_, _, _] => parents += shuffleDep
                case dependency => waitingForVisit.push(dependency.rdd)
            }
        } 
    }
    parents
}
```

7. RDD 任务划分

RDD 任务切分中间分为：Application、Job、Stage 和 Task

⚫ Application：初始化一个 SparkContext 即生成一个 Application；

⚫ Job：一个 Action 算子就会生成一个 Job；

⚫ Stage：Stage 等于宽依赖(ShuffleDependency)的个数加 1；

⚫ Task：一个 Stage 阶段中，最后一个 RDD 的分区个数就是 Task 的个数。

注意：Application->Job->Stage->Task 每一层都是 1 对 n 的关系。

8. RDD 任务划分源码

```scala
val tasks: Seq[Task[_]] = try {
    stage match {
        case stage: ShuffleMapStage =>
        partitionsToCompute.map { id =>
            val locs = taskIdToLocations(id)
            val part = stage.rdd.partitions(id)
            new ShuffleMapTask(stage.id, stage.latestInfo.attemptId, taskBinary, part, locs, stage.latestInfo.taskMetrics, properties, Option(jobId), Option(sc.applicationId), sc.applicationAttemptId)
        }
        case stage: ResultStage =>
        partitionsToCompute.map { id =>
            val p: Int = stage.partitions(id)
            val part = stage.rdd.partitions(p)
            val locs = taskIdToLocations(id)
            new ResultTask(stage.id, stage.latestInfo.attemptId,taskBinary, part, locs, id, properties, stage.latestInfo.taskMetrics,Option(jobId), Option(sc.applicationId),sc.applicationAttemptId)
        }
    }

……

val partitionsToCompute: Seq[Int] = stage.findMissingPartitions()

……

override def findMissingPartitions(): Seq[Int] = {
    mapOutputTrackerMaster
    .findMissingPartitions(shuffleDep.shuffleId)
    .getOrElse(0 until numPartitions) 
} 
```


## spark dag中job 为什么会分stage,

在 Spark DAG（有向无环图）中，Job 被划分为 Stage 的主要原因是 基于数据依赖关系的划分，特别是 宽依赖（Shuffle Dependency）和窄依赖（Narrow Dependency） 的区别。这种划分是为了优化任务调度和执行效率。以下是详细解释：

### 1. Stage 划分的核心依据：宽依赖（Shuffle Dependency）

Spark 的 DAG Scheduler 会将 Job 拆分成多个 Stage，关键分界线是宽依赖（Shuffle Dependency）：

- 窄依赖（Narrow Dependency）：
  - 一个分区的数据最多被一个子分区依赖（如 map、filter）。
  - 这类操作可以流水线化执行（无需等待其他任务完成）。
- 宽依赖（Shuffle Dependency）：
  - 一个分区的数据可能被多个子分区依赖（如 groupByKey、reduceByKey）。
  - 需要跨节点数据混洗（Shuffle），必须等前一个 Stage 的所有任务完成后才能开始下一个 Stage。

### 为什么遇到宽依赖就要分 Stage？

因为 Shuffle 是分布式计算的“同步点”，必须等待所有上游任务完成数据输出后，下游任务才能读取数据。

### Stage 的类型
一个 Job 通常分为两种 Stage：

- ShuffleMapStage：宽依赖的 Stage，需要执行 Shuffle 操作。
- ResultStage：窄依赖的 Stage，不需要执行 Shuffle 操作。

. 具体划分过程
步骤 1：从最终的 RDD 反向回溯，遇到宽依赖就划分一个新的 Stage。

步骤 2：窄依赖的操作会被合并到同一个 Stage 中（形成流水线执行）。

例子：

```python
rdd = sc.textFile("data.txt")  
  .flatMap(lambda line: line.split(" "))  # 窄依赖 → 同 Stage  
  .map(lambda word: (word, 1))           # 窄依赖 → 同 Stage  
  .reduceByKey(lambda a, b: a + b)       # 宽依赖 → 新 Stage  
  .collect()                             # ResultStage
```
- Stage 0：textFile → flatMap → map（窄依赖连续执行）。
- Stage 1：reduceByKey（需要 Shuffle）。
- Stage 2：collect()（最终结果）。

###  为什么这样设计

- 并行优化：
同一 Stage 内的窄依赖任务可以并行执行（无需等待）。
- 容错效率：
Stage 失败时只需重算该 Stage 及其下游 Stage（而非整个 Job）。
- 资源调度：
Shuffle 是资源密集型操作，明确 Stage 边界有助于合理分配资源。


关键点,说明
- Stage 划分依据,遇到宽依赖（Shuffle）时切分 Stage。
- 窄依赖,	合并到同一 Stage，流水线执行。
- 宽依赖,	强制分 Stage，需等待 Shuffle 完成。
- 优化目标,	减少 Shuffle 开销，提高并行度和容错效率。

