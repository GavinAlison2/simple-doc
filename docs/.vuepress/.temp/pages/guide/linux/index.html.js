import comp from "D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/linux/index.html.vue"
const data = JSON.parse("{\"path\":\"/guide/linux/\",\"title\":\"环境搭建\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"安装系统\",\"slug\":\"安装系统\",\"link\":\"#安装系统\",\"children\":[]}],\"git\":{\"updatedTime\":1744048118000,\"contributors\":[{\"name\":\"alice\",\"username\":\"alice\",\"email\":\"921757697@qq.com\",\"commits\":2,\"url\":\"https://github.com/alice\"}],\"changelog\":[{\"hash\":\"eecaa7c79d8cd690cf4e0028fd09b8f544987c8c\",\"time\":1744048118000,\"email\":\"921757697@qq.com\",\"author\":\"alice\",\"message\":\"deploy\"},{\"hash\":\"8432038c9970e25da2f08ee796270e567e705cbf\",\"time\":1743669172000,\"email\":\"921757697@qq.com\",\"author\":\"alice\",\"message\":\"deploy\"}]},\"filePathRelative\":\"guide/linux/readme.md\"}")
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
