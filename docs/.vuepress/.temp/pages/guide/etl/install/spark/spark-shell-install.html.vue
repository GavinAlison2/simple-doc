<template><div><h1 id="spark-shell-quick-start" tabindex="-1"><a class="header-anchor" href="#spark-shell-quick-start"><span>Spark Shell Quick Start</span></a></h1>
<h2 id="启动-local-spark-shell" tabindex="-1"><a class="header-anchor" href="#启动-local-spark-shell"><span>启动 Local Spark Shell</span></a></h2>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">tar</span> <span class="token parameter variable">-zxvf</span> spark-3.5.1-bin-hadoop3.2.tgz <span class="token parameter variable">-C</span> /opt/</span>
<span class="line"><span class="token builtin class-name">cd</span> /opt/spark-3.5.1-bin-hadoop3.2</span>
<span class="line">./bin/spark-shell</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动成功之后可以查看 Web UI 的监控页面</p>
<p>http://localhost:4040/</p>
<h2 id="启动-remote-spark-shell" tabindex="-1"><a class="header-anchor" href="#启动-remote-spark-shell"><span>启动 Remote Spark Shell</span></a></h2>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">./bin/spark-shell <span class="token parameter variable">--master</span> spark://<span class="token operator">&lt;</span>master-ip<span class="token operator">></span>:7077</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="执行" tabindex="-1"><a class="header-anchor" href="#执行"><span>执行</span></a></h2>
<p>data/word.txt 文件内容如下：</p>
<div class="language-txt line-numbers-mode" data-highlighter="prismjs" data-ext="txt"><pre v-pre><code><span class="line">hello world</span>
<span class="line">scala spark</span>
<span class="line">hadoop mapreduce</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-scala line-numbers-mode" data-highlighter="prismjs" data-ext="scala"><pre v-pre><code><span class="line">scala<span class="token operator">></span> sc<span class="token punctuation">.</span>textFile<span class="token punctuation">(</span><span class="token string">"data/word.txt"</span><span class="token punctuation">)</span><span class="token punctuation">.</span>flatMap<span class="token punctuation">(</span>_<span class="token punctuation">.</span>split<span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>map<span class="token punctuation">(</span><span class="token punctuation">(</span>_<span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>reduceByKey<span class="token punctuation">(</span>_<span class="token operator">+</span>_<span class="token punctuation">)</span><span class="token punctuation">.</span>collect</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>输出结果：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">(hello,1)</span>
<span class="line">(world,1)</span>
<span class="line">(scala,1)</span>
<span class="line">(spark,1)</span>
<span class="line">(hadoop,1)</span>
<span class="line">(mapreduce,1)</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看 Web UI 的监控页面可以看到任务执行情况。
https://localhost:4040/</p>
<h2 id="停止-spark-shell" tabindex="-1"><a class="header-anchor" href="#停止-spark-shell"><span>停止 Spark Shell</span></a></h2>
<div class="language-scala line-numbers-mode" data-highlighter="prismjs" data-ext="scala"><pre v-pre><code><span class="line"><span class="token operator">:</span>quit</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></div></template>


