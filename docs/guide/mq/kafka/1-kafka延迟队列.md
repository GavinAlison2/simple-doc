# Kafka延迟队列

## 延迟队列

Java 的 DelayQueue 是一个支持延迟的队列，可以存储元素并按照指定的时间间隔进行排序。

Kafka 的延迟队列是基于 Zookeeper 实现的，它可以存储元素并按照指定的时间间隔进行排序。

```md
生产者---》kafka topic-partition --》 消费者

消费者基于时间戳进行延迟消费
问题
1. 消费者宕机，消息丢失，需要手动维护offset


```

### 基于时间轮实现延迟队列

1. 生产者将数据写入到延迟文件中，文件名为时间戳
2. 生产者有个定时任务，每隔一段时间扫描延迟文件，将时间戳小于当前时间的消息写入到 kafka topic-partition 中
3. 消费者消费 kafka topic-partition 中的消息，消费者根据消息的时间戳进行延迟消费

### 基于 Zookeeper 实现延迟队列

1. 生产者将数据写入到 kafka topic-partition 中，同时写入到 Zookeeper 中，同时设置过期时间
2. 消费者消费 kafka topic-partition 中的消息，消费者根据消息的过期时间进行延迟消费
3. 当消费者宕机，重新启动后，会从 Zookeeper 中获取消费进度，并从相应的位置开始消费

### 使用Java的DelayQueue实现延迟队列

```md
1. 生产者由延迟处理线程，将数据写入到延迟队列delayqueue中，另一个线程消费延迟队列delayqueue中的数据，并写入到kafka topic-partition中。
2. 消费者消费kafka topic-partition中的消息，消费者根据消息的时间戳进行延迟消费。

```

### 使用RocketMQ实现延迟队列

