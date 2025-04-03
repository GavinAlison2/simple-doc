import comp from "D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/linux/index.html.vue"
const data = JSON.parse("{\"path\":\"/guide/linux/\",\"title\":\"环境搭建\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"安装系统\",\"slug\":\"安装系统\",\"link\":\"#安装系统\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"guide/linux/readme.md\"}")
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
