console.log("--------this tranfer obj");

function bar() {
  console.log(Object.prototype.toString.call(this));
}

bar.call(7); // [object Number]
bar.call("foo"); // [object String]
bar.call(undefined); // [object Window]

console.log("----------bind");
// 调用 f.bind(someObject) 会创建一个新函数，这个新函数具有与 f 相同的函数体和作用域，但 this 的值永久绑定到 bind 的第一个参数，无论函数如何被调用。
function f() {
  return this.a;
}

const g = f.bind({ a: "azerty" });
console.log(g()); // azerty

const h = g.bind({ a: "yoo" }); // bind 只能生效一次！
console.log(h()); // azerty

const o = { a: 37, f, g, h };
console.log(o.a, o.f(), o.g(), o.h()); // 37 37 azerty azerty

console.log("----------arrow function");

const obj = {
  a: 1,
  getThisGetter() {
    const getter = () => this;
    return getter;
  },
  getThisGetter2() {
    return () => this;
  },
  getThisArrow: () => this,
};

const fn = obj.getThisGetter();
console.log(fn() === obj); // true
console.log(obj.getThisArrow); // [Function: getThisArrow]
console.log(obj.getThisArrow()); // undefined
console.log(obj.getThisGetter2()); // [Function: (anonymous)]
console.log(obj.getThisGetter2()()); // {a: 1, getThisGetter2: [Function: getThisGetter2], getThisGetter: [Function: getThisGetter], getThisArrow: [Function: getThisArrow]}
console.log(obj.getThisGetter2()() === obj); // true
console.log(obj.getThisGetter2()().a); // 1
console.log(obj.getThisGetter()() === global); // false
const fn2 = obj.getThisGetter;
console.log(fn2()()); // undefined
console.log(fn2()() === global); // false
