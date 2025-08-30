# 闭包

## 什么是闭包？

闭包是指有权访问另一个函数作用域中的变量的函数。创建闭包的常见方式是：在一个函数内部创建另一个函数，并返回第二个函数。

## 闭包的作用

闭包的主要作用是保存状态，使得函数可以记住并访问函数外部的变量。

## 闭包的使用场景

闭包的使用场景主要有以下几种：

1. 延迟计算

闭包可以把函数的执行延迟到函数返回时。

2. 私有变量

闭包可以让函数访问私有变量，从而保护函数的封装性。

3. 封装回调函数

闭包可以把回调函数和函数执行环境捆绑在一起，从而实现代码的复用。

4. 实现模块化

闭包可以实现模块化，在一个模块中定义私有变量，并通过闭包来访问这些变量。

## 闭包的缺点

闭包也有一些缺点，主要有以下几点：

1. 内存占用

闭包会占用额外的内存，因为闭包会保存函数执行的环境，而环境中可能包含大量的变量。

2. 性能问题

闭包会降低函数的执行效率，因为每次函数调用都需要创建新的执行环境，这会影响函数的执行效率。

3. 调试困难

闭包的调试困难主要是因为闭包会捕获函数执行的环境，使得调试变得困难。

## 闭包的注意事项

- 闭包会携带函数的执行环境，因此会增大内存使用量。
- 闭包会降低函数的执行效率，因此应该尽量避免过度使用闭包。
- 闭包的使用不当会造成程序的运行时错误，因此应该小心使用。
- 闭包的调试困难主要是因为闭包会捕获函数执行的环境，使得调试变得困难。
- 闭包的实现方式有多种，因此要根据实际情况选择最适合的实现方式。

## 代码

```javascript
function createCounter() {
  let count = 0; // 这个变量一直存在,没有被清理
  //   注意内存泄漏
  //   闭包会保存函数执行的环境，因此会占用额外的内存,比如一个很大的数组
  //   解决方法: 手动清理闭包的变量
  function incr() {
    return count++;
  }
  return incr;
}

const counter = createCounter();
console.log(counter()); // 0
console.log(counter()); // 1
console.log(counter()); // 2
// 为什么出现内存泄漏
// 原因就在于 createCounter 是 incr 的父函数,而 incr被赋给了一个全局变量，这导致 incr 始终在内存中，
// 而incr的存在依赖于createCounter，因此createCounte也始终在内存中，不会在调用结束后，被垃圾回收机制（garbage collection）回收。
```

函数私有性

```javascript
function Counter() {
  let count = 0;
  return {
    inc() {
      return ++count;
    },
    increment: function () {
      return ++count;
    },
    decrement: function () {
      return --count;
    },
    getCount: function () {
      return count;
    },
  };
}

const counter = Counter();
console.log(counter.increment()); // 1
console.log(counter.decrement()); // 0
console.log(counter.getCount()); // 0
```

## 参考

- [闭包 - 维基百科](https://zh.wikipedia.org/wiki/%E9%97%AD%E5%8C%85)
- [闭包 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html)
- mdn: [闭包](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)
