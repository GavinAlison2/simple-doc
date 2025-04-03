import comp from "D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/datawarehouse/index.html.vue"
const data = JSON.parse("{\"path\":\"/guide/datawarehouse/\",\"title\":\"Data Warehouse\",\"lang\":\"zh-CN\",\"frontmatter\":{\"sidebar\":\"auto\"},\"headers\":[],\"git\":{\"updatedTime\":1743649714000,\"contributors\":[{\"name\":\"alice\",\"username\":\"alice\",\"email\":\"921757697@qq.com\",\"commits\":1,\"url\":\"https://github.com/alice\"}],\"changelog\":[{\"hash\":\"3d61e9dd61c3cf2aecd12872bf64670c6e1bd7b8\",\"time\":1743649714000,\"email\":\"921757697@qq.com\",\"author\":\"alice\",\"message\":\"deploy-5\"}]},\"filePathRelative\":\"guide/datawarehouse/readme.md\"}")
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
