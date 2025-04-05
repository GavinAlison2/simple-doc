import comp from "D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/font/index.html.vue"
const data = JSON.parse("{\"path\":\"/guide/font/\",\"title\":\"前端\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"包含的技术\",\"slug\":\"包含的技术\",\"link\":\"#包含的技术\",\"children\":[]},{\"level\":2,\"title\":\"基础技术\",\"slug\":\"基础技术\",\"link\":\"#基础技术\",\"children\":[]},{\"level\":2,\"title\":\"前端框架\",\"slug\":\"前端框架\",\"link\":\"#前端框架\",\"children\":[]},{\"level\":2,\"title\":\"CSS框架\",\"slug\":\"css框架\",\"link\":\"#css框架\",\"children\":[]},{\"level\":2,\"title\":\"UI组件库\",\"slug\":\"ui组件库\",\"link\":\"#ui组件库\",\"children\":[]},{\"level\":2,\"title\":\"前端工具\",\"slug\":\"前端工具\",\"link\":\"#前端工具\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"guide/font/readme.md\"}")
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
