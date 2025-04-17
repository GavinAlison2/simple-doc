<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <!-- <button
      class="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900"
    >
      Button
    </button>
    <button class="btn">Button</button>
    <button class="btn btn-primary">Button</button>
    <button class="btn w-64 rounded-full">Button</button> -->
    <div class="block"></div>
    <ul
      class="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box gap-4 text-white"
    >
      <li class="bg-cyan-500 rounded-box">
        <RouterLink to="/hello">Go to Hello World</RouterLink>
      </li>
      <li class="bg-cyan-500 rounded-box">
        <RouterLink to="/namedview">Go to named view</RouterLink>
      </li>
      <li class="bg-cyan-500 rounded-box">
        <RouterLink to="/">Go to Home</RouterLink>
      </li>
      <li class="bg-cyan-500 rounded-box block">
        <RouterLink to="/about">Go to About</RouterLink>
      </li>
      <li class="bg-cyan-500 rounded-box">
        <RouterLink to="/user/1">Go to User 1</RouterLink>
      </li>
      <li class="bg-cyan-500 rounded-box">
        <RouterLink to="/user/2">Go to User 2</RouterLink>
      </li>
      <li class="bg-cyan-500 rounded-box">
        <RouterLink to="/user-12">Go to User 12</RouterLink>
      </li>
      <li class="bg-cyan-500 rounded-box">
        <RouterLink to="/user/3/edit/1">Go to User 3 edit 1</RouterLink>
      </li>
      <li class="bg-cyan-500 rounded-box">
        <RouterLink to="/user/3/edit/2">Go to User 3 edit 2 </RouterLink>
      </li>
    </ul>
    <div class="container mx-auto">
      <RouterLink to="/outer/all" class="btn btn-primary w-auto">
        Go to /outer/innerAll
      </RouterLink>
      <RouterLink to="/outer/inner1" class="btn btn-primary w-auto">
        Go to /outer/inner1
      </RouterLink>
      <RouterLink to="/outer/inner2" class="btn btn-primary w-auto">
        Go to /outer/inner2
      </RouterLink>
    </div>
    <!-- <nav class="max-w-md mx-auto"> -->
    <!-- <RouterLink to="/about">Go to About</RouterLink> -->
    <!-- <RouterLink to="/user/1">Go to User 1</RouterLink> -->
    <!-- <RouterLink to="/user/2">Go to User 2</RouterLink> -->
    <!-- <RouterLink to="/user/3/edit/1" class="block rounded-lg shadow-lg" -->
    <!-- >Go to User edit 3 -->
    <!-- </RouterLink> -->
    <!-- <RouterLink to="/user/3/edit/1">Go to User edit 3</RouterLink> -->
    <!-- </nav> -->
    <main class="mt-4 pt-4">
      <RouterView></RouterView>
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
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
a {
  margin: auto 10px;
  padding: auto 10px;
  /* background-color: #ccc; */
  width: 100px;
  height: auto;
}
</style>
