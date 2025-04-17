<template>
  <div>
    <h1 class="mt-5 mb-3">This is the out view</h1>
    <h2>------------上面是outview的标题------------</h2>
    <h2>------------下面是children的内容-------------</h2>
    <router-view class="mt-3"></router-view>
  </div>
</template>

<script>
export default {
  name: "OutView",
};
</script>
