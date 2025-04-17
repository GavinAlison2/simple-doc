<template><div><h1 id="spark-docker" tabindex="-1"><a class="header-anchor" href="#spark-docker"><span>Spark Docker</span></a></h1>
<p>docker compose 文件</p>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre v-pre><code><span class="line"><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">'3'</span></span>
<span class="line"><span class="token key atrule">services</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">spark</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">image</span><span class="token punctuation">:</span> docker.io/bitnami/spark<span class="token punctuation">:</span><span class="token number">3.4</span></span>
<span class="line">    <span class="token key atrule">environment</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> SPARK_MODE=master</span>
<span class="line">      <span class="token punctuation">-</span> SPARK_RPC_AUTHENTICATION_ENABLED=no</span>
<span class="line">      <span class="token punctuation">-</span> SPARK_RPC_ENCRYPTION_ENABLED=no</span>
<span class="line">      <span class="token punctuation">-</span> SPARK_LOCAL_STORAGE_ENCRYPTION_ENABLED=no</span>
<span class="line">      <span class="token punctuation">-</span> SPARK_SSL_ENABLED=no</span>
<span class="line">      <span class="token punctuation">-</span> SPARK_USER=spark</span>
<span class="line">    <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">'8080:8080'</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">'7077:7077'</span></span>
<span class="line">  <span class="token key atrule">spark-worker</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">image</span><span class="token punctuation">:</span> docker.io/bitnami/spark<span class="token punctuation">:</span><span class="token number">3.4</span></span>
<span class="line">    <span class="token key atrule">environment</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> SPARK_MODE=worker</span>
<span class="line">      <span class="token punctuation">-</span> SPARK_MASTER_URL=spark<span class="token punctuation">:</span>//spark<span class="token punctuation">:</span><span class="token number">7077</span></span>
<span class="line">      <span class="token punctuation">-</span> SPARK_WORKER_MEMORY=1G</span>
<span class="line">      <span class="token punctuation">-</span> SPARK_WORKER_CORES=1</span>
<span class="line">      <span class="token punctuation">-</span> SPARK_RPC_AUTHENTICATION_ENABLED=no</span>
<span class="line">      <span class="token punctuation">-</span> SPARK_RPC_ENCRYPTION_ENABLED=no</span>
<span class="line">      <span class="token punctuation">-</span> SPARK_LOCAL_STORAGE_ENCRYPTION_ENABLED=no</span>
<span class="line">      <span class="token punctuation">-</span> SPARK_SSL_ENABLED=no</span>
<span class="line">      <span class="token punctuation">-</span> SPARK_USER=spark</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>docker-compose up -d</p>
<h2 id="运行" tabindex="-1"><a class="header-anchor" href="#运行"><span>运行</span></a></h2>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">spark-submit <span class="token parameter variable">--master</span> spark://master:7077 <span class="token parameter variable">--class</span> org.apache.spark.examples.SparkPi /opt/bitnami/spark/examples/jars/spark-examples_2.12-3.4.3.jar <span class="token number">10</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></div></template>


