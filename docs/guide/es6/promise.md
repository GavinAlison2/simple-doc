# Promise

Promise 是异步编程的一种解决方案，它代表了一个异步操作的最终结果。Promise 提供统一的 API，使得异步操作可以像同步操作一样使用，避免了回调地狱。

Promise 是一个构造函数，用来生成 Promise 实例。Promise 实例有三种状态：

- Pending（等待）：初始状态，既没有被执行也没有被拒绝。
- Fulfilled（已完成）：操作成功完成。
- Rejected（已拒绝）：操作失败。

Promise 实例具有以下方法：

- `Promise.prototype.then()`：注册成功和失败的回调函数。
- `Promise.prototype.catch()`：注册失败的回调函数。
- `Promise.prototype.finally()`：注册最终的回调函数，无论 Promise 实例是fulfilled还是rejected。

## 练习

- [promise-all.js](./0001/js/promise-demo.js)