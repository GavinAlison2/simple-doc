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
          { text: '数据技术', link: '/pages/folder1/test1.md' },
        ]
      },
      { text: 'GitHub', 
        faIcon: 'fab fa-github',
        link: 'https://github.com/GavinAlison2' },
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
          children: [
            '/index.md',
            '/2-数据产品经理的工作笔记.md',
          ]
        },
      ],
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