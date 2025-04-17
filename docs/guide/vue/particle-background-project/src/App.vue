<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <!-- 使用粒子背景组件 -->
    <ParticleBackground />
    <!-- 页面内容 -->
    <div class="content">
      <h1>欢迎来到页面</h1>
      <p>这里是页面的主要内容。</p>
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import ParticleBackground from "./components/ParticleBackground.vue";
export default {
  name: "App",
  components: {
    // HelloWorld,
    ParticleBackground,
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
.content {
  position: relative;
  z-index: 1;
  padding: 20px;
}
</style>
