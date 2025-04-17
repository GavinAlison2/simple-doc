# Tailwind CSS

Tailwind CSS is a utility-first CSS framework for rapidly building custom designs.

## Getting started

Install the Tailwind CLI using npm, and then run it to generate your CSS file:

```bash
npm install -D tailwindcss # install the CLI
npx tailwindcss init # create a tailwind.config.js file
npx tailwindcss build ./src/styles.css -o ./dist/styles.css # build your CSS file
```

```sh
npm install -D autoprefixer # install a PostCSS plugin for Tailwind to add vendor prefixes automatically
```

cdn

```html
<script src="https://cdn.tailwindcss.com"></script>
```

More documentation about Tailwind CSS can be found at [https://tailwindcss.com/](https://tailwindcss.com/).

## Table of contents

- sizing
- color
- typography
- shadows
- layout
- flexbox
- grid
- spacing

## Tss 速记指南

- 布局 display, flex, grid, position, float, clear, overflow, clip, visibility, z-index
- 间隔 margin, padding
- 背景 background, background-image, background-repeat, background-position, background-size, background-attachment, background-origin, background-clip, background-blend-mode
- 边框 border, border-radius, box-shadow
- 尺寸 width, height
- 排版 text-align, vertical-align, line-height 文字相关
- 过渡 transition ， 动画 animation
- 字体 font-size, font-weight, font-style, font-family
- 颜色 color, background-color, border-color, text-color
- 定位 position, top, right, bottom, left
- 显示 display, visibility
- 溢出 overflow
- 浮动 float
- 轮廓 outline
- 阴影 box-shadow
- 轮廓 outline
- 文本方向 text-direction
- 文本装饰 text-decoration
- 交互
  - 鼠标 hover, focus, active， cursor
- 媒体查询 @media

### 布局

- display:
  - flex, inline-flex, # 弹性布局
  - block, hidden, # 块级元素
  - inline, inline-block, # 内联元素
  - table, table-cell, table-row, table-row-group, table-header-group, table-footer-group, table-caption # 表格元素
  - grid, inline-grid # 布局方式
- flex-direction: row, row-reverse, column, column-reverse # 主轴方向
- overflow: hidden, visible, scroll, auto # 内容溢出
- position: static, relative, absolute, fixed, sticky # 定位方式

### size

- size: width, height # 尺寸
  '''md
  基本单位, 1rem = 16px, 所以看到数字乘以 4,就是 4X 'px'
  left-1 : left: 0.25rem; left: 4px;
  w-px: width:1px;
  w-1/2: width: 50%;
  w-full: width: 100%;
  h-1/2: height: 50%;
  h-full: height: 100%;
  max-w-full: max-width: 100%;
  max-h-full: max-height: 100%;
  min-h-full: min-height: 100%;
  mx-auto: margin-left: auto; margin-right: auto;
  my-auto: margin-top: auto; margin-bottom: auto;
  px-auto: padding-left: auto; padding-right: auto;
  py-auto: padding-top: auto; padding-bottom: auto;
  left-1/2: left: 50%;
  w-[50px]: width: 50px;
  '''

### 背景

- bg: background-color # 背景色
  '''md
  bg-none: background-color: none; # 无背景色
  bg-white: background-color: white; # 白色背景
  bg-center: background-position: center;# 居中
  bg-cover: background-size: cover; # 全屏显示
  bg-repeat: background-repeat: repeat; # 平铺
  bg-contain: background-size: contain; # 包含
  bg-no-repeat: background-repeat: no-repeat; # 不平铺
  bg-[position: center]: background-position: center; # 居中
  '''

### transform

- transform: translate, rotate, scale, skew # 变换

### other

- bg-whiter: background-color: #f8f9fa; # 白色背景
- bg-gray-100: background-color: #f8f9fa; # 灰色背景
- text-base: font-size: 1rem; line-height: 1.5rem; # 字体大小 16px，行高 24px
- text-lg: font-size: 1.125rem; line-height: 1.75rem; # 字体大小 18px，行高 28px
- text-xl: font-size: 1.25rem; line-height: 1.75rem; # 字体大小 20px，行高 28px
- text-2xl: font-size: 1.5rem; line-height: 2rem; # 字体大小 24px，行高 32px
- truncate: overflow: hidden; text-overflow: ellipsis; white-space: nowrap; # 文本省略号
- italic: font-style: italic; # 斜体
- font-bold: font-weight: bold; # 加粗
- leading-none: line-height: 1; # 行高 1
- leading-5: line-height: 20px; # 行高 20px
- text-center: text-align: center; # 文本居中
- align-middle: vertical-align: middle; # 垂直居中
- rounded: border-radius: 0.25rem; # 圆角
- shadow: box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06); # 阴影
- divide-x >+ : border-right-width: 0px; border-left-width: 1px; # 不用单独写边框了
- divide-y >+ : border-top-width: 0px; border-bottom-width: 1px; # 不用单独写边框了
- outline-1: outline: 1px solid; # 轮廓, 外边框，这几种根据实际需要选择即可
- ring-1: # 太多省略 本质为 box-shadow 模拟的边框
- opacity-0: opacity: 0; # 透明
- opacity-100: opacity: 1; # 不透明
- visible: visibility: visible; # 可见
- invisible: visibility: hidden; # 不可见
- z-10: z-index: 10; # 层级
- cursor-pointer: cursor: pointer; # 鼠标指针, 聚焦
- cursor-not-allowed: cursor: not-allowed; # 禁止鼠标点击
- pointer-events-none: pointer-events: none; # 禁止鼠标点击
- select-none: user-select: none; # 禁止选中文本
- select-text: user-select: text; # 允许选中文本

## 核心概念

- 工具优先的基础
- 处理悬停、聚焦和其他状态 `hover:bg-sky-700 , focus:outline-none, active:scale-105`
- 相应式样式
- 夜间模式
- 重用样式
- 自定义主题
