import comp from "D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/index.html.vue"
const data = JSON.parse("{\"path\":\"/\",\"title\":\"Home\",\"lang\":\"zh-CN\",\"frontmatter\":{\"home\":true,\"title\":\"Home\",\"heroImage\":\"https://vuejs.press/images/hero.png\",\"actions\":[{\"text\":\"Get Started\",\"link\":\"/get-started.html\",\"type\":\"primary\"},{\"text\":\"Introduction\",\"link\":\"https://vuejs.press/guide/introduction.html\",\"type\":\"secondary\"}],\"features\":[{\"title\":\"Simplicity First\",\"details\":\"Minimal setup with markdown-centered project structure helps you focus on writing.\"},{\"title\":\"Vue-Powered\",\"details\":\"Enjoy the dev experience of Vue, use Vue components in markdown, and develop custom themes with Vue.\"},{\"title\":\"Performant\",\"details\":\"VuePress generates pre-rendered static HTML for each page, and runs as an SPA once a page is loaded.\"},{\"title\":\"Themes\",\"details\":\"Providing a default theme out of the box. You can also choose a community theme or create your own one.\"},{\"title\":\"Plugins\",\"details\":\"Flexible plugin API, allowing plugins to provide lots of plug-and-play features for your site.\"},{\"title\":\"Bundlers\",\"details\":\"Default bundler is Vite, while Webpack is also supported. Choose the one you like!\"}],\"footer\":\"MIT Licensed | Copyright © 2018-present VuePress Community\"},\"headers\":[],\"git\":{\"updatedTime\":1743345460000,\"contributors\":[{\"name\":\"alice\",\"username\":\"alice\",\"email\":\"921757697@qq.com\",\"commits\":1,\"url\":\"https://github.com/alice\"}],\"changelog\":[{\"hash\":\"074e85f856de4890994d6061e901cce856e9d61e\",\"time\":1743345460000,\"email\":\"921757697@qq.com\",\"author\":\"alice\",\"message\":\"deploy\"}]},\"filePathRelative\":\"README.md\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
