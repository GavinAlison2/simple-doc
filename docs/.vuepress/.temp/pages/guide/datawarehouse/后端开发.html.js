import comp from "D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/datawarehouse/后端开发.html.vue"
const data = JSON.parse("{\"path\":\"/guide/datawarehouse/%E5%90%8E%E7%AB%AF%E5%BC%80%E5%8F%91.html\",\"title\":\"后端开发\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"前端面试\",\"slug\":\"前端面试\",\"link\":\"#前端面试\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"guide/datawarehouse/后端开发.md\"}")
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
