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
  - 以前是html标签，比如 `<div>` ，现在是小程序组件，比如 `<view>`
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

## data 选项

- 只接受返回一个初始数据对象的函数
- data() { return { count: 0 } }
- 页面关闭时, 数据自动销毁

## Class 与 Style 绑定
  
- :class="{ active: isActive, 'text-danger': hasError }"
- :class="[activeClass, errorClass]"
- :class="computedClassStr", computedClassStr是计算属性, 返回一个字符串
- :style="{ color: activeColor, fontSize: fontSize + 'px' }"
- :style="styleObj",styleObj是data里的一个对象, 里面可以有多个样式属性
- :style="[styleObj1, styleObj2]"
- :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"

## 条件渲染

- v-if, v-else, v-else-if, v-show
  - v-show, 切换元素的 display:none, 适用于频繁切换的场景, 元素存在,只是display: none
  - v-if, 条件判断, 只有在条件为真时才渲染该元素
  - v-else, 条件为假时渲染该元素
  - v-else-if, 条件为假时渲染该元素, 只有在前面的条件都不满足时才渲染该元素
  - v-if 可用于 template 中

## 列表渲染

- v-for
  - v-for="(item, index) in items", 遍历数组, item表示当前项, index表示索引
  - v-for="(value, key, index) in object", 遍历对象, value表示值, key表示键, index表示索引
  - templte v-for, 遍历数组, 数组元素的属性值可以用 item.xxx 访问
  - `<view v-for="(item,index) in objectArray" :key="item.id">`
  - template v-for="item in list" :key="item.id"
  - `<my-component v-for="item in items" :key="item.id"></my-component>`
  - `<view v-for="todo in todos" v-if="!todo.isComplete">`错误，因为未在实例上定义属性“todo”
  - `<template v-for="todo in todos"> <view v-if="!todo.isComplete">  {{ todo }} </view> </template>`

## 事件处理

- v-on
- @click="handleClick", methods: { handleClick() { ... } }
- @click.stop, 阻止事件冒泡
- @click.prevent, 阻止默认事件
- @click.capture, 事件捕获
- @click.self, 只有点击当前元素时触发
- 事件处理方法, @click="handleClick()", methods: { handleClick(event) { ... } }
- 传参, @click="handleClick(id)"
- 传原始DOM事件, @click="handleClick($event)", event.target 获取触发事件的元素
- 多事件处理器, @click="one($event); two($event)"
- 事件修饰符, @click.stop, @click.prevent, @click.capture, @click.self
- 事件映射表
  - WEB 事件: `uni-app` 对应事件
  - click: tap
  - tap: tap
  - touchstart: touchstart
  - touchmove: touchmove
  - touchend: touchend
  - input: input
  - change: change
  - submit: submit
  - focus: focus
  - reset: reset
  - confirm: confirm

## 表单输入绑定

- v-model
- uni-app 表单组件, select-picker, radio-radio-group

## 计算属性和侦听器

- computed
- watch

```js
<template>
    <view>
        <view>OHas published books:</view>
        <view>{{ publishedBooksMessage }}</view>
        <view>Full Name:</view>
        <view>{{ fullName }}</view>
        <view>First Name:</view>
        <input type="text" v-model="firstName">
        <view>Last Name:</view>
        <input type="text" v-model="lastName">
    </view>
</template>
<script>
export default {
    data(){
        return {
            author: {
                name: 'john',
                books: [
                    'Vue 2- Advanced Guide',
                    'Vue 3 - Basic Guide',
                    'Vue 4 - The Mystery'
                ]
            },
            firstName: 'John',
            lastName: 'Doe'
        }
    },
    computed: {
        publishedBooksMessage() {
            return this.author.books.length > 0 ? `O has published ${this.author.books.length} books` : 'O has not published any books yet';
        },
        fullName() {
            get(){
                return this.firstName + " " + this.lastName;
            },
            set(newValue){
                let names = newValue.split(" ");
                this.firstName = names[0];
                this.lastName = names[1];
            }
        }
    },
}
</script>
```

- 计算属性缓存 vs 方法
- 计算属性的 getter 和 setter, 是可以缓存的
- 计算属性在相关变量发生改变时才会重新求值
- computed: { now: () => Date.now() }, 缓存之后不变
- 调用方法,同样可以实现这个功能,但是每次都会执行函数

- watch, 响应数据的变化, 当需要在数据变化时执行异步或开销较大的操作时

```js
<template>
    <view>
        <input type="number" v-model="a" style="border: red solid 1px;" />
        <input type="number" v-model="b" style="border: red solid 1px;" />
        <view>总和：{{sum}}</view>
        <button type="default" @click="add" >求和</button>
        <span>--------------</span>
        <input type="number" v-model="obj.a" style="border: red solid 1px;" />
        <input type="number" v-model="obj.b" style="border: red solid 1px;" />
        <view>总和：{{sum1}}</view>
        <button type="default" @click="add1" >求和</button>
        </view>
</template>
<script>
    export default {
        data() {
            return {
                a:1,
                b:1,
                sum: "",
                obj: {
                    a1: 1,
                    b1: 1,
                },
                sum1: ""
            }
        },
        watch: {
            //使用watch来响应数据的变化，第一个参数为newVal新值，第二个参数oldVal为旧值
            a: {
                handler(newVal, oldVal) {
                    console.log("a------: ", newVal, oldVal);
                },
                immediate: true//初始化绑定时就会执行handler方法
            },
            b: {
                handler(newVal, oldVal) {
                    console.log("b------: ", newVal, oldVal);
                },
                immediate: true//初始化绑定时就会执行handler方法
            },
            obj: {
                handler(newVal, oldVal) {
                    console.log('obj-newVal:' + JSON.stringify(newVal), 'obj-oldVal:' + JSON.stringify(oldVal), );
                },
                deep: true//深度监听，监听对象内部的变化
            }
        },
        methods: {
            add() {
                this.sum = parseInt(this.a) + parseInt(this.b)
            },
            add1() {
                this.sum1 = parseInt(this.obj.a) + parseInt(this.obj.b)
            }
        }
    }
</script>

```
