# vue router

## table of contents

- 快速开始 cdn 方式配置 vue-router, html, js
- 动态路由匹配 `router[{path: '/user/:id', component: ''}]` 还有通配符
- 嵌套路由 `router[{path: '/user', component: User, children: [{path: ':id', component: UserProfile}]}`
- 编程式导航 `router.push('/user/1')`
- 声明式导航 `<router-link to="/user/1">Go to User 1</router-link>`
- 命名路由 `router.push({name: 'user', params: {userId: 123}})` 在配置路由时，给路由添加 name 属性，可以通过 name 跳转到指定路由
- 命名视图 `{path: '/bar', name: 'Bar', component: Bar}`
- 重定向和别名 `{path: '/a', redirect: '/b', alias: '/c'}` 访问 `/a`, `/c` 都会重定向到 `/b`
- 路由组件传参 `props: true` 路由组件中接收参数 `this.$route.params.id`
- Html5 History 模式 `router.mode = 'history'`
- 导航守卫 `router.beforeEach((to, from, next) => {})`
- 路由元信息 `router.beforeEach((to, from, next) => { next(vm => vm.title = to.meta.title) })`
  `routes: [{ path: '/foo', component: Foo, meta: { title: 'Foo Page', requiresAuth: true } }]`
  `this.$route.meta.title`

  ```js
  router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      // 判断该路由是否需要登录权限
      if (store.getters.isLoggedIn) {
        // 通过 store.getters.isLoggedIn 来获取当前的登录状态
        next();
      } else {
        // 未登录时跳转到登录页面
        next({ name: "Login", query: { redirect: to.fullPath } });
      }
    } else {
      next();
    }
  });
  ```

- 过渡动效 `<transition name="fade">` `<router-view></router-view>`
- 数据获取
  - 导航完成后获取数据 `created`
  - 导航完成前获取数据 `beforeRouteEnter` `beforeRouteUpdate` `beforeRouteLeave` 三个钩子函数
- 滚动行为 `scrollBehavior`
- 路由懒加载 `const User = () => import('./views/User.vue')`
- 导航故障 `router.onError((error) => {})`

## Router API

- `router.push(location, onComplete?, onAbort?)` // 跳转到指定路径, 替换当前路由，留下历史记录
- `router.replace(location, onComplete?, onAbort?)` // 替换当前路由，不会留下历史记录
- `router.go(n)` // 前进或后退 n 次, -1 为后退, 1 为前进
- `router.forward()` // 前进
- `router.back()` // 后退

## router 的设计思路

1. 路由是指根据请求的 URL 路径，将请求分发到相应的处理函数。
2. 存储结构, 字典, 存储路径和对应的处理函数
3. 实现路由
   - 创建字典,来存储路径和处理函数的映射关系
   - 编写函数来注册路径和处理函数, add
   - 编写函数来处理请求, match
4. 匹配规则, 路径匹配, 正则匹配, 动态匹配

## 借助 vue-router 实现路由功能

1. 安装 vue-router
2. 创建路由配置：在 Vue 项目中，创建一个路由配置文件，定义你的路由路径和对应的组件。
3. 创建路由实例：使用 VueRouter 构造函数创建一个路由实例，并传入路由配置。

## 路由配置

```js
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
];
```

## 路由实例

```js
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
```

## 路由匹配

```js
const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  console.log(`即将进入 ${to.name} 页面`);
  next();
});

router.afterEach((to, from) => {
  console.log(`已经进入 ${to.name} 页面`);
});

const app = new Vue({
  el: "#app",
  router,
  render: (h) => h(App),
});
```

## 动态路由匹配

```js
const routes = [
  {
    path: "/user/:id",
    name: "User",
    component: User,
  },
];
```

## 编程式导航

```js
this.$router.push({ name: "User", params: { id: 1 } });
```

## 声明式导航

```html
<router-link :to="{ name: 'User', params: { id: 1 } }"
  >Go to User 1</router-link
>
```

## 命名路由

```js
const routes = [
  {
    path: "/user/:id",
    name: "User",
    component: User,
  },
  {
    path: "/user/:id/profile",
    name: "UserProfile",
    component: UserProfile,
  },
];
```

## 命名视图

```js
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "about",
        name: "About",
        component: About,
      },
      {
        path: "contact",
        name: "Contact",
        component: Contact,
      },
    ],
  },
];
```

## 重定向和别名

```js
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
  {
    path: "/user",
    redirect: "/user/1",
  },
  {
    path: "/user/:id",
    name: "User",
    component: User,
  },
  {
    path: "/user/:id/profile",
    name: "UserProfile",
    component: UserProfile,
  },
];
```
