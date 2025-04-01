import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  lang: 'zh-CN',
  base: '/simple-doc',

  title: 'Once Blog',
  description: 'My first blog',

  theme: defaultTheme({
    logo: '/images/logo.png',
    heroImage: '/images/logo.png',  
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
      { text: '功能演示', link: '/pages/folder1/test3.md' },
      { text: 'Github', link: 'https://github.com/GavinAlison2' },
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
  ]
});