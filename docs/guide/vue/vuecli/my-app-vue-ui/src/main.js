import Vue from 'vue' // 导入Vue
import App from './App.vue'// 导入App组件

Vue.config.productionTip = false

new Vue({
  render: h => h(App), // 使用render函数渲染App组件, 而不是直接渲染App组件
}).$mount('#app') // new 一个vue实例, 并将App组件渲染到id为app的元素上
