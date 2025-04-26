<template>
  <div class="text-center *:font-bold text-2xl mb-4 mt-8">
    <h2>AboutView</h2>
    <div class="max-w-xl mx-auto text-left">
      <span>route.path == {{ $route.path }}</span> <br />
      <span>route.fullPath == {{ $route.fullPath }}</span> <br />
      <span>route.hash == {{ $route.hash }}</span> <br />
      <span>route.name == {{ $route.name }}</span> <br />
      <span>route.meta == {{ $route.meta }}</span> <br />
      <span>route.params =={{ $route.params }}</span> <br />
      <span>route.query == {{ $route.query }}</span> <br />
      <span>route.redirectedFrom == {{ $route.redirectedFrom }}</span> <br />
      <!-- <label> Search: <input v-model.trim="search" maxlength="20" /> </label> -->
    </div>
  </div>
</template>
<script setup>
// import { computed } from "vue";
// import { useRoute, useRouter } from "vue-router";

// const router = useRouter();
// const route = useRoute();

// const search = computed({
// get() {
// return route.query.search ?? "";
// },
// set(search) {
// router.replace({ query: { search } });
// },
// });
</script>
