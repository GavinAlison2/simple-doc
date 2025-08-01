# Vue 2 通信

## 父子组件通信

父组件通过 props 向子组件传递数据，子组件通过事件触发父组件的方法。

子组件通过 $emit 触发父组件的方法，父组件通过 `v-on/@event` 监听子组件的事件。

```vue
<!-- 父组件 -->
<template>
  <div>
    <h1>父组件</h1>
    <child :msg="msg" @change="change"></child>
  </div>
</template>

<script>
  import Child from "./Child.vue";

  export default {
    name: "Parent",
    components: {
      Child,
    },
    data() {
      return {
        msg: "Hello, Vue!",
      };
    },
    methods: {
      change(msg) {
        this.msg = msg;
      },
    },
  };
</script>

<!-- 子组件 -->
<template>
  <div>
    <h2>子组件</h2>
    <p>{{ msg }}</p>
  </div>
</template>

<script>
  export default {
    name: "Child",
    props: {
      msg: {
        type: String,
        required: true,
      },
    },
    methods: {
      change() {
        this.$emit("change", "子组件改变了数据");
      },
    },
  };
</script>
```

## 兄弟组件通信

兄弟组件通信可以借助事件总线，父组件向事件总线中触发事件，子组件监听事件，父组件向事件总线中触发事件，子组件监听事件。

`main.js`引入事件总线

main.js:

```js
const eventBus = new Vue();
Vue.prototype.$eventBus = eventBus;
```

parent.vue:

```vue
<!-- 父组件 -->
<template>
  <view class="container">
    <text class="title">兄弟组件通信示例</text>
    <!-- 兄弟组件A -->
    <brother-a></brother-a>
    <!-- 兄弟组件B -->
    <brother-b></brother-b>
  </view>
</template>

<script>
  import BrotherA from "./BrotherA.vue";
  import BrotherB from "./BrotherB.vue";

  export default {
    components: {
      BrotherA,
      BrotherB,
    },
    data() {
      return {};
    },
    onLoad() {
      console.log("父页面加载完成");
    },
  };
</script>
```

BrotherA.vue

```vue
<template>
  <view class="brother-a">
    <text class="component-title">组件 A</text>
    <view class="content">
      <input
        type="text"
        v-model="message"
        placeholder="输入要发送给B的内容"
        class="input"
      />
      <button @click="sendToB" class="send-btn">发送给组件B</button>

      <view class="receive-area" v-if="receiveFromB || receiveFromB === ''">
        <text class="receive-label">收到B的消息：</text>
        <text class="receive-content">{{ receiveFromB || "暂无消息" }}</text>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        message: "",
        receiveFromB: "",
        // 保存事件监听的回调引用
        bMessageCallback: null,
      };
    },
    mounted() {
      // 页面加载时注册监听
      console.log("组件A加载，开始监听来自B的消息");

      // 定义回调函数
      this.bMessageCallback = (data) => {
        console.log("组件A收到消息:", data);
        this.receiveFromB = data;
        // 显示提示
        uni.showToast({
          title: "收到B的消息",
          icon: "none",
          duration: 2000,
        });
      };

      // 注册事件监听
      // uni.$on("message-from-b", this.bMessageCallback);
      this.$eventBus.$on("message-from-b", this.bMessageCallback);
    },
    beforeDestroy() {
      // 页面卸载时移除监听
      console.log("组件A卸载，移除消息监听");
      // uni.$off("message-from-b", this.bMessageCallback);
      this.$eventBus.$off("message-from-b", this.bMessageCallback);
    },
    methods: {
      sendToB() {
        if (!this.message.trim()) {
          uni.showToast({
            title: "请输入内容",
            icon: "none",
          });
          return;
        }

        console.log("组件A发送消息:", this.message);
        // 发送消息到B
        // uni.$emit("message-from-a", this.message);
        this.$eventBus.$emit("message-from-a", this.message);
        // 清空输入框
        this.message = "";
      },
    },
  };
</script>
```

BrotherB.vue

```vue
<template>
  <view class="brother-b">
    <text class="component-title">组件 B</text>
    <view class="content">
      <input
        type="text"
        v-model="message"
        placeholder="输入要发送给A的内容"
        class="input"
      />
      <button @click="sendToA" class="send-btn">发送给组件A</button>

      <view class="receive-area" v-if="receiveFromA || receiveFromA === ''">
        <text class="receive-label">收到A的消息：</text>
        <text class="receive-content">{{ receiveFromA || "暂无消息" }}</text>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        message: "",
        receiveFromA: "",
        // 保存事件监听的回调引用
        aMessageCallback: null,
      };
    },
    mounted() {
      // 页面加载时注册监听
      console.log("组件B加载，开始监听来自A的消息");

      // 定义回调函数
      this.aMessageCallback = (data) => {
        console.log("组件B收到消息:", data);
        this.receiveFromA = data;
        // 显示提示
        uni.showToast({
          title: "收到A的消息" + this.receiveFromA,
          icon: "none",
          duration: 2000,
        });
      };

      // 注册事件监听
      // uni.$on("message-from-a", this.aMessageCallback);
      this.$eventBus.$on("message-from-a", this.aMessageCallback);
    },
    beforeDestroy() {
      // 页面卸载时移除监听
      console.log("组件B卸载，移除消息监听");
      // uni.$off("message-from-a", this.aMessageCallback);
      this.$eventBus.$off("message-from-a", this.aMessageCallback);
    },
    methods: {
      sendToA() {
        if (!this.message.trim()) {
          uni.showToast({
            title: "请输入内容",
            icon: "none",
          });
          return;
        }

        console.log("组件B发送消息:", this.message);
        // 发送消息到A
        // uni.$emit("message-from-b", this.message);
        this.$eventBus.$emit("message-from-b", this.message);
        // 清空输入框
        this.message = "";
      },
    },
  };
</script>
```

## 使用状态组件 Vuex/Pinia

状态管理工具 Vuex/Pinia 用于管理组件的状态，可以实现父子组件通信、兄弟组件通信。

```vue
<!-- 父组件 -->
<template>
  <div>
    <h1>父组件</h1>
    <child :msg="msg" @change="change"></child>
  </div>
</template>

<script>
  import { useStore } from "../store";
  import Child from "./Child.vue";

  export default {
    name: "Parent",
    components: {
      Child,
    },
    setup() {
      const store = useStore();
      const msg = store.state.msg;
      const change = (msg) => {
        store.commit("changeMsg", msg);
      };
      return {
        msg,
        change,
      };
    },
  };
</script>

<!-- 子组件 -->
<template>
  <div>
    <h2>子组件</h2>
    <p>{{ msg }}</p>
  </div>
</template>

<script>
  import { useStore } from "../store";
  export default {
    name: "Child",
    props: {
      msg: {
        type: String,
        required: true,
      },
    },
    setup() {
      const store = useStore();
      const change = () => {
        store.dispatch("changeMsg", "子组件改变了数据");
      };
      return {
        change,
      };
    },
  };
</script>

<!-- 兄弟组件 -->
<template>
  <div>
    <h3>兄弟组件</h3>
    <p>{{ msg }}</p>
  </div>
</template>

<script>
  import { useStore } from "../store";
  export default {
    name: "Brother",
    props: {
      msg: {
        type: String,
        required: true,
      },
    },
    setup() {
      const store = useStore();
      const change = () => {
        store.dispatch("changeMsg", "兄弟组件改变了数据");
      };
      return {
        change,
      };
    },
  };
</script>

<!-- 状态管理 -->
<script>
  import { createStore } from "vuex";
  export default createStore({
    state: {
      msg: "Hello, Vue!",
    },
    mutations: {
      changeMsg(state, msg) {
        state.msg = msg;
      },
    },
    actions: {
      changeMsg(context, msg) {
        context.commit("changeMsg", msg);
      },
    },
  });
</script>
```
