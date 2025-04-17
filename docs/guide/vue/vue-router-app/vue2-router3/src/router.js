import Vue from 'vue'
// import Router from 'vue-router'
import VueRouter from 'vue-router'

import HomeView from './components/HomeView.vue'
import AboutView from './components/AboutView.vue'
import UserView from './components/UserView.vue'
import UserEditView from './components/UserEditView.vue'
import InnerView1 from './components/InnerView.vue'
import InnerView2 from './components/InnerView2.vue'
import OutView from './components/OutView.vue'
import InnerViewAll from './components/InnerViewAll.vue'
import HelloWorld from './components/HelloWorld.vue'

import multi_routes from './multiview'
import { redirectRoutes as redirct_routes } from './redirectview'

// console.log('redirectRoutes ', typeof redirectRoutes, redirectRoutes)
// export default xxx; import xxx from './router'; // 默认导出和导入
// export {xx}; import {xx} from './router'; //命名导出和导入

// console.log(typeof redirct_routes)
// console.log(redirct_routes)
// 确保在这里注册 vue-router
// Vue.use(Router)
Vue.use(VueRouter)
const routes = [
    ...multi_routes,
    ...redirct_routes,
    { path: '/', component: HomeView },
    { path: '/hello', component: HelloWorld, props: true, name: 'hello' },
    { path: '/about', component: AboutView, name: 'about' },

    { path: '/about/:about_id/post/:post_id', component: AboutView, name: 'about-dynamic' },
    { path: '/user-*', component: UserView, name: 'userMatch' },
    { path: '/user/:id', component: UserView, name: 'user' },
    {
        path: '/outer/:id',
        component: OutView,
        children: [
            { path: '', component: InnerViewAll },
            { path: '/inner1', component: InnerView1 },
            { path: '/inner2', component: InnerView2 },
        ]
    },
    { path: '/user/:id/edit/:edit_id', component: UserEditView },
    // { path: '*', redirect: '/' } // 404 页面 重定向到首页
    { path: '/*', component: HomeView }
]

// console.log(routes)
// const router = new Router({
//     mode: 'history', // 使用 history 模式或 hash 模式
//     routes
// })
const router = new VueRouter({
    mode: 'history',
    routes
})
// console.log(router)

export default router