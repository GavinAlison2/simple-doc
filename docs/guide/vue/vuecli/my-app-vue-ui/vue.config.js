const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: { // 有些值像 host、port 和 https 可能会被命令行参数覆写
    port: 8081,
    // proxy: 'http://localhost:8080',
    proxy: { // 配置跨域, 前端应用和后端 API 服务器没有运行在同一个主机上
      '/api': { // 匹配的接口前缀
        target: 'http://localhost:8080', // 目标接口域名
        changeOrigin: true, // 是否跨域
        pathRewrite: { '^/api': '' } // 重写路径: 去掉路径中开头的'/api'
      },
      '/api2': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        pathRewrite: { '^/api2': '' }
      }
    }
  }
})
