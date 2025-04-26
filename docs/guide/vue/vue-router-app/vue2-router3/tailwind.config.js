/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./cdn/{index.html, *.css, *.js}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}

