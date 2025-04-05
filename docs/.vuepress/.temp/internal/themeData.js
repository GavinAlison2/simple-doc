export const themeData = JSON.parse("{\"logo\":\"/images/logo.png\",\"navbar\":[{\"text\":\"首页\",\"link\":\"/\"},{\"text\":\"前端\",\"children\":[{\"text\":\"Vue\",\"link\":\"/guide/vue/test1.md\"},{\"text\":\"TypeScript\",\"link\":\"/pages/folder1/test1.md\"},{\"text\":\"React\",\"link\":\"/pages/folder1/test1.md\"},{\"text\":\"Angular\",\"link\":\"/pages/folder1/test1.md\"},{\"text\":\"Node.js\",\"link\":\"/pages/folder1/test1.md\"},{\"text\":\"小程序\",\"link\":\"/pages/folder1/test1.md\"},{\"text\":\"Flutter\",\"link\":\"/pages/folder1/test1.md\"}]},{\"text\":\"数据开发\",\"children\":[{\"text\":\"数据产品\",\"link\":\"/guide/datawarehouse/index.md\"},{\"text\":\"数据技术\",\"link\":\"/pages/folder1/test1.md\"}]},{\"text\":\"GitHub\",\"faIcon\":\"fab fa-github\",\"link\":\"https://github.com/GavinAlison2\"}],\"sidebar\":{\"/get-started\":[{\"text\":\"开始\",\"collapsible\":false,\"children\":[\"/get-started\"]}],\"/guide/datawarehouse/\":[{\"text\":\"数据产品\",\"collapsible\":false,\"children\":[\"index.md\",\"1-数据仓库工具箱-笔记.md\",\"2-数据产品经理的工作笔记.md\",\"3-数据产品经理实战笔记.md\"]}],\"/guide/vue/\":[{\"text\":\"Vue 学习1\",\"collapsible\":false,\"children\":[\"test1.md\",\"test2.md\",\"test3.md\"]},{\"text\":\"Vue 学习2\",\"collapsible\":false,\"children\":[\"test2.md\",\"test3.md\"]}],\"/guide/ts/\":[{\"text\":\"TypeScript 学习\",\"collapsible\":true,\"children\":[\"test1.md\",\"test2.md\",\"test3.md\"]}]},\"locales\":{\"/\":{\"selectLanguageName\":\"English\"}},\"colorMode\":\"auto\",\"colorModeSwitch\":true,\"repo\":null,\"selectLanguageText\":\"Languages\",\"selectLanguageAriaLabel\":\"Select language\",\"sidebarDepth\":2,\"editLink\":true,\"editLinkText\":\"Edit this page\",\"lastUpdated\":true,\"contributors\":true,\"contributorsText\":\"Contributors\",\"notFound\":[\"There's nothing here.\",\"How did we get here?\",\"That's a Four-Oh-Four.\",\"Looks like we've got some broken links.\"],\"backToHome\":\"Take me home\",\"openInNewWindow\":\"open in new window\",\"toggleColorMode\":\"toggle color mode\",\"toggleSidebar\":\"toggle sidebar\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
