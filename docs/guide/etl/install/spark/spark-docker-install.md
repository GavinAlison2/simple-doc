# Spark Docker

docker compose 文件

```yaml
version: '3'
services:
  spark:
    image: docker.io/bitnami/spark:3.4
    environment:
      - SPARK_MODE=master
      - SPARK_RPC_AUTHENTICATION_ENABLED=no
      - SPARK_RPC_ENCRYPTION_ENABLED=no
      - SPARK_LOCAL_STORAGE_ENCRYPTION_ENABLED=no
      - SPARK_SSL_ENABLED=no
      - SPARK_USER=spark
    ports:
      - '8080:8080'
      - '7077:7077'
  spark-worker:
    image: docker.io/bitnami/spark:3.4
    environment:
      - SPARK_MODE=worker
      - SPARK_MASTER_URL=spark://spark:7077
      - SPARK_WORKER_MEMORY=1G
      - SPARK_WORKER_CORES=1
      - SPARK_RPC_AUTHENTICATION_ENABLED=no
      - SPARK_RPC_ENCRYPTION_ENABLED=no
      - SPARK_LOCAL_STORAGE_ENCRYPTION_ENABLED=no
      - SPARK_SSL_ENABLED=no
      - SPARK_USER=spark
```

docker-compose up -d

## 运行

```bash
spark-submit --master spark://master:7077 --class org.apache.spark.examples.SparkPi /opt/bitnami/spark/examples/jars/spark-examples_2.12-3.4.3.jar 10
```
