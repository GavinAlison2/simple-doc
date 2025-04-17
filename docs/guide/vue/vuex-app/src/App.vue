<template>
  <div id="app">
    <!-- <UserComponent /> -->
    <MultiVuexModuleView />
  </div>
</template>

<script>
// import UserComponent from "./components/UserComponent.vue";
import MultiVuexModuleView from "./components/MultiVuexModuleView.vue";

export default {
  name: "App",
  components: {
    // UserComponent,
    MultiVuexModuleView,
    // HelloWorld,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
