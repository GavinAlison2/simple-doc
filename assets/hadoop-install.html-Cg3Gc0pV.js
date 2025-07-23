import{_ as n,c as a,e,o as l}from"./app-DzmgiGLk.js";const i={};function d(t,s){return l(),a("div",null,s[0]||(s[0]=[e(`<h1 id="hadoop-install" tabindex="-1"><a class="header-anchor" href="#hadoop-install"><span>Hadoop Install</span></a></h1><h2 id="_1-download" tabindex="-1"><a class="header-anchor" href="#_1-download"><span>1. download</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">cd /opt/soft/bigdata</span>
<span class="line">curl -O https://archive.apache.org/dist/hadoop/common/hadoop-3.3.0/hadoop-3.3.0.tar.gz</span>
<span class="line">tar -zxvf hadoop-3.3.0.tar.gz  </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>notice: required, java, java enviroment</p><p><code>java -version</code></p><h2 id="_2-如果以-其他用户启动-hadoop" tabindex="-1"><a class="header-anchor" href="#_2-如果以-其他用户启动-hadoop"><span>2. 如果以 其他用户启动 Hadoop</span></a></h2><p>则需要修改 hadoop-env.sh 文件，设置 HADOOP_SECURE_DN_USER 变量为启动 Hadoop 的用户。</p><p>先配置用户</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">useradd hive</span>
<span class="line">passwd hive</span>
<span class="line">hive</span>
<span class="line"></span>
<span class="line">usermod -aG wheel hive</span>
<span class="line"></span>
<span class="line">su hive</span>
<span class="line"></span>
<span class="line">ssh-keygen -t rsa -P &#39;&#39; -f ~/.ssh/id_rsa</span>
<span class="line"></span>
<span class="line">cat ~/.ssh/id_rsa.pub &gt;&gt; ~/.ssh/authorized_keys</span>
<span class="line">chmod 0600 ~/.ssh/authorized_keys</span>
<span class="line"></span>
<span class="line">ssh localhost</span>
<span class="line">exit</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-以-root-用户启动-hadoop" tabindex="-1"><a class="header-anchor" href="#_3-以-root-用户启动-hadoop"><span>3. 以 root 用户启动 Hadoop</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">ssh-keygen -t rsa -P &#39;&#39; -f ~/.ssh/id_rsa</span>
<span class="line"></span>
<span class="line">cat ~/.ssh/id_rsa.pub &gt;&gt; ~/.ssh/authorized_keys</span>
<span class="line">chmod 0600 ~/.ssh/authorized_keys</span>
<span class="line"></span>
<span class="line">ssh localhost</span>
<span class="line">exit</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-setup-enrvironment" tabindex="-1"><a class="header-anchor" href="#_4-setup-enrvironment"><span>4. setup enrvironment</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">cat &lt;&lt;-&#39;EOF&#39; | tee -a ~/.bashrc </span>
<span class="line">export HADOOP_HOME=/opt/soft/bigdata/hadoop-3.3.0</span>
<span class="line">export PATH=$PATH:$HADOOP_HOME/bin:$HADOOP_HOME/sbin</span>
<span class="line">export JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.432.b06-1.0.1.el7_9.x86_64/jre</span>
<span class="line">EOF</span>
<span class="line"></span>
<span class="line">source ~/.bashrc</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-xml-config" tabindex="-1"><a class="header-anchor" href="#_5-xml-config"><span>5. xml config</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">cd /opt/soft/bigdata/hadoop-3.3.0/etc/hadoop/</span>
<span class="line">#配置 core-site.xml</span>
<span class="line"></span>
<span class="line">&lt;configuration&gt;</span>
<span class="line">  &lt;property&gt;</span>
<span class="line">    &lt;name&gt;fs.default.name&lt;/name&gt;</span>
<span class="line">    &lt;value&gt;hdfs://0.0.0.0:19000&lt;/value&gt;</span>
<span class="line">  &lt;/property&gt;</span>
<span class="line">  &lt;property&gt;</span>
<span class="line">    &lt;name&gt;hadoop.http.staticuser.user&lt;/name&gt;</span>
<span class="line">    &lt;value&gt;root&lt;/value&gt;</span>
<span class="line">  &lt;/property&gt;</span>
<span class="line">  &lt;property&gt;</span>
<span class="line">    &lt;name&gt;dfs.permissions.enabled&lt;/name&gt;</span>
<span class="line">    &lt;value&gt;false&lt;/value&gt;</span>
<span class="line">  &lt;/property&gt;</span>
<span class="line">  &lt;property&gt;</span>
<span class="line">    &lt;name&gt;hadoop.proxyuser.hive.groups&lt;/name&gt;</span>
<span class="line">    &lt;value&gt;*&lt;/value&gt;</span>
<span class="line">  &lt;/property&gt;</span>
<span class="line"></span>
<span class="line">  &lt;property&gt;</span>
<span class="line">      &lt;name&gt;hadoop.proxyuser.hive.hosts&lt;/name&gt;</span>
<span class="line">      &lt;value&gt;*&lt;/value&gt;</span>
<span class="line">  &lt;/property&gt;</span>
<span class="line">&lt;/configuration&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-configure-hdfs" tabindex="-1"><a class="header-anchor" href="#_6-configure-hdfs"><span>6. Configure HDFS</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">cd /opt/soft/bigdata/hadoop-3.3.0/</span>
<span class="line">mkdir -p data/namenode</span>
<span class="line">mkdir -p data/datanode</span>
<span class="line"></span>
<span class="line">#配置 hdfs-site.xml</span>
<span class="line"></span>
<span class="line">&lt;configuration&gt;</span>
<span class="line">   &lt;property&gt;</span>
<span class="line">     &lt;name&gt;dfs.name.dir&lt;/name&gt;</span>
<span class="line">     &lt;value&gt;file:///opt/soft/bigdata/hadoop-3.3.0/data/namenode&lt;/value&gt;</span>
<span class="line">   &lt;/property&gt;</span>
<span class="line">   &lt;property&gt;</span>
<span class="line">     &lt;name&gt;dfs.data.dir&lt;/name&gt;</span>
<span class="line">     &lt;value&gt;file:///opt/soft/bigdata/hadoop-3.3.0/data/datanode&lt;/value&gt;</span>
<span class="line">   &lt;/property&gt;</span>
<span class="line"></span>
<span class="line">   &lt;property&gt;</span>
<span class="line">     &lt;name&gt;dfs.replication&lt;/name&gt;</span>
<span class="line">     &lt;value&gt;1&lt;/value&gt;</span>
<span class="line">   &lt;/property&gt;</span>
<span class="line">&lt;/configuration&gt;</span>
<span class="line"></span>
<span class="line"># 配置 core-site.xml</span>
<span class="line"></span>
<span class="line">&lt;configuration&gt;</span>
<span class="line">   &lt;property&gt;</span>
<span class="line">     &lt;name&gt;fs.default.name&lt;/name&gt;</span>
<span class="line">     &lt;value&gt;hdfs://0.0.0.0:19000&lt;/value&gt;</span>
<span class="line">   &lt;/property&gt;</span>
<span class="line">&lt;/configuration&gt;</span>
<span class="line"></span>
<span class="line"># 配置 yarn-site.xml</span>
<span class="line"></span>
<span class="line">&lt;configuration&gt;</span>
<span class="line">   &lt;property&gt;</span>
<span class="line">        &lt;name&gt;yarn.nodemanager.aux-services&lt;/name&gt;</span>
<span class="line">        &lt;value&gt;mapreduce_shuffle&lt;/value&gt;</span>
<span class="line">    &lt;/property&gt;</span>
<span class="line">    &lt;property&gt;</span>
<span class="line">        &lt;name&gt;yarn.nodemanager.env-whitelist&lt;/name&gt;</span>
<span class="line">        &lt;value&gt;JAVA_HOME,HADOOP_COMMON_HOME,HADOOP_HDFS_HOME,HADOOP_CONF_DIR,CLASSPATH_PREPEND_DISTCACHE,HADOOP_YARN_HOME,HADOOP_MAPRED_HOME&lt;/value&gt;</span>
<span class="line">    &lt;/property&gt;</span>
<span class="line">&lt;/configuration&gt;</span>
<span class="line"></span>
<span class="line"># 配置 mapred-site.xml</span>
<span class="line"></span>
<span class="line">&lt;configuration&gt;</span>
<span class="line">    &lt;property&gt;</span>
<span class="line">        &lt;name&gt;mapreduce.framework.name&lt;/name&gt;</span>
<span class="line">        &lt;value&gt;yarn&lt;/value&gt;</span>
<span class="line">    &lt;/property&gt;</span>
<span class="line">    &lt;property&gt; </span>
<span class="line">        &lt;name&gt;mapreduce.application.classpath&lt;/name&gt;</span>
<span class="line">        &lt;value&gt;%HADOOP_HOME%/share/hadoop/mapreduce/*,%HADOOP_HOME%/share/hadoop/mapreduce/lib/*,%HADOOP_HOME%/share/hadoop/common/*,%HADOOP_HOME%/share/hadoop/common/lib/*,%HADOOP_HOME%/share/hadoop/yarn/*,%HADOOP_HOME%/share/hadoop/yarn/lib/*,%HADOOP_HOME%/share/hadoop/hdfs/*,%HADOOP_HOME%/share/hadoop/hdfs/lib/*&lt;/value&gt;</span>
<span class="line">    &lt;/property&gt;</span>
<span class="line">&lt;/configuration&gt;</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-如果以root-用户启动" tabindex="-1"><a class="header-anchor" href="#_7-如果以root-用户启动"><span>7. 如果以root 用户启动</span></a></h2><p>则需要修改 hadoop-env.sh 文件，设置 HADOOP_SECURE_DN_USER 变量为启动 Hadoop 的用户。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">#配置 hadoop-env.sh</span>
<span class="line"></span>
<span class="line">#修改start-yarn.sh 和 stop-yarn.sh</span>
<span class="line">#设置以下参数，尽量在脚本靠前部分，保证变量生效</span>
<span class="line">YARN_RESOURCEMANAGER_USER=root</span>
<span class="line">YARN_NODEMANAGER_USER=root</span>
<span class="line"></span>
<span class="line">#修改start-dfs.sh 和 stop-dfs.sh</span>
<span class="line">HDFS_DATANODE_USER=root</span>
<span class="line">#HDFS_DATANODE_SECURE_USER=hive# 这千万不可填</span>
<span class="line">HDFS_NAMENODE_USER=root</span>
<span class="line">HDFS_SECONDARYNAMENODE_USER=root</span>
<span class="line"></span>
<span class="line"># 设置 NameNode 最大堆内存为 1GB</span>
<span class="line">export HDFS_NAMENODE_OPTS=&quot;-Xmx1g $HDFS_NAMENODE_OPTS&quot;</span>
<span class="line"></span>
<span class="line"># 设置 DataNode 最大堆内存为 512MB</span>
<span class="line">export HDFS_DATANODE_OPTS=&quot;-Xmx512m $HDFS_DATANODE_OPTS&quot;</span>
<span class="line"></span>
<span class="line"># 设置 SecondaryNameNode 最大堆内存为 512MB</span>
<span class="line">export HDFS_SECONDARYNAMENODE_OPTS=&quot;-Xmx512m $HDFS_SECONDARYNAMENODE_OPTS&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="问题-datanode-启动失败" tabindex="-1"><a class="header-anchor" href="#问题-datanode-启动失败"><span>问题: DataNode 启动失败</span></a></h2><p>一定不要配置 hadoop-env.sh 中的 HADOOP_SECURE_DN_USER 变量，否则 DataNode 启动失败。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">localhost: ERROR: Cannot set priority of datanode process</span>
<span class="line"></span>
<span class="line">调整内核参数</span>
<span class="line">cat &gt;&gt;  /etc/sysctl.conf  &lt;&lt;EOF</span>
<span class="line">kernel.sched_rt_runtime_us = -1</span>
<span class="line">EOF</span>
<span class="line"></span>
<span class="line">sysctl -p</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="initialise-hdfs" tabindex="-1"><a class="header-anchor" href="#initialise-hdfs"><span>Initialise HDFS</span></a></h2><ol><li>format namenode</li></ol><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">cd /opt/soft/bigdata/hadoop-3.3.0/</span>
<span class="line">bin/hdfs namenode -format</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>start namenode and datanode</li></ol><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">./sbin/start-dfs.sh</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="start-yarn" tabindex="-1"><a class="header-anchor" href="#start-yarn"><span>Start YARN</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">./sbin/start-yarn.sh</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="test" tabindex="-1"><a class="header-anchor" href="#test"><span>Test</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">bin/hdfs dfs -mkdir /user</span>
<span class="line">bin/hdfs dfs -mkdir /user/root</span>
<span class="line">bin/hdfs dfs -put /etc/passwd /user/root/</span>
<span class="line">bin/hdfs dfs -ls /user/root/</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ui-test" tabindex="-1"><a class="header-anchor" href="#ui-test"><span>UI Test</span></a></h2><ol><li>http://localhost:9870</li><li>http://localhost:8088</li></ol><div class="language-hadoop-2.7.3 line-numbers-mode" data-highlighter="prismjs" data-ext="hadoop-2.7.3"><pre><code><span class="line">1. localhost:50070</span>
<span class="line">2. localhost:8088</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div>`,35)]))}const r=n(i,[["render",d]]),c=JSON.parse('{"path":"/guide/etl/install/hadoop-install.html","title":"Hadoop Install","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"1. download","slug":"_1-download","link":"#_1-download","children":[]},{"level":2,"title":"2. 如果以 其他用户启动 Hadoop","slug":"_2-如果以-其他用户启动-hadoop","link":"#_2-如果以-其他用户启动-hadoop","children":[]},{"level":2,"title":"3. 以 root 用户启动 Hadoop","slug":"_3-以-root-用户启动-hadoop","link":"#_3-以-root-用户启动-hadoop","children":[]},{"level":2,"title":"4. setup enrvironment","slug":"_4-setup-enrvironment","link":"#_4-setup-enrvironment","children":[]},{"level":2,"title":"5. xml config","slug":"_5-xml-config","link":"#_5-xml-config","children":[]},{"level":2,"title":"6. Configure HDFS","slug":"_6-configure-hdfs","link":"#_6-configure-hdfs","children":[]},{"level":2,"title":"7. 如果以root 用户启动","slug":"_7-如果以root-用户启动","link":"#_7-如果以root-用户启动","children":[]},{"level":2,"title":"问题: DataNode 启动失败","slug":"问题-datanode-启动失败","link":"#问题-datanode-启动失败","children":[]},{"level":2,"title":"Initialise HDFS","slug":"initialise-hdfs","link":"#initialise-hdfs","children":[]},{"level":2,"title":"Start YARN","slug":"start-yarn","link":"#start-yarn","children":[]},{"level":2,"title":"Test","slug":"test","link":"#test","children":[]},{"level":2,"title":"UI Test","slug":"ui-test","link":"#ui-test","children":[]}],"git":{"updatedTime":1744649093000,"contributors":[{"name":"alice","username":"alice","email":"921757697@qq.com","commits":1,"url":"https://github.com/alice"}],"changelog":[{"hash":"dbc8fce7f951c4a919f1b3e3e4548a92c08bdeba","time":1744649093000,"email":"921757697@qq.com","author":"alice","message":"deploy"}]},"filePathRelative":"guide/etl/install/hadoop-install.md"}');export{r as comp,c as data};
