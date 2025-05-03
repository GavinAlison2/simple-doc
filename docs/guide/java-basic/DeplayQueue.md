# DelayQueue

## 简介

DelayQueue是一个支持延时获取元素的无界阻塞队列。队列中的元素必须实现Delayed接口，该接口定义了一个getDelay方法，该方法返回元素的剩余延迟时间，单位为纳秒。



## 实现原理步骤

1. 元素定义

要存于 DelayQueue 的元素，必须实现 Delayed 接口。此接口继承自 Comparable 接口，包含两个方法：

- getDelay(TimeUnit unit)：用于获取元素的剩余延迟时间。
- compareTo(T o)：用于对元素进行排序，以确定元素在优先队列中的位置。

```java
public interface Delayed extends Comparable<Delayed> {
    long getDelay(TimeUnit unit);
    int compareTo(Delayed o);
}

import java.util.concurrent.Delayed;
import java.util.concurrent.TimeUnit;

public class DelayedElement implements Delayed {
    private final long delayTime;
    private final long expireTime;

    public DelayedElement(long delayTime) {
        this.delayTime = delayTime;
        this.expireTime = System.currentTimeMillis() + delayTime;
    }

    @Override
    public long getDelay(TimeUnit unit) {
        return unit.convert(expireTime - System.currentTimeMillis(), TimeUnit.MILLISECONDS);
    }

    @Override
    public int compareTo(Delayed o) {
        return Long.compare(this.expireTime, ((DelayedElement) o).expireTime);
    }
}
```

2. 入队操作

元素入队时，首先调用元素的 getDelay() 方法获取其剩余延迟时间，然后将元素放入 PriorityQueue 中，并使用 ReentrantLock 保证线程安全。

```java
public boolean offer(E e) {
    final ReentrantLock lock = this.lock;
    lock.lock();
    try {
        return super.offer(e);
    } finally {
        lock.unlock();
    }
}

public boolean offer(E e) {
    final ReentrantLock lock = this.lock;
    lock.lock();
    try {
        return super.offer(e);
    } finally {
        lock.unlock();
    }
}
```

3. 出队操作

```md
1. 若队列为空，则返回 null。
2. 若队列不为空，则获取队列头元素，并调用元素的 getDelay() 方法获取其剩余延迟时间。
3. 若延迟时间已到，则将元素出队并返回。
4. 若延迟时间未到，则阻塞或返回 null。
```

```java
public E poll() {
    final ReentrantLock lock = this.lock;
    lock.lock();
    try {
        E first = super.peek();
        if (first == null || first.getDelay(NANOSECONDS) > 0)
            return null;
        return super.poll();
    } finally {
        lock.unlock();
    }
}
public E poll(long timeout, TimeUnit unit) throws InterruptedException {
    long nanos = unit.toNanos(timeout);
    final ReentrantLock lock = this.lock;
    lock.lockInterruptibly();
    try {
        for (;;) {
            E first = super.peek();
            if (first == null)
                return null;
            long delay = first.getDelay(NANOSECONDS);
            if (delay <= 0)
                return super.poll();
            if (nanos <= 0)
                return null;
            nanos = first.awaitNanos(nanos);
        }
    } finally {
        lock.unlock();
    }
}
```

4. 元素排序

元素在入队时，会根据元素的 getDelay() 方法返回的延迟时间和 compareTo() 方法返回的排序值，将元素放入 PriorityQueue 中。

```java
public E peek() {
    final ReentrantLock lock = this.lock;
    lock.lock();
    try {
        return super.peek();
    } finally {
        lock.unlock();
    }
}
```

5. 线程安全

DelayQueue 内部使用 ReentrantLock 保证线程安全。

```java
private final ReentrantLock lock = new ReentrantLock();
```

6. 示例

```java
public static void main(String[] args) throws InterruptedException {
    DelayQueue<DelayedTask> queue = new DelayQueue<>();
    queue.offer(new DelayedTask(1000, "task1"));
    queue.offer(new DelayedTask(500, "task2"));
    queue.offer(new DelayedTask(1500, "task3"));
    System.out.println(queue.poll().getTask()); // task2
    System.out.println(queue.poll().getTask()); // task1
    System.out.println(queue.poll().getTask()); // task3
}

static class DelayedTask implements Delayed {
    private final long delay;
    private final String task;

    public DelayedTask(long delay, String task) {
        this.delay = delay;
        this.task = task;
    }

    public long getDelay(TimeUnit unit) {
        return unit.convert(delay, TimeUnit.MILLISECONDS);
    }

    public int compareTo(Delayed o) {
        if (o == this) // compare zero if same object
            return 0;
        if (o instanceof DelayedTask) {
            DelayedTask that = (DelayedTask) o;
            long diff = this.delay - that.delay;
            if (diff < 0)
                return -1;
            else if (diff > 0)
                return 1;
            else
                return 0; // same time
        }
        return 0; // not comparable
    }

    public String getTask() {
        return task;
    }
}
```

## 总结

DelayQueue 利用 PriorityQueue 存储元素，通过 ReentrantLock 保证线程安全。

元素需实现 Delayed 接口，以确定延迟时间和排序规则。

入队操作将元素添加到优先队列，出队操作会检查元素的延迟时间，若时间已到则取出元素，未到则阻塞或返回 null。

DelayQueue 适用于需要延迟执行的任务，如定时任务、缓存过期处理等。
