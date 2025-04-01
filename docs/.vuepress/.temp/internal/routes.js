export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/bak-README.html", { loader: () => import(/* webpackChunkName: "bak-README.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/bak-README.html.js"), meta: {"title":"Home"} }],
  ["/get-started.html", { loader: () => import(/* webpackChunkName: "get-started.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/get-started.html.js"), meta: {"title":"Get Started"} }],
  ["/ray.html", { loader: () => import(/* webpackChunkName: "ray.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/ray.html.js"), meta: {"title":"11111"} }],
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":"Home"} }],
  ["/guide/ts/test1.html", { loader: () => import(/* webpackChunkName: "guide_ts_test1.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/ts/test1.html.js"), meta: {"title":""} }],
  ["/guide/ts/test2.html", { loader: () => import(/* webpackChunkName: "guide_ts_test2.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/ts/test2.html.js"), meta: {"title":"test2"} }],
  ["/guide/ts/test3.html", { loader: () => import(/* webpackChunkName: "guide_ts_test3.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/ts/test3.html.js"), meta: {"title":"test3"} }],
  ["/guide/vue/test1.html", { loader: () => import(/* webpackChunkName: "guide_vue_test1.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/vue/test1.html.js"), meta: {"title":"Test1"} }],
  ["/guide/vue/test2.html", { loader: () => import(/* webpackChunkName: "guide_vue_test2.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/vue/test2.html.js"), meta: {"title":"test2"} }],
  ["/guide/vue/test3.html", { loader: () => import(/* webpackChunkName: "guide_vue_test3.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/vue/test3.html.js"), meta: {"title":"test3"} }],
  ["/pages/folder1/test1.html", { loader: () => import(/* webpackChunkName: "pages_folder1_test1.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/pages/folder1/test1.html.js"), meta: {"title":""} }],
  ["/pages/folder1/test3.html", { loader: () => import(/* webpackChunkName: "pages_folder1_test3.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/pages/folder1/test3.html.js"), meta: {"title":""} }],
  ["/pages/folder2/test4.html", { loader: () => import(/* webpackChunkName: "pages_folder2_test4.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/pages/folder2/test4.html.js"), meta: {"title":""} }],
  ["/pages/vuepress/vuepress-install.html", { loader: () => import(/* webpackChunkName: "pages_vuepress_vuepress-install.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/pages/vuepress/vuepress-install.html.js"), meta: {"title":"VuePress 安装"} }],
  ["/guide/project/document/env.html", { loader: () => import(/* webpackChunkName: "guide_project_document_env.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/project/document/env.html.js"), meta: {"title":""} }],
  ["/guide/project/document/intro.html", { loader: () => import(/* webpackChunkName: "guide_project_document_intro.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/project/document/intro.html.js"), meta: {"title":""} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
]);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateRoutes) {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
  }
  if (__VUE_HMR_RUNTIME__.updateRedirects) {
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ routes, redirects }) => {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  })
}
