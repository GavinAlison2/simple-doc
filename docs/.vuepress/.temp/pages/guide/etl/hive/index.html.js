import comp from "D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/etl/hive/index.html.vue"
const data = JSON.parse("{\"path\":\"/guide/etl/hive/\",\"title\":\"Hive 教程\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"内容\",\"slug\":\"内容\",\"link\":\"#内容\",\"children\":[]},{\"level\":2,\"title\":\"面试题\",\"slug\":\"面试题\",\"link\":\"#面试题\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"guide/etl/hive/readme.md\"}")
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
