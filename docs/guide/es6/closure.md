# Closure in ES6

- [Closure in ES6](#closure-in-es6)
  - [定义](#定义)

## 定义

```javascript
function a() {
  let msg = "hi";
  function b() {
    console.log(msg);
  }
  return b;
}

// a()();

function greeting(arg1) {
  function sayHi(arg2) {
    console.log(arg1 + " " + arg2);
  }
  return sayHi;
}
// greeting("h1")("world");
// greeting("h2")("world");

// for (let index = 1; index <= 3; index++) {
//     setTimeout(function () {
//         console.log('after ' + index + ' second(s):' + index);
//     }, index * 1000);
// }

for (var index = 1; index <= 3; index++) {
  (function (index) {
    setTimeout(function () {
      console.log("after " + index + " second(s):" + index);
    }, index * 1000);
  })(index);
}

/*
# 假设我们想要创建一个计数器函数，每次调用它时，它都会返回一个比上一次调用时更大的数字。 

## 全局变量方式

let globalCount = 0;

function incrementGlobalCount() {
    globalCount++;
    return globalCount;
}

console.log(incrementGlobalCount()); // 输出 1
console.log(incrementGlobalCount()); // 输出 2
console.log(incrementGlobalCount()); // 输出 3

这种方式的问题是，globalCount 可以在任何地方被修改，这可能会导致不可预测的行为和潜在的错误。

## 类方式 推荐使用

class Counter {
    constructor() {
        this.count = 0;
    }

    increment() {
        this.count++;
        return this.count;
    }
}

const counterInstance = new Counter();
console.log(counterInstance.increment()); // 输出 1
console.log(counterInstance.increment()); // 输出 2
console.log(counterInstance.increment()); // 输出 3

这种方式比全局变量方式更安全，因为它通过类的封装保护了计数器的状态。

## 闭包方式 推荐使用

function createCounter() {
    let count = 0; // 这是一个局部变量
    return function() {
        count++;
        return count;
    };
}

const counter = createCounter();
console.log(counter()); // 输出 1
console.log(counter()); // 输出 2
console.log(counter()); // 输出 3

createCounter 函数内部定义了一个局部变量 count 和一个返回的函数。当 createCounter 被调用时，它返回了一个闭包，
这个闭包“记住”了 count 变量的值，并且每次调用这个闭包时，都会访问并更新这个值。


*/
```
