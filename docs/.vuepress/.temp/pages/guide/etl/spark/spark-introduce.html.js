import comp from "D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/etl/spark/spark-introduce.html.vue"
const data = JSON.parse("{\"path\":\"/guide/etl/spark/spark-introduce.html\",\"title\":\"Spark\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"Spark 简介\",\"slug\":\"spark-简介\",\"link\":\"#spark-简介\",\"children\":[{\"level\":3,\"title\":\"Spark 概念\",\"slug\":\"spark-概念\",\"link\":\"#spark-概念\",\"children\":[]},{\"level\":3,\"title\":\"Spark 特点\",\"slug\":\"spark-特点\",\"link\":\"#spark-特点\",\"children\":[]}]},{\"level\":2,\"title\":\"Spark 原理\",\"slug\":\"spark-原理\",\"link\":\"#spark-原理\",\"children\":[{\"level\":3,\"title\":\"编程模型\",\"slug\":\"编程模型\",\"link\":\"#编程模型\",\"children\":[]}]}],\"git\":{},\"filePathRelative\":\"guide/etl/spark/spark-introduce.md\"}")
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
