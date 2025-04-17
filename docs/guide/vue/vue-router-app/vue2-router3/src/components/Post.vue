<template>
  <div class="post">
    <div class="loading" v-if="loading">Loading...</div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <transition name="slide">
      <!--
          giving the post container a unique key triggers transitions
          when the post id changes.
        -->
      <div v-if="post" class="content" :key="post.id">
        <h2>{{ post.title }}</h2>
        <p>{{ post.body }}</p>
      </div>
    </transition>
  </div>
</template>

<script>
import { getPost } from "../api.js";

export default {
  data() {
    return {
      loading: false,
      post: null,
      error: null,
    };
  },
  /**
   * Vue组件的生命周期钩子函数，当组件被创建时调用。
   *
   * 在该函数中，调用 fetchData 方法来获取数据。
   */
  created() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData();
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: "fetchData",
  },
  methods: {
    fetchData() {
      this.error = this.post = null;
      this.loading = true;
      // replace getPost with your data fetching util / API wrapper
      getPost(this.$route.params.id, (err, post) => {
        this.loading = false;
        if (err) {
          this.error = err.toString();
        } else {
          this.post = post;
        }
      });
    },
  },
  // 在导航完成前获取数据
  // beforeRouteEnter(to, from, next) {
  //   getPost(to.params.id, (err, post) => {
  //     next((vm) => vm.setData(err, post));
  //   });
  // },
  // // 路由改变前，组件就已经渲染完了
  // // 逻辑稍稍不同
  // beforeRouteUpdate(to, from, next) {
  //   this.post = null;
  //   getPost(to.params.id, (err, post) => {
  //     this.setData(err, post);
  //     next();
  //   });
  // },
  // methods: {
  //   setData(err, post) {
  //     if (err) {
  //       this.error = err.toString();
  //     } else {
  //       this.post = post;
  //     }
  //   },
  // },
};
</script>

<style>
.loading {
  position: absolute;
  top: 10px;
  right: 10px;
}
.error {
  color: red;
}
.content {
  transition: all 0.35s ease;
  position: absolute;
}
.slide-enter {
  opacity: 0;
  transform: translate(30px, 0);
}
.slide-leave-active {
  opacity: 0;
  transform: translate(-30px, 0);
}
</style>
