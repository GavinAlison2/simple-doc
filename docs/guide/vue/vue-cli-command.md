# command

```shell
# vue-cli 安装手脚架

npm install -g @vue/cli
vue create my-project

## create-vue
## 基于vue3的脚手架创建项目
npm create vue@latest

## 基于vue2的脚手架创建项目
npm create vue@2

```

## 支持 tailwindcss

```shell
npm install -D tailwindcss postcss-cli autoprefixer # 安装Tailwind CSS及其依赖
npx tailwindcss init -p # 自动生成tailwind.config.js 和 postcss.config.js 文件

# 配置 tailwind.config.js

echo >> tailwind.config.js << EOF
module.exports = {
  content: [
    "./public/**/*.html",
    "./src/**/*.{html,js,vue,ts,jsx,tsx}"
    ],
    theme: {
      extend: {}
    },
    plugins: []
}
EOF

# 配置 tailwind.css

echo >> src/assets/styles/tailwind.css << EOF
@tailwind base;
@tailwind components;
@tailwind utilities;
EOF

# 编译 tailwind.css

npx tailwindcss build src/assets/styles/tailwind.css -o src/assets/styles/tailwind.css

# 引入 tailwind.css

echo >> src/main.js << EOF
import './assets/styles/tailwind.css';
EOF

# 启动项目
```
