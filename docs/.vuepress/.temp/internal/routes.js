export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/bak-README.html", { loader: () => import(/* webpackChunkName: "bak-README.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/bak-README.html.js"), meta: {"title":"Home"} }],
  ["/get-started.html", { loader: () => import(/* webpackChunkName: "get-started.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/get-started.html.js"), meta: {"title":"Get Started"} }],
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":"Home"} }],
  ["/ai/deepseek/%E8%87%AA%E5%AA%92%E4%BD%93.html", { loader: () => import(/* webpackChunkName: "ai_deepseek_自媒体.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/ai/deepseek/自媒体.html.js"), meta: {"title":"自媒体"} }],
  ["/guide/etl/bigdata-readme.html", { loader: () => import(/* webpackChunkName: "guide_etl_bigdata-readme.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/etl/bigdata-readme.html.js"), meta: {"title":"Big Data"} }],
  ["/guide/etl/hive-start.html", { loader: () => import(/* webpackChunkName: "guide_etl_hive-start.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/etl/hive-start.html.js"), meta: {"title":"Hive Start"} }],
  ["/guide/etl/notice.html", { loader: () => import(/* webpackChunkName: "guide_etl_notice.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/etl/notice.html.js"), meta: {"title":"notice"} }],
  ["/guide/etl/todo.html", { loader: () => import(/* webpackChunkName: "guide_etl_todo.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/etl/todo.html.js"), meta: {"title":"todo"} }],
  ["/guide/awesome/1.html", { loader: () => import(/* webpackChunkName: "guide_awesome_1.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/awesome/1.html.js"), meta: {"title":"Awesome VuePress"} }],
  ["/guide/datawarehouse/1-%E6%95%B0%E6%8D%AE%E4%BB%93%E5%BA%93%E5%B7%A5%E5%85%B7%E7%AE%B1-%E7%AC%94%E8%AE%B0.html", { loader: () => import(/* webpackChunkName: "guide_datawarehouse_1-数据仓库工具箱-笔记.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/datawarehouse/1-数据仓库工具箱-笔记.html.js"), meta: {"title":"数据仓库工具箱-笔记"} }],
  ["/guide/datawarehouse/2-%E6%95%B0%E6%8D%AE%E4%BA%A7%E5%93%81%E7%BB%8F%E7%90%86%E7%9A%84%E5%B7%A5%E4%BD%9C%E7%AC%94%E8%AE%B0.html", { loader: () => import(/* webpackChunkName: "guide_datawarehouse_2-数据产品经理的工作笔记.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/datawarehouse/2-数据产品经理的工作笔记.html.js"), meta: {"title":"写给数据产品经理新人的工作笔记"} }],
  ["/guide/datawarehouse/3-%E6%95%B0%E6%8D%AE%E4%BA%A7%E5%93%81%E7%BB%8F%E7%90%86%E5%AE%9E%E6%88%98%E7%AC%94%E8%AE%B0.html", { loader: () => import(/* webpackChunkName: "guide_datawarehouse_3-数据产品经理实战笔记.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/datawarehouse/3-数据产品经理实战笔记.html.js"), meta: {"title":"数据产品经理实战笔记"} }],
  ["/guide/datawarehouse/", { loader: () => import(/* webpackChunkName: "guide_datawarehouse_index.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/datawarehouse/index.html.js"), meta: {"title":"Data Warehouse"} }],
  ["/guide/datawarehouse/%E4%BA%A7%E5%93%81%E7%BB%8F%E7%90%86%E5%B2%97%E4%BD%8D%E5%88%86%E6%9E%90.html", { loader: () => import(/* webpackChunkName: "guide_datawarehouse_产品经理岗位分析.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/datawarehouse/产品经理岗位分析.html.js"), meta: {"title":"产品经理岗位分析"} }],
  ["/guide/datawarehouse/%E5%90%8E%E7%AB%AF%E5%BC%80%E5%8F%91.html", { loader: () => import(/* webpackChunkName: "guide_datawarehouse_后端开发.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/datawarehouse/后端开发.html.js"), meta: {"title":"后端开发"} }],
  ["/guide/font/", { loader: () => import(/* webpackChunkName: "guide_font_index.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/font/index.html.js"), meta: {"title":"前端"} }],
  ["/guide/linux/", { loader: () => import(/* webpackChunkName: "guide_linux_index.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/linux/index.html.js"), meta: {"title":"环境搭建"} }],
  ["/guide/mysql/", { loader: () => import(/* webpackChunkName: "guide_mysql_index.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/mysql/index.html.js"), meta: {"title":"MySQL"} }],
  ["/guide/ts/", { loader: () => import(/* webpackChunkName: "guide_ts_index.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/ts/index.html.js"), meta: {"title":"TypeScript"} }],
  ["/guide/ts/test1.html", { loader: () => import(/* webpackChunkName: "guide_ts_test1.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/ts/test1.html.js"), meta: {"title":""} }],
  ["/guide/ts/test2.html", { loader: () => import(/* webpackChunkName: "guide_ts_test2.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/ts/test2.html.js"), meta: {"title":"test2"} }],
  ["/guide/ts/test3.html", { loader: () => import(/* webpackChunkName: "guide_ts_test3.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/ts/test3.html.js"), meta: {"title":"test3"} }],
  ["/guide/vue/test1.html", { loader: () => import(/* webpackChunkName: "guide_vue_test1.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/vue/test1.html.js"), meta: {"title":"Test1"} }],
  ["/guide/vue/test2.html", { loader: () => import(/* webpackChunkName: "guide_vue_test2.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/vue/test2.html.js"), meta: {"title":"test2"} }],
  ["/guide/vue/test3.html", { loader: () => import(/* webpackChunkName: "guide_vue_test3.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/vue/test3.html.js"), meta: {"title":"test3"} }],
  ["/guide/work/worker.html", { loader: () => import(/* webpackChunkName: "guide_work_worker.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/work/worker.html.js"), meta: {"title":"Worker"} }],
  ["/pages/folder1/test1.html", { loader: () => import(/* webpackChunkName: "pages_folder1_test1.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/pages/folder1/test1.html.js"), meta: {"title":""} }],
  ["/pages/folder1/test3.html", { loader: () => import(/* webpackChunkName: "pages_folder1_test3.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/pages/folder1/test3.html.js"), meta: {"title":""} }],
  ["/pages/folder2/test4.html", { loader: () => import(/* webpackChunkName: "pages_folder2_test4.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/pages/folder2/test4.html.js"), meta: {"title":""} }],
  ["/pages/vuepress/vuepress-install.html", { loader: () => import(/* webpackChunkName: "pages_vuepress_vuepress-install.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/pages/vuepress/vuepress-install.html.js"), meta: {"title":"VuePress 安装"} }],
  ["/guide/etl/hadoop/chapter1-hadoop-hdfs.html", { loader: () => import(/* webpackChunkName: "guide_etl_hadoop_chapter1-hadoop-hdfs.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/etl/hadoop/chapter1-hadoop-hdfs.html.js"), meta: {"title":"HDFS"} }],
  ["/guide/etl/hadoop/chapter2-hadoop-yarn.html", { loader: () => import(/* webpackChunkName: "guide_etl_hadoop_chapter2-hadoop-yarn.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/etl/hadoop/chapter2-hadoop-yarn.html.js"), meta: {"title":"YARN"} }],
  ["/guide/etl/hadoop/chapter3-hadoop-install-for-window.html", { loader: () => import(/* webpackChunkName: "guide_etl_hadoop_chapter3-hadoop-install-for-window.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/etl/hadoop/chapter3-hadoop-install-for-window.html.js"), meta: {"title":"Hadoop 安装（Windows）"} }],
  ["/guide/etl/hadoop/chapter4-hadoop2.html", { loader: () => import(/* webpackChunkName: "guide_etl_hadoop_chapter4-hadoop2.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/etl/hadoop/chapter4-hadoop2.html.js"), meta: {"title":"Hadoop2"} }],
  ["/guide/etl/hadoop/", { loader: () => import(/* webpackChunkName: "guide_etl_hadoop_index.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/etl/hadoop/index.html.js"), meta: {"title":"Hadoop"} }],
  ["/guide/etl/hive/01.Hive-quickstart.html", { loader: () => import(/* webpackChunkName: "guide_etl_hive_01.Hive-quickstart.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/etl/hive/01.Hive-quickstart.html.js"), meta: {"title":"Hive 入门"} }],
  ["/guide/etl/hive/02.Hive-ddl.html", { loader: () => import(/* webpackChunkName: "guide_etl_hive_02.Hive-ddl.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/etl/hive/02.Hive-ddl.html.js"), meta: {"title":"Hive 常用 DDL 操作"} }],
  ["/guide/etl/hive/03.Hive-table.html", { loader: () => import(/* webpackChunkName: "guide_etl_hive_03.Hive-table.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/etl/hive/03.Hive-table.html.js"), meta: {"title":"Hive 分区表和分桶表"} }],
  ["/guide/etl/hive/04.Hive-index-view.html", { loader: () => import(/* webpackChunkName: "guide_etl_hive_04.Hive-index-view.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/etl/hive/04.Hive-index-view.html.js"), meta: {"title":"Hive 视图和索引"} }],
  ["/guide/etl/hive/05.Hive-dml.html", { loader: () => import(/* webpackChunkName: "guide_etl_hive_05.Hive-dml.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/etl/hive/05.Hive-dml.html.js"), meta: {"title":"Hive 常用 DML 操作"} }],
  ["/guide/etl/hive/06.Hive-multi-partition.html", { loader: () => import(/* webpackChunkName: "guide_etl_hive_06.Hive-multi-partition.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/etl/hive/06.Hive-multi-partition.html.js"), meta: {"title":"Hive Partition 分区"} }],
  ["/guide/etl/hive/07.Hive-query.html", { loader: () => import(/* webpackChunkName: "guide_etl_hive_07.Hive-query.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/etl/hive/07.Hive-query.html.js"), meta: {"title":"Hive 数据查询详解"} }],
  ["/guide/etl/hive/chapter5-hive.html", { loader: () => import(/* webpackChunkName: "guide_etl_hive_chapter5-hive.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/etl/hive/chapter5-hive.html.js"), meta: {"title":"Hive"} }],
  ["/guide/etl/hive/chaptere6-Hive%E7%AE%80%E4%BB%8B%E5%8F%8A%E6%A0%B8%E5%BF%83%E6%A6%82%E5%BF%B5.html", { loader: () => import(/* webpackChunkName: "guide_etl_hive_chaptere6-Hive简介及核心概念.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/etl/hive/chaptere6-Hive简介及核心概念.html.js"), meta: {"title":"Hive简介及核心概念"} }],
  ["/guide/etl/hive/", { loader: () => import(/* webpackChunkName: "guide_etl_hive_index.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/etl/hive/index.html.js"), meta: {"title":"Hive 教程"} }],
  ["/guide/etl/install/hadoop-install.html", { loader: () => import(/* webpackChunkName: "guide_etl_install_hadoop-install.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/etl/install/hadoop-install.html.js"), meta: {"title":"Hadoop Install"} }],
  ["/guide/etl/install/hive-install.html", { loader: () => import(/* webpackChunkName: "guide_etl_install_hive-install.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/etl/install/hive-install.html.js"), meta: {"title":"Hive Install"} }],
  ["/guide/project/document/env.html", { loader: () => import(/* webpackChunkName: "guide_project_document_env.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/project/document/env.html.js"), meta: {"title":""} }],
  ["/guide/project/document/intro.html", { loader: () => import(/* webpackChunkName: "guide_project_document_intro.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/guide/project/document/intro.html.js"), meta: {"title":""} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"D:/workspace/front/es6_tee/vuepress-starter/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
]);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateRoutes) {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
  }
  if (__VUE_HMR_RUNTIME__.updateRedirects) {
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ routes, redirects }) => {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  })
}
