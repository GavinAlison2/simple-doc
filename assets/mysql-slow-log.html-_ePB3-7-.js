import{_ as n,c as a,e,o as l}from"./app-DlGl6QFf.js";const i={};function p(t,s){return l(),a("div",null,s[0]||(s[0]=[e(`<h1 id="mysql慢日志" tabindex="-1"><a class="header-anchor" href="#mysql慢日志"><span>MySQL慢日志</span></a></h1><h2 id="pt-query-digest" tabindex="-1"><a class="header-anchor" href="#pt-query-digest"><span>pt-query-digest</span></a></h2><div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md"><pre><code><span class="line">pt-query-digest 属于 Percona Toolkit 的一个工具，也是使用较多的一个；</span>
<span class="line">用于分析slow log,也可以分析MySQL的 binary log 、 general log 日志。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>本文通过pt-query-digest实现慢sql的分析，优化sql</p><h2 id="一-安装percona-toolkit" tabindex="-1"><a class="header-anchor" href="#一-安装percona-toolkit"><span>一，安装percona-toolkit</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token builtin class-name">cd</span> /opt/</span>
<span class="line"><span class="token function">wget</span> percona.com/get/percona-toolkit.tar.gz</span>
<span class="line"><span class="token function">tar</span> zxf percona-toolkit.tar.gz</span>
<span class="line"><span class="token builtin class-name">cd</span> percona-toolkit-3.3.1/</span>
<span class="line">perl Makefile.PL <span class="token assign-left variable">PREFIX</span><span class="token operator">=</span>/usr/local/percona-toolkit</span>
<span class="line"><span class="token function">make</span> <span class="token operator">&amp;&amp;</span> <span class="token function">make</span> <span class="token function">install</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>MySQL开启慢查询日志并设置慢查询时间</p><div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre><code><span class="line">mysql<span class="token operator">&gt;</span> <span class="token keyword">show</span> variables <span class="token operator">like</span> <span class="token string">&#39;%slow_query_log%&#39;</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token operator">+</span><span class="token comment">---------------------------+-------------------------------+</span></span>
<span class="line"><span class="token operator">|</span> Variable_name             <span class="token operator">|</span> <span class="token keyword">Value</span>                         <span class="token operator">|</span></span>
<span class="line"><span class="token operator">+</span><span class="token comment">---------------------------+-------------------------------+</span></span>
<span class="line"><span class="token operator">|</span> slow_query_log            <span class="token operator">|</span> <span class="token keyword">ON</span>                            <span class="token operator">|</span></span>
<span class="line"><span class="token operator">|</span> slow_query_log_file       <span class="token operator">|</span> <span class="token operator">/</span>var<span class="token operator">/</span>lib<span class="token operator">/</span>mysql<span class="token operator">/</span>mysql<span class="token operator">-</span>slow<span class="token punctuation">.</span>log <span class="token operator">|</span></span>
<span class="line"><span class="token operator">+</span><span class="token comment">---------------------------+-------------------------------+</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 超过一秒的记录到日志中</span></span>
<span class="line">mysql<span class="token operator">&gt;</span> <span class="token keyword">set</span> <span class="token keyword">global</span> slow_query_log_time<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>开启慢查询之后，在程序运行一段时间之后，可以拿到记录的日志使用命令直接分析慢查询日志直接拿到的mysql-slow.log看着没有条理， 不容易分析使用命令分析并生成slow_report.log ： <code> pt-query-digest slow.log &gt; slow_report.log</code> 然后我们可以导出这个文件，查看其中内容</p><h2 id="二-分析慢查询日志" tabindex="-1"><a class="header-anchor" href="#二-分析慢查询日志"><span>二，分析慢查询日志</span></a></h2><p>文件中总共包含三部分：总体统计，sql统计，单个sql的统计</p><ol><li>总体统计</li></ol><div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md"><pre><code><span class="line">作者：ajisun</span>
<span class="line">链接：https://zhuanlan.zhihu.com/p/382967503</span>
<span class="line">来源：知乎</span>
<span class="line">著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。</span>
<span class="line"></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span> 85.8s user time, 990ms system time, 30.71M rss, 193.21M vsz</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span> Current date: Mon May 10 11:47:39 2021</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span> Hostname: xxxx.xxx-xxx.com</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span> Files: /var/lib/mysql/mysql-slow.log</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span> Overall: 87.23k total, 73 unique, 0.05 QPS, 0.37x concurrency __________</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span> Time range: 2021-04-16T03:15:31 to 2021-05-07T08:38:15</span></span>
<span class="line"></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span> 属性            总计       最小    最大    平均      95%  标准     中等</span></span>
<span class="line"></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span> Attribute       total     min     max     avg     95%  stddev  median</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span> ============    ======= ======= ======= ======= ======= ======= =======</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span> Exec time       676605s    2s    905s      8s     23s     12s      4s</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span> Lock time       242s       0      1s     3ms     4ms    17ms   839us</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span> Rows sent       8.90M       0  15.53k  107.02  400.73  616.06    8.91</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span> Rows examine    7.13G       0   8.94M  85.77k  46.68k 412.27k   2.38k</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span> Query size      161.99M     6  24.91k   1.90k   1.96k  682.67   1.96k</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>sql统计</li></ol><div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md"><pre><code><span class="line">作者：ajisun</span>
<span class="line">链接：https://zhuanlan.zhihu.com/p/382967503</span>
<span class="line">来源：知乎</span>
<span class="line">著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。</span>
<span class="line"></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span> Profile</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span> Rank Query ID                            Response time    Calls R/Call  </span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span> ==== =================================== ================ ===== ======= </span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span>    1 0x8EBD7078F62A82A7C578540C76F46BC4  602766.9262 8... 75091  8.0272 13.94 SELECT xxxx</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span>    2 0x40A63F5C50A2324033DB9FCAA2719C4E  18044.3571  2.7%  4131  4.3680  3.07 SELECT xxxx</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span>    3 0xFB8F32AE0EFAA83C665B91B6E5862D2F  16215.4058  2.4%  2335  6.9445  6.22 SELECT xxxx </span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span>    4 0x2CF3802FA98AFCE8DA5C85F6E8424DCE  12951.3375  1.9%  2390  5.4190  6.56 SELECT xxxx</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span>    5 0x56A24EC2EC1FFDB2F49A123C34D5E0BD   8612.3662  1.3%   479 17.9799 31... SELECT xxxx</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span>    6 0x6D73ABA4D5097101273AA5ADB2259759   8328.1423  1.2%   858  9.7065 12.72 SELECT xxxx</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span>    7 0x75A04B6CA2CBDE5EB7A27A7FC15FFCC1   3864.3549  0.6%   615  6.2835  5.72 SELECT xxxx</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span>    8 0x886F3B1A59BD9900A6688314B0A3E4E0   3050.7563  0.5%   614  4.9687  2.93 SELECT xxxx</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span>    9 0xE6AA1C4FE828263924B7C26F5160BD60    680.7256  0.1%   171  3.9809  1.06 SELECT xxxx</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span>    10 .............</span></span>
<span class="line">Rank: 排名</span>
<span class="line">Query ID: 语句ID（去掉多余空格和文本字符，计算hash值）</span>
<span class="line">Response time: 总的响应时间和 该查询在本次分析中总的时间占比</span>
<span class="line">Calls: 执行次数</span>
<span class="line">R/Call: 平均每次执行的响应时间</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>单个sql的统计</li></ol><div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md"><pre><code><span class="line"><span class="token title important"><span class="token punctuation">#</span> Query 1: 0.04 QPS, 0.33x concurrency, ID 0x8EBD7078F62A82A7C578540C76F46BC4 at byte 66396962</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span> This item is included in the report because it matches --limit.</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span> Scores: V/M = 13.94</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span> Time range: 2021-04-16T03:15:31 to 2021-05-07T08:38:15</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span> Attribute    pct   total     min     max     avg     95%  stddev  median</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span> ============ === ======= ======= ======= ======= ======= ======= =======</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span> Count         86   75091</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span> Exec time     89 602767s      2s    281s      8s     23s     11s      4s</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span> Lock time     64    156s   352us   730ms     2ms     4ms    10ms   839us</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span> Rows sent      6 554.55k       0      31    7.56   16.81    5.75    5.75</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span> Rows examine   4 294.12M     110  77.33k   4.01k  10.29k   5.80k   2.38k</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span> Query size    89 145.64M   1.98k   1.99k   1.99k   1.96k    0.00   1.96k</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span> Tables</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span>   设计到的表</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span> EXPLAIN /*!50100 PARTITIONS*/</span></span>
<span class="line"><span class="token title important"><span class="token punctuation">#</span>       具体执行的sql语句</span></span>
<span class="line">SELECT</span>
<span class="line">    hg.group_id,</span>
<span class="line">    MAX( ham.app_message_id ) latest_message,</span>
<span class="line">    COALESCE ( hgrf.last_read_message_id, 0 ) last_read_message_id,</span>
<span class="line">    SUM(</span>
<span class="line">    CASE</span>
<span class="line">            WHEN app_message_id &gt; COALESCE ( last_read_message_id, 0 ) </span>
<span class="line">            AND ham.receiver_type = &#39;USER&#39; THEN</span>
<span class="line">                1 ELSE 0 </span>
<span class="line">            END </span>
<span class="line">            ) unread_message_count </span>
<span class="line">        FROM</span>
<span class="line">            h_group hg</span>
<span class="line">            INNER JOIN h_message hm ON hm.group_id = hg.group_id</span>
<span class="line">            INNER JOIN h_app_message ham ON ham.message_id = hm.message_id </span>
<span class="line">            AND ham.user_id = 2084</span>
<span class="line">            LEFT JOIN h_group_read_flag hgrf ON hg.group_id = hgrf.group_id </span>
<span class="line">            AND hgrf.user_id = ham.user_id </span>
<span class="line">            AND hgrf.user_type = 0 </span>
<span class="line">        WHERE</span>
<span class="line">            ham.deleted = 0 </span>
<span class="line">            AND hm.send_flag = 1 </span>
<span class="line">        GROUP BY</span>
<span class="line">        hg.group_id,</span>
<span class="line">    hgrf.last_read_message_id</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过以上日志我们可以看出哪些sql执行较慢，哪些sql执行次数较多，然后根据不同的业务需求去分析有问题的sql进行优化，例如：</p><p>对于执行慢的sql:</p><ul><li>使用explain查询执行计划，确认索引是否正常使用</li><li>关联表太多，是否使用冗余字段减少没必要的表关联</li><li>查询条件复杂，查询数据量较多，是否可以在业务层分多次查询(有时候多次并不比一次慢)</li></ul><p>对于执行频率高的sql:</p><ul><li>数据尝试使用缓存，较少数据库的查询</li></ul><p>三，实际案例分析</p><blockquote><p>SQL分析：执行次数75091，总时间耗费602767s,平均单次8s，最大一次281s，最少也是2s</p></blockquote><p>a. 首先根据SQL 去优化，研究很久SQL没有优化空间</p><p>​ 调试很久，索引都是正常使用，时间始终在2s左右，如果某个用户未读数量大，那花费时间更长</p><p>b. 根据业务逻辑拆解SQL, 减少数据量，减少表关联</p><p>场景描述和分析：</p><div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md"><pre><code><span class="line">公司每天会有不定量的推文推送到每个用户,app_message 会存储用户和消息的关联( count=消息数x用户数) </span>
<span class="line">总共4张表： </span>
<span class="line">app_message(用户消息关联表， 主要字段：app_message_id,message_id,user_id),数据量1千万 </span>
<span class="line">message(消息表，主要字段：message_id，group_id) 数据量近2百万 </span>
<span class="line">h_group(频道表，主要字段：group_id) 每条推文都有所属的频道，数据量较少 </span>
<span class="line">h_group_read_flag(用户频道最新已读表，主要字段：last_read_message_id，group_id,user_id) </span>
<span class="line">存储用户每个频道最新已读消息记录 (last_read_message_id=app_message_id)，数据量较少 </span>
<span class="line"></span>
<span class="line">每次用户打开APP都会通过这4个表关联查询用户的未读数量以及最新的消息</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解决分析：</p><p>b. 1: 首先h_group 只是用来关联group_id ,可以在h_app_message 中冗余group_id字段，去掉h_group表的关联； b. 2: h_message的send_flag是撤回推文是0，否则是1（没有这个关联即可去除h_message表）在撤回推文之后就把h_app_message中相关数据删除，这样h_message也可以不用使用 b. 3: 最后主要是h_app_message表，数量级较大，然后减少数量（将跨度较远的数据按年归档处理）</p>`,31)]))}const o=n(i,[["render",p]]),r=JSON.parse('{"path":"/guide/mysql/mysql%E5%9C%BA%E6%99%AF/mysql-slow-log.html","title":"MySQL慢日志","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"pt-query-digest","slug":"pt-query-digest","link":"#pt-query-digest","children":[]},{"level":2,"title":"一，安装percona-toolkit","slug":"一-安装percona-toolkit","link":"#一-安装percona-toolkit","children":[]},{"level":2,"title":"二，分析慢查询日志","slug":"二-分析慢查询日志","link":"#二-分析慢查询日志","children":[]}],"git":{"updatedTime":1746957383000,"contributors":[{"name":"alice","username":"alice","email":"921757697@qq.com","commits":1,"url":"https://github.com/alice"}],"changelog":[{"hash":"1aa8f9ae6eff191a92c0a6ec3f2bbc615028e97c","time":1746957383000,"email":"921757697@qq.com","author":"alice","message":"deploy mysql 手绘图"}]},"filePathRelative":"guide/mysql/mysql场景/mysql-slow-log.md"}');export{o as comp,r as data};
