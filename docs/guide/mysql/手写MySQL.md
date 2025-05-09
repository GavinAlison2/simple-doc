# 手写MySQL

从功能上来说，一个手写DB系统架构分为以下几个模块：

- 数据管理器（DM）
- 事务管理器（TM）
- 版本管理器（VM）
- 表管理器（TBM）
- 索引管理器（IM）

## MySQL的缓冲池Buffer pool

数据以文件形式存储在磁盘，数据执行在内存，以页为单位从磁盘加载到内存,一页大小为16KB， 多个页组成一个缓存池 buffer pool, 大小为 128M.

作用，提升性能.

### Buffer pool 里面包含

- change buffer
- Adaptive Hash Index

### 什么是缓冲池？

什么是缓冲池？ 为了缓存磁盘中的页，MYDB在MySQL服务器启动时就向操作系统申请了一片连续的内存，即Buffer Pool（缓冲池）。

默认情况下，Buffer Pool的大小为128M。

Buffer Pool对应的一片连续的内存被划分为若干个页面，页面大小与Innodb表空间用的页面大小一致，默认都是16kb，为了与磁盘中的页面区分开来，我们把这些Buffer Pool中的页面称为缓冲页。

### 脏页

当我们修改了Buffer Pool中某个缓冲页的数据，它就与磁盘上的页不一致了，这样的缓冲页称为脏页。

当然，我们可以每当修改完某个数据页时，就立即将其刷新到磁盘中对应的页上，但是频繁的往磁盘中写数据会严重的影响程序的性能，所以每次修改缓冲页后，我们并不着急立即将修改刷新到磁盘上，而是在某个时间点进行刷新。后台有专门的线程负责每隔一段时间就把脏页刷新到磁盘，这样就可以不影响用户线程处理正常的请求。

通过参数 innodb_flush_log_at_trx_commit=0/1/2 控制，实时写实时刷，实时写延时刷

总之：Innodb是以页为单位来管理存储空间的，在真正访问页面之前，需要先把磁盘中的页加载到内存中的Buffer Pool中，之后才可以访问，所有的变更都必须先更新缓冲池中的数据，然后缓冲池中的脏页以一定的频率刷新到磁盘（checkpoint机制），通过缓冲池来优化CPU和磁盘之间的鸿沟，这样就能保证整体的性能不会下降的太快。

缓冲池的巨大价值：Buffer Pool 缓存表数据与索引数据，把磁盘上的数据加载到缓冲池，避免每次访问都进行磁盘IO，起到加速访问的作用。虽然Buffer Pool 缓冲池的访问速度快，但是没有把所有的数据放到缓冲池的主要原因是缓冲池的存储容量小。只能把“最热”的数据放到“最近”的地方，以“最大限度”的降低磁盘访问。

### 数据页

每个数据页的大小默认是16KB。

每个数据页存放着多条的数据，在执行增删改首先会定位到这条数据所在数据页，然后会将数据所在的数据页加载到 Buffer Pool 中。

### 缓存页

当数据页被加载到缓冲池Buffer Pool中后，Buffer Pool 有对应的缓存页与数据页一一对应，其大小和数据页一样，默认是16KB。

提示： 数据页在磁盘上， 缓冲页在内存中。

MySQL还会为每个缓存开辟额外的空间用来描述对应的缓存页的一些信息，这些是 元数据，例如：数据页所属的表空间、数据页号。 

### Free链表

内存中的缓存页，有些是空闲的。

当数据页会被加载到一个缓存页中的时候，MySQL是如何区分哪些缓存页是空闲的状态，可以用来存放数据页的。

为了解决这个问题，MySQL 为 Buffer Pool 设计了一个双向链表— free链表。

free链表是由每个空闲缓存页的描述(说明)数据组成的一个双向链表。

free链表作用是用来保存空闲缓存页的描述数据的。

free 链表还会有一个基础节点，它会引用该链表的头结点和尾结点，还会记录可用的空闲的缓存页的个数。

当加载数据页到缓存池中的时候， MySQL会从 free 链表中获取一个描述数据的信息，根据描述节点的信息拿到其对应的缓存页，然后将数据页信息放到该缓存页中，同时将free 链表中的该描述数据的节点移除。

这就是数据页被读取 Buffer Pool 中的缓存页的过程。

数据库中有一个哈希表结构， 来记录一个 数据页的缓存状态。key为 数据页的编号，具体来说，表空间号 + 数据页号作为数据页的key，value为缓存页内存地址。

通过这个 哈希表结构，可以很容易判断 数据页是否被缓冲池： 在数据页加载的时候就会通过哈希表中的key来确定数据页是否被缓存了。

### Flush链表

内存的数据修改了，就会和磁盘上的数据页不一致。

问题是：如何保证 内存数据，磁盘数据的一致性呢？

MySQL 在执行增删改的时候会一直将数据以数据页的形式加载到 Buffer Pool 的缓存页中，增删改的操作都是在内存中执行的。 修了了的 内存页，就是脏页。

如何把脏页刷新呢？

MySQL会有一个后台的线程数将脏数据刷新到磁盘中，但是后台的线程是如何知道应该刷新哪些脏数据到磁盘呢？

针对这个问题，MySQL设计出了 Flush 链表，他的作用就是记录被修改过的脏数据所在的缓存页对应的描述数据。如果内存中的数据和数据库和数据库中的数据不一样，那这些数据就称为脏数据，本质上就是被缓存到缓存池中的数据被修改了，但是还没有刷新到磁盘中。

同样的这些已经被修改了的数据所在的缓存页的描述数据会被维护到 Flush 链表中；当某个脏数据页被刷新到磁盘后，其空间就腾出来了，然后又会跑到 Free 链表中了。

### LRU算法

缓存的性能，和缓存的命中率紧密相关。 如何提升缓存的命中率？

Buffer Pool 用一个链表管理 缓存页， 当 内存不够，或者缓存不够的时候。 这个缓存页列表使用 LRU 算法 进行数据页的淘汰。

如果一直在进行数据库的增删改操纵，数据库内部的基本流程如下：

传统的LRU把新入缓冲池的数据页放到LRU的头部，作为最近访问的元素，从而最晚被淘汰，这里又分为两种情况：

（1） 页已经在缓冲池中：只做移至LRU头部的动作，没有页被淘汰。

（2）页不在缓冲池中：除了做放入LRU头部的动作，还要做淘汰LRU尾部页的动作；

举栗子： 假设缓冲池的LRU长度为10，缓冲池的页号如下：

接下来要访问的数据在页号为4的页中：

由于 页号为4的页在缓冲池中，直接把页号为4的页放到LRU的头部即可，此时没有页被淘汰。

LRU为了减少数据的移动，由于链表具有快速插入和修改的优点，LRU一般会采用链表来实现。

接着，需要访问的数据在页号为50的页中：

由于页号为50的页原来不在缓冲池中，此时需要把页号为50的页放入到LRU头部，同时淘汰页号为7的页。

传统的LRU缓冲池算法十分简单直接，但是存在两个问题：

（1）空间局部性

操作系统级别的spatial locality(空间局部性)是指读取一个数据，在它周围内存地址存储的数据也很有可能被读取到，于是操作系统会帮你预读一部分数据。

MySQL也是存在存在预读机制的：

①、通过参数innodb_read_ahead_threshold控制，默认是56。这个参数表示如果顺序访问了一个区里的多个数据页，这里的多个就是56，就会触发预读机制，把下一个区中所有的数据页都加载到缓存页里。

②、通过参数innodb_random_read_ahead控制，默认是off。这个参数表示如果缓存了一个区的13个连续数据页，就会触发预读机制，把这个区里的页全都加载到缓存页里。

当你执行select * from xxx 时，如果表中的数据页非常多，那这些数据页就会一一将buffer pool中的经常使用的缓存页挤下去，可能留在lru链表中的全部是你不经常使用的数据。

此时，预读机制的优势就违背了LRU实现最近最少使用的数据页刷入磁盘的设计初衷了。

（2）全表扫描

如果是全表扫描，会把全表都加载到buffer pool中，有可能就把LRU链表中经常访问的都挤到后面去，就有可能被淘汰。

### 基于冷热数据分离优化后的LRU链表

Buffer Pool没有直接常用传统的LRU算法，而是采用了基于冷热数据分离的LRU链表，如下图所示：

新进入缓存池的页并不会直接进入LRU链表的头部，而是插入到距离链表尾3/8的位置（可以由innodb_old_blocks_pct参数进行配置），我们将距离链表尾3/8以上的位置称为新子列表，以下的位置称为旧子列表，数据在链表中自底而上称为变年轻，反之称为变老。

（1）变年轻

变年轻分为两种情况

用户的操作而需要读取页面，此时会直接使该页直接移至新子列表链表头部。

数据库内部的预读操作，则在距离插入innodb_old_blocks_time（默认为1000ms）的时间内，即使访问了该页，该页也不会别移到LRU链表的头部。

也就是说，如果是来源于用户的操作，则最起码需要两次操作才能变年轻。而如果是预读操作，则需要加上一个等待期限。

（2）变老

随着链表数据的替换和访问，整个列表中的数据会自然的变老。

最终最老的页面会从尾部逐出，清空这些缓存页，并放入free链表，从LRU链表删除，从Flush链表删除。

如果 Buffer Pool 不够使用了，那么 MySQL就会将 LRU 链表中的尾节点刷入到磁盘中， Buffer Pool 腾出内存空间。
