export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/get-started.html", { loader: () => import(/* webpackChunkName: "get-started.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/get-started.html.js"), meta: {"title":"Get Started"} }],
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":"Home"} }],
  ["/pages/folder1/test1.html", { loader: () => import(/* webpackChunkName: "pages_folder1_test1.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/pages/folder1/test1.html.js"), meta: {"title":""} }],
  ["/pages/folder1/test3.html", { loader: () => import(/* webpackChunkName: "pages_folder1_test3.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/pages/folder1/test3.html.js"), meta: {"title":""} }],
  ["/pages/folder2/test4.html", { loader: () => import(/* webpackChunkName: "pages_folder2_test4.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/pages/folder2/test4.html.js"), meta: {"title":""} }],
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
