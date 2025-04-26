# vuex

## 概念

- state // 状态树，基本数据定义, 类似组件中的 data
- getter // 理解为 store 中的计算属性，类似组件中的 computed
- mutation // 可以直接更改 store 中的状态的唯一方法是提交 mutation
- action // 负责控制提交 mutation，而自己不能直接更改 state
- module // 负责模块化管理

- this.$store.dispatch() 与 this.$store.commit()方法的区别总的来说他们只是存取方式的不同,两个方法都是传值给 vuex 的 mutation 改变 state
- this.$nextTick() 方法可以确保在下一个 DOM 更新循环中运行回调，在修改 state 之后，需要使用该方法来确保视图更新。

## 基本用法

- 安装

```
npm install vuex --save
```

- 创建 store.js 文件

```javascript
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    // 存放数据
    count: 0,
  },
  mutations: {
    // 修改 state 的方法
    increment(state) {
      state.count++;
    },
  },
  actions: {
    // 异步操作
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit("increment");
      }, 1000);
    },
  },
  getters: {
    // 计算属性
    doubleCount(state) {
      return state.count * 2;
    },
  },
});

export default store;
```

- 在 main.js 中引入 store.js 文件

```javascript
import Vue from "vue";
import App from "./App.vue";
import store from "./store";

new Vue({
  el: "#app",
  store,
  render: (h) => h(App),
});
```

- 在组件中使用 CounteView.vue

```javascript
<template>
  <div>
    <p>{{ count }}</p>
    <button @click="increment">Increment</button>
    <button @click="incrementAsync">Increment Async</button>
    <p>{{ doubleCount }}</p>
  </div>
    </template>

<script>
export default {
    name: "Counter",
    computed: {
        count() {
            return this.$store.state.count;
        },
        doubleCount() {
        return this.$store.getters.doubleCount;
        },
    },
    methods: {
        increment() {
            this.$store.commit("increment");
        },
        incrementAsync() {
            this.$store.dispatch("incrementAsync");
        },
    },
};
</script>

```

## module

- 创建 module.js 文件

```javascript
const moduleA = {
  state: {
    name: "moduleA",
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit("increment");
      }, 1000);
    },
  },
  getters: {
    doubleCount(state) {
      return state.count * 2;
    },
  },
};

const moduleB = {
  state: {
    name: "moduleB",
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit("increment");
      }, 1000);
    },
  },
  getters: {
    doubleCount(state) {
      return state.count * 2;
    },
  },
};

export default {
  moduleA,
  moduleB,
};
```

- 在 store.js 中引入 module.js 文件

```javascript
import Vue from "vue";
import Vuex from "vuex";
import modules from "./module";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules,
});

export default store;
```

- 在组件中使用 MultiVuexModuleView.vue

```javascript
<template>
  <div>
    <p>{{ moduleA.name }}</p>
    <p>{{ moduleB.name }}</p>
    <button @click="incrementModuleA">Increment Module A</button>
    <button @click="incrementModuleB">Increment Module B</button>
    <p>{{ moduleA.doubleCount }}</p>
    <p>{{ moduleB.doubleCount }}</p>
  </div>
</template>


<script>
import { mapState, mapGetters } from "vuex";


export default {
  name: "MultiVuexModuleView",
  computed: {
   ...mapState({ // 用于将 Vuex store 中的 state 映射到 Vue 组件的计算属性中
      moduleA: (state) => state.moduleA,
      moduleB: (state) => state.moduleB,
    }),
   ...mapGetters({ // 用于将 Vuex store 中的 getter 映射到 Vue 组件的计算属性中
      doubleCountA: "moduleA/doubleCount",
      doubleCountB: "moduleB/doubleCount",
    }),
  },
  methods: {
    incrementModuleA() {
      this.$store.commit("moduleA/increment");
    },
    incrementModuleB() {
      this.$store.commit("moduleB/increment");
    },
  },
  };
</script>
```
