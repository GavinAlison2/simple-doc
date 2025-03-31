import comp from "D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/pages/folder2/test4.html.vue"
const data = JSON.parse("{\"path\":\"/pages/folder2/test4.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[],\"git\":{\"updatedTime\":1743409932000,\"contributors\":[{\"name\":\"alice\",\"username\":\"alice\",\"email\":\"921757697@qq.com\",\"commits\":1,\"url\":\"https://github.com/alice\"}],\"changelog\":[{\"hash\":\"2af3526dfc4c58941397d9bdd68d56d9d062816b\",\"time\":1743409932000,\"email\":\"921757697@qq.com\",\"author\":\"alice\",\"message\":\"deploy\"}]},\"filePathRelative\":\"pages/folder2/test4.md\"}")
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
