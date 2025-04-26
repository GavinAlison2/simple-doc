<template>
  <div>
    named view: {{ $route.name }} <br />
    <main>
      <router-view></router-view>
      <router-view name="bar"></router-view>
      <router-view name="baz"></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: "NamedView",
};
</script>
