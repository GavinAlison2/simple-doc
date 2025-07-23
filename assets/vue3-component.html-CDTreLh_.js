import{_ as s,c as a,e,o as l}from"./app-DN6Q4pKI.js";const i={};function p(c,n){return l(),a("div",null,n[0]||(n[0]=[e(`<h1 id="vue3-组件" tabindex="-1"><a class="header-anchor" href="#vue3-组件"><span>Vue3 组件</span></a></h1><p>自定义第三方组件，并测试通过</p><ol><li>创建组件</li></ol><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line">// HelloWorld.vue</span>
<span class="line"><span class="token function">mkdir</span> my-vue-component</span>
<span class="line"><span class="token builtin class-name">cd</span> my-vue-component</span>
<span class="line"><span class="token function">npm</span> init <span class="token parameter variable">-y</span></span>
<span class="line"></span>
<span class="line"><span class="token function">mkdir</span> src</span>
<span class="line"><span class="token function">touch</span> src/index.js</span>
<span class="line"><span class="token function">touch</span> src/MyComponent.vue</span>
<span class="line"></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token operator">&gt;&gt;</span> package.json <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;EOF&quot;</span>
<span class="line">{</span>
<span class="line">  &quot;name&quot;: &quot;my-vue-component&quot;,</span>
<span class="line">  &quot;version&quot;: &quot;1.0.0&quot;,</span>
<span class="line">  &quot;description&quot;: &quot;&quot;,</span>
<span class="line">  &quot;main&quot;: &quot;src/index.js&quot;,</span>
<span class="line">  &quot;scripts&quot;: {</span>
<span class="line">    &quot;test&quot;: &quot;echo \\&quot;Error: no test specified\\&quot; &amp;&amp; exit 1&quot;</span>
<span class="line">  },</span>
<span class="line">  &quot;keywords&quot;: [</span>
<span class="line">    &quot;vue&quot;,</span>
<span class="line">    &quot;component&quot;</span>
<span class="line">  ],</span>
<span class="line">  &quot;author&quot;: &quot;&quot;,</span>
<span class="line">  &quot;license&quot;: &quot;ISC&quot;,</span>
<span class="line">  &quot;devDependencies&quot;: {</span>
<span class="line">    &quot;vue&quot;: &quot;^3.5.13&quot;</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line">EOF</span></span>
<span class="line"></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token operator">&gt;&gt;</span> src/index.js <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;EOF&quot;</span>
<span class="line">import MyComponent from &#39;./MyComponent.vue&#39;</span>
<span class="line">MyComponent.install = (app)=&gt;{</span>
<span class="line">  app.component(MyComponent.name || &#39;MyComponent&#39;, MyComponent)</span>
<span class="line">};</span>
<span class="line">export default MyComponent;</span>
<span class="line">EOF</span></span>
<span class="line"></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token operator">&gt;&gt;</span> src/MyComponent.vue <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;EOF&quot;</span>
<span class="line">&lt;template&gt;</span>
<span class="line">  &lt;div&gt;</span>
<span class="line">    &lt;h1&gt;{{ message }}&lt;/h1&gt;</span>
<span class="line">    &lt;button @click=&quot;increment&quot;&gt;Click me&lt;/button&gt;</span>
<span class="line">  &lt;/div&gt;</span>
<span class="line">&lt;/template&gt;</span>
<span class="line"></span>
<span class="line">&lt;script setup&gt;</span>
<span class="line">import { ref } from &quot;vue&quot;;</span>
<span class="line"></span>
<span class="line">const message = ref(&quot;Hello, World!&quot;);</span>
<span class="line">const count = ref(0);</span>
<span class="line"></span>
<span class="line">const increment = () =&gt; {</span>
<span class="line">  count.value++;</span>
<span class="line">  message.value = \`Clicked \${count.value} times\`;</span>
<span class="line">};</span>
<span class="line">&lt;/script&gt;</span>
<span class="line"></span>
<span class="line">&lt;style scoped&gt;</span>
<span class="line">h1 {</span>
<span class="line">  color: blue;</span>
<span class="line">}</span>
<span class="line">button {</span>
<span class="line">  padding: 10px 20px;</span>
<span class="line">  background-color: #007bff;</span>
<span class="line">  color: white;</span>
<span class="line">  border: none;</span>
<span class="line">  cursor: pointer;</span>
<span class="line">}</span>
<span class="line">&lt;/style&gt;</span>
<span class="line">EOF</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>配置依赖</li></ol><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token builtin class-name">cd</span> my-vue-component</span>
<span class="line"><span class="token function">npm</span> <span class="token function">link</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>测试</li></ol><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token function">npm</span> init vite@latest my-vue-test-project <span class="token parameter variable">--template</span> vue</span>
<span class="line"></span>
<span class="line"><span class="token builtin class-name">cd</span> my-vue-test-project</span>
<span class="line"><span class="token function">npm</span> <span class="token function">link</span> my-vue-component</span>
<span class="line"><span class="token comment"># 可以看到 node_modules/my-vue-component 目录</span></span>
<span class="line"><span class="token comment"># 修改 App.vue 文件</span></span>
<span class="line"></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token operator">&gt;&gt;</span> src/App.vue <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;EOF&quot;</span>
<span class="line">&lt;script setup&gt;</span>
<span class="line">import HelloWorld from &quot;./components/HelloWorld.vue&quot;;</span>
<span class="line">&lt;/script&gt;</span>
<span class="line"></span>
<span class="line">&lt;template&gt;</span>
<span class="line">  &lt;div&gt;</span>
<span class="line">    &lt;my-component&gt;&lt;/my-component&gt;</span>
<span class="line">  &lt;/div&gt;</span>
<span class="line">&lt;/template&gt;</span>
<span class="line">&lt;script&gt;</span>
<span class="line">import MyComponent from &quot;my-vue-component&quot;;</span>
<span class="line">&lt;/script&gt;</span>
<span class="line"></span>
<span class="line">&lt;style scoped&gt;</span>
<span class="line">.logo {</span>
<span class="line">  height: 6em;</span>
<span class="line">  padding: 1.5em;</span>
<span class="line">  will-change: filter;</span>
<span class="line">  transition: filter 300ms;</span>
<span class="line">}</span>
<span class="line">.logo:hover {</span>
<span class="line">  filter: drop-shadow(0 0 2em #646cffaa);</span>
<span class="line">}</span>
<span class="line">.logo.vue:hover {</span>
<span class="line">  filter: drop-shadow(0 0 2em #42b883aa);</span>
<span class="line">}</span>
<span class="line">&lt;/style&gt;</span>
<span class="line">EOF</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>运行</li></ol><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token function">npm</span> run dev</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>打开浏览器访问 http://localhost:5173/ ，可以看到自定义组件的效果。</p>`,11)]))}const d=s(i,[["render",p]]),o=JSON.parse('{"path":"/guide/vue/vue3-component.html","title":"Vue3 组件","lang":"zh-CN","frontmatter":{},"headers":[],"git":{"updatedTime":1744908373000,"contributors":[{"name":"alice","username":"alice","email":"921757697@qq.com","commits":1,"url":"https://github.com/alice"}],"changelog":[{"hash":"b76da10ee718506b403f597aa5e358ba4a946939","time":1744908373000,"email":"921757697@qq.com","author":"alice","message":"vue"}]},"filePathRelative":"guide/vue/vue3-component.md"}');export{d as comp,o as data};
