import{_ as i,c as e,e as s,o as a}from"./app-DzmgiGLk.js";const n="/simple-doc/assets/mysl-th01-8gw2tTPt.png",d={};function r(c,l){return a(),e("div",null,l[0]||(l[0]=[s('<h1 id="mysql-思考整理" tabindex="-1"><a class="header-anchor" href="#mysql-思考整理"><span>MySQL 思考整理</span></a></h1><h2 id="buffer-pool" tabindex="-1"><a class="header-anchor" href="#buffer-pool"><span>Buffer Pool</span></a></h2><ul><li>buffer pool</li><li>free 链表</li><li>flush 链表</li><li>lru 链表</li><li>change buffer</li><li>adapter hash index</li><li>double writer</li><li>2pc</li><li>log buffer</li><li>redo log</li><li>undo log</li><li>binlog</li><li>index</li><li>mvcc, read view</li></ul><h2 id="log" tabindex="-1"><a class="header-anchor" href="#log"><span>log</span></a></h2><ul><li>redo log</li><li>undo log</li><li>binlog</li><li>error log 错误日志</li><li>query slow log 慢查询日志</li><li>general log 通用日志</li><li>relay log 中继日志</li></ul><h2 id="索引" tabindex="-1"><a class="header-anchor" href="#索引"><span>索引</span></a></h2><ul><li>B+树</li><li>聚簇索引</li><li>二级索引</li><li>普通索引</li><li>联合索引</li><li>覆盖索引, 避免回表</li><li>前缀索引</li><li>hash索引</li><li>索引失效</li></ul><h2 id="锁" tabindex="-1"><a class="header-anchor" href="#锁"><span>锁</span></a></h2><ul><li>表锁 <ul><li>S锁</li><li>X锁</li><li>IS锁</li><li>IX锁</li></ul></li><li>自增锁</li><li>行锁 <ul><li>record lock</li><li>gap lock</li><li>next-key lock</li></ul></li><li>死锁 <ul><li>死锁检测</li><li>死锁超时</li></ul></li><li>锁粒度</li><li>锁的优化</li><li>事务隔离级别</li></ul><h2 id="一些图" tabindex="-1"><a class="header-anchor" href="#一些图"><span>一些图</span></a></h2><p><img src="'+n+`" alt="mysql1"></p><div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md"><pre><code><span class="line">sql</span>
<span class="line">buffer pool</span>
<span class="line">缓存页</span>
<span class="line">dirty page</span>
<span class="line"></span>
<span class="line">io刷脏页</span>
<span class="line"></span>
<span class="line">buffer pool</span>
<span class="line">free 链表</span>
<span class="line">flush 链表</span>
<span class="line">lru 链表</span>
<span class="line"></span>
<span class="line">redo log</span>
<span class="line">  ib_logfile0</span>
<span class="line">  wal write to disk</span>
<span class="line">  innodb_flush_log_at_trx_commit=1</span>
<span class="line"></span>
<span class="line">undo log</span>
<span class="line">  undo_001</span>
<span class="line"></span>
<span class="line">binlog</span>
<span class="line">  binlog_001</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12)]))}const p=i(d,[["render",r]]),u=JSON.parse('{"path":"/guide/mysql/mysql-%E6%80%9D%E8%80%83%E6%95%B4%E7%90%86.html","title":"MySQL 思考整理","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"Buffer Pool","slug":"buffer-pool","link":"#buffer-pool","children":[]},{"level":2,"title":"log","slug":"log","link":"#log","children":[]},{"level":2,"title":"索引","slug":"索引","link":"#索引","children":[]},{"level":2,"title":"锁","slug":"锁","link":"#锁","children":[]},{"level":2,"title":"一些图","slug":"一些图","link":"#一些图","children":[]}],"git":{"updatedTime":1746957383000,"contributors":[{"name":"alice","username":"alice","email":"921757697@qq.com","commits":3,"url":"https://github.com/alice"}],"changelog":[{"hash":"1aa8f9ae6eff191a92c0a6ec3f2bbc615028e97c","time":1746957383000,"email":"921757697@qq.com","author":"alice","message":"deploy mysql 手绘图"},{"hash":"9a9a724e2266d508b01cf98d17493fda41251e3d","time":1746778681000,"email":"921757697@qq.com","author":"alice","message":"deploy mysql 手绘图"},{"hash":"585489a27a9c17b77597dde58884e41006c86787","time":1746693850000,"email":"921757697@qq.com","author":"alice","message":"deploy mysql 手绘图"}]},"filePathRelative":"guide/mysql/mysql-思考整理.md"}');export{p as comp,u as data};
