console.log("-----this in function----");
const test = {
  prop: 42,
  func: function () {
    return this.prop;
  },
};

console.log(test.func()); // Output: 42

console.log("-----this context----");
function getThis() {
  return this;
}

const obj1 = { name: "obj1" };
const obj2 = { name: "obj2" };

obj1.getThis = getThis;
obj2.getThis = getThis;

console.log(obj1.getThis()); // { name: 'obj1', getThis: [Function: getThis] }
console.log(obj2.getThis()); // { name: 'obj2', getThis: [Function: getThis] }

console.log("-----this __proto__----");
const obj3 = {
  __proto__: obj1,
  name: "obj3",
};

console.log(obj3.getThis()); // { name: 'obj3' }

console.log("-----this new----");
const obj4 = {
  name: "obj4",
  getThis() {
    return this;
  },
};

const obj5 = { name: "obj5" };

obj5.getThis = obj4.getThis;
console.log(obj5.getThis()); // { name: 'obj5', getThis: [Function: getThis] }
console.log("-----this strict mode----");
function getThisStrict() {
  "use strict"; // 进入严格模式
  return this;
}

// 仅用于演示——你不应该改变内置的原型对象
Number.prototype.getThisStrict = getThisStrict;
console.log(typeof (1).getThisStrict()); // "number"
console.log(typeof getThisStrict()); // "undefined"

console.log("-----this globalThis----");
function getThis2() {
  return this;
}

// 仅用于演示——你不应该修改内置的原型对象
Number.prototype.getThis2 = getThis2;
console.log(typeof (1).getThis2()); // "object"

function logThis() {
  "use strict";
  console.log(this);
}
console.log(globalThis);

[1, 2, 3].forEach(logThis); // undefined、undefined、undefined

[1, 2, 3].forEach(logThis, { name: "obj" });
// { name: 'obj' }、{ name: 'obj' }、{ name: 'obj' }

console.log("-----this arrow function----");
const globalObject = this;
const foo = () => this;
console.log(foo() === globalObject); // true

console.log("-----this call and bind----");
const obj = { name: "obj" };

// 尝试使用 call 设置 this
console.log(foo.call(obj) === globalObject); // true

// 尝试使用 bind 设置 this
const boundFoo = foo.bind(obj);
console.log(boundFoo() === globalObject); // true

console.log(globalObject);

console.log("-----this in class----");

function C() {
  this.a = 37;
}

let o = new C();
console.log(o.a); // 37

function C2() {
  this.a = 37;
  return { a: 38 };
}

o = new C2();
console.log(o.a); // 38

console.log("-----this in class field----");

class C3 {
  instanceField = this;
  static staticField = this;
}

const c3 = new C3();
console.log(c3.instanceField === c3); // true
console.log(C3.staticField === C3); // true

// this = new Base(); // 错误的使用方式，this 不能指向一个类实例

console.log("-----this in class constructor----");
class Base {}
class Good extends Base {}
class AlsoGood extends Base {
  constructor() {
    return { a: 5 };
  }
}
class Bad extends Base {
  constructor() {
    // super();
  }
}

new Good();
new AlsoGood();
// new Bad(); // ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
// 错误的使用方式，构造函数必须调用 super 构造函数，才能正确使用 this

// 在网页浏览器中，window 对象也是全局对象：

console.log("-------this in web browser----"); // true

// console.log(this === window); // true
// this.b = "MDN";
// console.log(window.b); // "MDN"
// console.log(b); // "MDN"

console.log("-------this in eval mode----");

function test2() {
  // 直接调用 eval
  console.log(eval("this") === this);
  // 间接调用 eval，非严格模式
  console.log(eval?.("this") === globalThis);
  // 间接调用 eval，严格模式
  console.log(eval?.("'use strict'; this") === globalThis);
}

test2.call({ name: "obj" }); // 输出 3 个 "true"

console.log("-------this in  this mode----");

// 对象可以作为第一个参数传递给 'call' 或 'apply'，
// 并且 'this' 将被绑定到它。
// const obj6 = { a: "Custom" };

// 使用 var 声明的变量成为 'globalThis' 的属性。
// var a = "Global";

// function whatsThis() {
//   return this.a; // 'this' 取决于函数如何被调用
// }

// whatsThis(); // 'Global'; 在非严格模式下，'this' 参数默认为 'globalThis'// cannot read property 'a' of undefined
// obj6.whatsThis = whatsThis;
// obj6.whatsThis(); // 'Custom'; 'this' 参数被绑定到 obj
const obj7 = {
  a: "Custom",
  whatsThis() {
    return this.a;
  },
};
console.log(obj7.whatsThis()); // 'Custom'; 'this' 参数被绑定到 obj7

// call, apply, bind 三个方法都可以用来改变 'this' 的指向。
function add(c, d) {
  return this.a + this.b + c + d;
}
const call_obj = { a: 1, b: 2 };
// 第一个参数被绑定到隐式的 'this' 参数；
// 剩余的参数被绑定到命名参数。
console.log(add.call(call_obj, 3, 4)); // 10
// 第一个参数被绑定到隐式的 'this' 参数；
// 第二个参数是一个数组，其成员被绑定到命名参数。
console.log(add.apply(call_obj, [3, 4])); // 10

// bind 方法返回一个新的函数，其 'this' 被绑定到第一个参数。
const bound_add = add.bind(call_obj);
console.log(bound_add(3, 4)); // 10

console.log("-------this in arrow function----");
// 箭头函数没有自己的 this，它们的 this 继承自外围作用域的 this。
// 箭头函数的 this 是在定义时绑定的，而不是在调用时绑定的。
console.log(this); // undefined
const arrow_obj = { a: 10, b: 20 };
// const arrow_add = (c, d) => this.a + this.b + c + d; // nodejs 中找到this.a cannot read property 'a' of undefined
const arrow_add = (c, d) => {
  return arrow_obj.a + arrow_obj.b + c + d;
};
console.log(arrow_add.call(arrow_obj, 30, 40)); // 100
console.log(arrow_add.apply(arrow_obj, [30, 40])); // 100
console.log(arrow_add(30, 40)); // 100

// 箭头函数没有自己的 this，它们的 this 继承自外围作用域的 this。
const arrow_bound_add = arrow_add.bind(arrow_obj);
console.log(arrow_bound_add(30, 40)); // 100
