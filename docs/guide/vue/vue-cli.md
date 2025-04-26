# command

```sh
npm install -g @vue/cli
vue --version
vue create my-app
```

```sh
.\node_modules\.bin\vue --version
.\node_modules\.bin\vue create my-app
# 选择

```

## vue ui

```sh
.\node_modules\.bin\vue  ui
```

```json
相关的配置文件 vue.config.js

配置参数 -> https://cli.vuejs.org/zh/config/?#babel
baseUri: process.env.BASE_URL || '/', // 部署应用时的基本 URL
outputDir: 'dist', // 输出文件目录
devServer: { // 配置本地开发服务器
    host: 'localhost',
    port: 8081, // 端口号
    https: false,
    open: true, // 打开浏览器
    before: app => {} // 启动服务器前的回调函数
    proxy: { // 配置代理
        '/api': {
            target: 'http://localhost:3000', // 目标服务器地址
            changeOrigin: true, // 允许跨域
            pathRewrite: {  '^/api': '' }
        }
    }
}
```

## table of contents

1. [vue-cli](https://github.com/vuejs/vue-cli)
2. [vue-router](https://github.com/vuejs/vue-router)
3. [vuex](https://github.com/vuejs/vuex)
4. [vue-devtools](https://github.com/vuejs/vue-devtools)
5. [vue-loader](https://github.com/vuejs/vue-loader)
6. [vue-template-compiler](https://github.com/vuejs/vue-template-compiler)
