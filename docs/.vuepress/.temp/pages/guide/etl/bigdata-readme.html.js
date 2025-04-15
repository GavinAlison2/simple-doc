import comp from "D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/etl/bigdata-readme.html.vue"
const data = JSON.parse("{\"path\":\"/guide/etl/bigdata-readme.html\",\"title\":\"Big Data\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"Hadoop\",\"slug\":\"hadoop\",\"link\":\"#hadoop\",\"children\":[]},{\"level\":2,\"title\":\"Hive\",\"slug\":\"hive\",\"link\":\"#hive\",\"children\":[]}],\"git\":{\"updatedTime\":1744649093000,\"contributors\":[{\"name\":\"alice\",\"username\":\"alice\",\"email\":\"921757697@qq.com\",\"commits\":1,\"url\":\"https://github.com/alice\"}],\"changelog\":[{\"hash\":\"dbc8fce7f951c4a919f1b3e3e4548a92c08bdeba\",\"time\":1744649093000,\"email\":\"921757697@qq.com\",\"author\":\"alice\",\"message\":\"deploy\"}]},\"filePathRelative\":\"guide/etl/bigdata-readme.md\"}")
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
