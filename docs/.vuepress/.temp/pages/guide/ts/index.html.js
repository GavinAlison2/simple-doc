import comp from "D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/ts/index.html.vue"
const data = JSON.parse("{\"path\":\"/guide/ts/\",\"title\":\"TypeScript\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[],\"git\":{},\"filePathRelative\":\"guide/ts/readme.md\"}")
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
