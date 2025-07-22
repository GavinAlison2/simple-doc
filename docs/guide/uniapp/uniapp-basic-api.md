# todo

> https://uniapp.dcloud.net.cn/api/

- basic api
- 日志打印
- 定时器
- uni.base64ToArrayBuffer
- uni.arrayBufferToBase64
- 应用级事件, 监听应用事件, uni.onPageNotFound(CALLBACK)
- 拦截器, 拦截 Api 等调用并执行回调, uni.addInterceptor(STRING, OBJECT)
- uni.removeInterceptor(STRING)
- uni.
- 全局 API,可全局调用 Api
- 启动方法, uni.getLaunchOptionSync, 获取启动时的参数
- 启动方法, uni.getEnterOptionsSync, 获取启动时的参数

- 网络
- uni.request
- uni.request, get, 数据转换为query string, {name: 'name_val', age: 20} => name=name_val&age=20
- uni.request, post, header['content-type']='application/json', json 序列化
- uni.request, post, header['content-type']='application/x-www-form-urlencoded', 数据转换为query string
- 上传、下载
- uni.uploadFile
- uni.downloadFile
- WebSocket
- uni.connectSocket
- uni.onSocketOpen
- uni.onSocketError
- uni.sendSocketMessage
- uni.onSocketMessage
- uni.closeSocket
- uni.onSocketClose

- SocketTask
- SocketTask.send
- SocketTask.close
- SocketTask.onOpen
- SocketTask.onClose
- SocketTask.onError
- SocketTask.onMessage
