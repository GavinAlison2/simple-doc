import{_ as t,c as r,d as e,o as d}from"./app-VCvVDv7C.js";const c={};function o(s,a){return d(),r("div",null,a[0]||(a[0]=[e('<h1 id="broadcast-variables" tabindex="-1"><a class="header-anchor" href="#broadcast-variables"><span>Broadcast Variables</span></a></h1><h2 id="怎么实现-broadcast" tabindex="-1"><a class="header-anchor" href="#怎么实现-broadcast"><span>怎么实现 broadcast</span></a></h2><p>Driver 先建一个本地文件夹用以存放需要 broadcast 的 data，并启动一个可以访问该文件夹的 HttpServer。 当调用val bdata = sc.broadcast(data)时就把 data 写入文件夹，同时写入 driver 自己的 blockManger 中（StorageLevel 为内存＋磁盘），获得一个 blockId，类型为 BroadcastBlockId。</p><p>当调用rdd.transformation(func)时，如果 func 用到了 bdata，那么 driver submitTask() 的时候会将 bdata 一同 func 进行序列化得到 serialized task，注意序列化的时候不会序列化 bdata 中包含的 data。</p><p>上一章讲到 serialized task 从 driverActor 传递到 executor 时使用 Akka 的传消息机制，消息不能太大，而实际的 data 可能很大，所以这时候还不能 broadcast data。</p><p>driver 为什么会同时将 data 放到磁盘和 blockManager 里面？放到磁盘是为了让 HttpServer 访问到，放到 blockManager 是为了让 driver program 自身使用 bdata 时方便</p><p>那么什么时候传送真正的 data？在 executor 反序列化 task 的时候，会同时反序列化 task 中的 bdata 对象，这时候会调用 bdata 的 readObject() 方法。该方法先去本地 blockManager 那里询问 bdata 的 data 在不在 blockManager 里面，如果不在就使用下面的两种 fetch 方式之一去将 data fetch 过来。得到 data 后，将其存放到 blockManager 里面，这样后面运行的 task 如果需要 bdata 就不需要再去 fetch data 了。如果在，就直接拿来用了。</p><p>两种实现方式:</p><h3 id="_1-httpbroadcast" tabindex="-1"><a class="header-anchor" href="#_1-httpbroadcast"><span>1. HttpBroadcast</span></a></h3><p>HttpBroadcast 就是每个 executor 通过的 http 协议连接 driver 并从 driver 那里 fetch data。</p><p>Driver 先准备好要 broadcast 的 data，调用sc.broadcast(data)后会调用工厂方法建立一个 HttpBroadcast 对象。该对象做的第一件事就是将 data 存到 driver 的 blockManager 里面，StorageLevel 为内存＋磁盘，blockId 类型为 BroadcastBlockId。</p><p>同时 driver 也会将 broadcast 的 data 写到本地磁盘，例如写入后得到 <code>/var/folders/87/grpn1_fn4xq5wdqmxk31v0l00000gp/T/spark-6233b09c-3c72-4a4d-832b-6c0791d0eb9c/broadcast_0</code>， 这个文件夹作为 HttpServer 的文件目录。</p><p>Driver 和 executor 启动的时候，都会生成 broadcastManager 对象，调用 HttpBroadcast.initialize()，driver 会在本地建立一个临时目录用来存放 broadcast 的 data，并启动可以访问该目录的 httpServer。</p><p>Fetch data：在 executor 反序列化 task 的时候，会同时反序列化 task 中的 bdata 对象，这时候会调用 bdata 的 readObject() 方法。该方法先去本地 blockManager 那里询问 bdata 的 data 在不在 blockManager 里面，如果不在就使用 http 协议连接 driver 上的 httpServer，将 data fetch 过来。得到 data 后，将其存放到 blockManager 里面，这样后面运行的 task 如果需要 bdata 就不需要再去 fetch data 了。如果在，就直接拿来用了。</p><p>HttpBroadcast 最大的问题就是 driver 所在的节点可能会出现网络拥堵，因为 worker 上的 executor 都会去 driver 那里 fetch 数据。</p><h3 id="_2-torrentboadcast" tabindex="-1"><a class="header-anchor" href="#_2-torrentboadcast"><span>2. TorrentBoadcast</span></a></h3>',16)]))}const l=t(c,[["render",o]]),i=JSON.parse('{"path":"/guide/etl/spark/broadcast.html","title":"Broadcast Variables","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"怎么实现 broadcast","slug":"怎么实现-broadcast","link":"#怎么实现-broadcast","children":[{"level":3,"title":"1. HttpBroadcast","slug":"_1-httpbroadcast","link":"#_1-httpbroadcast","children":[]},{"level":3,"title":"2. TorrentBoadcast","slug":"_2-torrentboadcast","link":"#_2-torrentboadcast","children":[]}]}],"git":{"updatedTime":1744888563000,"contributors":[{"name":"alice","username":"alice","email":"921757697@qq.com","commits":1,"url":"https://github.com/alice"}],"changelog":[{"hash":"d0aa97b762c5a828ab8e3a7802989f2039337caf","time":1744888563000,"email":"921757697@qq.com","author":"alice","message":"deploy"}]},"filePathRelative":"guide/etl/spark/broadcast.md"}');export{l as comp,i as data};
