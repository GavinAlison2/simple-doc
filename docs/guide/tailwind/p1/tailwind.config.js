/** @type {import('tailwindcss').Config} */ // 支持typescript
module.exports = {
  content: [
    "./src/**/*.{html,js}"
  ],
  darkMode: 'selector',
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
  important: true,
  // important: '#app', // 重要样式的选择器 默认是:root
  // prefix: 'tw-',// 前缀
}
