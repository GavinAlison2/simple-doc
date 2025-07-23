# vue2

- [vue2 基础语法](#基础)
  - [vue2 实例](#基础)
  - [vue2 数据绑定](#基础)
  - [vue2 计算属性和侦听器](#基础)
  - [vue2 事件处理](#基础)
  - [vue2 条件渲染](#基础)
  - [vue2 列表渲染](#基础)
  - [vue2 表单输入绑定](#基础)
  - [vue2 组件基础](#基础)
  - [vue2 组件通信](#基础)
  - [vue2 自定义指令](#基础)
- [vue2 组件](vue3-component.md)
- [vue2 路由](vue-router.md)
- [vue2 状态管理](vuex.md)
- [vue2 表单](#工具)
- [vue2 插件](#工具)
- [vue2 单元测试](#基础)
- [vue2 性能优化](#基础)
- [vue2 服务器端渲染](#基础)

## table of contents

### 基础

- 声明式渲染
  - divInnerText {{ message }}
  - v-bind:title="message"
  - v-html="htmlContent"
  - v-model="message" 双向绑定
- 条件与循环
  - v-if="hidden"
  - v-else
  - v-else-if
  - v-for="(item, index) in items"
- 处理用户输入 事件监听
  - v-on:click="handleClick"
  - v-on:keyup.enter="handleEnter"
  - @click="handleClick"
  - @keyup.enter="handleEnter"
- vue 实例
  - vue.$data === data
  - vue.$el === el / document.getElementById("app")
  - vue.$refs === ref
  - vue.$options === options
  - vue.$parent === parent
  - vue.$root === root
  - vue.$children === children
  - vue.$emit === emit
  - vue.$mount === mount
  - vue.$forceUpdate === forceUpdate
  - vue.$watch('data', function(newVal, oldVal) {...})
- 生命周期
  - beforeCreate
  - created
  - beforeMount
  - mounted
  - beforeUpdate
  - updated
  - beforeDestroy
  - destroyed
- 模板语法

  - 插值
    - 文本 , {{ message }}, `<span>Message: {{ msg }}</span>`
    - 原始 html ,v-html="htmlContent" v-text="textContent" `<p>Using mustaches: {{ rawHtml }}</p> <p>Using v-html directive: <span v-html="rawHtml"></span></p>`
    - html 的属性 attribute, v-bind:href="url" `<a :href="url">Link</a>`
    - JavaScript 表达式 , {{ number + 1 }} `<span>1 + 1 = {{ 1 + 1 }}</span>,  {{ message.split('').reverse().join('') }}`
  - 指令

    - v-if="condition" `<p v-if="seen">现在你看到我了</p>`
    - v-else-if="condition"
    - v-else
    - v-show="condition"
    - v-for="(item, index) in items"
    - v-on:click="handleClick"
    - v-bind:title="message"
    - v-model="message"
    - v-pre
    - v-once
    - v-cloak
    - v-text="textContent"
    - v-html="htmlContent"
    - 动态参数
    - 修饰符 .prevent, .stop, .capture, .self, .once

  - 缩写

```html
v-bind:xx
<!-- 完整语法 -->
<a v-bind:href="url">...</a>
<!-- 缩写 -->
<a :href="url">...</a>
<!-- 动态参数的缩写 (2.6.0+) -->
<a :[key]="url"> ... </a>

v-on:xx
<!-- 完整语法 -->
<a v-on:click="doSomething">...</a>
<!-- 缩写 -->
<a @click="doSomething">...</a>
<!-- 动态参数的缩写 (2.6.0+) -->
<a @[event]="doSomething"> ... </a>
```

- 计算属性和侦听器
  - computed
  - watch
- Class 和 Style 绑定
  - v-bind:class="{ active: isActive, 'text-danger': hasError }" # 增强对象 class, 只处理 isActive 和 hasError 变量
  - v-bind:style="{ fontSize: '14px', color: activeColor }" # 增强对象 style, 只处理 fontSize 和 activeColor 变量
  - 绑定 HTML class 和 style 特性 `<div v-bind:class="classObject" v-bind:style="styleObject">...</div>`
  - 对象语法 `<div v-bind:class="{ active: isActive }"></div>`
  - 数组语法 `<div v-bind:class="[activeClass, errorClass]"></div>`
  - 组件绑定 class 和 style `<my-component class="baz boo"></my-component>`
  - 内联样式 `<div v-bind:style="styleObject">...</div>`
- 条件渲染
  - v-if
  - v-else-if
  - v-else
  - v-show
  - v-for
- 列表渲染
  - v-for 遍历数组
  - v-for 遍历对象
  - v-for 遍历数字
  - v-for 遍历字符串
  - v-for 遍历 Map 和 Set
  - v-for 遍历自定义对象
  - v-for 遍历异步数据
  - v-for 遍历组件
  - 显示过滤后的列表 `<li v-for="(item, index) in items | filterBy searchQuery">{{ index }} - {{ item }}</li>`
  - 显示索引 `<li v-for="(item, index) in items">{{ index }} - {{ item }}</li>`
  - 显示当前项 `<li v-for="(item, index) in items" :key="item">{{ index }} - {{ item }}</li>`
  - 显示当前项的属性 `<li v-for="(item, index) in items" :key="item.id">{{ index }} - {{ item.text }}</li>`
- 事件处理

  - v-on:click
  - v-on:click="handleClick('xx', event)"
  - 事件修饰符 .stop, .prevent, .capture, .self, .once .passive
  - 按键修饰符 v-on:keyup.enter .exact .tab .esc .ctrl .alt .shift
  - @click

- 表单输入绑定

  - v-model
    - text 和 textarea 元素使用 value property 和 input 事件；
    - checkbox 和 radio 元素使用 checked property 和 change 事件；
    - select 元素使用 value property 和 change 事件。
    - input 元素使用 value property 和 input 事件，除非使用了 v-model 修饰符。
  - 修饰符 .lazy, .number, .trim
  - v-model 修饰符 .lazy, .number, .trim

- 组件基础

  - vue.component('name', {
    template: `<div>A custom component!</div>`,
    props: ['propData'],
    })
  - props
  - data 函数
  - 组件 `<my-component v-bind:propData="data" @click="handleClick" v-bind:propObj="obj"></my-component>`
  - 子组件触发事件 `template: '<button v-on:click="$emit(\'my-event\', $event)">Click me!</button>'`
  - 父组件 v-model 双向绑定 `<custom-input v-model="searchText"></custom-input>`, 子组件 `template: '<input :value="value" @input="$emit(\'input\', $event.target.value)">'`
  - 插槽 `<slot></slot>` `<my-component><span slot="header">This is a slot</span></my-component>`
  - 动态组件 `<component :is="currentView"></component>` `<component :is="getComponentName(view)"></component>`
  - 异步组件 `<router-view></router-view>` `<router-view :component="getComponent(view)"></router-view>`

### 深入了解组件

- 组件注册 `Vue.component('my-component', { template: '<div>A custom component!</div>' })` `<my-component></my-component>` `<div is="my-component"></div>`

  - 全局注册 `Vue.component('my-component', { template: '<div>A custom component!</div>' })`
  - 局部注册 `components: { 'my-component': { template: '<div>A custom component!</div>' } }` `<my-component></my-component>`

- props 传递数据 父组件中 `<my-component :propData="data"></my-component>` 子组件中 `props: ['propData']`
- 自定义事件 父组件中 `<my-component @my-event="handleEvent"></my-component>` 子组件中 `$emit('my-event', data)` v-model
- 插槽
- 动态组件 和 异步组件
- 处理边界

### 过渡和动画

- 进入/离开/列表过渡
- 状态过渡

### 组合

- 混入
- 自定义指令
- 渲染函数与 JSX
- 插件
- 过滤器

### 工具

- 单文件组件
- 测试
- TypeScript
- 生产环境构建

- 路由
- 状态管理
- 表单
- 服务器端渲染
- 性能优化

  ------------------done
  ------------------todo

```js
new Vue({
  el: "#app",
  data: {
    message: "Hello Vue!",
    hidden: false,
    items: ["apple", "banana", "orange"],
  },
  methods: {
    handleClick() {},
    handleEnter() {},
  },
  computed: {
    fullName() {
      return this.firstName + " " + this.lastName;
    },
  },
  watch: {
    fullName(newVal, oldVal) {},
  },
  filters: {
    capitalize(value) {},
  },
  directives: {},
  beforeCreate() {},
  components: {},
});
```

```js
Vue.component("my-component", {
  template: `<div>A custom component! {{ propData }}-{{ message }}-{{msg}}-{{propObj.name}}</div>`,
  props: ["propData", "propObj"], // 接收父组件传递的数据
  data() {
    // 组件的局部状态, 属于实例的,每个实例自己的
    return {
      message: "Hello from my-component!",
    };
  },
  data: {
    // 组件全局的,属于组件的,所有实例共用的
    msg: "Hello from my-component!",
  },
});
```
