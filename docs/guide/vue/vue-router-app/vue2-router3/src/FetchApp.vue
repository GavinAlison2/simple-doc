<template>
  <div id="app">
    <h1>Data Fetching</h1>
    <ul>
      <li><router-link to="/">/</router-link></li>
      <li><router-link to="/post/1">/post/1</router-link></li>
      <li><router-link to="/post/2">/post/2</router-link></li>
      <li><router-link to="/post/3">/post/3</router-link></li>
    </ul>
    <router-view class="view"></router-view>
  </div>
</template>

<script>
export default {
  name: "FetchApp",
};
</script>
