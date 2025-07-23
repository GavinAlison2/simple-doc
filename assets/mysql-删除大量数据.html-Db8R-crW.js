import{_ as n,c as e,e as a,o as l}from"./app-DlGl6QFf.js";const i={};function t(d,s){return l(),e("div",null,s[0]||(s[0]=[a(`<h1 id="mysql删除大量数据" tabindex="-1"><a class="header-anchor" href="#mysql删除大量数据"><span>mysql删除大量数据</span></a></h1><h2 id="背景" tabindex="-1"><a class="header-anchor" href="#背景"><span>背景</span></a></h2><p>大数据表删除大量数据，600万数据删除200万数据，每天还有100万数据新增，如何快速删除大量数据？</p><h2 id="解决方案" tabindex="-1"><a class="header-anchor" href="#解决方案"><span>解决方案</span></a></h2><div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md"><pre><code><span class="line"><span class="token list punctuation">-</span> drop</span>
<span class="line"><span class="token list punctuation">-</span> 执行过程,ddl语句，删除整张表和表结构，以及表的索引、约束和触发器</span>
<span class="line"><span class="token list punctuation">-</span> 不可能回滚，慎用</span>
<span class="line"><span class="token list punctuation">-</span> 无事务</span>
<span class="line"></span>
<span class="line"><span class="token list punctuation">-</span> truncate</span>
<span class="line"><span class="token list punctuation">-</span> DDL语句，只删除表数据，表的结构、索引、约束等会被保留</span>
<span class="line"><span class="token list punctuation">-</span> 不可回滚</span>
<span class="line"><span class="token list punctuation">-</span> 不走事务，不会锁表，也不会生产大量日志写入日志文件;</span>
<span class="line"><span class="token list punctuation">-</span> truncate table table_name 后立刻释放磁盘空间，并重置auto_increment的值。</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token list punctuation">-</span> delete</span>
<span class="line"><span class="token list punctuation">-</span> DML语句，删除表中数据</span>
<span class="line"><span class="token list punctuation">-</span> 可回滚</span>
<span class="line"><span class="token list punctuation">-</span> 事务会记录到日志，并且有行、表锁；</span>
<span class="line"><span class="token list punctuation">-</span> delete删除不释放磁盘空间，但后续insert会覆盖在之前删除的数据上。底层是逻辑删除，然后会出现脏页，后台线程会定期清理。</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-delete-limit" tabindex="-1"><a class="header-anchor" href="#_1-delete-limit"><span>1. delete limit</span></a></h3><p>使用delete语句删除大量数据，删除时使用limit限制每次删除的数量，避免一次性删除过多数据导致系统卡死。</p><div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md"><pre><code><span class="line">DELETE FROM tab_name WHERE status=1 ORDER BY status LIMIT 10000;</span>
<span class="line"></span>
<span class="line">注意：当需要用到order by排序时，必须order by + limit联用，否则order by 就会被优化器优化掉，被认为无意义。</span>
<span class="line"></span>
<span class="line">说明：如果delete的where语句不在索引上，可以先找主键，然后根据主键删除数据库。</span>
<span class="line"></span>
<span class="line">1）加limit的的优点：</span>
<span class="line"></span>
<span class="line">降低写错SQL的代价，就算删错了，比如limit 500,那也就丢了500条数据，并不致命，通过binlog也可以很快恢复数据。</span>
<span class="line">避免了长事务，delete执行时MySQL会将所有涉及的行加写锁和Gap锁（间隙锁），所有DML语句执行相关行会被锁住，如果删除数量大，会直接影响相关业务无法使用。</span>
<span class="line">delete数据量大时，不加limit容易把cpu打满，导致越删越慢。</span>
<span class="line"></span>
<span class="line">针对上述第二点，前提是statusid上加了索引，大家都知道，加锁都是基于索引的，如果statusid字段没索引，就会扫描到主键索引上，那么就算statusid = 1 的只有一条记录，也会锁表。</span>
<span class="line"></span>
<span class="line">2）单条删除、更新操作，使用limit1绝对是个好习惯：</span>
<span class="line"></span>
<span class="line">单条更新和删除操作时，如果SQL中有limit 1；这时就return了，否则还会执行完全表扫描才return</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-rename-table" tabindex="-1"><a class="header-anchor" href="#_2-rename-table"><span>2. rename table</span></a></h3><p>删除大表的多行数据时，会超出innod block table size的限制，最小化的减少锁表的时间的方案是：</p><ul><li>新建一个表，将不需要删除的数据复制到新表</li><li>选择不需要删除的数据，并把它们存在一张相同结构的空表里</li><li>利用rename原子操作，重命名原始表和复制表</li><li>删掉原始表</li></ul><div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md"><pre><code><span class="line">insert into t_copy  select * from t where ...;</span>
<span class="line">rename t to t_old, t_copy to t;</span>
<span class="line">drop table t_old;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-删除不必要的索引后重建" tabindex="-1"><a class="header-anchor" href="#_3-删除不必要的索引后重建"><span>3. 删除不必要的索引后重建</span></a></h3><div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md"><pre><code><span class="line">在My SQL数据库使用中，有的表存储数据量比较大，达到每天三百万条记录左右，此表中建立了三个索引，这些索引都是必须的，其他程序要使用。由于要求此表中的数据只保留当天的数据，所以每当在凌晨的某一时刻当其他程序处理完其中的数据后要删除该表中昨天以及以前的数据，使用delete删除表中的上百万条记录时，MySQL删除速度非常缓慢，每一万条记录需要大概4分钟左右，这样删除所有无用数据要达到八个小时以上，这是难以接受的。</span>
<span class="line"></span>
<span class="line">查询MySQL官方手册得知删除数据的速度和创建的索引数量是成正比的（对于DML操作，如果有索引会更新索引信息，所以会比较慢），于是删除掉其中的两个索引后测试，发现此时删除速度相当快，一百万条记录在一分钟多一些，可是这两个索引其他模块在每天一次的数据整理中还要使用，于是想到了一个折中的办法：</span>
<span class="line"></span>
<span class="line">在删除数据之前删除这两个索引，此时需要三分钟多一些；</span>
<span class="line">然后删除其中无用数据，此过程需要不到两分钟；</span>
<span class="line">删除完成后重新创建索引，因为此时数据库中的数据相对较少，约三四十万条记录(此表中的数据每小时会增加约十万条)，创建索引也非常快，约十分钟左右。这样整个删除过程只需要约15分钟。对比之前的八个小时，大大节省了时间。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>原文： https://blog.csdn.net/liuxiao723846/article/details/130360635</p></blockquote>`,15)]))}const p=n(i,[["render",t]]),r=JSON.parse('{"path":"/guide/mysql/mysql%E5%9C%BA%E6%99%AF/mysql-%E5%88%A0%E9%99%A4%E5%A4%A7%E9%87%8F%E6%95%B0%E6%8D%AE.html","title":"mysql删除大量数据","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"背景","slug":"背景","link":"#背景","children":[]},{"level":2,"title":"解决方案","slug":"解决方案","link":"#解决方案","children":[{"level":3,"title":"1. delete limit","slug":"_1-delete-limit","link":"#_1-delete-limit","children":[]},{"level":3,"title":"2. rename table","slug":"_2-rename-table","link":"#_2-rename-table","children":[]},{"level":3,"title":"3. 删除不必要的索引后重建","slug":"_3-删除不必要的索引后重建","link":"#_3-删除不必要的索引后重建","children":[]}]}],"git":{"updatedTime":1746957383000,"contributors":[{"name":"alice","username":"alice","email":"921757697@qq.com","commits":2,"url":"https://github.com/alice"}],"changelog":[{"hash":"1aa8f9ae6eff191a92c0a6ec3f2bbc615028e97c","time":1746957383000,"email":"921757697@qq.com","author":"alice","message":"deploy mysql 手绘图"},{"hash":"9a9a724e2266d508b01cf98d17493fda41251e3d","time":1746778681000,"email":"921757697@qq.com","author":"alice","message":"deploy mysql 手绘图"}]},"filePathRelative":"guide/mysql/mysql场景/mysql-删除大量数据.md"}');export{p as comp,r as data};
