import comp from "D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/ts/test3.html.vue"
const data = JSON.parse("{\"path\":\"/guide/ts/test3.html\",\"title\":\"test3\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[],\"git\":{\"updatedTime\":1743496862000,\"contributors\":[{\"name\":\"alice\",\"username\":\"alice\",\"email\":\"921757697@qq.com\",\"commits\":1,\"url\":\"https://github.com/alice\"}],\"changelog\":[{\"hash\":\"bab5e937f8ab6634c5d1998c279dabfc6cf18298\",\"time\":1743496862000,\"email\":\"921757697@qq.com\",\"author\":\"alice\",\"message\":\"deploy-5\"}]},\"filePathRelative\":\"guide/ts/test3.md\"}")
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
