console.log(this);
// console.log(this.a);
var a = "Local";
// let b = "Local";
// console.log(this.a); // "Local" // nodejs 报错 Uncaught ReferenceError: a is not defined
// console.log(this.b); // "Local" // nodejs 报错 Uncaught ReferenceError: b is not defined
console.log(globalThis);
console.log(global);
console.log(global === globalThis);
