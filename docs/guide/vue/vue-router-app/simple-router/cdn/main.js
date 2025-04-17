// 由于使用了 CDN，Vue 和 VueRouter 已经全局可用
const Vue = window.Vue;
const VueRouter = window.VueRouter;

Vue.use(VueRouter);

// 定义 App 组件
const App = {
    template: `
      <div id="app">
        <h1>Vue Router Demo</h1>
        <nav>
          <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link>
        </nav>
        <router-view></router-view>
      </div>
    `
};

// 定义 Home 组件
const Home = {
    template: `
      <div>
        <h2>Home Page</h2>
        <p>Welcome to the Home Page!</p>
      </div>
    `
};

// 定义 About 组件
const About = {
    template: `
      <div>
        <h2>About Page</h2>
        <p>This is the About Page.</p>
      </div>
    `
};

// 定义路由
const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

// 创建 Vue 实例
// 挂载路由实例到 Vue 实例上
new Vue({
    el: '#app', // 指定挂载点, 表示 Vue 实例将挂载到页面中 ID 为 app 的元素上
    router, // 挂载路由实例
    render: h => h(App)
    // render 是 Vue 实例的渲染函数。渲染函数是一个返回 Vue 组件的函数，用于定义应用的根组件。
    // h 是一个函数，用于创建虚拟 DOM 节点。它是一个简写，通常代表 createElement。
    // h => h(App) 是一个箭头函数，返回 h(App)，即创建一个 App 组件的虚拟 DOM 节点。
});