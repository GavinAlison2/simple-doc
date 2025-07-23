import{_ as n,c as a,e,o as l}from"./app-DlGl6QFf.js";const i="/simple-doc/assets/mysql-arch-001-B8M2xg0Z.png",p={};function c(d,s){return l(),a("div",null,s[0]||(s[0]=[e(`<h1 id="mysql-内存自适应哈希索引" tabindex="-1"><a class="header-anchor" href="#mysql-内存自适应哈希索引"><span>MySQL 内存自适应哈希索引</span></a></h1><h2 id="index" tabindex="-1"><a class="header-anchor" href="#index"><span>index</span></a></h2><ul><li>clustered index (primary key)</li><li>non-clustered index(secondary key)</li></ul><div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre><code><span class="line"><span class="token keyword">create</span> <span class="token keyword">table</span> t1 <span class="token punctuation">(</span></span>
<span class="line">    id <span class="token keyword">int</span> <span class="token keyword">primary</span> <span class="token keyword">key</span><span class="token punctuation">,</span></span>
<span class="line">    name <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">    age <span class="token keyword">int</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token keyword">index</span> idx_name <span class="token punctuation">(</span>name<span class="token punctuation">)</span> </span>
<span class="line"><span class="token punctuation">)</span><span class="token keyword">engine</span><span class="token operator">=</span><span class="token keyword">innodb</span> <span class="token keyword">default</span> <span class="token keyword">charset</span><span class="token operator">=</span>utf8mb4<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> t1 <span class="token keyword">where</span> name<span class="token operator">=</span><span class="token string">&#39;abc&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token operator">-</span> 先普通索引查找id<span class="token punctuation">,</span> 再根据id到主键索引查找行数据</span>
<span class="line"><span class="token operator">-</span> 会锁主普通索引对应的行，再锁住主键索引对应的行，加入的是X锁</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>clustered index:</p><ul><li>主键索引</li><li>聚集索引</li><li>索引的顺序决定了数据在磁盘上的物理存储顺序</li><li>主键索引的选择非常重要，主键索引的选择会影响到数据的存储和查询效率</li><li>主键非叶子节点存主键，叶子节点存数据</li><li>叶子节点是双向循环的链表，便于范围查询</li></ul><p>secondary index:</p><ul><li>非主键索引</li><li>非聚集索引</li><li>普通索引，非叶子节点存储索引对应的列字段值，叶子节点存主键值和列字段值</li><li>叶子节点是双向链表，支持范围查询</li></ul><p>adaptive hash index:</p><ul><li><p>MySQL 5.7 引入的一种新索引类型</p></li><li><p>基于内存的索引，适用于内存不足的情况</p></li><li><p>索引的构建过程在内存中进行，不需要将数据全部加载到内存中</p></li><li><p>索引的维护和维护过程也在内存中进行，不需要将数据全部加载到内存中</p></li><li><p>适用于大数据量的表，可以有效地减少内存的使用</p></li><li><p>适用于对查询性能要求不高的场景，减少对磁盘的读写</p></li><li><p>适用于对索引的维护频繁的场景，减少对磁盘的读写</p></li><li><p>适用于对索引的维护要求不高的场景，减少对磁盘的读写</p></li><li><p>适用场景：</p></li><li><p>内存不足，需要使用内存自适应哈希索引</p></li><li><p>索引维护频繁，需要使用内存自适应哈希索引</p></li><li><p>adaptive hash index, 适用于大数据量的表，可以有效地减少内存的使用</p></li><li><p>一些热点数据，频繁访问，超过3次，会将数据转换成 adaptive hash index， key-是热点key, value-key对应的页数</p></li><li><p>针对innodb 表，可以将热点数据转换成 adaptive hash index，减少内存的使用</p></li><li><p>索引的索引，可以减少查询的路径.</p></li><li><p>注意事项:</p></li><li><p>只支持等值查询(基于主键的等值查询AHI效果更好),例如用户登录</p></li><li><p>基于主键的搜索，几乎都是hash searches;</p></li><li><p>基于普通索引的搜索，大部分是 non-hash searches;</p></li><li><p>无序，没有树高，对热点buffer pool 建立 AHI，非持久化</p></li><li><p>自适应哈希索引，</p></li><li><p>只能用于等值比较 (=,in), 无法用于排序，存在hash 冲突</p></li><li><p>set global innodb_adaptive_hash_index=on/off;</p></li></ul><p>innodb Buffer Pool</p><ul><li>adaptive hash index</li></ul><h2 id="mysql-architecture-图" tabindex="-1"><a class="header-anchor" href="#mysql-architecture-图"><span>MySQL architecture 图</span></a></h2><p><img src="`+i+`" alt="architecture"></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">in-memory structure</span>
<span class="line">- buffer pool: 内存中缓存数据页的区域，大小由参数innodb_buffer_pool_size控制，默认大小为128M。</span>
<span class="line">    - adaptive hash index: 缓存索引页的区域，大小由参数innodb_adaptive_hash_index_size控制，默认大小为16M。</span>
<span class="line">    - change buffer: 缓存对数据页的修改，大小由参数innodb_change_buffer_size控制，默认大小为256K。</span>
<span class="line">- log buffer: 缓存日志的区域，大小由参数innodb_log_buffer_size控制，默认大小为8M。</span>
<span class="line"></span>
<span class="line">operating system cache: 缓存磁盘块的区域，大小由操作系统决定。</span>
<span class="line"></span>
<span class="line">disk structure</span>
<span class="line">- data files: 数据文件，存储表数据。</span>
<span class="line">- index files: 索引文件，存储索引数据。</span>
<span class="line"></span>
<span class="line">- System tablespace: 系统表空间，存储系统表数据。</span>
<span class="line">    - Change buffer: 缓存对系统表的修改，大小由参数innodb_change_buffer_size控制，默认大小为256K。</span>
<span class="line"></span>
<span class="line">- Transactional tablespace: 事务表空间，存储事务数据。</span>
<span class="line">- Undo tablespace: 回滚段文件，存储事务回滚信息。</span>
<span class="line">- File-Per-Table Tablespace: 文件-表空间，存储数据文件和索引文件。</span>
<span class="line">- General Tablespace: 通用表空间，存储普通表数据。</span>
<span class="line">    - ts1.ibd</span>
<span class="line">        - t1.ibd</span>
<span class="line">        - t2.ibd</span>
<span class="line">    - ts2.ibd</span>
<span class="line">- Temporary Tablespace: 临时表空间，存储临时表数据。</span>
<span class="line"></span>
<span class="line">- Redo log files: 重做日志文件，存储事务日志。</span>
<span class="line">- DoubleWrite buffer file: 双写缓冲区文件，存储数据页的副本，用于数据页的刷新。</span>
<span class="line">- redo log files: 重做日志文件，存储事务日志。</span>
<span class="line">    - ib_logfile0: 第一个日志文件，大小由参数innodb_log_file_size控制，默认大小为5M。</span>
<span class="line">    - ib_logfile1: 第二个日志文件，大小由参数innodb_log_file_size控制，默认大小为5M。</span>
<span class="line">- undo files: 回滚段文件，存储事务回滚信息。</span>
<span class="line">    - undo tablespaces: 回滚段文件，存储事务回滚信息。</span>
<span class="line">    - undo logs: 回滚日志文件，存储事务回滚信息。</span>
<span class="line">    - undo log 版本链: 回滚日志版本链，存储事务回滚信息。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,15)]))}const t=n(p,[["render",c]]),o=JSON.parse('{"path":"/guide/mysql/mysql-%E5%86%85%E5%AD%98%E8%87%AA%E9%80%82%E5%BA%94%E5%93%88%E5%B8%8C%E7%B4%A2%E5%BC%95.html","title":"MySQL 内存自适应哈希索引","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"index","slug":"index","link":"#index","children":[]},{"level":2,"title":"MySQL architecture 图","slug":"mysql-architecture-图","link":"#mysql-architecture-图","children":[]}],"git":{"updatedTime":1746034246000,"contributors":[{"name":"alice","username":"alice","email":"921757697@qq.com","commits":1,"url":"https://github.com/alice"}],"changelog":[{"hash":"daf3790ef1795d02fbff734cf83b3c856cbb378c","time":1746034246000,"email":"921757697@qq.com","author":"alice","message":"deploy mysql"}]},"filePathRelative":"guide/mysql/mysql-内存自适应哈希索引.md"}');export{t as comp,o as data};
