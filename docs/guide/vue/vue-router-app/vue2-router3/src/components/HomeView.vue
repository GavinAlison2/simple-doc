<template>
  <div class="text-center *:font-bold text-2xl mb-4 mt-8">
    <h2>HomeView</h2>
    <button @click="goToAbout" class="btn btn-primary my-10 mx-2">
      Go to About
    </button>
    <button class="btn btn-secondary my-10 mx-2" @click="gotoOtherLink">
      go to non-existing link
    </button>
  </div>
</template>
<script>
export default {
  name: "HomeView",
  methods: {
    goToAbout() {
      console.log(this.$router);
      console.log(this.$route);
      console.log(this.$route.path);
      this.$router.push("about"); // 找到路由对象，调用push方法跳转到about页面
      // this.$router.push("/about"); // 也可以用绝对路径跳转页面
      // this.$router.push({ path: "/about" }); // 也可以用对象形式跳转页面
      // this.$router.push({ name: "about" }); // 也可以用name跳转页面
      // this.$router.push({ name: "about", params: { id: 123 } }); // 也可以用对象形式跳转页面，并传递参数 --> /about/123--> 这里的params不会生效，因为路由配置中没有定义动态参数
      // this.$router.push({
      //   // path: "/about/123/post/456",// 只能填写实际参数
      //   name: "about-dynamic",
      //   params: { about_id: 123, post_id: 456 },
      // });
      // this.$router.push({ name: "about", query: { q: "search" } }); // 传递查询参数 --> /about?q=search
      // this.$router.push({  name: "about", params: { id: 123 },  query: { q: "search" }, });
    },
    gotoOtherLink() {
      console.log(this.$router);
      if (this.$route.path !== "/non-existing") {
        this.$router.push("/non-existing");
      }
    },
  },
  mounted() {
    console.log("HomeView mounted");
    console.log(this.$route.params.pathMatch);
  },
  created() {
    console.log("HomeView created");
    console.log("pathMatch", this.$route.params.pathMatch);
  },
  $route(to, from) {
    console.log("$route", to, from);
    console.log("pathMatch", this.$route.params.pathMatch);
    console.log("pathMatch", this.$route.params);
    console.log("pathMatch", this.$route);
  },
  beforeRouteEnter(to, from, next) {
    if (to.path === from.path) {
      next(false);
    } else {
      next();
    }
  },
};
</script>
