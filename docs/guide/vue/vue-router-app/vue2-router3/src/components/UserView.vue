<template>
  <div class="text-center *:font-bold text-2xl mb-4 mt-8">
    User: {{ $route.params.id }}
    <br />
    {{ $route.params.pathMatch }}
    <br />
    {{ $route.params }}
  </div>
</template>

<script>
// console.log($route);
// console.log($route.params);
// console.log($route.params.id);
// 这里面找不到 $route，  this.$route
export default {
  name: "UserView",
  created() {
    // console.log(this.$route);
    // console.log(this.$route.params);
    // console.log(this.$route.params.id);
    // console.log("pathMatch", this.$route.params.pathMatch);
  },
  watch: {
    /**
     * 处理路由跳转事件
     *
     * @param to 目标路由对象
     * @param from 当前路由对象
     */
    $route(to, from) {
      console.log("to", to);
      console.log("from", from);
    },
    /**
     * 监听路由参数中的id变化
     *
     * @param newVal 新的id值
     * @param oldVal 旧的id值
     */
    "$route.params.id"(newVal, oldVal) {
      console.log("newVal", newVal);
      console.log("oldVal", oldVal);
    },
  },
  /**
   * 在路由进入之前调用
   *
   * @param to 路由目标对象
   * @param from 路由来源对象
   * @param next 导航守卫中一定要调用的方法，用于解决异步验证
   */
  beforeRouteEnter(to, from, next) {
    console.log("beforeRouteEnter", to, from);
    next();
  },
};
</script>
