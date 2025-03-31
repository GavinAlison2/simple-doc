import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  // lang: 'en-US',
  lang: 'zh-CN',
  base: '/simple-doc',

  title: 'VuePress',
  description: 'My first VuePress Site',

  theme: defaultTheme({
    logo: 'https://vuejs.press/images/hero.png',

    // navbar: ['/', '/get-started'],
    //格式一：直接跳转，'/'为不添加路由，跳转至首页
    navbar: [
      { text: '首页', link: '/' },
      //格式二：添加下拉菜单，link指向的文件路径
      // {
          // text: '分类',  //默认显示        
          // ariaLabel: '分类',   //用于识别的label
          // items: [
              // { text: '文章', link: '/pages/folder1/test1.md' },  
              //点击标签会跳转至link的markdown文件生成的页面
              // { text: '琐碎', link: '/pages/folder2/test4.md' },
          // ]
      // },
      { text: '功能演示', link: '/pages/folder1/test3.md' },
      
      //格式三：跳转至外部网页，需http/https前缀
      { text: 'Github', link: 'https://github.com/GavinAlison2' },
    ],
 //侧边导航栏：会根据当前的文件路径是否匹配侧边栏数据，自动显示/隐藏
    sidebar: {
      '/pages/folder1/':[
          {
              title: '测试菜单1',   // 一级菜单名称
              collapsable: false, // false为默认展开菜单, 默认值true是折叠,
              sidebarDepth: 1,    //  设置侧边导航自动提取markdown文件标题的层级，默认1为h2层级
              children: [
                  ['test1.md', '子菜单1'],  //菜单名称为'子菜单1'，跳转至/pages/folder1/test1.md
                  ['test3.md', '子菜单2']
              ]
          },
      //     {
      //         title: '测试菜单2',
      //         collapsable: false, 
      //         children: [
      //             ['test2.md', '子菜单1']
      //         ]
      //     }
      ]
    },
  }),
  bundler: viteBundler(),
});
