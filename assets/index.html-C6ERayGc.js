import{_ as n,c as i,d as e,o as a}from"./app-DeX_0EAQ.js";const l={};function d(p,s){return a(),i("div",null,s[0]||(s[0]=[e(`<h1 id="环境搭建" tabindex="-1"><a class="header-anchor" href="#环境搭建"><span>环境搭建</span></a></h1><h2 id="安装系统" tabindex="-1"><a class="header-anchor" href="#安装系统"><span>安装系统</span></a></h2><ol><li>安装centos7系统</li><li>配置好网络</li><li>配置yum源</li><li>安装git</li><li>安装node.js, python, docker 等软件</li></ol><p>其中对应的脚本文件如下：</p><p>1-modify_font.sh</p><div class="language-modify_font.sh line-numbers-mode" data-highlighter="prismjs" data-ext="modify_font.sh"><pre><code><span class="line">#!/bin/bash</span>
<span class="line"></span>
<span class="line">cat &gt; /etc/init.d/set_font.sh &lt;&lt;EOF</span>
<span class="line">#!/bin/bash</span>
<span class="line">setfont sun12x22.psfu.gz</span>
<span class="line">EOF</span>
<span class="line">chmod +x /etc/init.d/set_font.sh</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2-modify_yum_repo.sh</p><div class="language-modify_yum_repo.sh line-numbers-mode" data-highlighter="prismjs" data-ext="modify_yum_repo.sh"><pre><code><span class="line">#!/bin/bash</span>
<span class="line">mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup</span>
<span class="line">curl -o /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-7.repo</span>
<span class="line">curl -o /etc/yum.repos.d/epel.repo https://mirrors.aliyun.com/repo/epel-7.repo</span>
<span class="line">cd /etc/yum.repos.d</span>
<span class="line"></span>
<span class="line">sed -i &#39;s/$releasever/7.9.2009/g&#39; CentOs-Base.repo</span>
<span class="line">sed -i &#39;s/http/https/g&#39; *.repo</span>
<span class="line">sed -i &#39;s/httpss/https/g&#39; *.repo</span>
<span class="line"></span>
<span class="line">yum clean all</span>
<span class="line">yum makecache </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3-add_dns.sh</p><div class="language-add_dns.sh line-numbers-mode" data-highlighter="prismjs" data-ext="add_dns.sh"><pre><code><span class="line">#!/bin/bash</span>
<span class="line"></span>
<span class="line">cat &gt;&gt; /etc/resolv.conf &lt;&lt; &quot;EOF&quot;</span>
<span class="line">nameserver 8.8.8.8</span>
<span class="line">nameserver 8.8.4.4</span>
<span class="line">nameserver 114.114.114.114</span>
<span class="line">EOF</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4-install_git.sh</p><div class="language-install_base.sh line-numbers-mode" data-highlighter="prismjs" data-ext="install_base.sh"><pre><code><span class="line">#!/bin/bash</span>
<span class="line"></span>
<span class="line">yum -y install net-tools  wget </span>
<span class="line">yum -y install tree nmap dos2unix lrzsz nc lsof wget tcpdump htop iftop iotop sysstat nethogs </span>
<span class="line">yum -y install psmisc net-tools bash-completion vim-enhanced </span>
<span class="line">yum -y install epel-release</span>
<span class="line">yum -y groupinstall &quot;Development Tools&quot; </span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>5-install_py3.sh</p><div class="language-install_py3.sh line-numbers-mode" data-highlighter="prismjs" data-ext="install_py3.sh"><pre><code><span class="line">#!/bin/bash</span>
<span class="line"></span>
<span class="line">cd /root</span>
<span class="line"># wget https://www.python.org/ftp/python/3.11.0/Python-3.11.0.tgz</span>
<span class="line">wget https://mirrors.huaweicloud.com/python/3.11.0/Python-3.11.0.tgz</span>
<span class="line">tar -xzf Python-3.11.0.tgz</span>
<span class="line">yum -y install gcc zlib zlib-devel libffi libffi-devel</span>
<span class="line">yum -y install readline-devel</span>
<span class="line">yum -y install openssl-devel openssl11 openssl11-devel</span>
<span class="line">export CFLAGS=$(pkg-config --cflags openssl11)</span>
<span class="line">export LDFLAGS=$(pkg-config --libs openssl11)</span>
<span class="line">cd /root/Python-3.11.0</span>
<span class="line">./configure --prefix=/usr/python --with-ssl</span>
<span class="line">make</span>
<span class="line">make install</span>
<span class="line">ln -s /usr/python/bin/python3 /usr/bin/python3</span>
<span class="line">ln -s /usr/python/bin/pip3 /usr/bin/pip3</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">cd /usr/bin</span>
<span class="line">rm -rf /usr/bin/python</span>
<span class="line">rm -rf /usr/bin/pip</span>
<span class="line">ln -s /usr/bin/python3 /usr/bin/python</span>
<span class="line">ln -s /usr/bin/pip3 /usr/bin/pip</span>
<span class="line"></span>
<span class="line">sed -i &#39;s/python$/python2/g&#39; /usr/bin/yum</span>
<span class="line">sed -i &#39;s/python$/python2/g&#39; /usr/libexec/urlgrabber-ext-down</span>
<span class="line"></span>
<span class="line">/usr/python/bin/python3.11 -m pip install --upgrade pip</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>6-install_git_mvn.sh</p><div class="language-install_git_mvn.sh line-numbers-mode" data-highlighter="prismjs" data-ext="install_git_mvn.sh"><pre><code><span class="line"></span>
<span class="line">#!/bin/bash</span>
<span class="line"></span>
<span class="line">yum -y install git</span>
<span class="line"></span>
<span class="line">yum -y remove java-1.8.*</span>
<span class="line">yum -y install java-1.8.0-openjdk-devel</span>
<span class="line"></span>
<span class="line">cd /opt/</span>
<span class="line">wget https://dlcdn.apache.org/maven/maven-3/3.9.9/binaries/apache-maven-3.9.9-bin.tar.gz</span>
<span class="line">tar -zxvf apache-maven-3.9.9-bin.tar.gz</span>
<span class="line">mv apache-maven-3.9.9 maven</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>7-add_path.sh</p><div class="language-add_path.sh line-numbers-mode" data-highlighter="prismjs" data-ext="add_path.sh"><pre><code><span class="line">#!/bin/bash</span>
<span class="line"></span>
<span class="line">mkdir ~/.m2</span>
<span class="line">cp /opt/maven/conf/settings.xml ~/.m2/</span>
<span class="line">cat &gt;&gt; /etc/profile &lt;&lt; &quot;EOD&quot;</span>
<span class="line">export JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk</span>
<span class="line">export MAVEN_HOME=/opt/maven</span>
<span class="line">export PATH=$PATH:$JAVA_HOME/bin:$MAVEN_HOME/bin</span>
<span class="line"></span>
<span class="line">EOD</span>
<span class="line">source /etc/profile</span>
<span class="line"></span>
<span class="line">cat &gt;&gt; /root/.bash_profile &lt;&lt; &quot;EOD&quot;</span>
<span class="line">export JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk</span>
<span class="line">export MAVEN_HOME=/opt/maven</span>
<span class="line">export PATH=$PATH:$JAVA_HOME/bin:$MAVEN_HOME/bin</span>
<span class="line"></span>
<span class="line">EOD</span>
<span class="line"></span>
<span class="line">source /root/.bash_profile</span>
<span class="line"></span>
<span class="line">java -version</span>
<span class="line">mvn -v</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>8-mvn_setting_mirror.sh</p><div class="language-mvn_setting_mirror.sh line-numbers-mode" data-highlighter="prismjs" data-ext="mvn_setting_mirror.sh"><pre><code><span class="line">#!/bin/bash</span>
<span class="line"></span>
<span class="line"># 定义 settings.xml 文件路径</span>
<span class="line">SETTINGS_XML=~/.m2/settings.xml</span>
<span class="line"># 检查 settings.xml 文件是否存在，如果不存在则创建</span>
<span class="line">if [[ ! -f &quot;$SETTINGS_XML&quot; ]]; then</span>
<span class="line">  echo &quot;$SETTINGS_XML&quot;</span>
<span class="line">  mkdir -p ~/.m2</span>
<span class="line">  touch $SETTINGS_XML</span>
<span class="line">  echo &quot;&lt;settings xmlns=\\&quot;http://maven.apache.org/SETTINGS/1.0.0\\&quot; xmlns:xsi=\\&quot;http://www.w3.org/2001/XMLSchema-instance\\&quot; xsi:schemaLocation=\\&quot;http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd\\&quot;&gt;&quot; &gt;&gt; &quot;$SETTINGS_XML&quot;</span>
<span class="line">  echo &quot;&lt;/settings&gt;&quot; &gt;&gt; &quot;$SETTINGS_XML&quot;</span>
<span class="line">fi</span>
<span class="line"></span>
<span class="line"># 检查是否已经存在 &lt;mirrors&gt; 标签，如果不存在则添加</span>
<span class="line">if ! grep -q &quot;&lt;mirrors&gt;&quot; &quot;$SETTINGS_XML&quot;; then</span>
<span class="line">  sed -i &#39;/&lt;\\/settings&gt;/i &lt;mirrors&gt;\\n&lt;\\/mirrors&gt;&#39; &quot;$SETTINGS_XML&quot;</span>
<span class="line">fi</span>
<span class="line"></span>
<span class="line"># 检查是否已经存在阿里云镜像配置，如果不存在则添加</span>
<span class="line">if ! grep -q &quot;aliyunmaven&quot; &quot;$SETTINGS_XML&quot;; then</span>
<span class="line">  sed -i &#39;/&lt;\\/mirrors&gt;/i &lt;mirror&gt;\\n  &lt;id&gt;aliyunmaven&lt;/id&gt;\\n  &lt;mirrorOf&gt;central&lt;/mirrorOf&gt;\\n  &lt;name&gt;aliyun maven&lt;/name&gt;\\n  &lt;url&gt;https:\\/\\/maven.aliyun.com\\/repository\\/public&lt;\\/url&gt;\\n&lt;\\/mirror&gt;&#39; &quot;$SETTINGS_XML&quot;</span>
<span class="line">fi</span>
<span class="line"></span>
<span class="line">echo &quot;Mirror configuration added to $SETTINGS_XML&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>9-install_docker.sh</p><div class="language-install_docker.sh line-numbers-mode" data-highlighter="prismjs" data-ext="install_docker.sh"><pre><code><span class="line">#!/bin/bash</span>
<span class="line"></span>
<span class="line">yum -y install iptables</span>
<span class="line">curl -sfL https://get.rainbond.com/install_docker | bash</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">cat &lt;&lt;&quot;EOF&quot; &gt; /etc/docker/daemon.json</span>
<span class="line">{</span>
<span class="line">  &quot;registry-mirrors&quot;: [</span>
<span class="line">    &quot;https://docker.hpcloud.cloud&quot;,</span>
<span class="line">    &quot;https://docker.m.daocloud.io&quot;,</span>
<span class="line">    &quot;https://docker.unsee.tech&quot;,</span>
<span class="line">    &quot;https://docker.1panel.live&quot;,</span>
<span class="line">    &quot;http://mirrors.ustc.edu.cn&quot;,</span>
<span class="line">    &quot;https://docker.chenby.cn&quot;,</span>
<span class="line">    &quot;http://mirror.azure.cn&quot;,</span>
<span class="line">    &quot;https://dockerpull.org&quot;,</span>
<span class="line">    &quot;https://dockerhub.icu&quot;,</span>
<span class="line">    &quot;https://hub.rat.dev&quot;</span>
<span class="line">  ],</span>
<span class="line">  &quot;hosts&quot;:[</span>
<span class="line">    &quot;unix:///var/run/docker.sock&quot;,</span>
<span class="line">    &quot;tcp://0.0.0.0:2375&quot;</span>
<span class="line">  ],</span>
<span class="line">  &quot;max-concurrent-downloads&quot;: 10,</span>
<span class="line">  &quot;max-concurrent-uploads&quot;: 10,</span>
<span class="line">  &quot;log-driver&quot;: &quot;json-file&quot;,</span>
<span class="line">  &quot;log-level&quot;: &quot;warn&quot;,</span>
<span class="line">  &quot;log-opts&quot;: {</span>
<span class="line">    &quot;max-size&quot;: &quot;10m&quot;,</span>
<span class="line">    &quot;max-file&quot;: &quot;3&quot;</span>
<span class="line">    },</span>
<span class="line">  &quot;data-root&quot;: &quot;/var/lib/docker&quot;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">EOF</span>
<span class="line"></span>
<span class="line">systemctl daemon-reload</span>
<span class="line"></span>
<span class="line">systemctl restart docker.service</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">docker --version</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>10-install_docker_compose.sh</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">#!/bin/bash</span>
<span class="line"></span>
<span class="line">mkdir -p  /opt/self_compose</span>
<span class="line">cd  /opt/self_compose</span>
<span class="line">git clone https://gitee.com/huangdi_495/work_tools.git</span>
<span class="line">cd work_tools</span>
<span class="line">mv docker-compose-linux-x86_64 /usr/local/bin/docker-compose</span>
<span class="line">chmod +x /usr/local/bin/docker-compose</span>
<span class="line"></span>
<span class="line">ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose</span>
<span class="line"></span>
<span class="line">docker-compose --version</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>11-disable_firewall.sh</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">#!/bin/bash</span>
<span class="line">#停止firewall  </span>
<span class="line">systemctl stop firewalld.service  </span>
<span class="line">#禁止firewall开机启动  </span>
<span class="line">systemctl disable firewalld.service   </span>
<span class="line"></span>
<span class="line"># 查看防火墙状态</span>
<span class="line">systemctl status firewalld.service</span>
<span class="line"></span>
<span class="line"># 查看防火墙状态： </span>
<span class="line">service iptables status</span>
<span class="line"></span>
<span class="line"># 关闭防火墙： </span>
<span class="line">service iptables stop</span>
<span class="line"># 永久关闭防火墙</span>
<span class="line">chkconfig iptables off</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">sed -i &#39;s&#39;/SELINUX=enforcing/SELINUX=disabled/g&#39; /etc/selinux/config</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>12_clear_unzip.sh</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">#!/bin/bash</span>
<span class="line"></span>
<span class="line">cd /root</span>
<span class="line">rm -rf Python-3.11.0</span>
<span class="line">rm -rf Python-3.11.0.tgz</span>
<span class="line"></span>
<span class="line">cd /opt</span>
<span class="line">rm -rf apache-maven*</span>
<span class="line">rm -rf docker</span>
<span class="line">rm -rf self_compose</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,28)]))}const r=n(l,[["render",d]]),t=JSON.parse('{"path":"/guide/linux/","title":"环境搭建","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"安装系统","slug":"安装系统","link":"#安装系统","children":[]}],"git":{"updatedTime":1744048118000,"contributors":[{"name":"alice","username":"alice","email":"921757697@qq.com","commits":2,"url":"https://github.com/alice"}],"changelog":[{"hash":"eecaa7c79d8cd690cf4e0028fd09b8f544987c8c","time":1744048118000,"email":"921757697@qq.com","author":"alice","message":"deploy"},{"hash":"8432038c9970e25da2f08ee796270e567e705cbf","time":1743669172000,"email":"921757697@qq.com","author":"alice","message":"deploy"}]},"filePathRelative":"guide/linux/readme.md"}');export{r as comp,t as data};
