import{_ as n,c as a,e,o as i}from"./app-DN6Q4pKI.js";const l={};function c(p,s){return i(),a("div",null,s[0]||(s[0]=[e(`<h1 id="command" tabindex="-1"><a class="header-anchor" href="#command"><span>command</span></a></h1><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># vue-cli 安装手脚架</span></span>
<span class="line"></span>
<span class="line"><span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-g</span> @vue/cli</span>
<span class="line">vue create my-project</span>
<span class="line"></span>
<span class="line"><span class="token comment">## create-vue</span></span>
<span class="line"><span class="token comment">## 基于vue3的脚手架创建项目</span></span>
<span class="line"><span class="token function">npm</span> create vue@latest</span>
<span class="line"></span>
<span class="line"><span class="token comment">## 基于vue2的脚手架创建项目</span></span>
<span class="line"><span class="token function">npm</span> create vue@2</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="支持-tailwindcss" tabindex="-1"><a class="header-anchor" href="#支持-tailwindcss"><span>支持 tailwindcss</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-D</span> tailwindcss postcss-cli autoprefixer <span class="token comment"># 安装Tailwind CSS及其依赖</span></span>
<span class="line">npx tailwindcss init <span class="token parameter variable">-p</span> <span class="token comment"># 自动生成tailwind.config.js 和 postcss.config.js 文件</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 配置 tailwind.config.js</span></span>
<span class="line"></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token operator">&gt;&gt;</span> tailwind.config.js <span class="token operator">&lt;&lt;</span> <span class="token string">EOF</span>
<span class="line">module.exports = {</span>
<span class="line">  content: [</span>
<span class="line">    &quot;./public/**/*.html&quot;,</span>
<span class="line">    &quot;./src/**/*.{html,js,vue,ts,jsx,tsx}&quot;</span>
<span class="line">    ],</span>
<span class="line">    theme: {</span>
<span class="line">      extend: {}</span>
<span class="line">    },</span>
<span class="line">    plugins: []</span>
<span class="line">}</span>
<span class="line">EOF</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 配置 tailwind.css</span></span>
<span class="line"></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token operator">&gt;&gt;</span> src/assets/styles/tailwind.css <span class="token operator">&lt;&lt;</span> <span class="token string">EOF</span>
<span class="line">@tailwind base;</span>
<span class="line">@tailwind components;</span>
<span class="line">@tailwind utilities;</span>
<span class="line">EOF</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 编译 tailwind.css</span></span>
<span class="line"></span>
<span class="line">npx tailwindcss build src/assets/styles/tailwind.css <span class="token parameter variable">-o</span> src/assets/styles/tailwind.css</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 引入 tailwind.css</span></span>
<span class="line"></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token operator">&gt;&gt;</span> src/main.js <span class="token operator">&lt;&lt;</span> <span class="token string">EOF</span>
<span class="line">import &#39;./assets/styles/tailwind.css&#39;;</span>
<span class="line">EOF</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 启动项目</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4)]))}const d=n(l,[["render",c]]),r=JSON.parse('{"path":"/guide/vue/vue-cli-command.html","title":"command","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"支持 tailwindcss","slug":"支持-tailwindcss","link":"#支持-tailwindcss","children":[]}],"git":{"updatedTime":1744908373000,"contributors":[{"name":"alice","username":"alice","email":"921757697@qq.com","commits":1,"url":"https://github.com/alice"}],"changelog":[{"hash":"b76da10ee718506b403f597aa5e358ba4a946939","time":1744908373000,"email":"921757697@qq.com","author":"alice","message":"vue"}]},"filePathRelative":"guide/vue/vue-cli-command.md"}');export{d as comp,r as data};
