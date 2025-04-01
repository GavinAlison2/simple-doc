import comp from "D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/ts/test1.html.vue"
const data = JSON.parse("{\"path\":\"/guide/ts/test1.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[],\"git\":{\"updatedTime\":1743496862000,\"contributors\":[{\"name\":\"alice\",\"username\":\"alice\",\"email\":\"921757697@qq.com\",\"commits\":2,\"url\":\"https://github.com/alice\"}],\"changelog\":[{\"hash\":\"bab5e937f8ab6634c5d1998c279dabfc6cf18298\",\"time\":1743496862000,\"email\":\"921757697@qq.com\",\"author\":\"alice\",\"message\":\"deploy-5\"},{\"hash\":\"074e85f856de4890994d6061e901cce856e9d61e\",\"time\":1743345460000,\"email\":\"921757697@qq.com\",\"author\":\"alice\",\"message\":\"deploy\"}]},\"filePathRelative\":\"guide/ts/test1.md\"}")
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
