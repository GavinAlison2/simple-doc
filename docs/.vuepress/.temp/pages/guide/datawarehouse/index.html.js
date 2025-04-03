import comp from "D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/datawarehouse/index.html.vue"
const data = JSON.parse("{\"path\":\"/guide/datawarehouse/\",\"title\":\"Data Warehouse\",\"lang\":\"zh-CN\",\"frontmatter\":{\"sidebar\":\"auto\"},\"headers\":[],\"git\":{},\"filePathRelative\":\"guide/datawarehouse/readme.md\"}")
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
