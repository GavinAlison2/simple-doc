<template><div><h1 id="vuepress-安装" tabindex="-1"><a class="header-anchor" href="#vuepress-安装"><span>VuePress 安装</span></a></h1>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">npm</span> init vuepress vuepress-starter</span>
<span class="line"></span>
<span class="line"><span class="token function">git</span>  init</span>
<span class="line"></span>
<span class="line"><span class="token function">cat</span> <span class="token operator">></span>.gitignore <span class="token operator">&lt;&lt;</span><span class="token string">EOF</span>
<span class="line">node_modules</span>
<span class="line"># VuePress 默认临时文件目录</span>
<span class="line">.vuepress/.temp</span>
<span class="line"># VuePress 默认缓存目录</span>
<span class="line">.vuepress/.cache</span>
<span class="line"># VuePress 默认构建生成的静态文件目录</span>
<span class="line">.vuepress/dist</span>
<span class="line">EOF</span></span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用" tabindex="-1"><a class="header-anchor" href="#使用"><span>使用</span></a></h2>
<p>查看脚本</p>
<div class="language-node line-numbers-mode" data-highlighter="prismjs" data-ext="node"><pre v-pre><code><span class="line">{</span>
<span class="line">  &quot;scripts&quot;: {</span>
<span class="line">    &quot;docs:dev&quot;: &quot;vuepress dev docs&quot;,</span>
<span class="line">    &quot;docs:build&quot;: &quot;vuepress build docs&quot;</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行 <code v-pre>docs:dev</code> 脚本可以启动开发服务器:
VuePress 会在 http://localhost:8080 启动一个热重载的开发服务器。当你修改你的 Markdown 文件时，浏览器中的内容也会自动更新</p>
<h2 id="构建你的网站" tabindex="-1"><a class="header-anchor" href="#构建你的网站"><span>构建你的网站</span></a></h2>
<p>运行 <code v-pre>npm run docs:build</code>, 在 docs/.vuepress/dist 目录中可以找到构建生成的静态文件。你可以查看 部署 来了解如何部署你的网站</p>
<h2 id="部署-github-pages" tabindex="-1"><a class="header-anchor" href="#部署-github-pages"><span>部署 github pages</span></a></h2>
<h3 id="_1-添加源码到-github-仓库" tabindex="-1"><a class="header-anchor" href="#_1-添加源码到-github-仓库"><span>1. 添加源码到 github 仓库</span></a></h3>
<p>在 <code v-pre>vuepress-starter/docs/config.js</code> 添加一个 base 路径配置
<code v-pre>base: '/simple-doc',</code></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">cat</span> <span class="token operator">></span> deploy_source.sh <span class="token operator">&lt;&lt;</span> <span class="token string">EOF</span>
<span class="line">#!/usr/bin/env sh</span>
<span class="line"></span>
<span class="line">set -e</span>
<span class="line"></span>
<span class="line">cat > .gitignore &lt;&lt;EOF</span>
<span class="line">node_modules</span>
<span class="line">.DS_Store</span>
<span class="line">docs/.vuepress/dist</span>
<span class="line">EOF</span></span>
<span class="line"></span>
<span class="line"><span class="token function">git</span> init <span class="token builtin class-name">.</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> <span class="token parameter variable">-A</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">rm</span> <span class="token parameter variable">-r</span> <span class="token parameter variable">--cached</span> node_modules</span>
<span class="line"><span class="token function">git</span> <span class="token function">rm</span> <span class="token parameter variable">-r</span> <span class="token parameter variable">--cached</span> docs/.vuepress/dist</span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">'deploy_source'</span></span>
<span class="line"></span>
<span class="line"><span class="token function">git</span> branch <span class="token parameter variable">-M</span> master</span>
<span class="line"><span class="token function">git</span> push <span class="token parameter variable">-f</span> git@github.com:GavinAlison2/simple-doc.git master</span>
<span class="line"></span>
<span class="line">EOF</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-部署网站文件到-github-仓库simple-doc的gh-pages分支" tabindex="-1"><a class="header-anchor" href="#_2-部署网站文件到-github-仓库simple-doc的gh-pages分支"><span>2. 部署网站文件到 github 仓库simple-doc的gh-pages分支</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token shebang important">#!/usr/bin/env sh</span></span>
<span class="line"></span>
<span class="line"><span class="token builtin class-name">set</span> <span class="token parameter variable">-e</span></span>
<span class="line"><span class="token function">npm</span> run docs:build</span>
<span class="line"><span class="token builtin class-name">cd</span> docs/.vuepress/dist</span>
<span class="line"></span>
<span class="line"><span class="token function">git</span> init <span class="token builtin class-name">.</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> <span class="token parameter variable">-A</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">'deploy'</span></span>
<span class="line"><span class="token function">git</span> branch <span class="token parameter variable">-M</span> master</span>
<span class="line"><span class="token function">git</span> push <span class="token parameter variable">-f</span> git@github.com:GavinAlison2/simple-doc.git master:gh-pages</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用-github-actions-自动部署" tabindex="-1"><a class="header-anchor" href="#使用-github-actions-自动部署"><span>使用 github actions 自动部署</span></a></h2>
<p>配置好 github actions</p>
<ol>
<li>新建 <code v-pre>.github/workflows/deploy.yml</code> 文件</li>
<li>复制以下内容到文件中</li>
</ol>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre v-pre><code><span class="line"><span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">on</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">push</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">branches</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> master</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">permissions</span><span class="token punctuation">:</span> <span class="token comment"># 权限</span></span>
<span class="line">  <span class="token key atrule">contents</span><span class="token punctuation">:</span> write</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">jobs</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">deploy</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest</span>
<span class="line">    <span class="token key atrule">steps</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v2</span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Use Node.js 14.x</span>
<span class="line">        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>node@v1</span>
<span class="line">        <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">node-version</span><span class="token punctuation">:</span> 20.x</span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">run</span><span class="token punctuation">:</span> npm install</span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">run</span><span class="token punctuation">:</span> npm run docs<span class="token punctuation">:</span>build <span class="token punctuation">></span> docs/.vuepress/dist/.nojekyll</span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy</span>
<span class="line">        <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string"></span>
<span class="line">          cd docs/.vuepress/dist</span>
<span class="line">          git init</span>
<span class="line">          git config user.name "github-actions[bot]"</span>
<span class="line">          git config user.email "41898282+github-actions[bot]@users.noreply.github.com"</span>
<span class="line">          git add -A</span>
<span class="line">          git commit -m 'deploy'</span>
<span class="line">          git push -f git@github.com/GavinAlison2/simple-doc.git master:gh-pages</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中 <code v-pre>${GITHUB_TOKEN}</code> 是 github 仓库的 <code v-pre>secrets</code> 设置，用于自动部署。</p>
<p>提交代码到 master 分支，github actions 会自动部署网站到 gh-pages 分支。</p>
<p>在github pages 设置中，将 <code v-pre>source</code> 选择 <code v-pre>gh-pages</code> 分支，然后点击 <code v-pre>save</code> 保存设置。
<img src="@source/pages/vuepress/pics/github-pages.png" alt="pages"></p>
<p>github actions 相当于 CI/CD 工具，可以自动化部署网站。</p>
<p>推送成功之后可以看到部署过程，先 工作流指定的名称， 然后系统默认的部署工作流</p>
<p><img src="@source/pages/vuepress/pics/actions.png" alt="actions"></p>
<p>最后访问： https://gavinalison2.github.io/simple-doc/</p>
<h2 id="本地调试" tabindex="-1"><a class="header-anchor" href="#本地调试"><span>本地调试</span></a></h2>
<p>运行 <code v-pre>npm run docs:dev</code> 启动本地调试服务器，浏览器访问 http://localhost:8080 即可看到本地调试的网站。</p>
<p>参考：</p>
<ol>
<li>https://juejin.cn/column/7041871760995647502</li>
<li>https://vuepress.vuejs.org/zh/guide/getting-started.html</li>
</ol>
</div></template>


