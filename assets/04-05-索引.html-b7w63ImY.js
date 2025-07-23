import{_ as s,c as i,e as n,o as a}from"./app-DzmgiGLk.js";const e={};function c(d,l){return a(),i("div",null,l[0]||(l[0]=[n(`<h1 id="_04-05-索引" tabindex="-1"><a class="header-anchor" href="#_04-05-索引"><span>04-05 索引</span></a></h1><h2 id="_04-深入浅出索引-上" tabindex="-1"><a class="header-anchor" href="#_04-深入浅出索引-上"><span>04 | 深入浅出索引（上）</span></a></h2><p>索引的常见模型</p><ul><li>哈希表，不适合做区间搜索。</li><li>有序数组，只适合静态数据，插入麻烦。</li><li>B树，支持区间搜索，查询效率稳定。</li><li>Memory，支持快速查询，但数据量大时，内存占用大。</li></ul><p>InnoDB 的索引模型</p><ul><li>在 MySQL 中，索引是在存储引擎层实现的。</li><li>以主键顺序存在B+树中。</li><li>主键索引（聚簇索引） 的叶子节点存的是整行数据。主键查询主需要扫描主键索引。</li><li>非主键索引（二级索引）<em>的叶子节点内容是主键的值。通过二级索引需要扫描二级索引树，找到主键后再扫描主键索引。该过程称为</em>回表。</li></ul><p>索引维护</p><ul><li>索引的维护是指对索引树进行维护，包括创建索引、删除索引、更新索引、维护索引。</li><li>当插入到索引树最后，只需直接插入。</li><li>但当插入到索引树中间，需要逻辑上挪动后面的数据，空出位置，并且当数据页满时，需要申请一个新的数据页，然后挪动部分数据过去（页分裂）。</li><li>当相邻两个页由于删除了数据，利用率很低之后，会将数据页做合并。</li><li>自增索引（追加操作，都不涉及到挪动其他记录，也不会触发叶子节点的分裂）</li><li>业务逻辑的字段做主键，则往往不容易保证有序插入，这样写数据成本相对较高。</li><li>二级索引的叶子节点为主键，业务字段做主键时会占大量存储空间。</li><li>什么时候可以使用业务字段做主键？ 只有一个索引；该索引必须是唯一索引。</li></ul><h2 id="_05-深入浅出索引-下" tabindex="-1"><a class="header-anchor" href="#_05-深入浅出索引-下"><span>05 | 深入浅出索引（下）</span></a></h2><ul><li>覆盖索引</li><li>最左前缀原则</li><li>索引下推</li><li>前缀匹配</li><li>联合索引</li></ul><div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md"><pre><code><span class="line">覆盖索引</span>
<span class="line">当查询值已经在二级索引上时，不需要回表。</span>
<span class="line"></span>
<span class="line">最左前缀原则</span>
<span class="line">联合索引合理安排顺序，可以少维护索引，或者减少存储空间。</span>
<span class="line">idx(a,b,c)</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">索引下推</span>
<span class="line"></span>
<span class="line">MySQL 5.6 引入的索引下推优化，可以在索引遍历过程中，对索引中包含的字段先做判断，直接过滤掉不满足条件的记录，减少回表次数。</span>
<span class="line"></span>
<span class="line">在扫描索引的过程中，将查询条件尽可能多地推送到索引级别进行过滤，而不是在回表之后再进行过滤。这样可以减少不必要的回表操作，提高查询性能。</span>
<span class="line"></span>
<span class="line">前缀匹配</span>
<span class="line"></span>
<span class="line">索引字段的前缀相同，可以用范围查询来优化查询效率。</span>
<span class="line"></span>
<span class="line">联合索引</span>
<span class="line"></span>
<span class="line">联合索引是指两个或两个以上的列组合建立的索引。联合索引的查询效率要优于单列索引。</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11)]))}const r=s(e,[["render",c]]),m=JSON.parse('{"path":"/guide/mysql/mysql45%E8%AE%B2/04-05-%E7%B4%A2%E5%BC%95.html","title":"04-05 索引","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"04 | 深入浅出索引（上）","slug":"_04-深入浅出索引-上","link":"#_04-深入浅出索引-上","children":[]},{"level":2,"title":"05 | 深入浅出索引（下）","slug":"_05-深入浅出索引-下","link":"#_05-深入浅出索引-下","children":[]}],"git":{"updatedTime":1746448991000,"contributors":[{"name":"alice","username":"alice","email":"921757697@qq.com","commits":2,"url":"https://github.com/alice"}],"changelog":[{"hash":"08a00ac7220dc776bf84c5c8840641d4795d542e","time":1746448991000,"email":"921757697@qq.com","author":"alice","message":"deploy mysql 45讲"},{"hash":"a8d5abca5e84b9407cf50b57467ae6a55092ef14","time":1746351827000,"email":"921757697@qq.com","author":"alice","message":"deploy mysql 45讲"}]},"filePathRelative":"guide/mysql/mysql45讲/04-05-索引.md"}');export{r as comp,m as data};
