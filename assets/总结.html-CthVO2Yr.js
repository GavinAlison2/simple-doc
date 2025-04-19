import{_ as n,c as e,e as a,o as i}from"./app-CNZ6fT6P.js";const l={};function t(c,s){return i(),e("div",null,s[0]||(s[0]=[a(`<h1 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h1><ol><li>表格的行 和 button 不对齐</li></ol><p>配置 css</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">.todo-item{</span>
<span class="line">display: flex; </span>
<span class="line">align-items: center; </span>
<span class="line">justify-content: space-between (按照内容自动分配宽度)</span>
<span class="line">}</span>
<span class="line">.todo-item span{</span>
<span class="line">  flex-grow: 1; (让span占据剩余空间)</span>
<span class="line">  text-align: center; (让文字居中)</span>
<span class="line">  min-width: 50px;</span>
<span class="line">}</span>
<span class="line">.todo-item div{</span>
<span class="line">  display: flex; //重新配置div的布局方式</span>
<span class="line">  align-items: center; // 让button垂直居中</span>
<span class="line">  justify-content: space-evenly; // 让button水平居中 (平均分配空间)</span>
<span class="line"></span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>App.js 中存放这大量的函数， 通过 props一直传递下去</li></ol><p>对子项的修改，通过传递props的方式，传递方法，通过回调函数修改父项的值，调用父项的方法</p>`,6)]))}const p=n(l,[["render",t]]),r=JSON.parse('{"path":"/guide/React/my-todo/%E6%80%BB%E7%BB%93.html","title":"总结","lang":"zh-CN","frontmatter":{},"headers":[],"git":{"updatedTime":1744933759000,"contributors":[{"name":"alice","username":"alice","email":"921757697@qq.com","commits":1,"url":"https://github.com/alice"}],"changelog":[{"hash":"a8c8ae3910976148d6fa18f1558a906b2439578f","time":1744933759000,"email":"921757697@qq.com","author":"alice","message":"react"}]},"filePathRelative":"guide/React/my-todo/总结.md"}');export{p as comp,r as data};
