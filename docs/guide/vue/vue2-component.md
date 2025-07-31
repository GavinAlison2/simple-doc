# Vue2 Component

## 介绍

`<component :is="xx">`是 Vue 中用于动态渲染组件的特殊语法，它和组件（Component）、插槽（Slot）的定位不同，主要用于根据数据动态切换不同组件。

<component> 是 Vue 提供的一个内置动态组件容器，通过 :is 指令绑定一个组件名或组件选项对象, 实现 “根据数据动态渲染不同组件” 的效果。

```vue
<template>
  <div>
    <!-- 根据 currentComponent 的值动态渲染不同组件 -->
    <component :is="currentComponent"></component>

    <button @click="currentComponent = 'ComponentA'">显示A</button>
    <button @click="currentComponent = 'ComponentB'">显示B</button>
  </div>
</template>

<script>
import ComponentA from './ComponentA.vue';
import ComponentB from './ComponentB.vue';

export default {
  components: { ComponentA, ComponentB },
  data() {
    return {
      currentComponent: 'ComponentA' // 初始渲染 ComponentA
    };
  }
};
</script>
```

## 与 Component、Slot 的核心区别

- Component（组件）
  - 封装独立功能单元（结构、逻辑、样式）,静态的
  - 可复用的代码模块，是被渲染的 “内容” 本身
- Slot（插槽）
  - 允许父组件向子组件插入自定义内容, 动态的html字符串
  - 组件内部的 “内容占位符”，用于内容定制
- `<component>`（动态组件容器）
  - 根据数据动态切换渲染不同组件, 根据数据选择组件,动态的
  - 组件的 “动态容器”，用于控制 “渲染哪个组件”

## 典型使用场景

- 标签页（Tab）切换：不同标签对应不同组件（如 “首页”“设置”“个人中心” 分别对应不同组件）；
- 动态表单：根据后端返回的字段类型，动态渲染文本框、下拉框、复选框等不同组件；
- 路由视图：Vue Router 的 <router-view> 本质就是用 <component :is> 实现的，根据路由动态渲染对应组件。
