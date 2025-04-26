import Vue from 'vue'
import VueRouter from 'vue-router'
import Post from './components/Post.vue'
import FetchApp from './FetchApp.vue'
import Home from './components/HomeView.vue'

Vue.use(VueRouter)

// const Home = { template: '<div>home</div>' }

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Home },
    { path: '/post/:id', component: Post },
    { path: '/*', component: Home },
  ]
})

new Vue({
  router,
  render: h => h(FetchApp)
}).$mount('#app1')