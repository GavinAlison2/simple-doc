import{_ as s,c as e,e as a,o as i}from"./app-DlGl6QFf.js";const l={};function c(d,n){return i(),e("div",null,n[0]||(n[0]=[a(`<h1 id="g1垃圾收集器" tabindex="-1"><a class="header-anchor" href="#g1垃圾收集器"><span>G1垃圾收集器</span></a></h1><h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介"><span>简介</span></a></h2><p>region 计算方式</p><div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md"><pre><code><span class="line">source addr = https://hg.openjdk.java.net</span>
<span class="line">source src = jdk7/hotspot/src/share/vm/gc/g1/g1RegionSet.hpp</span>
<span class="line"></span>
<span class="line">min_region_size = 1024 <span class="token italic"><span class="token punctuation">*</span><span class="token content"> 1024 // 1MB region 最小值</span>
<span class="line">max_region_size = 32 </span><span class="token punctuation">*</span></span> 1024 * 1024 // 32MB region 最大值</span>
<span class="line"></span>
<span class="line">target_region_number = 2048 // 目标 region 数量</span>
<span class="line"></span>
<span class="line">-XX:G1HeapRegionSize=1024 // region 大小</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>g1 垃圾回收器的堆结构</p><div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md"><pre><code><span class="line">region1, region2, region3,...</span>
<span class="line"></span>
<span class="line">region1: eden, survivor1, survivor2, old, humongous</span>
<span class="line"></span>
<span class="line">-MaxGCPauseMillis: 200ms // 最大暂停时间</span>
<span class="line"></span>
<span class="line">-XX:ConcGCThreads: 4 // 并发 GC 线程数</span>
<span class="line"></span>
<span class="line">-XX:InitiatingHeapOccupancyPercent: 45 // 触发 GC 的堆占用率</span>
<span class="line"></span>
<span class="line">-XX:G1HeapRegionSize: 1024 // region 大小</span>
<span class="line"></span>
<span class="line">-XX:G1NewSizePercent: 5 // eden 区占比 5%</span>
<span class="line">-XX:G1MaxNewSizePercent: 60 // eden 区最大占比 60%</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6)]))}const p=s(l,[["render",c]]),t=JSON.parse('{"path":"/guide/JVM/8-g1.html","title":"G1垃圾收集器","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"简介","slug":"简介","link":"#简介","children":[]}],"git":{"updatedTime":1746240722000,"contributors":[{"name":"alice","username":"alice","email":"921757697@qq.com","commits":1,"url":"https://github.com/alice"}],"changelog":[{"hash":"77e1afd92b98df66020fdb2f864dee5d0d6673a8","time":1746240722000,"email":"921757697@qq.com","author":"alice","message":"deploy jvm"}]},"filePathRelative":"guide/JVM/8-g1.md"}');export{p as comp,t as data};
