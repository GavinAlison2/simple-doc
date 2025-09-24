function MyClass() {}

let value;
Object.defineProperty(MyClass.prototype, "x", {
  get() {
    return value;
  },
  set(x) {
    value = x;
  },
});

const a = new MyClass();
const b = new MyClass();
a.x = 1;
console.log(b.x); // 1
console.log(a);
console.log(b);
console.log(a === b);

/*
通过 Object.defineProperty(MyClass.prototype, "x", { ... }) 给 MyClass 的原型对象添加了一个访问器属性 x（包含 get 和 set 方法）。

所有 MyClass 的实例（如 a 和 b）都会通过原型链共享这个 x 属性（即 a.x 和 b.x 访问的是同一个原型上的 x）。
但关键问题出在 get 和 set 方法内部：它们操作的是全局变量 value，而非实例自身的属性。

是全局变量， 原型上的全局变量， MyClass.prototype.x 访问的是同一个全局变量 value。

实例上/构造函数里没有定义， 
如果定义了，就是单个实例自己的独立属性

a.x 和 b.x 访问x属性， 
1. 首先查看函数自己是否有x属性，没有的话， 
2. 然后查看原型链上是否有全局变量x属性，有的话

## 如何让每个实例的 x 独立的解决方法
function MyClass() { this.x= undefined; }
Object.defineProperty(MyClass.prototype, "x", {
    get(){return this.x;}
    set(x){this.x=x;}
});

const a = new MyClass();
const b = new MyClass();
a.x = 1;
console.log(b.x); // undefined
// 或者
function MyClass() { 
    let value;
    // Closures
    Object.defineProperty(this, "x", {
        get() {
            return value;
        },
        set(x) {
            value = x;
        },
    });
}



*/
function MyClass2() {
  let value;
  // Closures
  Object.defineProperty(this, "x", {
    get() {
      return value;
    },
    set(x) {
      value = x;
    },
  });
}
console.log("------------");
const a1 = new MyClass2();
const b1 = new MyClass2();
a1.x = 1;
console.log(a1.x); // 1
console.log(b1.x); // undefined
