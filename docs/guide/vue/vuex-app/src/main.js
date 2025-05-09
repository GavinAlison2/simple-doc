import Vue from 'vue'
import App from './App.vue'

import store from './store/index'


Vue.config.productionTip = false

new Vue({
  store,
  // store_modules,
  render: h => h(App),
}).$mount('#app')
