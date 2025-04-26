# install tailwindcss

## 1. 安装 Tailwind CSS 及其依赖

```sh
npm install -D tailwindcss postcss autoprefixer # 安装依赖
```

## 2. 创建 Tailwind CSS 配置文件

生成 tailwind.config.js 和 postcss.config.js 文件

```sh
npx tailwindcss init -p
```

tailwind.config.js 文件内容如下：

````js
module.exports = {
  content: [
    "./src/**/*.{html,js,vue,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      width: {
        18: '4.5rem',
        24: '6rem',
        32: '8rem',
        48: '12rem',
        64: '16rem',
        96: '24rem',
        128: '32rem',
      },
      height: {
        18: '4.5rem',
        24: '6rem',
        32: '8rem',
        48: '12rem',
        64: '16rem',
        96: '24rem',
        128: '32rem',
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
  // important: true,
  // prefix: 'tw-',// 前缀
}
```


## 3. 配置 Tailwind CSS

在 `postcss.config.js` 文件中配置 PostCSS

```js
module.exports = {
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
````

## 4. 引入 Tailwind CSS 样式文件

创建一个 CSS 文件，通常是 src/assets/css/tailwind.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

然后在 `main.js` 文件中引入该样式文件

```js
// main.js
import "@/assets/css/tailwind.css";
```

## 5. vue-cli 项目中使用 Tailwind CSS

在 `vue.config.js` 文件中配置

```js
module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [require("tailwindcss"), require("autoprefixer")],
      },
    },
  },
};
```

## 6. 编译项目

```sh
npm run build
```

编译完成后，Tailwind CSS 样式文件会自动生成到 dist/assets/css/tailwind.css 文件中。

## 7. 注意兼容性 postcss7

如果遇到 postcss7 兼容性问题，请安装 postcss7 版本的 autoprefixer

```sh
npm install tailwindcss@npm:@tailwindcss/postcss7-compat autoprefixer@^9.8.8 -D
npm install postcss@^7.0.39 -D
```

这里的 `tailwindcss@npm:@tailwindcss/postcss7-compat`是 tailwindcss 的 postcss7 版本，
`autoprefixer@^9.8.8`是 postcss7 版本的 autoprefixer，
`postcss@^7.0.39`是 postcss7 版本。
