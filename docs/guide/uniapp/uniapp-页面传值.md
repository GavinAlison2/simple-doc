# uniapp 页面传值

uniapp 页面传值有两种方式：

1. 父子组件通信
2. 页面间通信
3. 全局变量

## 父子组件通信

父组件通过 props 向子组件传递数据，子组件通过 this.$emit() 触发事件，父组件通过事件回调函数接收数据。

```html
<!-- 父组件 -->
<template>
  <view>
    <child :data="msg"></child>
  </view>
</template>

<script>
  import child from "./child.vue";

  export default {
    components: {
      child,
    },
    data() {
      return {
        msg: "Hello, child component!",
      };
    },
  };
</script>
```

```html
<!-- 子组件 -->
<template>
  <view>
    <text>{{ data }}</text>
  </view>
</template>

<script>
  export default {
    props: {
      data: {
        type: String,
        default: "",
      },
    },
  };
</script>
```

## 页面间通信

uniapp 页面间通信有两种方式：

1. uni.navigateTo() 跳转页面
2. uni.redirectTo() 重定向页面
3. uni.switchTab() 跳转到指定 tab
4. uni.reLaunch() 关闭当前页面，重新打开一个新页面

uniapp 页面传递参数, 事件通道传递参数

```javascript
// 跳转页面
this.getOpenerEventChannel().emit("foo-func", { id: 1 });
const backDataCallBack = (data) => {
  console.log(data.id); // 1
};
this.getOpenerEventChannel().on("foo-func-back", backDataCallBack);
this.getOpenerEventChannel().off("foo-func-back", backDataCallBack);
// 取回参数

// 父组件跳转页面
uni.navigateTo({
  url: "pages/detail/detail?id=1",
});

// 重定向页面
uni.redirectTo({
  url: "pages/detail/detail?id=1",
});

// 跳转到指定 tab
uni.switchTab({
  url: "pages/index/index",
});

// 关闭当前页面，重新打开一个新页面
uni.reLaunch({
  url: "pages/index/index",
});
```

## 全局变量

uniapp 页面间通信有两种方式：

1. uni.setStorage() 设置全局变量
2. uni.getStorage() 获取全局变量

```javascript
// 设置全局变量
uni.setStorage({
  key: "name",
  data: "uniapp",
});

// 获取全局变量
uni.getStorage({
  key: "name",
  success: function (res) {
    console.log(res.data); // "uniapp"
  },
});
```
