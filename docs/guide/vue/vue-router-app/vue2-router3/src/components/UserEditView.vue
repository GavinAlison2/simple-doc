<template>
  <div class="text-center *:font-bold text-2xl mb-4 mt-8">
    User: {{ $route.params }}
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
    console.log(this.$route);
    console.log(this.$route.params);
  },
};
</script>
