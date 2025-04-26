# HDFS 

> hadoop 永远都是这些东西在这里，那就收集一下吧。
> 1. 存储， hdfs
> 2. 分布式计算，mapreduce
> 3. 调度  yarn
> 4. 读写流程


> 问题：hdfs读写原理，读写流程，hdfs原理，hdfs读写机制，介绍一下hdfs存数据原理，hdfs的put和get流程

## 目录

- Hadoop quick start 
- hadoop 的特点 
- hadoop 生态圈组件及其作用 
- Hadoop 1.x，2x，3.x 的区别 
- Hadoop 集群工作时启动哪些进程,它们有什么作用 
- 在集群计算的时候，什么是集群的主要瓶颈 
- 搭建Hadoop 集群的 xml 文件有哪些 
- Hadoop 的 checkpoint 流程   
- Hadoop 的默认块大小是多少?为什么要设置这么大
- Block 划分的原因
- Hadoop 常见的压缩算法
- Hadoop 作业提交到 YARN 的流程
- Hadoop 的 Combiner 的作用
- Hadoop 序列化和反序列化
- Hadoop 的运行模式
- Hadoop 小文件处理问题
- Hadoop 为什么要从2.x升级到3.x
- HDFS 写流程
- HDFS 读流程

## 1.1   Hadoop quick start 

- 下载安装包，解压，配置环境变量
- 配置core-site.xml，hdfs-site.xml，mapred-site.xml
- 启动NameNode和DataNode
- 启动YARN
- 运行MapReduce程序

- 通过命令行操作hdfs，如mkdir，put，get，ls，rm等命令

## 1.2 Hadoop的特点

- 高可靠性
- 高效性
- 高可扩展性
- 高容错性
- 低成本

## 1.3 Hadoop生态圈组件及其作用

```
1. HDFS (分布式文件系统）
2. 资源管理器（YARN 和 mesos）
3. mapreduce（分布式计算框架）
4. flume（日志收集工具）
5. hive（基于hadoop的数据仓库）
6. hbase（分布式列存数据库）
7. zookeeper（分布式协作服务）
8. sqoop（数据同步工具）
9. pig（基于hadoop的数据流系统）
10. mahout（数据挖掘算法库）
```

## 1.4 Hadoop 1.x，2x，3.x 的区别

Hadoop1.x : MR 处理业务逻辑运算 和 资源的调度，耦合性较大。
Hadoop2.x : 增加了Yarn。Yarn负责资源的调度，MR负责运算。
Hadoop3.x : 在组成上没有变化。

```
Hadoop 1.x：
它的架构主要由 HDFS（Hadoop Distributed File System）和 MapReduce 组成。
其中，HDFS 负责存储数据，而 MapReduce 承担数据处理的任务。
NameNode 在 HDFS 里是单点存在的，一旦出现故障，整个集群就无法正常使用。
在 MapReduce 方面，JobTracker 也是单点的，同样存在单点故障问题，并且它既要负责资源管理，又要负责作业调度，负载较重。

Hadoop 2.x：
引入了 YARN（Yet Another Resource Negotiator）这一全新的资源管理系统，把资源管理和作业调度的功能分离开来。
YARN 包含 ResourceManager（负责全局资源管理）和 NodeManager（负责节点上的资源管理）。
在 HDFS 方面，支持了 NameNode 的高可用（HA），通过多个 NameNode 实现了热备，避免了单点故障。

Hadoop 3.x：
进一步强化了 HDFS 的高可用性和性能。
引入了多 NameNode 联邦机制，能够让多个 NameNode 同时工作，提升了集群的扩展性。
在 YARN 方面，也有性能上的优化，比如支持更细粒度的资源分配。

```

| 对比维度	| Hadoop 2.x	 | Hadoop 3.x | 
| -- | -- | -- |
| 存储策略	| 默认多副本策略，通常一个数据块有 3 个副本，存储成本高	| 引入纠删码技术，在保证数据可靠性的同时，可大幅降低存储成本，提升存储效率 | 
NameNode 架构	| 通过主备两个 NameNode 实现高可用，单一 NameNode 在高并发时可能成为性能瓶颈	| 支持多 NameNode 联邦机制，多个 NameNode 同时工作，分散元数据管理压力，提升扩展性和性能
YARN 资源分配	| 资源分配粒度较粗，动态调整能力有限	| 支持更细粒度的资源分配，能根据不同任务精确分配资源，提高集群资源利用率
容器内存管理	| 内存管理不够灵活，易出现资源浪费或不足的情况	| 引入弹性管理，容器可根据实际负载动态调整内存使用，提高资源利用率
性能表现	| 在大规模数据处理和高并发场景下性能有一定限制	| 通过多方面优化，整体性能显著提升，能更快处理大规模数据
Java 版本支持	| 支持相对较旧的 Java 版本	| 支持更高版本的 Java，增强与新 Java 特性的兼容性及与其他组件的集成能力
集群伸缩性	| 集群伸缩性较差，节点添加和移除过程复杂	| 支持弹性伸缩，可根据负载动态调整集群规模，节点添加和移除更自动化、便捷
安全特性	| 具备基本的安全机制，如 Kerberos 认证等	| 进一步加强安全特性，提供更细粒度的访问控制和数据加密，更好地保护数据安全和隐私

```
纠删码

hadoop 1.x 采用多副本策略，一个数据块有 3 个副本，4个数据块有12个存储块。
而 Hadoop 2.x 引入纠删码技术，4个数据块 + 2个校验块，共有6个存储块。
校验块是一定算法计算出来的，可以校验数据块是否损坏。
比如，P1=D1+D2+D3+D4, P2=D1 * 1 +  D2 * 2 + D3 * 3 + D4 * 4.
存储减少50%.
```

## 1.5 Hadoop集群工作时启动哪些进程,它们有什么作用

```

hdfs:

1）NameNode-NN 主服务器，管理 名称空间(目录结构) 和对 文件访问，保存 数据块位置。 
2）SecondaryNameNode,2NN 合并元数据(EditLog和fsimage)，减少重启时间,减少 NameNode 在重启时合并 EditLog 和 FsImage 的时间，加快系统的恢复速度。
3）DataNode-DN 守护进程，负责数据块存储到节点中，心跳汇报健康状况。

yarn:

1）ResourceManager 资源管理，调度管理.
JobTracker 负责调度 DataNode 上的工作.
TaskTracker 执行实际工作.

2）NodeManager 运行在集群的每个节点上，负责管理该节点上的资源和容器.
TaskTracker 执行任务。

3) ApplicationMaster 负责向 ResourceManager 申请资源，并向 NodeManager 申请容器，分配任务。

MapReduce:

1）JobHistoryServer 记录 MapReduce 作业的历史信息.
记录作业信息：存储作业的运行时间、资源使用情况、任务执行状态等详细信息。
提供查询服务：用户可以通过 Web 界面访问 JobHistoryServer，查看作业的历史记录和统计信息，方便进行作业的监控和分析。

2）DFSZKFailoverController 高可用时它负责监控NN的状态，并及时的把状态信息写入ZK。它通过一个独立线程周期性的调用 NN 上的一个特定接口来获取 NN 的健康状态。
FC也有选择谁作为 Active NN的权利，因为最多只有两个节点，目前选择策略还比较简单（先到先得，轮换）。
3）JournalNode 高可用情况下存放 namenode 的 editlog 文件.

```

```
2NN 为什么存在？ editlog 和 fsimage 合并的目的是什么？

NameNode 是一个中心服务器，负责管理文件系统的名称空间和数据块位置。当 NameNode 出现故障时，整个集群无法正常工作。为了避免这种情况的发生，Hadoop 引入了 SecondaryNameNode，它是一个辅助服务器，负责合并元数据。SecondaryNameNode 定期从 NameNode 接收 editlog 和 fsimage 文件，并将它们合并成一个新的 fsimage 文件，然后将合并后的文件发送给 NameNode。这样，NameNode 就可以恢复到最新的状态。

editlog (编辑日志) 是 NameNode 用于记录所有对文件系统的修改操作的日志文件。当 NameNode 出现故障时，editlog 文件可以用于恢复 NameNode 的状态，从而保证系统的高可用。editlog 文件的合并，可以减少 NameNode 在重启时合并 editlog 和 fsimage 的时间，加快系统的恢复速度。

fsimage (数据快照，系统镜像) 是 NameNode 用于记录文件系统的当前状态的镜像文件，某一时刻的元数据快照。当 NameNode 出现故障时，fsimage 文件可以用于恢复 NameNode 的状态，从而保证系统的高可用。fsimage 文件的合并，可以减少 NameNode 在重启时加载 fsimage 的时间，加快系统的恢复速度。


fsimage 什么时候生产？

1. NameNode 启动时： 会将当前文件系统的状态写入 fsimage 文件。也会从磁盘加载最新的 fsimage 文件，并将其合并到内存中。
2. 定期保存： SecondaryNameNode 定期地从 NameNode 获取编辑日志（editlog）和 fsimage，将其合并并生成一个新的 fsimage 文件，然后将该文件保存到 NameNode 的存储位置。
3. 手动触发： Hadoop 管理员也可以手动触发 fsimage 的保存过程，但这种情况较少见，通常依赖于自动化的机制。

注意： fsimage 的保存是一个相对耗时的操作，因此通常在系统负载较低的时候进行，以避免对系统的性能产生过大影响。

2nn 为什么会合并 editlog 和 fsimage -》 fsimage? 
合并的目的是为了减少 NameNode 在重启时加载 fsimage 的时间，加快系统的恢复速度.
减少 NameNode 在重启时需要处理的 editlog 数量，从而加快 NameNode 的恢复速度.

这个定期合并，是参数 dfs.namenode.checkpoint.period 默认为 3600s，即每隔 1 小时合并一次.
不过，实际的检查点间隔可以根据集群的负载和元数据的变化频率进行调整.

fsimage 多大？ 跟文件系统的元数据的数量有关，元数据包括文件和目录的层次结构、文件属性（如权限、所有者、时间戳等）、数据块的位置信息等.

editlog 存在哪里？什么时候产生？多大？

editlog 记录了对文件系统的修改操作，包括文件创建、删除、重命名、修改等操作。editlog 文件会定期写入磁盘，并定期合并到 fsimage 文件中，以保证系统的高可用性。
editlog 文件存储在 NameNode 的本地文件系统中.
在高可用配置中，editlog 文件也会被复制到 JournalNodes 中，以确保即使 NameNode 出现故障，这些日志也能被保存下来，从而保障系统的高可用性。SecondaryNameNode 会定期从 JournalNodes 或 NameNode 获取这些 editlog 文件，并与 fsimage 文件合并以生成新的 fsimage 文件。

editlog 文件的大小有多大？

editlog 文件的大小取决于 NameNode 的配置参数 dfs.namenode.edits.dir 和 dfs.namenode.edit.log.roll.size，默认情况下，editlog 文件的大小为 128MB。

editlog 文件的数量有多大？
editlog 文件的大小取决于文件系统的操作数量和频率，但一般不会超过磁盘的容量。

editlog 文件数量多的原因主要有以下几点：

操作频率高：如果系统中文件的创建、删除、修改等操作频繁，就会生成更多的 editlog 文件。
定期检查点：SecondaryNameNode 定期会从 NameNode 获取 editlog 和 fsimage 文件，合并成一个新的 fsimage 文件后，原来的 editlog 文件会被清空或归档，但可能由于系统配置或操作频率的原因，editlog 文件仍然会累积。
未合并的 editlog：在某些情况下，SecondaryNameNode 可能未能及时完成合并操作，导致多个未合并的 editlog 文件累积。

```
## 1.6 在集群计算的时候，什么是集群的主要瓶颈

```
磁盘IO
HDFS 中数据块的读写依赖于节点间的网络通信，大量的读写导致数据处理变慢，还有节点间的通信，会导致数据传输延迟

CPU 瓶颈
若运行大量计算密集型任务，像复杂的机器学习算法训练, 任务处理速度明显变慢，新提交的任务长时间处于等待执行状态

内存瓶颈
将大量数据加载到内存中进行处理，以提高数据访问速度。若内存不足，数据会频繁在内存和磁盘之间交换，产生大量的 I/O 开销

网络带宽瓶颈
各节点之间需要频繁进行数据传输，如 MapReduce 作业中，Mapper 任务的输出需要传输给 Reducer 任务进行处理, 数据传输延迟高，任务执行过程中网络 I/O 等待时间长

数据倾斜瓶颈
数据在集群中的分布不均匀，某些节点上的数据量远大于其他节点，导致处理这些数据的节点成为瓶颈.
部分节点任务执行时间长，整体作业完成时间取决于处理数据量大的节点
```

## 1.7 搭建Hadoop 集群的 xml 文件有哪些 

```
core-site.xml      核心配置文件，主要定义文件访问 hdfs://
hadoop-env.sh      主要配java路径
hdfs-site.xml      hdfs的相关配置
mapred-site.xml    MR相关配置
slaves             从节点
yarm-site.xml      资源调度
```

## 1.8 Hadoop 的 checkpoint 流程

```
1. 请求主节点Namenode 停⽌使⽤ editlog⽂件，将新的写操作记录到新⽂件 edits.new。
2. 从主节点获取 fsimage 和 editlog ⽂件（采⽤HTTP GET）
3. 将 fsimage 载⼊内存，执⾏ edits 的操作，创建新 fsimage，并发回主节点（使⽤HTTP POST）
4. 主节点将换旧的 fsimage ，⽤ edits.new 替换 edits⽂件。更新 fstime ⽂件 记录检查点执⾏的时间。
```
## 1.9 Hadoop 的默认块大小是多少?为什么要设置这么大

```
Hadoop 1 默认大小 64M
Hadoop 2 之后默认大小 128M 
为了最小化寻址开销, 
寻址占寻址和传输的时间比重会变小
加快数据处理，数据小任务多，导致任务调度管理上的开销

dfs.blocksize

```
## 1.10 Block 划分的原因

```
文件是分布式储存的，被分成块分别储存在不同的机器上。
而多个副本，是为了安全的考虑。
```

## 1.11 Hadoop常见的压缩算法?

```
gzip, lzo, snappy, bzip2
```

## 1.12 Hadoop作业提交到YARN的流程?

```
（1）作业提交
Client 调用 job.waitForCompletion 方法，向整个集群提交 MapReduce 作业， 向 ResourceManager 申请一个作业 id。
RM 给 Client 返回该 job 资源的提交路径和作业 id。
Client 提交 jar 包、切片信息和配置文件到指定的资源提交路径，向 RM 申请运行 AppMaster。

（2）作业初始化
当 RM 收到请求后，AppManager 将该 job 添加到容量调度器 Scheduler 中。
空闲的 NodeManager 领取到该 Job，创建 Container，并产生 AppMaster，下载 Client 提交的资源到本地。

（3）任务分配和运行
AppMaster 向 RM 申请运行多个 MapTask 任务资源，
RM 将运行 MapTask 分配给空闲的 NodeManager，使其创建容器。
AppMaster 命令 NodeManager 启动 MapTask，对数据分区排序,等待执行结束。
AppMaster 向 RM 申请容器，运行 ReduceTask。ReduceTask 向 MapTask 获取相应分区的数据。
AppMaster 监控 Task 的运行状态 运行结束后，会向 RM 申请注销自己。 

（4）进度和状态更新 
YARN 中的任务将其进度和状态(包括 counter)返回给应用管理器 AppManager, 
客户端每秒(通过 mapreduce.client.progressmonitor.pollinterval 设置)
向应用管理器请求进度更新, 展示给用户,AppManager 会监控 AppMaster。 

（5）作业完成
```

## 1.13 Hadoop的Combiner的作用

```
Combine是作为 Map任务的一部分，在执行完 Map函数后紧接着执行的。能够减少中间结果的数目，从而减少网络流量。
```

## 1.14 Hadoop序列化和反序列化

```
1）序列化：将 结构化对象 转换为 字节流 的过程，以便在网络上传输或写入到磁盘进行永久存储。 
2）反序列化：将 字节流 转回一系列的 结构化对象。 
在Hadoop中，多个节点上进程间的通信是通过“远程过程调用（RPC）”实现的。
```

## 1.15 Hadoop的运行模式
```
1.独立（本地）运行模式：无需任何守护进程，所有的程序都运行在同一个JVM上执行。在独立模式下调试MR程序非常高效方便。所以一般该模式主要是在学习或者开发阶段调试使用 。
2.伪分布式模式：  Hadoop守护进程运行在本地机器上，模拟一个小规模的集群，换句话说，可以配置一台机器的Hadoop集群,伪分布式是完全分布式的一个特例。
3.完全分布式模式：Hadoop守护进程运行在一个集群上。
```

## 1.16 Hadoop小文件处理问题

```
小文件产生的原因

日志收集：在许多系统中，日志是按时间、业务模块等维度进行分割记录的.
传感器数据采集：物联网场景下，大量的传感器会实时采集数据，并且可能每隔一段时间就将采集到的数据存储为一个文件
中间结果保存：在复杂的数据处理流程中，每个处理步骤可能会将中间结果保存为文件。

解决小文件问题的方法

- 使用以下 Shell 脚本删除大小小于 1MB 的文件, 然后
- 使用 HDFS 命令合并小文件， 如果没有用就删了
- 编写 MapReduce 程序合并小文件
- 使用 SequenceFile，并小文件
- 配置job的输入配置，CombineFileInputFormat
- 使用归档文件， hdfs archive


hdfs dfs -ls /your/hdfs/path | awk '{if ($5 < 1048576) print $8}' | xargs hdfs dfs -rm
hdfs dfs -ls /your/hdfs/path | awk '{if ($5 < 1048576) print $8}' | xargs hdfs dfs -appendToFile {} /merged_file.txt
hdfs archive -archiveName my_archive.har -p /input_dir /output_dir
```

## 1.17 Hadoop 为什么要从2.x升级到3.x

```
存储方面:
更大的块大小：Hadoop 3.x 支持更大的默认块大小，这意味着在处理大规模数据时，能够减少 NameNode 管理的元数据量，降低元数据管理开销，同时减少数据传输时的寻址时间，提高数据传输效率。
例如，在处理 PB 级别的数据时，更大的块大小可以显著提升数据读写性能。

纠删码支持：Hadoop 3.x 引入了纠删码技术，相比传统的多副本策略，纠删码可以在保证数据可靠性的前提下，大幅减少数据存储开销。
例如，采用纠删码策略可以将存储开销降低到原来的三分之一左右，同时不影响数据的可用性和可靠性。

YARN 改进:
引入了 Federation（联邦）机制，使得多个 YARN 集群可以协同工作
MapReduce 性能优化:
通过改进内存分配算法，减少了内存碎片，提高了内存利用率.
```

## 1.18 HDFS写流程

1）client客户端发送上传请求，通过RPC与namenode建立通信，namenode检查该用户是否有上传权限，以及上传的文件是否在hdfs对应的目录下重名，如果这两者有任意一个不满足，则直接报错，如果两者都满足，则返回给客户端一个可以上传的信息

client -> namenode , 检查权限和文件名

2）client根据文件的大小进行切分，默认128M一块，切分完成之后给namenode发送请求第一个block块上传到哪些服务器上

client -> namenode , 切分文件块, 默认最大128M

3）namenode收到请求之后，根据网络拓扑和机架感知以及副本机制进行文件分配，返回可用的DataNode的地址

namenode -> datanode, 选择 DataNode

注：Hadoop 在设计时考虑到数据的安全与高效, 数据文件默认在 HDFS 上存放三份, 存储策略为本地一份，同机架内其它某一节点上一份, 不同机架的某一节点上一份

4）客户端收到地址之后与服务器地址列表中的一个节点如A进行通信，本质上就是RPC调用，建立pipeline，A收到请求后会继续调用B，B在调用C，将整个pipeline建立完成，逐级返回client

5）client开始向A上发送第一个block（先从磁盘读取数据然后放到本地内存缓存），以packet（数据包，64kb）为单位，A收到一个packet就会发送给B，然后B发送给C，A每传完一个packet就会放入一个应答队列等待应答

6）数据被分割成一个个的packet数据包在pipeline上依次传输，在pipeline反向传输中，逐个发送ack（命令正确应答），最终由pipeline 中第一个 DataNode 节点 A 将 pipeline ack 发送给 Client

7）当一个 block 传输完成之后, Client 再次请求 NameNode 上传第二个 block ，namenode重新选择三台DataNode给client

```
1. 客户端发起创建文件请求
客户端程序调用 HDFS API 中的创建文件方法，如FileSystem.create() ，向 NameNode 发送创建文件的请求。此请求包含要创建文件的完整路径、文件权限等信息。
2. NameNode 检查与响应
NameNode 收到请求后，会执行一系列检查：
权限检查：验证客户端是否有在指定目录下创建文件的权限。
文件是否存在：检查目标文件是否已存在，若存在且未允许覆盖，会拒绝请求。
若检查通过，NameNode 会为新文件分配一个新的文件条目，记录文件元数据，如文件名、权限、创建时间等，并返回一个响应给客户端，其中包含数据块的分配信息和可用 DataNode 列表。
3. 客户端与 DataNode 建立连接
客户端接收到 NameNode 的响应后，会根据响应中的 DataNode 列表，选择合适的 DataNode 来存储数据块。一般采用就近原则，优先选择网络距离近的 DataNode。客户端会与第一个 DataNode 建立 TCP 连接，开启数据传输通道。
4. 数据块写入与流水线复制
数据分块：客户端将待写入的数据分割成固定大小的数据块（默认大小为 128MB）。
流水线传输：客户端以数据包（Packet）的形式将数据块发送给第一个 DataNode。第一个 DataNode 在接收到数据包后，会将其转发给下一个 DataNode，形成一个数据传输的流水线。这种方式可以提高数据传输效率，减少延迟。
数据复制：每个 DataNode 在接收到数据后，会将数据存储在本地磁盘，并向客户端发送确认消息。默认情况下，每个数据块会复制 3 份，存储在不同的 DataNode 上，以保证数据的可靠性和容错性。
5. 数据块写入完成确认
当所有副本都成功写入后，DataNode 会向客户端发送写入成功的确认消息。客户端收到所有确认消息后，会认为该数据块写入完成。如果在写入过程中出现某个 DataNode 写入失败的情况，客户端会通知 NameNode，NameNode 会安排将数据块复制到其他可用的 DataNode 上。
6. 关闭文件并更新元数据
客户端通知 NameNode：当所有数据块都写入完成后，客户端会向 NameNode 发送关闭文件的请求。
NameNode 更新元数据：NameNode 收到请求后，会将文件标记为已完成，并更新文件的元数据信息，如文件大小、数据块位置等。这些元数据会被持久化存储在磁盘上，以保证系统重启后数据的一致性。
```

```
客户端 -- 创建文件请求 --> NameNode
NameNode -- 分配数据块和DataNode列表 --> 客户端
客户端 -- 连接 --> 第一个DataNode
客户端 -- 数据块（数据包） --> 第一个DataNode --> 第二个DataNode --> 第三个DataNode
DataNode -- 写入成功确认 --> 客户端
客户端 -- 关闭文件请求 --> NameNode
NameNode -- 更新元数据 --> 完成
```

## 1.19 HDFS 读流程

```
1. 客户端发起读请求
客户端（例如一个运行在 Hadoop 集群上的 MapReduce 任务或者其他应用程序）需要读取 HDFS 中的文件时，会调用 DistributedFileSystem 类的 open() 方法。该方法会向 NameNode 发送一个读取文件的请求，请求中包含要读取的文件路径。
2. NameNode 响应请求
权限检查：NameNode 接收到客户端的请求后，首先会检查客户端是否具有读取该文件的权限。若客户端没有相应权限，NameNode 会拒绝请求并返回错误信息。
元数据查询：若权限检查通过，NameNode 会在内存中查找该文件的元数据信息，包括文件的数据块位置、副本位置等。NameNode 会将这些元数据信息返回给客户端，客户端可以根据这些信息知道数据块分布在哪些 DataNode 节点上。
3. 客户端与 DataNode 建立连接
选择合适的 DataNode：客户端接收到 NameNode 返回的元数据信息后，会根据数据块的位置和副本信息，选择距离最近或者网络状况最好的 DataNode 节点来读取数据。通常会优先选择本地节点或者同机架的节点，以减少网络传输延迟。
建立连接：客户端与选择的 DataNode 建立 TCP 连接，准备从该 DataNode 读取数据。
4. 数据读取
数据块读取：客户端向 DataNode 发送读取数据块的请求，DataNode 接收到请求后，会从本地磁盘中读取相应的数据块，并将数据以数据包（Packet）的形式通过网络传输给客户端。数据包是数据传输的基本单位，通常大小为 64KB。
校验数据：客户端在接收数据的过程中，会对数据进行校验，以确保数据的完整性。HDFS 使用 CRC（循环冗余校验）来进行数据校验，每个数据块都有对应的校验信息，客户端会将接收到的数据计算得到的校验值与元数据中的校验值进行比对，如果不一致则说明数据可能损坏，客户端会尝试从其他副本读取数据。
5. 读取后续数据块
如果文件被划分为多个数据块，客户端会按照上述步骤依次从相应的 DataNode 读取后续的数据块。客户端会根据 NameNode 提供的元数据信息，选择合适的 DataNode 节点，并建立连接进行数据读取。
6. 关闭连接
当客户端完成文件的读取后，会关闭与 DataNode 的连接，释放相关的资源。
```

```
HDFS 的读流程主要涉及客户端、NameNode 和 DataNode 之间的交互。
通过 NameNode 提供的元数据信息，客户端能够定位到数据块所在的 DataNode 节点，并从这些节点读取数据。
数据以数据包的形式进行传输，并通过校验机制保证数据的完整性。
整个过程充分利用了 HDFS 的分布式特性，提高了数据读取的效率和可靠性。
```