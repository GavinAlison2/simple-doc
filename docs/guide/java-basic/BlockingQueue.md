# BlockingQueue

## 概述

BlockingQueue 是 Java 5 引入的接口，它是一个支持阻塞的队列，即当队列为空时，从队头取元素的操作将被阻塞，当队列满时，往队尾添加元素的操作将被阻塞。

BlockingQueue 接口有以下几个主要实现类：

- ArrayBlockingQueue：一个由数组支持的有界阻塞队列。
- SynchronousQueue：一个不存储元素的阻塞队列。
- LinkedBlockingQueue：一个由链表支持的阻塞队列。
- PriorityBlockingQueue：一个支持优先级排序的阻塞队列。
- DelayQueue：一个支持延时获取元素的阻塞队列。
- LinkedTransferQueue：一个由链表支持的阻塞队列，可以实现可中断的元素传输。

## 常用方法

- add(E e)：添加元素到队列，如果队列已满，则阻塞。
- offer(E e)：尝试添加元素到队列，如果队列已满，则返回 false，否则返回 true。
- put(E e)：添加元素到队列，如果队列已满，则阻塞。
- take()：获取队列头部的元素，如果队列为空，则阻塞。
- poll()：尝试获取队列头部的元素，如果队列为空，则返回 null，否则返回元素。
- element()：获取队列头部的元素，如果队列为空，则阻塞。
- peek()：尝试获取队列头部的元素，如果队列为空，则返回 null，否则返回元素。

- drainTo(Collection<? super E> c)：将队列中的元素全部转移到指定的 Collection 中，如果队列为空，则阻塞。
- remainingCapacity()：返回队列剩余的容量。
- clear()：清空队列。
- isFull()：判断队列是否已满。
- isEmpty()：判断队列是否为空。
- size()：返回队列的大小。
- remainingCapacity()：返回队列剩余的容量。
- remove(Object o)：从队列中移除指定的元素。
- contains(Object o)：判断队列中是否包含指定的元素。
- toArray()：将队列中的元素转为数组。
- iterator()：返回队列的迭代器。
- spliterator()：返回队列的 spliterator。
- forEach(Consumer<? super E> action)：遍历队列中的元素。
- blockingQueue()：返回阻塞队列。
- transfer(E e)：可中断地将元素从队头传输到队尾。
- tryTransfer(E e)：尝试可中断地将元素从队头传输到队尾。
- tryTransfer(E e, long timeout, TimeUnit unit)：尝试可中断地将元素从队头传输到队尾，最多等待指定的时间。
- hasWaitingConsumer()：判断是否有线程等待获取元素。
- drainTo(Collection<? super E> c, int maxElements)：将队列中的元素全部转移到指定的 Collection 中，最多转移指定数量的元素。
