var a = 1;
// 如果在 Node 的 REPL 环境，可以写成 global.a
// 或者采用通用方法，写成 this.a
// window.a // 1
let b = 1;
// window.b // undefined
console.log(global.b) // undefined

// 方法一
// (typeof window !== 'undefined'
//     ? window
//     : (typeof process === 'object' &&
//        typeof require === 'function' &&
//        typeof global === 'object')
//       ? global
//       : this);
 // 方法二
 var getGlobal = function () {
   if (typeof self !== 'undefined') { return self; }
   if (typeof window !== 'undefined') { return window; }
   if (typeof global !== 'undefined') { return global; }
   throw new Error('unable to locate global object');
 };
 console.log(getGlobal());

 