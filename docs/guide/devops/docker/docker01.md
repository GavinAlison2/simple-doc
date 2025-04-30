# Docker简介

## 核心概念

- 镜像(Image)
镜像即是副本，是容器的静态文件存储形式，通过命令docker run运行镜像即得到运行的docker容器，其定义类似windows ghost。
通过同一个镜像可以创建完全相同的docker容器。
镜像存储在仓库中，代码交付(程序及运行环境)即是镜像的交付。

- 容器
镜像通过命令运行后即是容器实例。镜像与容器关系类比与代码与程序。代码是程序的静态形式，代码执行即获得程序，程序是代码的动态形式。

- 仓库
仓库即是存储镜像的地方，类似于git仓库，分为本地仓库和远程仓库，通过命令docker pull和docker push可以拉取或者推送镜像文件。

## 初试Docker

### 目标

基于Linux系统，Docker内编写shell脚本文件，Docker容器启动后执行该脚本文件在控制台输入hello world!。并将上述制作成镜像。

### 步骤

#### 1.安装Docker环境

此处不再叙述，首先在Linux系统部署docker环境，通过yum install docker. 安装完成通过docker version验证是否安装成功。显示如下则表示成功

```sh
Client:
 Version:      1.10.3
 API version:  1.22
 Go version:   go1.5.3
 Git commit:   20f81dd
 Built:        Thu Mar 10 21:49:11 2016
 OS/Arch:      linux/amd64

Server:
 Version:      1.10.3
 API version:  1.22
 Go version:   go1.5.3
 Git commit:   20f81dd
 Built:        Thu Mar 10 21:49:11 2016
 OS/Arch:      linux/amd64
 ```

#### 2.拉取标准镜像

首先拉取标准镜像，本文基于Linux环境部署tomcat服务器，因此拉取centos标准镜像。命令：

```bash
docker pull centos
```

#### 3.运行该镜像获得docker容器实例

查看下载的docker 镜像ID

```sh
docker images
REPOSITORY TAG IMAGE ID CREATED SIZE
centos latest 49f7960eb7e4 2 weeks ago 199.7 MB
```

运行镜像获取Docker容器实例
`docker run -i -t -d 49f7960eb7e4 /bin/bash`

运行上述命令(49f7960eb7e4是IMAGE ID，按照自己机器的ID输入，不可照抄)进入运行并进入docker实例中。

-i 以交互方式运行
-t docker容器运行后进入终端命令行
-d以后台进程方式运行docker容器，这样在退出容器后其容器并没有退出。

#### 4.进入docker容器

在运行上述命令后，控制台输入一串字符串`00d0ccf4aebaff1246ced1197264bb15fb80125bcac6156c754772f61bd16d01`,容器已经启动且在后台运行， 通过命令 `docker ps`可以查看到刚刚运行的容器

```sh
docker ps CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES
00d0ccf4aeba 49f7960eb7e4 “/bin/bash” About a minute ago Up About a minute
```

通过命令`docker exec`进入docker容器中

`docker exec -it 00d0ccf4aeba /bin/bash`

上述命令中00d0ccf4aeba 是docker ps命令输出的container ID，运行上述命令以后则进入到熟悉的linux命令行界面，下面就可以像操作linux系统一样操作。

#### 5.编写脚本文件

/目录下编写脚本文件,定义为startup.sh
```sh
#!/bin/bash
echo “Hello World !”
echo “This is first docker.”
```

增加可执行权限

`chmod a+x startup.sh`

#### 6.保存制作的Docker镜像

至此，完成docker镜像制作的准备工作。
通过命令exit退出该docker容器,回到物理机终端。
通过docker ps查看刚刚的docker容器。

注：因为在启动docker容器时候执行docker run -itd通过-d参数使容器后台运行，所以退出时其docker容器仍然在后台运行，如果运行docker run没有加-d参数，当退出时则是真正的退出，上述所做的修改将全部消失。

#### 7.制作镜像

`docker commit 00d0ccf4aeba my-image:v1` 其中00d0ccf4aeba 是container ID 上述指令语义是将容器00d0ccf4aeba重新打包为名称为my-image，标签为v1的新镜像

#### 8.运行新的镜像

再次执行docker images会查看到刚刚制作的镜像my-image:v1。 执行命令docker run运行新镜像

`docker run -itd 2b6238c926e8 /bin/bash /startup.sh`

命令行输出如下:

```sh
Hello World !
This is first docker.
```

至此，完成Docker镜像的制作。将该镜像docker push推到仓库中，然后再任何一台机器通过docker pull即可运行该容器。

常用指令
运行镜像
`docker run -i [image-id ]`

运行镜像+脚本
`docker run -i -t [image-name] [script-name]`

后台运行镜像+脚本
`docker run -i -t [image-name] [script-name]`

显示运行的Docker容器
`docker ps`

进入容器内
`docker exec -it [docker-id] /bin/bash`

宿主机器与docker之间复制文件

```sh
docker cp host_path containerID:container_path

docker events

docker logs

docker inspect
```
