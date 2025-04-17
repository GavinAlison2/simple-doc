import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  lang: 'zh-CN',
  base: '/simple-doc',

  title: 'Blog',
  description: '个人博客',
  // 这里的路径是基础路径，相对于 docs 文件夹的路径
  head: [['link', { rel: 'icon', href: '/simple-doc/images/favicon.ico' }]],
  theme: defaultTheme({
    // 这里的路径是相对于base的docs路径
    logo: '/images/logo.png',
    navbar: [
      { text: '首页', link: '/' },
      {
        text: '前端',
        children: [
          { text: 'Vue', link: '/guide/vue/test1.md' },
          { text: 'TypeScript', link: '/pages/folder1/test1.md' },
          { text: 'React', link: '/pages/folder1/test1.md' },
          { text: 'Angular', link: '/pages/folder1/test1.md' },
          { text: 'Node.js', link: '/pages/folder1/test1.md' },
          { text: '小程序', link: '/pages/folder1/test1.md' },
          { text: 'Flutter', link: '/pages/folder1/test1.md' },
        ]
      },
      { text: '数据开发',
        children: [
          { text: '数据产品', link: '/guide/datawarehouse/index.md' },
          { text: '大数据', 
            collapsable:true,
            link: '/guide/etl/bigdata-readme.md',
            children: [
              {text: 'Hadoop', link: '/guide/etl/hadoop/readme.md'},
              {text: 'Hive', link:'/guide/etl/hive/readme.md'},
              {text: 'Spark', link:'/guide/etl/spark/readme.md'}
            ]
          },
        ]
      },
      {
        text: '数据库',
        children: [
          { text: 'MySQL', link: '/guide/mysql/index.md' },
          { text: 'Redis', link: '/pages/folder1/test1.md' },
        ]
      },
      {
        text: '后端',
        children: [
          { text: 'Java', link: '/pages/folder1/test1.md' },
          { text: 'Python', link: '/pages/folder1/test1.md' },
          { text: 'Golang', link: '/pages/folder1/test1.md' },
          { text: 'C++', link: '/pages/folder1/test1.md' },
          { text: 'C#', link: '/pages/folder1/test1.md' },
          { text: 'PHP', link: '/pages/folder1/test1.md' },
          { text: 'Ruby', link: '/pages/folder1/test1.md' },
        ]
      },
      { 
        text: 'GitHub', 
        faIcon: 'fab fa-github',
        link: 'https://github.com/GavinAlison2' 
      },
    ],
    // 侧边栏数组
    // 所有页面会使用相同的侧边栏
    sidebar: {   
      // '/': [
      //   {
      //     text: '首页侧边栏',
      //     collapsible: false,
      //     children: [
      //       { text: '首页内容 1', link: '/pages/folder1/test3.md', collapsible: false },
      //       { text: '首页内容 2', link: '/pages/folder1/test1.md' },
      //     ]
      //   }
      // ],
      // 这里的链接应该是相对于 docs 文件夹的路径
      '/get-started' : [
        {
          text: '开始',
          collapsible: false,
          children: [
            '/get-started',
          ]
        }
      ],
      '/guide/datawarehouse/':[
        {
          text: '数据产品',
          collapsible: false,
          link: 'index.md',
          children: [ 
            '1-数据仓库工具箱-笔记.md',
            '2-数据产品经理的工作笔记.md',
            '3-数据产品经理实战笔记.md',
          ]
        },
      ],
      '/guide/etl/':[{ 
        text: '大数据技术',
        collapsable: false,
        link: 'bigdata-readme.md',
        children: [
          { 
            text: 'Hadoop',
            collapsible:false,
            link: 'hadoop/readme.md',
            children: [
            'hadoop/chapter1-hadoop-hdfs.md',
            'hadoop/chapter2-hadoop-yarn.md',
            'hadoop/chapter3-hadoop-install-for-window.md',
          ]},
          {
            text: 'Hive',
            collapsible:false,
            link: 'hive/readme.md',
            children: [
              'hive/01.Hive-quickstart.md',
              'hive/02.Hive-ddl.md',
              'hive/03.Hive-table.md',
              'hive/04.Hive-index-view.md',
              'hive/05.Hive-dml.md',
              'hive/06.Hive-multi-partition.md',
              'hive/07.Hive-query.md',
              'install/hive-install.md',
              'hive/chapter5-hive.md'
            ]
          }
        ]
      }],
      '/guide/etl/spark/': [{
        text: 'Spark 学习笔记',
        collapsible: false,
        link:'readme.md'
      }],
      '/guide/vue/': [
        {
          text: 'Vue 学习1',
          collapsible: false,
          children: [
            'test1.md', 
            'test2.md', 
            'test3.md'
          ]
        },
        {
          text: 'Vue 学习2',
          collapsible: false,
          children: [
            'test2.md', 
            'test3.md'
          ]
        }
      ],
      '/guide/ts/': [
        {
          text: 'TypeScript 学习',
          collapsible: true,
          children: [
            'test1.md',
            'test2.md',
            'test3.md'
          ],
        }
      ],
    }
  }),
  bundler: viteBundler(),
  stylesheets: [
    '.vuepress/styles/custom.css'
  ],
  plugins: [
    [
      'vuepress-auto-sidebar',
      {
        // 配置选项，根据需要调整
        sort: {
          // 排序方式
          method: 'asc', // 升序排列
        },
        collapsable: true, // 是否可折叠
        titleMode: 'title', // 标题模式，'title' 或 'filename' 或 'path'
        sidebarDepth: 2, // 侧边栏深度
      },
    ],
  ],
});