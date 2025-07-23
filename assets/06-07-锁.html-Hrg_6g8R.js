import{_ as n,c as l,e as a,o as e}from"./app-DN6Q4pKI.js";const i={};function d(c,s){return e(),l("div",null,s[0]||(s[0]=[a(`<h1 id="_06-07-锁" tabindex="-1"><a class="header-anchor" href="#_06-07-锁"><span>06-07-锁</span></a></h1><h2 id="锁的种类" tabindex="-1"><a class="header-anchor" href="#锁的种类"><span>锁的种类</span></a></h2><p>mysql锁大致可以分成全局锁、表级锁和行锁三类</p><ul><li>全局锁, 又称为数据库锁，是对整个数据库实例加锁，对整个数据库实例的DDL和DML操作都会被阻塞，直到锁释放。</li><li>表级锁 <ul><li>表锁, Table Lock，是对表加锁，对表的DDL和DML操作都会被阻塞，直到锁释放。</li><li>元数据锁, meta data lock， MDL</li></ul></li><li>行锁 <ul><li>共享锁, Shared Lock，又称为读锁，是对一行或多行加锁，其他事务只能对该行或多行进行读操作，直到锁释放。</li><li>排他锁, Exclusive Lock，又称为写锁，是对一行或多行加锁，其他事务不能对该行或多行进行任何操作，直到锁释放。</li><li>record lock，又称为next-key lock，是对索引记录加锁，在RR隔离级别下，对索引记录加的锁，其他事务只能在当前索引记录和相邻的记录之间进行加锁，直到锁释放。</li><li>gap lock，又称为间隙锁，是对索引记录之间的间隙加锁，在RR隔离级别下，对索引记录之间的间隙加的锁，其他事务只能在当前索引记录和相邻的记录之间进行加锁，直到锁释放。</li><li>next-key lock，又称为gap lock，是对索引记录之间的间隙加锁，在RR隔离级别下，对索引记录之间的间隙加的锁，其他事务只能在当前索引记录和相邻的记录之间进行加锁，直到锁释放。</li></ul></li></ul><p>全局锁</p><p><code>Flush tables with read lock;</code></p><div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md"><pre><code><span class="line">官方自带的逻辑备份工具是 mysqldump，当 mysqldump 使用参数–single-transaction 的时候，导数据之前就会启动一个事务，来确保拿到一致性视图。</span>
<span class="line"></span>
<span class="line">但当引擎不支持事务时，只能使用FTWRL 命令了。不推荐不使用 set global readonly=true，readonly会被其他逻辑使用（比如判断主从），readonly发生异常会保持该状态。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>表级锁</p><div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md"><pre><code><span class="line">表锁的语法是 lock tables … read/write。</span>
<span class="line">MDL不需要显式使用，在访问一个表的时候会被自动加上。</span>
<span class="line">当对一个表做增删改查操作的时候，加 MDL 读锁；当要对表做结构变更操作的时候，加 MDL 写锁。</span>
<span class="line"></span>
<span class="line">当一个长事务还没提交，进行表结构变更操作，会导致后面的事务block。当客户端有重试机制时，新起session请求，会导致库的线程很快就会爆满。</span>
<span class="line"></span>
<span class="line">如何安全地给小表加字段？</span>
<span class="line">避免长事务。</span>
<span class="line"></span>
<span class="line">在 alter table 语句里面设定等待时间。</span>
<span class="line">MariaDB 已经合并了 AliSQL 的这个功能，所以这两个开源分支目前都支持 DDL NOWAIT/WAIT n 这个语法。</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_07-行锁功过-怎么减少行锁对性能的影响" tabindex="-1"><a class="header-anchor" href="#_07-行锁功过-怎么减少行锁对性能的影响"><span>07 | 行锁功过：怎么减少行锁对性能的影响</span></a></h2><div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md"><pre><code><span class="line">行锁</span>
<span class="line">Mysql行锁由引擎层实现</span>
<span class="line"></span>
<span class="line">两阶段锁</span>
<span class="line">行锁需要事务结束时才释放，这就是两阶段锁。</span>
<span class="line">所以需要合理安排事务中sql执行顺序，尽量把容易冲突的更新语句放在后面。</span>
<span class="line"></span>
<span class="line">死锁和死锁检测</span>
<span class="line">设置超时时间，innodb_lock_wait_timeout。</span>
<span class="line">死锁检测，发现死锁主动回滚某个事务，innodb_deadlock_detect 默认on。</span>
<span class="line">假设1000个同时更新一行，则死锁检测操作就是 100 万这个量级的。即使没有死锁，检测也会消耗大量的 CPU 资源。</span>
<span class="line">解决方案：</span>
<span class="line"></span>
<span class="line">业务不会出现死锁，可以临时关闭。</span>
<span class="line">在客户端控制并发。</span>
<span class="line">修改MySQL 源码，并发进入引擎之前排队。</span>
<span class="line">将一行数据改为多行，如将一个余额账户分为多个，但在数据减少操作时需考虑小于0的情况。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11)]))}const p=n(i,[["render",d]]),m=JSON.parse('{"path":"/guide/mysql/mysql45%E8%AE%B2/06-07-%E9%94%81.html","title":"06-07-锁","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"锁的种类","slug":"锁的种类","link":"#锁的种类","children":[]},{"level":2,"title":"07 | 行锁功过：怎么减少行锁对性能的影响","slug":"_07-行锁功过-怎么减少行锁对性能的影响","link":"#_07-行锁功过-怎么减少行锁对性能的影响","children":[]}],"git":{"updatedTime":1746351827000,"contributors":[{"name":"alice","username":"alice","email":"921757697@qq.com","commits":1,"url":"https://github.com/alice"}],"changelog":[{"hash":"a8d5abca5e84b9407cf50b57467ae6a55092ef14","time":1746351827000,"email":"921757697@qq.com","author":"alice","message":"deploy mysql 45讲"}]},"filePathRelative":"guide/mysql/mysql45讲/06-07-锁.md"}');export{p as comp,m as data};
