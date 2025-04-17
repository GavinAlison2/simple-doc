import comp from "D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/etl/spark/index.html.vue"
const data = JSON.parse("{\"path\":\"/guide/etl/spark/\",\"title\":\"Spark\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"内容\",\"slug\":\"内容\",\"link\":\"#内容\",\"children\":[]}],\"git\":{\"updatedTime\":1744726067000,\"contributors\":[{\"name\":\"alice\",\"username\":\"alice\",\"email\":\"921757697@qq.com\",\"commits\":2,\"url\":\"https://github.com/alice\"}],\"changelog\":[{\"hash\":\"d075898e68e7a6d129496b2eb84d6f43099ce89c\",\"time\":1744726067000,\"email\":\"921757697@qq.com\",\"author\":\"alice\",\"message\":\"deploy\"},{\"hash\":\"074e85f856de4890994d6061e901cce856e9d61e\",\"time\":1743345460000,\"email\":\"921757697@qq.com\",\"author\":\"alice\",\"message\":\"deploy\"}]},\"filePathRelative\":\"guide/etl/spark/readme.md\"}")
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
