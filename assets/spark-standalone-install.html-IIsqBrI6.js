import{_ as n,c as a,e,o as l}from"./app-DQJzW1CO.js";const i={};function r(p,s){return l(),a("div",null,s[0]||(s[0]=[e(`<h1 id="spark-standalone-installation" tabindex="-1"><a class="header-anchor" href="#spark-standalone-installation"><span>Spark Standalone Installation</span></a></h1><p>独立部署（Standalone）模式。Spark 的 Standalone 模式体现了经典的 master-slave 模式。 master node: 负责调度 worker node: 负责执行任务</p><p>集群规划:</p><ul><li>linux1, worker1, master</li><li>linux2, worker2</li><li>linux3, worker3</li></ul><h2 id="准备工作" tabindex="-1"><a class="header-anchor" href="#准备工作"><span>准备工作</span></a></h2><ul><li>安装JDK</li><li>安装Spark</li><li>配置环境变量</li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">vi /etc/hosts</span>
<span class="line"></span>
<span class="line">192.168.1.101 linux1</span>
<span class="line">192.168.1.102 linux2</span>
<span class="line">192.168.1.103 linux3</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">cd /opt</span>
<span class="line">wget https://archive.apache.org/dist/spark/spark-3.4.1/spark-3.4.1-bin-hadoop3.tgz</span>
<span class="line">tar -zxvf spark-3.4.1-bin-hadoop3.tgz </span>
<span class="line">mv spark-3.4.1-bin-hadoop3 spark</span>
<span class="line">cp spark-env.sh.template spark-env.sh </span>
<span class="line">vi spark-env.sh</span>
<span class="line"></span>
<span class="line">export JAVA_HOME=/opt/module/jdk1.8.0_144</span>
<span class="line">export SPARK_MASTER_HOST=linux1</span>
<span class="line">export SPARK_MASTER_PORT=7077</span>
<span class="line"></span>
<span class="line">cp workers.template workers</span>
<span class="line">vi workers</span>
<span class="line"></span>
<span class="line">linux1</span>
<span class="line">linux2</span>
<span class="line">linux3</span>
<span class="line"></span>
<span class="line">#分发到其他linux节点</span>
<span class="line">scp -r /opt/spark linux2:/opt/</span>
<span class="line">scp -r /opt/spark linux3:/opt/</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="启动spark" tabindex="-1"><a class="header-anchor" href="#启动spark"><span>启动Spark</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">cd /opt/spark</span>
<span class="line">sbin/start-all.sh</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="验证spark" tabindex="-1"><a class="header-anchor" href="#验证spark"><span>验证Spark</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">jps</span>
<span class="line"></span>
<span class="line">================linux1================</span>
<span class="line">3330 Jps</span>
<span class="line">3238 Worker</span>
<span class="line">3163 Master</span>
<span class="line"></span>
<span class="line">================linux2================</span>
<span class="line">2966 Jps</span>
<span class="line">2908 Worker</span>
<span class="line"></span>
<span class="line">================linux3================</span>
<span class="line">2978 Worker</span>
<span class="line">3036 Jps</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看 Master 资源监控 Web UI 界面: http://linux1:8080</p><p>如果看到spark-master, spark-worker, spark-submit等进程，说明启动成功。</p><h2 id="提交应用" tabindex="-1"><a class="header-anchor" href="#提交应用"><span>提交应用</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">cd /opt/spark</span>
<span class="line">./bin/spark-submit </span>
<span class="line">--class org.apache.spark.examples.SparkPi </span>
<span class="line">--master spark://linux1:7077 </span>
<span class="line">/opt/spark/examples/jars/spark-examples_2.12-3.4.1.jar </span>
<span class="line">10</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="停止spark" tabindex="-1"><a class="header-anchor" href="#停止spark"><span>停止Spark</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">sbin/stop-all.sh</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div>`,18)]))}const c=n(i,[["render",r]]),t=JSON.parse('{"path":"/guide/etl/install/spark/spark-standalone-install.html","title":"Spark Standalone Installation","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"准备工作","slug":"准备工作","link":"#准备工作","children":[]},{"level":2,"title":"启动Spark","slug":"启动spark","link":"#启动spark","children":[]},{"level":2,"title":"验证Spark","slug":"验证spark","link":"#验证spark","children":[]},{"level":2,"title":"提交应用","slug":"提交应用","link":"#提交应用","children":[]},{"level":2,"title":"停止Spark","slug":"停止spark","link":"#停止spark","children":[]}],"git":{"updatedTime":1744888563000,"contributors":[{"name":"alice","username":"alice","email":"921757697@qq.com","commits":1,"url":"https://github.com/alice"}],"changelog":[{"hash":"d0aa97b762c5a828ab8e3a7802989f2039337caf","time":1744888563000,"email":"921757697@qq.com","author":"alice","message":"deploy"}]},"filePathRelative":"guide/etl/install/spark/spark-standalone-install.md"}');export{c as comp,t as data};
