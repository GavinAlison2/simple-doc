# YARN


## 1. 从流程角度来理解 YARN 划分组件

```
YARN 的设计思路是将资源管理和任务调度从具体的计算框架中分离出来，形成一个通用的资源管理系统，以支持多种不同类型的应用程序在集群上运行。

任务提交与资源请求流程:ResourceManager

当用户提交一个应用程序到 Hadoop 集群时，首先需要向 YARN 申请资源来运行这个应用程序。这就需要有一个组件来负责接收用户的资源请求，并对整个集群的资源进行统一管理和分配，于是就有了ResourceManager。它就像是一个资源的 “大管家”，知道集群中各个节点有多少资源，以及这些资源的使用情况，然后根据用户的请求和一定的调度策略，决定把哪些资源分配给哪个应用程序。

节点资源管理流程:NodeManager

资源分配好后，需要在各个节点上启动相应的任务来运行应用程序。每个节点都需要有一个组件来负责管理本节点上的资源，包括启动和停止任务、监控资源使用情况等，这就是NodeManager。它相当于每个节点的 “小管家”，按照 ResourceManager 的指示，在本地节点上为任务分配资源，比如为任务分配一定的 CPU 时间和内存空间等，并确保这些任务在各自的资源范围内运行，同时向 ResourceManager 汇报本节点的资源使用情况和任务运行状态。

应用程序执行流程:ApplicationMaster

对于每个应用程序，需要有一个专门的组件来负责协调和管理该应用程序的具体执行过程。它要与 ResourceManager 协商获取资源，然后根据应用程序的逻辑，把任务分配到不同的节点上，并监控这些任务的执行情况，处理任务的失败和重试等问题，这个组件就是ApplicationMaster。可以把它看作是每个应用程序的 “主管”，负责该应用程序在集群中的整个生命周期，从申请资源到任务执行，再到最终完成。

资源隔离与任务执行单元流程:Container

为了保证各个任务之间的资源隔离和独立性，YARN 需要将资源分配和任务执行的基本单位进行封装，这就产生了Container。Container 就像是一个 “容器”，里面封装了任务执行所需的各种资源，如 CPU、内存、磁盘等，以及任务执行的环境，包括应用程序的代码、依赖库、环境变量等。每个任务都在自己的 Container 中独立运行，相互隔离，这样可以避免不同任务之间的资源干扰和冲突，保证应用程序的稳定性和安全性。

通过这样的组件划分，YARN 实现了资源管理、任务调度、节点管理以及应用程序执行等功能的分离和协同工作
```

另一种理解：
```
应用提交与 ApplicationMaster 启动

当你将 source - mapreduce - sink 应用程序提交到 ResourceManager 后，放入作业队列中，ResourceManager 会为该应用程序启动一个对应的 ApplicationMaster。这是因为不同应用程序有不同的执行逻辑和资源需求，由 ApplicationMaster 专门负责该应用程序的任务调度和资源协调。

资源申请
ApplicationMaster 启动后，会根据应用程序的资源需求向 ResourceManager 申请资源。这里的资源以 Container 的形式呈现，每个 Container 包含了一定量的 CPU、内存等资源。

队列与调度
- 队列的作用：
YARN 中存在资源队列，每个队列可以有不同的资源分配策略和优先级。
在提交应用程序时，用户可以指定应用程序要提交到哪个作业队列（这里是作业队列）。ResourceManager 在进行资源分配时，会考虑队列的配置和状态。
例如，某个队列可能被配置为拥有集群 30% 的资源，并且该队列有高优先级，那么这个队列中的应用程序在资源分配上会有一定优势。

- 调度执行：
ResourceManager 会根据队列的调度策略（如公平调度、容量调度等）以及各个应用程序的资源请求，为 ApplicationMaster 分配 Container 资源。
并不是将 ApplicationMaster 放入队列等待调度，而是将应用程序的资源请求放入队列进行排队和调度。一旦 ResourceManager 为 ApplicationMaster 分配了合适的 Container 资源，ApplicationMaster 就会与对应的 NodeManager 通信，让 NodeManager 在相应的 Container 中启动任务。

任务执行
ApplicationMaster 会根据任务的具体需求和分配到的 Container 资源，将具体的任务（如 Map 任务、Reduce 任务）分配给对应的 NodeManager。NodeManager 会在本地启动 Container，并在 Container 中执行相应的任务。在任务执行过程中，NodeManager 会不断向 ResourceManager 汇报任务的执行状态和资源使用情况，ApplicationMaster 也会监控任务的执行进度，处理任务失败等情况。

综上所述，队列是用于对应用程序的资源请求进行排队和调度的，而不是存放 ApplicationMaster，ApplicationMaster 的主要职责是协调应用程序的任务执行和资源分配。
```

## 2. YARN 的主要组件包括：

- ResourceManager (RM): 负责集群资源的分配和调度。
- NodeManager (NM): 负责每个节点上的资源管理和任务执行。
- ApplicationMaster (AM): 负责向 ResourceManager 申请资源，并在 NM 上启动 ApplicationMaster。
- Container: 一个运行在 YARN 集群中的任务，由 ApplicationMaster 启动。

YARN 的架构如下图所示：

![YARN 架构](https://hadoop.apache.org/docs/current/hadoop-yarn/hadoop-yarn-site/yarn_architecture.gif)

YARN 的主要功能包括：

- 资源管理：ResourceManager 负责集群资源的分配和调度，包括分配内存、CPU、磁盘等资源，并将这些资源分配给各个 NodeManager。
- 任务调度：ResourceManager 根据各个 ApplicationMaster 的资源需求，将任务调度到各个 NodeManager 上。
- 容错：ResourceManager 和 NodeManager 都有容错机制，可以自动检测和恢复失败的节点。
- 弹性：ResourceManager 和 NodeManager 可以动态增加和减少，以应对集群的变化。
- 应用编程接口：YARN 提供了丰富的应用编程接口 (API)，支持多种类型的应用程序，如 MapReduce、Spark、Hadoop Streaming、Pig、Hive 等。
- 安全：YARN 支持 Kerberos 安全认证，并提供基于角色的访问控制 (RBAC) 机制。
- 可视化：YARN 提供了 Web 界面，方便管理员和用户查看集群的状态。

## 3. YARN 的优点：
- 资源隔离：YARN 提供了资源隔离机制，可以将不同应用的资源隔离到不同的队列中，实现资源共享和独占。

## 4. YARN工作机制

```
1. 用户向 Yarn 中提交一个 MR 任务
由 Resource Manager 中的 Applications Manager 接收
2.Applications Manager 负责资源的分配, 
根据任务计算出所需要的资源,如cpu资源和内存资源,将这些资源封装成 Container
3.Applications Manager 将任务和 Container 发送给 Resource Scheduler(资源调度器)
4.Resource Scheduler 将任务和 Container 分配给 Application Master, 由 Application Master 进行二次划分, 将任务分解成 MapTask 和 ReduceTask
5.ApplicationMaster 将 MapTask 和 ReduceTask 分配给 Node Manager,三个 Node Manager 随机接收
6.注意, Application Master 会对 NodeManager 的任务完成情况进行监控, 而 Applications Manager 会对 Node Manager 的任务资源使用情况进行监控.
7.如果 Node Manager 上的任务执行成功,会把成功信息发送给 Application Master 和 Applications Manager , 然后 Applications Manager 会进行资源的回收.
8.如果 Node Manager 上的任务执行失败,会把失败信息发送给 Application Master 和 Applications Manager , 然后 Applications Manager 仍然会进行资源的回收. 
此时 Application Master 会向 Applications Manager 申请资源 , 重新将这个任务分配给这个 Node Manager , 循环往复, 直到任务执行成功.
```

## 5. YARN有什么优势，能解决什么问题?

```
1、YARN的设计减小了JobTracker的资源消耗，减少单点故障，并且让监测每一个Job子任务(tasks)状态的程序分布式化了，更安全、更优美。
2、在新的Yarn中，ApplicationMaster是一个可变更的部分，用户可以对不同的编程模型写自己的AppMst，让更多类型的编程模型能够跑在Hadoop集群中。
3、对于资源的表示以内存为单位，比之前以剩余slot数目更加合理。
4、MRv1中JobTracker一个很大的负担就是监控job下的tasks的运行状况，现在这个部分就扔给ApplicationMaster做了，
而ResourceManager中有一个模块叫做ApplicationManager，它是监测ApplicationMaster的运行状况，如果出问题，会在其他机器上重启。
5、Container用来作为YARN的一个资源隔离组件，可以用来对资源进行调度和控制。
```

## 6. YARN容错机制 

```
1. ApplicationMaster 容错：RM 监控 AM 的运行状态，一旦发现它运行失败或者超时，就会重新分配资源并启动它，启动之后AM内部的状态如何恢复由自己保证，
比如 MRAppMaster 在作业运行过程中将状态信息动态记录到 HDFS 上，一旦出现故障重启后，它能够从 HDFS 读取并恢复之前的运行状态，减少重复计算带来的开销。
2. NodeManager 容错：NM 超时没有心跳，则 RM 认为它死掉，会将上面的 Container 状态置为失败，并告诉对应的 ApplicationMaster ，以决定如何处理这些 Container 中运行的任务
3. Container 容错：如果 AM 在一定时间内未启动分配到的 Container，则 RM 会将该 Container 状态置为失败并回收它；
如果一个 Container 在运行过充中，因为外界原因导致运行失败，则 RM 会转告对应的 AM ,由 AM 决定如何处理
```

## 7. YARN调度器

```
1. FIFO Scheduler
FIFO = first in first out 先进先出 （队列）
这种调度把应用提交按顺序排成一个队列，先进先出的队列，在进行资源分配的时候，先给队列中最头部的应用分配资源，等到应用满足了，再给下一个分配，以此类推。问题：大的应用可能会占用所有的资源，造成阻塞，不适合集群
2. Capacity Scheduler
专门有一个队列来运行小任务，但是为小任务专门设置的队列也会占用一定的资源，会导致大任务的执行时间落后于FIFO
3. Fair  Shceduler
不需要预先占用一定资源，动态调整
比如第一个是大任务，且只有这个大任务在运行，那么把所有资源给它，然后第二个小任务提交了 ，Fair Shceduler 就会分配一半的资源给到小任务，公平的共享资源，小任务跑完了还是会把资源给到大任务。
```

## 8. YARN中Container是如何启动的?

```
Container启动时并不知道具体要在其中做什么
它被要求启动时只管根据 request 的要求准备运行环境，
从 request 中取出预先存储的命令简单加工后写到脚本文件并执行。
具体执行命令前先发出一个容器已启动的事件，再运行脚本，启动过程就完成了
```
