<template><div><h1 id="hadoop-安装-windows" tabindex="-1"><a class="header-anchor" href="#hadoop-安装-windows"><span>Hadoop 安装（Windows）</span></a></h1>
<p>Hello everyone, today we are going to to install Hadoop 3.3.0 on Windows 11.</p>
<h2 id="prerequisites" tabindex="-1"><a class="header-anchor" href="#prerequisites"><span>Prerequisites</span></a></h2>
<ol>
<li>Java 8 runtime environment (JRE)</li>
<li>Apache Hadoop 3.3.0</li>
</ol>
<h2 id="step-1-download-hadoop-binary-package" tabindex="-1"><a class="header-anchor" href="#step-1-download-hadoop-binary-package"><span>Step 1 - Download Hadoop binary package</span></a></h2>
<p>The first step is to download Hadoop binaries from the official website.
The binary package size is about 478M MB.</p>
<p>https://archive.apache.org/dist/hadoop/common/hadoop-3.3.0/hadoop-3.3.0.tar.gz</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">curl -O https://archive.apache.org/dist/hadoop/common/hadoop-3.3.0/hadoop-3.3.0.tar.gz</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="step-2-unpack-the-package" tabindex="-1"><a class="header-anchor" href="#step-2-unpack-the-package"><span>Step 2 - Unpack the package</span></a></h2>
<p>After finishing the file download, we should unpack the package using 7zip or command line.</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">D:</span>
<span class="line">cd D:\bigdata</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>we create the the directory</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">mkdir D:\bigdata\Hadoop</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>then run the following command to unzip:</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">tar -xvzf  hadoop-3.3.0.tar.gz -C D:\bigdata\Hadoop</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>The command will take quite a few minutes as there are numerous files included and the latest version introduced many new features.</p>
<p>After the unzip command is completed we have to install the Java.</p>
<h2 id="step-2-java-installation" tabindex="-1"><a class="header-anchor" href="#step-2-java-installation"><span>Step 2 -Java  installation</span></a></h2>
<p>Java is required to run Hadoop. If you have not installed Java , please install it.</p>
<p>You can install Java 8 from the following page <a href="https://www.oracle.com/it/java/technologies/javase/javase8-archive-downloads.html#license-lightbox" target="_blank" rel="noopener noreferrer">here</a>. I am choosing the Java <strong>SE Runtime Environment</strong> and I choose the Windows X64 version by
https://javadl.oracle.com/webapps/download/AutoDL?BundleId=247948_0ae14417abb444ebb02b9815e2103550</p>
<p>After finishing the file download we open a new command prompt, we should unpack the package</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">cd D:\tool </span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>we create the the directory</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">mkdir D:\tool\Java</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>then run the following command to unzip:</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">tar -xvzf  jre-8u361-windows-x64.tar.gz -C D:\tool\Java\</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="step-3-install-hadoop-native-io-binary" tabindex="-1"><a class="header-anchor" href="#step-3-install-hadoop-native-io-binary"><span>Step 3 - Install Hadoop native IO binary</span></a></h2>
<p>Hadoop on Linux includes optional Native IO support. However Native IO is mandatory on Windows and without it you will not be able to get your installation working. The Windows native IO libraries are not included as part of Apache Hadoop release. Thus we need to build and install it.</p>
<p>infoThe following repository already pre-built Hadoop Windows native libraries:</p>
<p>https://github.com/ruslanmv/How-to-install-Hadoop-on-Windows/tree/master/winutils/hadoop-3.3.0-YARN-8246/bin</p>
<p>warning These libraries are not signed and there is no guarantee that it is 100% safe. We use it purely for test&amp;learn purpose.</p>
<p>Download all the files in the following location and save them to the bin folder under Hadoop folder.</p>
<p>You can use Git by typing in your terminal</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">cd D:\bigdata</span>
<span class="line">git clone https://github.com/ruslanmv/How-to-install-Hadoop-on-Windows.git</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>and then copy</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">cd How-to-install-Hadoop-on-Windows\winutils\hadoop-3.3.0-YARN-8246\bin</span>
<span class="line">copy *.*  D:\bigdata\Hadoop\hadoop-3.3.0\bin</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="step-5-configure-environment-variables" tabindex="-1"><a class="header-anchor" href="#step-5-configure-environment-variables"><span>Step 5 - Configure environment variables</span></a></h2>
<p>Now we've downloaded and unpacked all the artefacts we need to configure two important environment variables.</p>
<p>First you click the windows button and type environment</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">JAVA_HOME=D:\tool\Java\jre1.8.0_361</span>
<span class="line">HADOOP_HOME=D:\bigdata\Hadoop\hadoop-3.3.0</span>
<span class="line">PATH=%PATH%;%JAVA_HOME%\bin;%HADOOP_HOME%\bin</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="verification-of-installation" tabindex="-1"><a class="header-anchor" href="#verification-of-installation"><span>Verification of Installation</span></a></h3>
<p>Once you complete the installation, Close your terminal window and open a new one and please run the following command  to verify:</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">java -version</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>you will have</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">java version "1.8.0_361"</span>
<span class="line">Java(TM) SE Runtime Environment (build 1.8.0_361-b09)</span>
<span class="line">Java HotSpot(TM) 64-Bit Server VM (build 25.361-b09, mixed mode)</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>You should also be able to run the following command:</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">hadoop -version</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">java version "1.8.0_361"</span>
<span class="line">Java(TM) SE Runtime Environment (build 1.8.0_361-b09)</span>
<span class="line">Java HotSpot(TM) 64-Bit Server VM (build 25.361-b09, mixed mode)</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Please verify that both versions of hadoop java and java coincide.</p>
<p>Finally directly to verify that our above steps are completed successfully:</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">winutils.exe </span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="step-6-configure-hadoop" tabindex="-1"><a class="header-anchor" href="#step-6-configure-hadoop"><span>Step 6 - Configure Hadoop</span></a></h2>
<p>Now we are ready to configure the most important part - Hadoop configurations which involves Core, YARN, MapReduce, HDFS configurations.</p>
<h3 id="configure-core-site" tabindex="-1"><a class="header-anchor" href="#configure-core-site"><span>Configure core site</span></a></h3>
<p>Edit file <strong>core-site.xml</strong> in %HADOOP_HOME%\etc\hadoop folder.</p>
<p>For my environment, the actual path is D:\bigdata\Hadoop\hadoop-3.3.0\etc\hadoop</p>
<p>Replace configuration element with the following:</p>
<div class="language-xml line-numbers-mode" data-highlighter="prismjs" data-ext="xml"><pre v-pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">></span></span></span>
<span class="line">   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span><span class="token punctuation">></span></span></span>
<span class="line">     <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">></span></span>fs.default.name<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">></span></span></span>
<span class="line">     <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>value</span><span class="token punctuation">></span></span>hdfs://0.0.0.0:19000<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>value</span><span class="token punctuation">></span></span></span>
<span class="line">   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="configure-hdfs" tabindex="-1"><a class="header-anchor" href="#configure-hdfs"><span>Configure HDFS</span></a></h3>
<p>Edit file <strong>hdfs-site.xml</strong> in %HADOOP_HOME%\etc\hadoop folder.</p>
<p>Before editing, please correct two folders in your system: one for namenode directory and another for data directory.  For my system, I created the following two sub folders:</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">mkdir D:\bigdata\Hadoop\hadoop-3.3.0\data\datanode</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">mkdir D:\bigdata\Hadoop\hadoop-3.3.0\data\namenode</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>Replace configuration element with the following (remember to replace the highlighted paths accordingly):</p>
<div class="language-xml line-numbers-mode" data-highlighter="prismjs" data-ext="xml"><pre v-pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">></span></span></span>
<span class="line">   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span><span class="token punctuation">></span></span></span>
<span class="line">     <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">></span></span>dfs.replication<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">></span></span></span>
<span class="line">     <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>value</span><span class="token punctuation">></span></span>1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>value</span><span class="token punctuation">></span></span></span>
<span class="line">   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span></span>
<span class="line">   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span><span class="token punctuation">></span></span></span>
<span class="line">     <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">></span></span>dfs.namenode.name.dir<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">></span></span></span>
<span class="line">     <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>value</span><span class="token punctuation">></span></span>file://D:/bigdata/Hadoop/hadoop-3.3.0/data/namenode<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>value</span><span class="token punctuation">></span></span></span>
<span class="line">   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span></span>
<span class="line">   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span><span class="token punctuation">></span></span></span>
<span class="line">     <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">></span></span>dfs.datanode.data.dir<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">></span></span></span>
<span class="line">     <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>value</span><span class="token punctuation">></span></span>file://D:/bigdata/Hadoop/hadoop-3.3.0/data/datanode<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>value</span><span class="token punctuation">></span></span></span>
<span class="line">   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="configure-mapreduce-and-yarn-site" tabindex="-1"><a class="header-anchor" href="#configure-mapreduce-and-yarn-site"><span>Configure MapReduce and YARN site</span></a></h3>
<p>Edit file <strong>mapred-site.xml</strong> in %HADOOP_HOME%\etc\hadoop folder.</p>
<p>Replace configuration element with the following:</p>
<div class="language-xml line-numbers-mode" data-highlighter="prismjs" data-ext="xml"><pre v-pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">></span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span><span class="token punctuation">></span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">></span></span>mapreduce.framework.name<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">></span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>value</span><span class="token punctuation">></span></span>yarn<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>value</span><span class="token punctuation">></span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span><span class="token punctuation">></span></span> </span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">></span></span>mapreduce.application.classpath<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">></span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>value</span><span class="token punctuation">></span></span>%HADOOP_HOME%/share/hadoop/mapreduce/*,%HADOOP_HOME%/share/hadoop/mapreduce/lib/*,%HADOOP_HOME%/share/hadoop/common/*,%HADOOP_HOME%/share/hadoop/common/lib/*,%HADOOP_HOME%/share/hadoop/yarn/*,%HADOOP_HOME%/share/hadoop/yarn/lib/*,%HADOOP_HOME%/share/hadoop/hdfs/*,%HADOOP_HOME%/share/hadoop/hdfs/lib/*<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>value</span><span class="token punctuation">></span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Edit file <strong>yarn-site.xml</strong> in %HADOOP_HOME%\etc\hadoop folder.</p>
<div class="language-xml line-numbers-mode" data-highlighter="prismjs" data-ext="xml"><pre v-pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">></span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span><span class="token punctuation">></span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">></span></span>yarn.nodemanager.aux-services<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">></span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>value</span><span class="token punctuation">></span></span>mapreduce_shuffle<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>value</span><span class="token punctuation">></span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span><span class="token punctuation">></span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">></span></span>yarn.nodemanager.env-whitelist<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">></span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>value</span><span class="token punctuation">></span></span>JAVA_HOME,HADOOP_COMMON_HOME,HADOOP_HDFS_HOME,HADOOP_CONF_DIR,CLASSPATH_PREPEND_DISTCACHE,HADOOP_YARN_HOME,HADOOP_MAPRED_HOME<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>value</span><span class="token punctuation">></span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="step-7-initialise-hdfs" tabindex="-1"><a class="header-anchor" href="#step-7-initialise-hdfs"><span>Step 7 - Initialise HDFS</span></a></h3>
<p>Run the following command in Command Prompt</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">hdfs namenode -format</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>The following is an example when it is formatted successfully:</p>
<h3 id="step-8-start-hdfs-daemons" tabindex="-1"><a class="header-anchor" href="#step-8-start-hdfs-daemons"><span>Step 8 - Start HDFS daemons</span></a></h3>
<p>Run the following command to start HDFS daemons in Command Prompt:</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">%HADOOP_HOME%\sbin\start-dfs.cmd</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>Verify HDFS web portal UI through this link: http://localhost:9870/dfshealth.html#tab-overview.</p>
<p>You can also navigate to a data node UI:</p>
<h3 id="step-9-start-yarn-daemons" tabindex="-1"><a class="header-anchor" href="#step-9-start-yarn-daemons"><span>Step 9 - Start YARN daemons</span></a></h3>
<p>warning You may encounter permission issues if you start YARN daemons using normal user. To ensure you don't encounter any issues. Please open a Command Prompt window using Run as administrator.</p>
<p>Run the following command in an elevated Command Prompt window (Run as administrator) to start YARN daemons:</p>
<p>modify the following line in start-yarn.cmd file:</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">start "Apache Hadoop Distribution" %HADOOP_BIN_PATH%\..\bin\yarn resourcemanager</span>
<span class="line">start "Apache Hadoop Distribution" %HADOOP_BIN_PATH%\..\bin\yarn nodemanager</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>notice: if you are installing nodejs, you may encounter permission issues. To resolve this, you can modify the following line to your start-yarn.cmd file:</p>
<p>start yarn.cmd</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">%HADOOP_HOME%\sbin\start-yarn.cmd</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>Similarly two Command Prompt windows will open and YARN daemons will start.</p>
<p>You can verify YARN resource manager UI when all services are started successfully.</p>
<p>http://localhost:8088</p>
<h2 id="脚本-script" tabindex="-1"><a class="header-anchor" href="#脚本-script"><span>脚本 script</span></a></h2>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">curl -O https://archive.apache.org/dist/hadoop/common/hadoop-3.3.0/hadoop-3.3.0.tar.gz</span>
<span class="line">tar -xvzf  hadoop-3.3.0.tar.gz -C D:\bigdata\Hadoop</span>
<span class="line"></span>
<span class="line">cd D:\tool </span>
<span class="line">mkdir D:\tool\Java</span>
<span class="line">tar -xvzf  jre-8u361-windows-x64.tar.gz -C D:\tool\Java\</span>
<span class="line"></span>
<span class="line">cd D:\bigdata\Hadoop\hadoop-3.3.0\bin</span>
<span class="line">copy *.*  D:\bigdata\Hadoop\hadoop-3.3.0\bin</span>
<span class="line"></span>
<span class="line">setx JAVA_HOME "D:\tool\Java\jre1.8.0_361"</span>
<span class="line">setx HADOOP_HOME "D:\bigdata\Hadoop\hadoop-3.3.0"</span>
<span class="line">setx PATH "%PATH%;%JAVA_HOME%\bin;%HADOOP_HOME%\bin"</span>
<span class="line"></span>
<span class="line">mkdir D:\bigdata\Hadoop\hadoop-3.3.0\data\datanode</span>
<span class="line">mkdir D:\bigdata\Hadoop\hadoop-3.3.0\data\namenode</span>
<span class="line"></span>
<span class="line">hdfs namenode -format</span>
<span class="line"></span>
<span class="line">cd D:\bigdata\Hadoop\hadoop-3.3.0\etc\hadoop</span>
<span class="line">notepad core-site.xml</span>
<span class="line"></span>
<span class="line">---</span>
<span class="line">&lt;configuration></span>
<span class="line">   &lt;property></span>
<span class="line">     &lt;name>fs.default.name&lt;/name></span>
<span class="line">     &lt;value>hdfs://0.0.0.0:19000&lt;/value></span>
<span class="line">   &lt;/property></span>
<span class="line">&lt;/configuration></span>
<span class="line">---</span>
<span class="line"></span>
<span class="line">notepad hdfs-site.xml</span>
<span class="line"></span>
<span class="line">---</span>
<span class="line">&lt;configuration></span>
<span class="line">   &lt;property></span>
<span class="line">     &lt;name>dfs.replication&lt;/name></span>
<span class="line">     &lt;value>1&lt;/value></span>
<span class="line">   &lt;/property></span>
<span class="line">   &lt;property></span>
<span class="line">     &lt;name>dfs.namenode.name.dir&lt;/name></span>
<span class="line">     &lt;value>file://D:/bigdata/Hadoop/hadoop-3.3.0/data/namenode&lt;/value></span>
<span class="line">   &lt;/property></span>
<span class="line">   &lt;property></span>
<span class="line">     &lt;name>dfs.datanode.data.dir&lt;/name></span>
<span class="line">     &lt;value>file://D:/bigdata/Hadoop/hadoop-3.3.0/data/datanode&lt;/value></span>
<span class="line">   &lt;/property></span>
<span class="line">&lt;/configuration></span>
<span class="line">---</span>
<span class="line"></span>
<span class="line">notepad mapred-site.xml</span>
<span class="line"></span>
<span class="line">---</span>
<span class="line">&lt;configuration></span>
<span class="line">    &lt;property></span>
<span class="line">        &lt;name>mapreduce.framework.name&lt;/name></span>
<span class="line">        &lt;value>yarn&lt;/value></span>
<span class="line">    &lt;/property></span>
<span class="line">    &lt;property> </span>
<span class="line">        &lt;name>mapreduce.application.classpath&lt;/name></span>
<span class="line">        &lt;value>%HADOOP_HOME%/share/hadoop/mapreduce/*,%HADOOP_HOME%/share/hadoop/mapreduce/lib/*,%HADOOP_HOME%/share/hadoop/common/*,%HADOOP_HOME%/share/hadoop/common/lib/*,%HADOOP_HOME%/share/hadoop/yarn/*,%HADOOP_HOME%/share/hadoop/yarn/lib/*,%HADOOP_HOME%/share/hadoop/hdfs/*,%HADOOP_HOME%/share/hadoop/hdfs/lib/*&lt;/value></span>
<span class="line">    &lt;/property></span>
<span class="line">&lt;/configuration></span>
<span class="line">---</span>
<span class="line"></span>
<span class="line">notepad yarn-site.xml</span>
<span class="line"></span>
<span class="line">---</span>
<span class="line">&lt;configuration></span>
<span class="line">    &lt;property></span>
<span class="line">        &lt;name>yarn.nodemanager.aux-services&lt;/name></span>
<span class="line">        &lt;value>mapreduce_shuffle&lt;/value></span>
<span class="line">    &lt;/property></span>
<span class="line">    &lt;property></span>
<span class="line">        &lt;name>yarn.nodemanager.env-whitelist&lt;/name></span>
<span class="line">        &lt;value>JAVA_HOME,HADOOP_COMMON_HOME,HADOOP_HDFS_HOME,HADOOP_CONF_DIR,CLASSPATH_PREPEND_DISTCACHE,HADOOP_YARN_HOME,HADOOP_MAPRED_HOME&lt;/value></span>
<span class="line">    &lt;/property></span>
<span class="line">&lt;/configuration></span>
<span class="line">---</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">%HADOOP_HOME%\sbin\start-dfs.cmd</span>
<span class="line"></span>
<span class="line">%HADOOP_HOME%\sbin\start-yarn.cmd   </span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>UI will look:</p>
<ol>
<li>http://localhost:9870</li>
<li>http://localhost:8088</li>
</ol>
</div></template>


