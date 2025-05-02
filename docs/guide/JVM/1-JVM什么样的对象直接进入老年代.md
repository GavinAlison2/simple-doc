# JVM什么样的对象直接进入老年代？

## 面试题

为什么设置这些机制，让对象直接进入老年代？

## 进入老年代的方法

- 大对象直接进入老年代，
  什么是大对象呢？由JVM定义的参数值决定的，但是这个参数只在`Serial`和`ParNew`中生效, 
  `-XX:PretenureSizeThreshold=10MB`以上对象直接进入老年代,

- 长期存活的对象将进入老年代
  长期存活的对象是指经过一定次数GC后仍然存活的对象，比如经过10次GC后仍然存活的对象，
  这个次数可以通过`-XX:MaxTenuringThreshold`参数设置，默认是15次。

- 动态年龄判定后决定是否进入老年代
  当 Survivor 空间不足时，JVM会将部分对象直接进入老年代，这个过程叫做动态年龄判定，
  这个过程是JVM根据对象的年龄来判断的，如果对象的年龄超过了`-XX:MaxTenuringThreshold`设定的阈值，
  则会直接进入老年代。
  当survior区域存活对象的总大小占用了survior区域的50%,那么此时将按照对象的存活年龄从小到大进行排序，然后依次累加，当累加到对象大小超过50%，则将大于等于当前对象年龄的存活对象全部挪到老年代.


> https://www.bilibili.com/video/BV1AT42197jB?spm_id_from=333.788.videopod.episodes&vd_source=5a41e8ae8c0a4c2c6809a5ccf977c1a9

