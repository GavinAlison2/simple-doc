import comp from "D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/etl/spark/broadcast.html.vue"
const data = JSON.parse("{\"path\":\"/guide/etl/spark/broadcast.html\",\"title\":\"Broadcast Variables\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"怎么实现 broadcast\",\"slug\":\"怎么实现-broadcast\",\"link\":\"#怎么实现-broadcast\",\"children\":[{\"level\":3,\"title\":\"1. HttpBroadcast\",\"slug\":\"_1-httpbroadcast\",\"link\":\"#_1-httpbroadcast\",\"children\":[]},{\"level\":3,\"title\":\"2. TorrentBoadcast\",\"slug\":\"_2-torrentboadcast\",\"link\":\"#_2-torrentboadcast\",\"children\":[]}]}],\"git\":{},\"filePathRelative\":\"guide/etl/spark/broadcast.md\"}")
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
