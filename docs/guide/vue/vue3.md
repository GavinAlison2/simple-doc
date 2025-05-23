# vue3

## vue 的优势

- 轻量级：几十K的体积
- 界面与逻辑分离，与html接近的概念和写法
- 响应式双向数据绑定，更新数据时无需再写代码更新界面，反之亦然。
- 组件化，可方便协作。方便造轮子，也就自然有大量轮子可用
- 虚拟DOM，比大多数手写操作dom的代码都更高效
- 易于上手，设计直观、文档丰富

vue3相比vue2的优势：

- 响应式系统提升
- 更快，性能比Vue2快1.2~2倍(diff方法优化、静态提升、时间侦听器缓存、ssr渲染)
- 更小，按需编译，体积比Vue2更小
- 组合式API，提供更灵活的写法，也易于吸引react开发者
- 加强TypeScript支持

uniapp

- 文件类型变化
  - 以前是.html文件，现在是.vue文件
- 文件内代码架构的变化
  - 以前一个 html 大节点，里面有 script 和 style 节点, 现在 template 是一级节点，用于写tag组件， script 和 style 是并列的一级节点，也就是有3个一级节点
- 外部文件引用方式变化
  - 以前通过script src、link href引入外部的js和css, 现在是es6的写法， import 引入外部的js模块(注意不是文件)或css；
- 组件/标签的变化
  - 以前是html标签，比如 <div> ，现在是小程序组件，比如 <view>
- js的变化
  - 以前script里随便写js变量和function
  - 现在script里默认有export default，在里面写data、事件和method.
  - `export default { data() { return { ... } }, methods: { sayHello(){...}}, onLoad(){...}  }`
  - 以前的 DOM 操作，比如 document.getElementById('id')，现在是 this.$refs.id
  - 现在的做法，是vue的绑定模式, v-bind:id="id"，v-on:click="sayHello"

## 模板语法

- 插值, 文本, {{msg}}, data(){return{msg: 'hello'}}
- 指令, v-前缀,  v-for, v-if, v-model, v-show, v-text, v-html, v-bind, :, @
  - v-bind, 绑定属性, :name="value"
  - v-on, 绑定事件, @click="handleClick"
  - v-once, 只渲染一次, 适用于性能优化
  - v-html, 绑定html, 适用于展示富文本
  - v-for, 循环, v-for="(item, index) in items"
- data 选项
  - 只接受返回一个初始数据对象的函数
  - data() { return { count: 0 } }
  - 页面关闭时, 数据自动销毁
- Class 与 Style 绑定
  - :class="{ active: isActive, 'text-danger': hasError }"
  - :class="[activeClass, errorClass]"
  - :class="computedClassStr", computedClassStr是计算属性, 返回一个字符串
  - :style="{ color: activeColor, fontSize: fontSize + 'px' }"
  - :style="styleObj",styleObj是data里的一个对象, 里面可以有多个样式属性
  - :style="[styleObj1, styleObj2]"
  - :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"
- v-if, v-else, v-else-if, v-show
  - v-show, 切换元素的 display:none, 适用于频繁切换的场景, 元素存在,只是display: none
  - v-if, 条件判断, 只有在条件为真时才渲染该元素
  - v-else, 条件为假时渲染该元素
  - v-else-if, 条件为假时渲染该元素, 只有在前面的条件都不满足时才渲染该元素
  - v-if 可用于 template 中
- v-for
  - v-for="(item, index) in items", 遍历数组, item表示当前项, index表示索引
  - v-for="(value, key, index) in object", 遍历对象, value表示值, key表示键, index表示索引
  - templte v-for, 遍历数组, 数组元素的属性值可以用 item.xxx 访问
  - 
