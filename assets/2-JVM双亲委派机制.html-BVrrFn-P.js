import{_ as n,c as a,e,o as l}from"./app-DN6Q4pKI.js";const i={};function p(c,s){return l(),a("div",null,s[0]||(s[0]=[e(`<h1 id="jvm双亲委派机制" tabindex="-1"><a class="header-anchor" href="#jvm双亲委派机制"><span>JVM双亲委派机制</span></a></h1><h2 id="_1-双亲委派模型" tabindex="-1"><a class="header-anchor" href="#_1-双亲委派模型"><span>1. 双亲委派模型</span></a></h2><p>ClassLoader</p><div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md"><pre><code><span class="line"></span>
<span class="line">Bootstrap ClassLoader：</span>
<span class="line">引导类加载器，它用来加载Java的核心类库，如java.lang.String。</span>
<span class="line"></span>
<span class="line"><span class="token list punctuation">-</span> 加载$JAVA_HOME/jre/lib/rt.jar和$JAVA_HOME/jre/lib/ext目录下的类库</span>
<span class="line"><span class="token list punctuation">-</span> 无法被用户自定义，是JVM自身的一部分</span>
<span class="line"></span>
<span class="line">Extension ClassLoader：</span>
<span class="line">扩展类加载器，它用来加载Java的扩展类库，如javax.swing.JButton。</span>
<span class="line"></span>
<span class="line"><span class="token list punctuation">-</span> 加载$JAVA_HOME/jre/lib/ext目录下的类库</span>
<span class="line"><span class="token list punctuation">-</span> 父类加载器为Bootstrap ClassLoader</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">Application ClassLoader：</span>
<span class="line">应用程序类加载器，它用来加载用户类路径（classpath）指定的类库。</span>
<span class="line"></span>
<span class="line"><span class="token list punctuation">-</span> 加载用户类路径（classpath）指定的类库</span>
<span class="line"><span class="token list punctuation">-</span> 父类加载器为Extension ClassLoader</span>
<span class="line"></span>
<span class="line">自定义类加载器:</span>
<span class="line"></span>
<span class="line"><span class="token list punctuation">-</span> 继承ClassLoader类</span>
<span class="line"><span class="token list punctuation">-</span> 重写loadClass()方法，以自定义类的加载方式 </span>
<span class="line"><span class="token list punctuation">-</span> ServiceLoader.load()方法使用了双亲委派机制，可以方便地加载SPI（Service Provider Interface）文件。</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-双亲委派机制" tabindex="-1"><a class="header-anchor" href="#_2-双亲委派机制"><span>2. 双亲委派机制</span></a></h2><p>当一个类需要被加载时，Java虚拟机会按照以下的委派模型进行搜索：</p><ol><li>首先，虚拟机会尝试自己去加载这个类，如果加载成功，则返回这个类。</li><li>如果虚拟机自己无法加载，就会委托父类加载器去加载。</li><li>如果父类加载器也无法加载，就会委托更上层的父类加载器去加载。</li><li>如果父类加载器的父类加载器为空，则使用Bootstrap ClassLoader作为父类加载器。</li><li>如果所有的父类加载器都无法加载，则抛出ClassNotFoundException异常。</li></ol><h2 id="_3-自定义类加载器" tabindex="-1"><a class="header-anchor" href="#_3-自定义类加载器"><span>3. 自定义类加载器</span></a></h2><p>自定义类加载器可以继承ClassLoader类，并重写loadClass()方法，以自定义类的加载方式。</p><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java"><pre><code><span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyClassLoader</span> <span class="token keyword">extends</span> <span class="token class-name">ClassLoader</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token annotation punctuation">@Override</span></span>
<span class="line">    <span class="token keyword">protected</span> <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> <span class="token function">loadClass</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token keyword">boolean</span> resolve<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ClassNotFoundException</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">// 自定义类加载逻辑</span></span>
<span class="line">        <span class="token comment">//...</span></span>
<span class="line">        <span class="token comment">// 调用父类加载器去加载类</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">loadClass</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> resolve<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-双亲委派机制的优点" tabindex="-1"><a class="header-anchor" href="#_4-双亲委派机制的优点"><span>4. 双亲委派机制的优点</span></a></h2><ul><li>避免类的重复加载，保证Java类在JVM中只被加载一次，有效避免内存浪费。</li><li>保障Java类安全，避免恶意代码对系统的攻击。</li><li>实现了Java类随着程序的运行环境变化而动态更新，保证程序的稳定性。</li></ul><h2 id="_5-使用serviceloader" tabindex="-1"><a class="header-anchor" href="#_5-使用serviceloader"><span>5. 使用ServiceLoader</span></a></h2><p>ServiceLoader.load()方法使用了双亲委派机制，可以方便地加载SPI（Service Provider Interface）文件。</p>`,14)]))}const d=n(i,[["render",p]]),o=JSON.parse('{"path":"/guide/JVM/2-JVM%E5%8F%8C%E4%BA%B2%E5%A7%94%E6%B4%BE%E6%9C%BA%E5%88%B6.html","title":"JVM双亲委派机制","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"1. 双亲委派模型","slug":"_1-双亲委派模型","link":"#_1-双亲委派模型","children":[]},{"level":2,"title":"2. 双亲委派机制","slug":"_2-双亲委派机制","link":"#_2-双亲委派机制","children":[]},{"level":2,"title":"3. 自定义类加载器","slug":"_3-自定义类加载器","link":"#_3-自定义类加载器","children":[]},{"level":2,"title":"4. 双亲委派机制的优点","slug":"_4-双亲委派机制的优点","link":"#_4-双亲委派机制的优点","children":[]},{"level":2,"title":"5. 使用ServiceLoader","slug":"_5-使用serviceloader","link":"#_5-使用serviceloader","children":[]}],"git":{"updatedTime":1746110672000,"contributors":[{"name":"alice","username":"alice","email":"921757697@qq.com","commits":1,"url":"https://github.com/alice"}],"changelog":[{"hash":"3a27593279a74287e81e60f7c40dd5271d54aaf2","time":1746110672000,"email":"921757697@qq.com","author":"alice","message":"deploy jvm"}]},"filePathRelative":"guide/JVM/2-JVM双亲委派机制.md"}');export{d as comp,o as data};
