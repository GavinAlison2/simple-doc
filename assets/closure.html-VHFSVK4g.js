import{_ as s,c as a,e,o as l}from"./app-B1ci4Wxf.js";const i={};function p(c,n){return l(),a("div",null,n[0]||(n[0]=[e(`<h1 id="closure-in-es6" tabindex="-1"><a class="header-anchor" href="#closure-in-es6"><span>Closure in ES6</span></a></h1><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre><code><span class="line"><span class="token keyword">function</span> <span class="token function">a</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">let</span> msg <span class="token operator">=</span> <span class="token string">&quot;hi&quot;</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">b</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">return</span> b<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// a()();</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">greeting</span><span class="token punctuation">(</span><span class="token parameter">arg1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">sayHi</span><span class="token punctuation">(</span><span class="token parameter">arg2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arg1 <span class="token operator">+</span> <span class="token string">&quot; &quot;</span> <span class="token operator">+</span> arg2<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">return</span> sayHi<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token comment">// greeting(&quot;h1&quot;)(&quot;world&quot;);</span></span>
<span class="line"><span class="token comment">// greeting(&quot;h2&quot;)(&quot;world&quot;);</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token comment">// for (let index = 1; index &lt;= 3; index++) {</span></span>
<span class="line"><span class="token comment">//     setTimeout(function () {</span></span>
<span class="line"><span class="token comment">//         console.log(&#39;after &#39; + index + &#39; second(s):&#39; + index);</span></span>
<span class="line"><span class="token comment">//     }, index * 1000);</span></span>
<span class="line"><span class="token comment">// }</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> index <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> index <span class="token operator">&lt;=</span> <span class="token number">3</span><span class="token punctuation">;</span> index<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">index</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;after &#39;</span> <span class="token operator">+</span> index <span class="token operator">+</span> <span class="token string">&#39; second(s):&#39;</span> <span class="token operator">+</span> index<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">,</span> index <span class="token operator">*</span> <span class="token number">1000</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token comment">/*</span>
<span class="line"># 假设我们想要创建一个计数器函数，每次调用它时，它都会返回一个比上一次调用时更大的数字。 </span>
<span class="line"></span>
<span class="line">## 全局变量方式</span>
<span class="line"></span>
<span class="line">let globalCount = 0;</span>
<span class="line"></span>
<span class="line">function incrementGlobalCount() {</span>
<span class="line">    globalCount++;</span>
<span class="line">    return globalCount;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">console.log(incrementGlobalCount()); // 输出 1</span>
<span class="line">console.log(incrementGlobalCount()); // 输出 2</span>
<span class="line">console.log(incrementGlobalCount()); // 输出 3</span>
<span class="line"></span>
<span class="line">这种方式的问题是，globalCount 可以在任何地方被修改，这可能会导致不可预测的行为和潜在的错误。</span>
<span class="line"></span>
<span class="line">## 类方式 推荐使用</span>
<span class="line"></span>
<span class="line">class Counter {</span>
<span class="line">    constructor() {</span>
<span class="line">        this.count = 0;</span>
<span class="line">    }</span>
<span class="line"></span>
<span class="line">    increment() {</span>
<span class="line">        this.count++;</span>
<span class="line">        return this.count;</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">const counterInstance = new Counter();</span>
<span class="line">console.log(counterInstance.increment()); // 输出 1</span>
<span class="line">console.log(counterInstance.increment()); // 输出 2</span>
<span class="line">console.log(counterInstance.increment()); // 输出 3</span>
<span class="line"></span>
<span class="line">这种方式比全局变量方式更安全，因为它通过类的封装保护了计数器的状态。</span>
<span class="line"></span>
<span class="line">## 闭包方式 推荐使用</span>
<span class="line"></span>
<span class="line">function createCounter() {</span>
<span class="line">    let count = 0; // 这是一个局部变量</span>
<span class="line">    return function() {</span>
<span class="line">        count++;</span>
<span class="line">        return count;</span>
<span class="line">    };</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">const counter = createCounter();</span>
<span class="line">console.log(counter()); // 输出 1</span>
<span class="line">console.log(counter()); // 输出 2</span>
<span class="line">console.log(counter()); // 输出 3</span>
<span class="line"></span>
<span class="line">createCounter 函数内部定义了一个局部变量 count 和一个返回的函数。当 createCounter 被调用时，它返回了一个闭包，</span>
<span class="line">这个闭包“记住”了 count 变量的值，并且每次调用这个闭包时，都会访问并更新这个值。</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">*/</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2)]))}const o=s(i,[["render",p]]),u=JSON.parse('{"path":"/guide/es6/closure.html","title":"Closure in ES6","lang":"zh-CN","frontmatter":{},"headers":[],"git":{"updatedTime":1744907061000,"contributors":[{"name":"alice","username":"alice","email":"921757697@qq.com","commits":1,"url":"https://github.com/alice"}],"changelog":[{"hash":"6865a6735449381c1fba9a14aa9ad0c9bd2e80fc","time":1744907061000,"email":"921757697@qq.com","author":"alice","message":"deploy"}]},"filePathRelative":"guide/es6/closure.md"}');export{o as comp,u as data};
