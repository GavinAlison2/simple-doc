# Vue3 组件

自定义第三方组件，并测试通过

1. 创建组件

```sh
// HelloWorld.vue
mkdir my-vue-component
cd my-vue-component
npm init -y

mkdir src
touch src/index.js
touch src/MyComponent.vue

echo >> package.json << "EOF"
{
  "name": "my-vue-component",
  "version": "1.0.0",
  "description": "",
  "main": "src/index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "vue",
    "component"
  ],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "vue": "^3.5.13"
  }
}
EOF

echo >> src/index.js << "EOF"
import MyComponent from './MyComponent.vue'
MyComponent.install = (app)=>{
  app.component(MyComponent.name || 'MyComponent', MyComponent)
};
export default MyComponent;
EOF

echo >> src/MyComponent.vue << "EOF"
<template>
  <div>
    <h1>{{ message }}</h1>
    <button @click="increment">Click me</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const message = ref("Hello, World!");
const count = ref(0);

const increment = () => {
  count.value++;
  message.value = `Clicked ${count.value} times`;
};
</script>

<style scoped>
h1 {
  color: blue;
}
button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
EOF
```

2. 配置依赖

```sh
cd my-vue-component
npm link
```

3. 测试

```sh
npm init vite@latest my-vue-test-project --template vue

cd my-vue-test-project
npm link my-vue-component
# 可以看到 node_modules/my-vue-component 目录
# 修改 App.vue 文件

echo >> src/App.vue << "EOF"
<script setup>
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <div>
    <my-component></my-component>
  </div>
</template>
<script>
import MyComponent from "my-vue-component";
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
EOF

```

4. 运行

```sh
npm run dev
```

打开浏览器访问 http://localhost:5173/ ，可以看到自定义组件的效果。
