import comp from "D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/vue/test1.html.vue"
const data = JSON.parse("{\"path\":\"/guide/vue/test1.html\",\"title\":\"Test1\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"Subheading\",\"slug\":\"subheading\",\"link\":\"#subheading\",\"children\":[]},{\"level\":2,\"title\":\"Another subheading\",\"slug\":\"another-subheading\",\"link\":\"#another-subheading\",\"children\":[]}],\"git\":{\"updatedTime\":1743496862000,\"contributors\":[{\"name\":\"alice\",\"username\":\"alice\",\"email\":\"921757697@qq.com\",\"commits\":1,\"url\":\"https://github.com/alice\"}],\"changelog\":[{\"hash\":\"bab5e937f8ab6634c5d1998c279dabfc6cf18298\",\"time\":1743496862000,\"email\":\"921757697@qq.com\",\"author\":\"alice\",\"message\":\"deploy-5\"}]},\"filePathRelative\":\"guide/vue/test1.md\"}")
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
