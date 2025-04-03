# 环境搭建

## 安装系统

1. 安装centos7系统
2. 配置好网络
3. 配置yum源
4. 安装git
5. 安装node.js, python, docker 等软件

其中对应的脚本文件如下：

1-modify_font.sh
```modify_font.sh
#!/bin/bash

cat > /etc/init.d/set_font.sh <<EOF
#!/bin/bash
setfont sun12x22.psfu.gz
EOF
chmod +x /etc/init.d/set_font.sh

```
2-modify_yum_repo.sh
```modify_yum_repo.sh
#!/bin/bash
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup
curl -o /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-7.repo
curl -o /etc/yum.repos.d/epel.repo https://mirrors.aliyun.com/repo/epel-7.repo
cd /etc/yum.repos.d
sed -i 's/http/https/g' *.repo

yum clean all
yum makecache 
```

3-add_dns.sh
```add_dns.sh
#!/bin/bash

cat >> /etc/resolv.conf << "EOF"
nameserver 8.8.8.8
nameserver 8.8.4.4
nameserver 114.114.114.114
EOF

```
4-install_git.sh
```install_base.sh
#!/bin/bash

yum -y install net-tools  wget 
yum -y install tree nmap dos2unix lrzsz nc lsof wget tcpdump htop iftop iotop sysstat nethogs 
yum -y install psmisc net-tools bash-completion vim-enhanced 
yum -y install epel-release

```
5-install_py3.sh
```install_py3.sh
#!/bin/bash

cd /root
# wget https://www.python.org/ftp/python/3.11.0/Python-3.11.0.tgz
wget https://mirrors.huaweicloud.com/python/3.11.0/Python-3.11.0.tgz
tar -xzf Python-3.11.0.tgz
yum -y install gcc zlib zlib-devel libffi libffi-devel
yum -y install readline-devel
yum -y install openssl-devel openssl11 openssl11-devel
export CFLAGS=$(pkg-config --cflags openssl11)
export LDFLAGS=$(pkg-config --libs openssl11)
cd /root/Python-3.11.0
./configure --prefix=/usr/python --with-ssl
make
make install
ln -s /usr/python/bin/python3 /usr/bin/python3
ln -s /usr/python/bin/pip3 /usr/bin/pip3


cd /usr/bin
rm -rf /usr/bin/python
rm -rf /usr/bin/pip
ln -s /usr/bin/python3 /usr/bin/python
ln -s /usr/bin/pip3 /usr/bin/pip

sed -i 's/python$/python2/g' /usr/bin/yum
sed -i 's/python$/python2/g' /usr/libexec/urlgrabber-ext-down

/usr/python/bin/python3.11 -m pip install --upgrade pip
```

6-install_git_mvn.sh
```install_git_mvn.sh

#!/bin/bash

yum -y install git

yum -y remove java-1.8.*
yum -y install java-1.8.0-openjdk-devel

cd /opt/
wget https://dlcdn.apache.org/maven/maven-3/3.9.9/binaries/apache-maven-3.9.9-bin.tar.gz
tar -zxvf apache-maven-3.9.9-bin.tar.gz
mv apache-maven-3.9.9 maven

```
7-add_path.sh
```add_path.sh
#!/bin/bash

mkdir ~/.m2
cp /opt/maven/conf/settings.xml ~/.m2/
cat >> /etc/profile << "EOD"
export JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk
export MAVEN_HOME=/opt/maven
export PATH=$PATH:$JAVA_HOME/bin:$MAVEN_HOME/bin

EOD
source /etc/profile
java -version
mvn -v

```

8-mvn_setting_mirror.sh
```mvn_setting_mirror.sh
#!/bin/bash

# 定义 settings.xml 文件路径
SETTINGS_XML=~/.m2/settings.xml
# 检查 settings.xml 文件是否存在，如果不存在则创建
if [[ ! -f "$SETTINGS_XML" ]]; then
  echo "$SETTINGS_XML"
  mkdir -p ~/.m2
  touch $SETTINGS_XML
  echo "<settings xmlns=\"http://maven.apache.org/SETTINGS/1.0.0\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:schemaLocation=\"http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd\">" >> "$SETTINGS_XML"
  echo "</settings>" >> "$SETTINGS_XML"
fi

# 检查是否已经存在 <mirrors> 标签，如果不存在则添加
if ! grep -q "<mirrors>" "$SETTINGS_XML"; then
  sed -i '/<\/settings>/i <mirrors>\n<\/mirrors>' "$SETTINGS_XML"
fi

# 检查是否已经存在阿里云镜像配置，如果不存在则添加
if ! grep -q "aliyunmaven" "$SETTINGS_XML"; then
  sed -i '/<\/mirrors>/i <mirror>\n  <id>aliyunmaven</id>\n  <mirrorOf>central</mirrorOf>\n  <name>aliyun maven</name>\n  <url>https:\/\/maven.aliyun.com\/repository\/public<\/url>\n<\/mirror>' "$SETTINGS_XML"
fi

echo "Mirror configuration added to $SETTINGS_XML"
```

9-install_docker.sh
```install_docker.sh
#!/bin/bash

curl -sfL https://get.rainbond.com/install_docker | bash


cat <<"EOF" > /etc/docker/daemon.json
{
  "registry-mirrors": [
    "https://docker.hpcloud.cloud",
    "https://docker.m.daocloud.io",
    "https://docker.unsee.tech",
    "https://docker.1panel.live",
    "http://mirrors.ustc.edu.cn",
    "https://docker.chenby.cn",
    "http://mirror.azure.cn",
    "https://dockerpull.org",
    "https://dockerhub.icu",
    "https://hub.rat.dev"
  ],
  "hosts":[
    "unix:///var/run/docker.sock",
    "tcp://0.0.0.0:2375"
  ],
  "max-concurrent-downloads": 10,
  "max-concurrent-uploads": 10,
  "log-driver": "json-file",
  "log-level": "warn",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
    },
  "data-root": "/var/lib/docker"
}

EOF

systemctl daemon-reload

systemctl restart docker.service



docker --version

```

10-install_docker_compose.sh
```
#!/bin/bash

mkdir -p  /opt/self_compose
cd  /opt/self_compose
git clone https://gitee.com/huangdi_495/work_tools.git
cd work_tools
mv docker-compose-linux-x86_64 /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

docker-compose --version

```

11-disable_firewall.sh

```
#!/bin/bash
#停止firewall  
systemctl stop firewalld.service  
#禁止firewall开机启动  
systemctl disable firewalld.service   

# 查看防火墙状态
systemctl status firewalld.service

# 查看防火墙状态： 
service iptables status

# 关闭防火墙： 
service iptables stop
# 永久关闭防火墙
chkconfig iptables off


sed -i 's'/SELINUX=enforcing/SELINUX=disabled/g' /etc/selinux/config

```


12_clear_unzip.sh
```
#!/bin/bash

rm -rf Python-3.11.0
rm -rf Python-3.11.0.tgz
```
