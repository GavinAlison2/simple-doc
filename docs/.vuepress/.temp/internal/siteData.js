export const siteData = JSON.parse("{\"base\":\"/simple-doc/\",\"lang\":\"zh-CN\",\"title\":\"Blog\",\"description\":\"个人博客\",\"head\":[[\"link\",{\"rel\":\"icon\",\"href\":\"/simple-doc/images/favicon.ico\"}]],\"locales\":{}}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSiteData) {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ siteData }) => {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  })
}
