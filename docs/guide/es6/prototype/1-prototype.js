function Person(name) {
  this.name = name;
}

// 在原型上定义方法（所有实例共享）
Person.prototype.sayHello = function () {
  console.log(`Hello, I'm ${this.name}`);
};

const p1 = new Person("Alice");
const p2 = new Person("Bob");
console.log("p1.sayHello and p2.sayHello are both functions");
p1.sayHello(); // Hello, I'm Alice
p2.sayHello(); // Hello, I'm Bob
console.log("Person", Person);
console.log("Person.prototype");
console.log(Person.prototype); // { sayHello: [Function], constructor: [Function: Person] }
console.log("p1.__proto__", p1.__proto__);
console.log(
  "p1.__proto__ === Person.prototype",
  p1.__proto__ === Person.prototype
);
console.log("p2.__proto__", p2.__proto__);
console.log(
  "p2.__proto__ === Person.prototype",
  p2.__proto__ === Person.prototype
);
console.log("--------------");
console.log(
  "p1.__proto__.sayHello === Person.prototype.sayHello",
  p1.__proto__.sayHello === Person.prototype.sayHello
); // true
// Object.getPrototypeOf(p1) === Person.prototype // true
// Object.setPrototypeOf(p1, null) // 把 p1 的原型设置为 null
// const obj = Object.create(null) // 创建一个没有原型的对象
// const obj2 = Object.create(Person.prototype) // 创建一个有原型的对象
// js 是基于原型链上的语言,通过原型链继承
// 同比 Java/C++ 基于 Class的语言,通过Class extends 继承

// new --> constructor --> function Person()
// p1.__proto__ ->  Person.prototype -> function Person(){...}
// p1.sayHello -> Person.prototype.sayHello -> 没有在原型链向上找 -> function(){...}

// 共享方法
console.log(p1.sayHello === p2.sayHello); // true
// 继承
function Animal(name) {
  this.name = name;
}
Animal.prototype.eat = function () {
  console.log(`${this.name} is eating`);
};
function Dog(name, age) {
  Animal.call(this, name); // 继承属性
  this.age = age;
}
// 继承方法
Dog.prototype = Object.create(Animal.prototype);
// 重写构造函数,避免构造函数丢失, 或者是继承父类的构造函数 [Function: Animal]
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function () {
  console.log(`${this.name} is barking`);
};
console.log("-----------");
// 实例化子类
const d = new Dog("旺财", 2);
d.eat(); // 继承来的方法
d.bark(); // 自己的方法
console.log(d.age);
console.log(d);
console.log(d.__proto__);
console.log(Dog.prototype.constructor); // 没有Dog.prototype.constructor = Dog;输出的是[Function: Animal]
// 有的话,输出的是[Function: Dog]
console.log("-------------");
Array.prototype.last = function () {
  return this[this.length - 1];
};
const arr = [1, 2, 3, 4, 5];
console.log(arr.last()); // 5
console.log(arr.last === Array.prototype.last); // true
// 原型上的引用类型会被所有实例共享
Person.prototype.friends = ["Alice", "Bob"];
const p3 = new Person("Charlie");
const p4 = new Person("David");
console.log(p3.friends); // ["Alice", "Bob"]
console.log(p4.friends); // ["Alice", "Bob"]
p2.friends.push("Charlie");
console.log(p3.friends); // ["Alice", "Bob", "Charlie"]
console.log(p4.friends); // ["Alice", "Bob", "Charlie"]
// 解决
console.log("-------------");
function Person3() {
  this.friends = [];
}
Person3.prototype.addFriend = function (name) {
  this.friends.push(name);
};
const p5 = new Person3();
const p6 = new Person3();
p5.addFriend("Alice");
console.log(p5.friends); // ["Alice"]
console.log(p6.friends); // []
console.log(p5.__proto__);
//
function Person4() {}
Person4.prototype = {
  //   constructor: Person4,
  sayHello() {
    console.log("Hello");
  },
};
const p7 = new Person4();
console.log(p7.constructor === Person4); // false
// 解决 , 打开 constructor: Person4, 输出是true
console.log("-----------");
class Man {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    // 等价于 Person.prototype.sayHello
    console.log(`Hi, I'm ${this.name}`);
  }
  static create(name) {
    // 静态方法，挂载在构造函数上
    return new Person(name);
  }
}
console.log(Man);
console.log(Object.getOwnPropertyDescriptors(new Man()));
const man = new Man();
console.log(Man.prototype.sayHi());
console.log(Man.create());

function Man2(name) {
  this.name = name;
  function sayHi() {
    console.log(`Hi, I'm ${this.name}`);
  }
}
const man2 = new Man2("tom");
// man2.sayHi(); // man2.sayHi is not a function
man2.sayHi = () => {
  console.log("outside sayHi");
};
man2.sayHi();
Man2.prototype.eat = () => console.log("eat");
man2.eat();
