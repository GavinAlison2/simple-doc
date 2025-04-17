# vue2-directive

```js
Vue.directive("my-directive", {
  bind: function (el, binding, vnode) {
    // do something when the directive is bound
    console.log("my-directive bound");
  },
  update: function (el, binding, vnode, oldVnode) {
    // do something when the directive is updated
    console.log("my-directive updated");
  },
  unbind: function (el, binding, vnode) {
    // do something when the directive is unbound
    console.log("my-directive unbound");
  },
});

v-my-directive="someValue"
```

## vue plugins 插件

```js
// my-plugin.js
const tab = {
  refreshPage(obj) {
    console.log("refreshPage");
  },
  closeTab(obj) {
    console.log("closeTab");
  },
};
Vue.prototype.$tab = tab;

// main.js
import myPlugin from "./my-plugin.js";
Vue.use(myPlugin);
```

## Vue component 组件

```js
// my-component.vue
<template>
  <div>
    <h1>This is my component</h1>
    <button v-on:click="$emit('close')">Close</button>
  </div>
  </template>

<script>
export default {
  name: "my-component",
  props: {
    title: {
      type: String,
      default: "This is my component",
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>


// main.js
import myComponent from "./my-component.vue";

Vue.component("my-component", myComponent);

```
