<template>
  <div id="particles-js"></div>
</template>

<script>
import Particles from "particles.js";

export default {
  name: "ParticleBackground",
  mounted() {
    // 在组件挂载后初始化粒子动画
    Particles.init({
      selector: "#particles-js",
      color: "#ffffff",
      connectParticles: true,
      maxParticles: 100,
      speed: 0.5,
      sizeVariations: 3,
      responsive: [
        {
          breakpoint: 768,
          options: {
            maxParticles: 50,
            speed: 0.3,
          },
        },
      ],
    });
  },
};
</script>

<style scoped>
#particles-js {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-color: #000;
}
</style>
