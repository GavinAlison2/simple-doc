import{_ as n,c as a,e,o as i}from"./app-DN6Q4pKI.js";const l="/simple-doc/assets/jvm-area-DPP8J_ew.png",p="/simple-doc/assets/jvm-count-iZhMjmmJ.png",c="/simple-doc/assets/stack-1-aXGe1ZSy.png",d="/simple-doc/assets/stack-code-ewg1qE71.png",t="/simple-doc/assets/stack-all-To-5dAUv.png",r="/simple-doc/assets/heap-CYlBDRm7.png",v="/simple-doc/assets/method-area-CDaSkPK1.png",m="/simple-doc/assets/indirect-memory-K1xDHH6W.png",o={};function u(b,s){return i(),a("div",null,s[0]||(s[0]=[e('<h1 id="jvm内存分布" tabindex="-1"><a class="header-anchor" href="#jvm内存分布"><span>JVM内存分布</span></a></h1><h2 id="jvm-内存分配" tabindex="-1"><a class="header-anchor" href="#jvm-内存分配"><span>JVM 内存分配</span></a></h2><p><img src="'+l+`" alt="area"></p><p>x86 平台上 JVM 内存分为五个区域：</p><ul><li>程序计数器：记录当前线程执行的字节码指令地址。</li><li>虚拟机栈：每个线程都有自己的虚拟机栈，用于存储方法调用、方法返回值、局部变量、操作数、临时变量等信息。</li><li>本地方法栈：与虚拟机栈类似，为 Native 方法服务。</li><li>堆：用于存放对象实例，是 JVM 所管理的内存中最大的一块。</li><li>方法区：用于存放已被虚拟机加载的类信息、常量、静态变量、即时编译器编译后的代码等数据。</li></ul><h3 id="程序计数器" tabindex="-1"><a class="header-anchor" href="#程序计数器"><span>程序计数器</span></a></h3><p>程序计数器是一块很小的内存空间，它是当前线程执行的字节码指令地址的指示器。</p><p>当线程启动时，这个计数器的值为 0，每执行一次字节码指令，计数器加 1。</p><p>如果线程正在执行的是 native 方法，这个计数器值保持不变。</p><div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md"><pre><code><span class="line">代表当前线程所执行的字节码所在的行号，配合字节码解释器获取下一条需要执行的字节码指令.</span>
<span class="line">代码中的分支、循环、跳转、异常处理、线程恢复等操作都需要依赖程序计数器来完成.</span>
<span class="line"></span>
<span class="line">程序计数器是线程私有的，线程消失它就消失，每个线程维护自己的程序计数器，互不影响.</span>
<span class="line"></span>
<span class="line">如果当前线程正在下执行本地方法，此时程序计数器为空值.</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+p+'" alt="program counter"></p><h3 id="虚拟机栈" tabindex="-1"><a class="header-anchor" href="#虚拟机栈"><span>虚拟机栈</span></a></h3><p>虚拟机栈也是线程私有的，生命周期与线程相同。</p><p>每个方法在执行的同时，都会创建一个栈帧用于存储局部变量表、操作数栈、动态链接、方法出口等信息。</p><p>每个方法从调用直至执行完成，就对应着一个栈帧在虚拟机栈中入栈和出栈的过程。</p><p>栈帧的大小在编译期确定，保存在方法表中。</p><p><img src="'+c+'" alt="stack"><img src="'+d+'" alt="stack-code"><img src="'+t+'" alt="stack-all"></p><h3 id="本地方法栈" tabindex="-1"><a class="header-anchor" href="#本地方法栈"><span>本地方法栈</span></a></h3><p>本地方法栈与虚拟机栈类似，为 Native 方法服务。</p><h3 id="堆" tabindex="-1"><a class="header-anchor" href="#堆"><span>堆</span></a></h3><p>堆是 JVM 所管理的内存中最大的一块。</p><p>堆是所有线程共享的一块内存区域，在虚拟机启动时创建。</p><p>堆的大小可以通过 -Xmx 和 -Xms 选项来设置。</p><p><img src="'+r+'" alt="heap"></p><p>大部分对象在堆上分配，少部分在栈上分配（通过逃逸分析）.</p><h3 id="方法区" tabindex="-1"><a class="header-anchor" href="#方法区"><span>方法区</span></a></h3><p>方法区也是 JVM 所管理的内存中一块很小的内存区域。</p><p>方法区用于存储已被虚拟机加载的类信息、常量、静态变量、即时编译器编译后的代码等数据。 也包括运行时常量池.</p><p>jdk8以前主要通过永久代实现方法区，jdk8以后，方法区被分成了堆和元空间。</p><p>为什么jdk8以后，方法区不存放在永久代而是分成堆和元空间？</p><p>因为永久代的大小受限于系统内存，而元空间的大小不受限，因此可以根据系统内存的大小，动态调整元空间的大小，使得永久代的内存可以动态分配。 因为这个是这些信息都是静态变量和字符串常量池，一般不会发生变化，因此可以放在元空间中，不会溢出，</p><p><img src="'+v+`" alt="method-area"></p><p>方法区的大小可以通过 -XX:MaxPermSize 和 -XX:InitialPermSize 选项来设置。</p><p>为什么jdk8之前存在永久代，而jdk8开始使用元空间代替，这个受jvm管理吗？需要进行垃圾回收吗？还有会存在溢出或者泄露吗？</p><div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md"><pre><code><span class="line">JDK 8 之前存在永久代的原因</span>
<span class="line"></span>
<span class="line">统一管理类元数据：永久代将类的元数据、静态变量、常量池等信息统一存放在一起，便于 JVM 对这些数据进行集中管理。这样一来，垃圾回收器可以针对不同区域（堆和永久代）采用不同的回收策略。</span>
<span class="line"></span>
<span class="line">JDK 8 开始使用元空间代替永久代的原因</span>
<span class="line"></span>
<span class="line"><span class="token list punctuation">-</span> 存溢出问题：</span>
<span class="line"></span>
<span class="line">永久代有固定的大小限制，由 -XX:MaxPermSize 参数指定。在动态生成大量类的场景下，如使用 CGLIB 代理、反射等，很容易导致永久代空间耗尽，出现 java.lang.OutOfMemoryError: PermGen space 错误。而元空间使用的是本地内存，默认情况下仅受系统可用内存的限制，能有效避免此类问题</span>
<span class="line"></span>
<span class="line"><span class="token list punctuation">-</span> 类加载和卸载问题：垃圾回收复杂性</span>
<span class="line"></span>
<span class="line">永久代的垃圾回收比较复杂，因为要考虑类的卸载和常量池的回收等情况。元空间的垃圾回收机制相对简单高效，当类加载器不再被使用时，其加载的类的元数据所占用的元空间可以及时被回收</span>
<span class="line"></span>
<span class="line"><span class="token list punctuation">-</span> 与其他 JVM 实现保持一致：</span>
<span class="line"></span>
<span class="line">其他一些 JVM 实现（如 JRockit）并没有永久代的概念，使用元空间可以让 HotSpot 与其他 JVM 实现更加一致。</span>
<span class="line"></span>
<span class="line">元空间是否受 JVM 管理以及是否需要垃圾回收</span>
<span class="line"></span>
<span class="line"><span class="token list punctuation">-</span> 受 JVM 管理：元空间是受 JVM 管理的。元空间使用本地内存（Native Memory），JVM 会根据需要动态分配和释放内存。JVM 会根据类的加载和卸载情况，动态地调整元空间的大小。</span>
<span class="line"></span>
<span class="line"><span class="token list punctuation">-</span> 需要垃圾回收：元空间也需要进行垃圾回收。当类的加载器不再被引用，并且其所加载的类也不再被使用时，JVM 会对这些类的元数据进行垃圾回收，以释放元空间的内存。</span>
<span class="line"></span>
<span class="line">元空间是否会存在溢出或者泄露</span>
<span class="line"></span>
<span class="line"><span class="token list punctuation">-</span> 溢出：尽管元空间默认使用系统的可用内存，但如果系统的物理内存不足，或者程序中动态生成了大量的类，导致元空间不断增长，最终会耗尽系统的可用内存，从而抛出 java.lang.OutOfMemoryError: Metaspace 错误。可以通过 -XX:MetaspaceSize 和 -XX:MaxMetaspaceSize 参数来限制元空间的大小。</span>
<span class="line"><span class="token list punctuation">-</span> 泄露：如果代码中存在类加载器泄漏的情况，例如类加载器被错误地持有引用，导致其所加载的类无法被卸载，那么元空间中的类元数据就会不断增加，最终导致内存泄漏。</span>
<span class="line"></span>
<span class="line">总结来说，JDK 8 使用元空间代替永久代，解决了永久代在内存管理方面的一些问题，但在使用过程中仍然需要注意元空间的内存使用情况，避免出现溢出或泄露问题。</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>字符串常量池和运行时常量池的区别</p><div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md"><pre><code><span class="line">定义和作用</span>
<span class="line"><span class="token list punctuation">-</span> 字符串常量池：这是一种特殊的缓存机制，专门用于存储字符串常量。其作用是避免重复创建相同内容的字符串对象，以此节省内存并提升性能。当程序中出现字符串字面量时，JVM 会先在字符串常量池中查找是否已有相同内容的字符串，如果有则直接返回该字符串的引用；若没有，就会在字符串常量池中创建一个新的字符串对象。</span>
<span class="line"><span class="token list punctuation">-</span> 运行时常量池：它是方法区的一部分，每个类或者接口在编译后生成的 Class 文件里都有一个常量池表，当类被加载到 JVM 后，这个常量池表会被加载到内存中，形成运行时常量池。运行时常量池用于存储各种常量，除了字符串常量，还包括类和接口的全限定名、字段和方法的名称与描述符、基本数据类型的常量值等。</span>
<span class="line"></span>
<span class="line">位置</span>
<span class="line"></span>
<span class="line"><span class="token list punctuation">-</span> 字符串常量池：在 JDK 7 之前，字符串常量池位于方法区；从 JDK 7 开始，字符串常量池被移到了堆中。这一改变是因为方法区的内存空间有限，将字符串常量池移到堆中可以更好地利用堆的内存管理机制，减少内存溢出的风险。</span>
<span class="line"><span class="token list punctuation">-</span> 运行时常量池：在 JDK 8 之前，运行时常量池存在于方法区（永久代）；JDK 8 及以后，方法区被元空间取代，运行时常量池依然是元空间的一部分。</span>
<span class="line"></span>
<span class="line">存储内容</span>
<span class="line"><span class="token list punctuation">-</span> 字符串常量池：仅存储字符串常量，包括字符串字面量（如 &quot;hello&quot;）和通过 String.intern() 方法手动添加到常量池的字符串对象。</span>
<span class="line"><span class="token list punctuation">-</span> 运行时常量池：存储的内容更为丰富，涵盖了类和接口的全限定名、字段和方法的名称与描述符、基本数据类型的常量值、符号引用等。例如，在一个类中定义了一个整型常量 public static final int NUM = 10，这个常量值 10 就会存储在运行时常量池中。</span>
<span class="line"></span>
<span class="line">创建时间</span>
<span class="line"><span class="token list punctuation">-</span> 字符串常量池：字符串常量池中的字符串对象在编译期和运行期都可能被创建。像字符串字面量在编译时就会被加入到字符串常量池中；而通过 String.intern() 方法在运行时也能将字符串对象添加到常量池中。</span>
<span class="line"><span class="token list punctuation">-</span> 运行时常量池：运行时常量池是在类加载的过程中创建的。当类被加载到 JVM 后，其对应的 Class 文件中的常量池表会被加载到内存中，形成运行时常量池。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="直接内存" tabindex="-1"><a class="header-anchor" href="#直接内存"><span>直接内存</span></a></h3><p>直接内存（Direct Memory）是指，在 Java 堆外的内存，通过 Unsafe 类的 allocateMemory() 和 freeMemory() 方法来分配和释放。</p><p>直接内存并不属于虚拟机管理的内存，因此不受 Java 虚拟机控制，也不受 GC 管理，因此也不会出现内存溢出、内存泄漏等问题。</p><p><img src="`+m+`" alt="direct-memory"></p><p>用户态，内核态 Java应用读数据，需要将磁盘read操作从内核态切换到用户态，然后将数据拷贝到JVM堆中，再从JVM堆中read数据，最后再从用户态切换到内核态。</p><p>直接内存，不需要从内核态切换到用户态，直接将数据从磁盘拷贝到JVM堆中，然后直接从JVM堆中read数据，不需要再从用户态切换到内核态。</p><div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md"><pre><code><span class="line">高效IO操作: 不需要进行用户态和内核态的切换，直接从磁盘拷贝到JVM堆中，可以提高IO操作的效率。</span>
<span class="line">不需要操作系统的内核态数据拷贝到jvm堆中。</span>
<span class="line"></span>
<span class="line">使用场景， 大数据处理，高性能的网络编程socket。</span>
<span class="line"></span>
<span class="line">虚拟地址映射： 虽然直接内存位于 JVM 堆外，但在 JVM 的地址空间中，会有一段虚拟地址范围被映射到直接内存区域。这样，Java 程序可以通过这个虚拟地址来访问直接内存中的数据。</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="面试题" tabindex="-1"><a class="header-anchor" href="#面试题"><span>面试题</span></a></h3><ol><li>直接内存会导致OOM吗？</li></ol><p>不会，直接内存分配的内存不会被 JVM 管理，因此不会导致 OOM。</p><ol start="2"><li>针对同一个类，使用不同类加载器，加载到jvm，是否是同一个对象</li></ol><p>针对同一个类（即类名相同、二进制字节码相同），使用不同的类加载器加载到 JVM 中时，生成的 Class 对象以及实例对象均不属于同一个类型</p><p>Class 对象的唯一性由 类加载器 + 类名 共同决定</p><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2><blockquote><p>https://www.bilibili.com/video/BV1rg411v7rw?spm_id_from=333.788.videopod.sections&amp;vd_source=5a41e8ae8c0a4c2c6809a5ccf977c1a9</p></blockquote>`,52)]))}const g=n(o,[["render",u]]),M=JSON.parse('{"path":"/guide/JVM/3-JVM%E5%86%85%E5%AD%98%E5%88%86%E5%B8%83.html","title":"JVM内存分布","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"JVM 内存分配","slug":"jvm-内存分配","link":"#jvm-内存分配","children":[{"level":3,"title":"程序计数器","slug":"程序计数器","link":"#程序计数器","children":[]},{"level":3,"title":"虚拟机栈","slug":"虚拟机栈","link":"#虚拟机栈","children":[]},{"level":3,"title":"本地方法栈","slug":"本地方法栈","link":"#本地方法栈","children":[]},{"level":3,"title":"堆","slug":"堆","link":"#堆","children":[]},{"level":3,"title":"方法区","slug":"方法区","link":"#方法区","children":[]},{"level":3,"title":"直接内存","slug":"直接内存","link":"#直接内存","children":[]},{"level":3,"title":"面试题","slug":"面试题","link":"#面试题","children":[]}]},{"level":2,"title":"参考","slug":"参考","link":"#参考","children":[]}],"git":{"updatedTime":1746194446000,"contributors":[{"name":"alice","username":"alice","email":"921757697@qq.com","commits":1,"url":"https://github.com/alice"}],"changelog":[{"hash":"4951c196adb449238836dbb0eba9d13fbc2594be","time":1746194446000,"email":"921757697@qq.com","author":"alice","message":"deploy jvm"}]},"filePathRelative":"guide/JVM/3-JVM内存分布.md"}');export{g as comp,M as data};
