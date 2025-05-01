# JVM双亲委派机制

## 1. 双亲委派模型

ClassLoader

```md

Bootstrap ClassLoader：
引导类加载器，它用来加载Java的核心类库，如java.lang.String。

- 加载$JAVA_HOME/jre/lib/rt.jar和$JAVA_HOME/jre/lib/ext目录下的类库
- 无法被用户自定义，是JVM自身的一部分

Extension ClassLoader：
扩展类加载器，它用来加载Java的扩展类库，如javax.swing.JButton。

- 加载$JAVA_HOME/jre/lib/ext目录下的类库
- 父类加载器为Bootstrap ClassLoader


Application ClassLoader：
应用程序类加载器，它用来加载用户类路径（classpath）指定的类库。

- 加载用户类路径（classpath）指定的类库
- 父类加载器为Extension ClassLoader

自定义类加载器:

- 继承ClassLoader类
- 重写loadClass()方法，以自定义类的加载方式 
- ServiceLoader.load()方法使用了双亲委派机制，可以方便地加载SPI（Service Provider Interface）文件。




```

## 2. 双亲委派机制

当一个类需要被加载时，Java虚拟机会按照以下的委派模型进行搜索：

1. 首先，虚拟机会尝试自己去加载这个类，如果加载成功，则返回这个类。
2. 如果虚拟机自己无法加载，就会委托父类加载器去加载。
3. 如果父类加载器也无法加载，就会委托更上层的父类加载器去加载。
4. 如果父类加载器的父类加载器为空，则使用Bootstrap ClassLoader作为父类加载器。
5. 如果所有的父类加载器都无法加载，则抛出ClassNotFoundException异常。

## 3. 自定义类加载器

自定义类加载器可以继承ClassLoader类，并重写loadClass()方法，以自定义类的加载方式。

```java
public class MyClassLoader extends ClassLoader {
    @Override
    protected Class<?> loadClass(String name, boolean resolve) throws ClassNotFoundException {
        // 自定义类加载逻辑
        //...
        // 调用父类加载器去加载类
        return super.loadClass(name, resolve);
    }
}
```

## 4. 双亲委派机制的优点

- 避免类的重复加载，保证Java类在JVM中只被加载一次，有效避免内存浪费。
- 保障Java类安全，避免恶意代码对系统的攻击。
- 实现了Java类随着程序的运行环境变化而动态更新，保证程序的稳定性。

## 5. 使用ServiceLoader

ServiceLoader.load()方法使用了双亲委派机制，可以方便地加载SPI（Service Provider Interface）文件。

