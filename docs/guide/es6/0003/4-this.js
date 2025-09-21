function sum() {
  return this.a + this.b + this.c;
}
// 在 getter 和 setter 中，this 是基于访问属性的对象，而不是定义属性的对象。
// 用作 getter 或 setter 的函数会将其 this 绑定到正在设置或获取属性的对象。
// getter,setter 就是 运行时 绑定 this 的机制。
const o = {
  a: 1,
  b: 2,
  c: 3,
  get average() {
    return (this.a + this.b + this.c) / 3;
  },
};

Object.defineProperty(o, "sum", {
  get: sum,
  enumerable: true,
  configurable: true,
});

console.log(o.average, o.sum); // 2 6

console.log("--------------");
// 定义一个原型对象
const objPrototype = {
  // 定义 getter
  get fullName() {
    // this 指向访问该属性的实例对象
    return `${this.firstName} ${this.lastName}`;
  },
  // 定义 setter
  set fullName(value) {
    const [first, last] = value.split(" ");
    this.firstName = first;
    this.lastName = last;
  },
};

// 创建实例对象，继承自原型
const person1 = Object.create(objPrototype);
person1.firstName = "Alice";
person1.lastName = "Smith";

const person2 = Object.create(objPrototype);
person2.firstName = "Bob";
person2.lastName = "Jones";

console.log(person1.fullName); // "Alice Smith"（this 指向 person1）
console.log(person2.fullName); // "Bob Jones"（this 指向 person2）

// 修改 person1 的 fullName
person1.fullName = "Alice Williams";
console.log(person1.lastName); // "Williams"（this 指向 person1）
