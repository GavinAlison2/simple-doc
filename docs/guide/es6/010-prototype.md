# 原型（Prototype）

好的，你要的是 JavaScript 原型（Prototype）的详细讲解，我会从核心概念 → 运行机制 → 实战用法 → 常见坑 全流程讲清楚，保证你看完就能理解并运用。

- [原型（Prototype）](#原型prototype)
  - [1. 为什么需要原型？](#1-为什么需要原型)
  - [2. 三个核心概念](#2-三个核心概念)
    - [2.1 prototype（显式原型）](#21-prototype显式原型)
    - [2.2 `__proto__`（隐式原型）](#22-__proto__隐式原型)
    - [2.3 constructor（构造函数）](#23-constructor构造函数)
  - [3. 原型链查找规则](#3-原型链查找规则)
  - [5. 实战用法](#5-实战用法)
    - [5.1 共享方法（节省内存）](#51-共享方法节省内存)
    - [5.2 实现继承（原型链继承）](#52-实现继承原型链继承)
    - [5.3 扩展内置对象（不推荐，但可行）](#53-扩展内置对象不推荐但可行)
    - [6.1 原型上的引用类型会被所有实例共享](#61-原型上的引用类型会被所有实例共享)
    - [6.2 修改原型后，constructor 丢失](#62-修改原型后constructor-丢失)
  - [7. ES6 class 语法糖](#7-es6-class-语法糖)
  - [✅ 一句话总结：](#-一句话总结)

## 1. 为什么需要原型？

JavaScript 是 基于原型的语言，而不是像 Java/C++ 那样基于类（虽然 ES6 引入了 class，但底层依旧是原型机制）。
核心目的：
数据共享：让多个对象可以共享方法和属性，节省内存
实现继承：通过原型链实现对象之间的继承关系

## 2. 三个核心概念

### 2.1 prototype（显式原型）

每个 函数 都有一个 prototype 属性（对象）
它的作用是：定义所有实例共享的属性和方法
只有构造函数在用 new 创建实例时，这个 prototype 才会被实例的 **proto** 指向

```js
function Person(name) {
  this.name = name;
}
// 在原型上定义方法（所有实例共享）
Person.prototype.sayHello = function () {
  console.log(`Hello, I'm ${this.name}`);
};

const p1 = new Person("Alice");
const p2 = new Person("Bob");

p1.sayHello(); // Hello, I'm Alice
p2.sayHello(); // Hello, I'm Bob

console.log(Person.prototype); // { sayHello: [Function], constructor: [Function: Person] }
```

### 2.2 `__proto__`（隐式原型）

每个 对象 都有 **proto** 属性（除了 null 和 undefined）
它指向创建该对象的构造函数的 prototype
作用：当访问一个对象属性时，如果对象自身没有，就会通过 **proto** 向上查找（原型链）

```js
const p1 = new Person("Alice");

console.log(p1.**proto** === Person.prototype); // true
console.log(p1.**proto**.sayHello === Person.prototype.sayHello); // true
```

⚠️ 注意：
`__proto__` 是浏览器提供的 非标准属性（ES6 标准化为 Object.getPrototypeOf()）
平时开发中应尽量用：

```js
Object.getPrototypeOf(obj); // 获取原型
Object.setPrototypeOf(obj, proto); // 设置原型
```

### 2.3 constructor（构造函数）

每个原型对象都有 constructor 属性，指向关联的构造函数
作用：从实例可以找到它的构造函数

```js
console.log(Person.prototype.constructor === Person); // true
console.log(p1.constructor === Person); // true 3. 原型链查找规则
```

## 3. 原型链查找规则

当访问对象的某个属性：
先在对象自身查找，如果找到就直接返回
如果找不到，就去 **proto** 指向的原型对象查找
如果还找不到，就去原型对象的 **proto** 继续向上找
直到找到 Object.prototype，如果还找不到就返回 undefined

```js
const arr = [];
console.log(arr.push === Array.prototype.push); // true
console.log(arr.toString === Object.prototype.toString); // true 4. 实例、构造函数、原型关系图
plaintext
构造函数 Person
↑ ↓
Person.prototype（原型对象）
↑ ↓
实例 p1.**proto**
```

## 5. 实战用法

### 5.1 共享方法（节省内存）

```js
function Person(name) {
  this.name = name;
}

// 所有实例共享同一个方法
Person.prototype.sayHello = function () {
  console.log(`Hello, I'm ${this.name}`);
};

const p1 = new Person("Alice");
const p2 = new Person("Bob");

console.log(p1.sayHello === p2.sayHello); // true
```

### 5.2 实现继承（原型链继承）

```js
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
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function () {
  console.log(`${this.name} is barking`);
};

const d = new Dog("旺财", 2);
d.eat(); // 继承来的方法
d.bark(); // 自己的方法
```

### 5.3 扩展内置对象（不推荐，但可行）

```js
Array.prototype.last = function () {
  return this[this.length - 1];
};

const arr = [1, 2, 3];
console.log(arr.last()); // 3
```

⚠️ 缺点：可能会覆盖原生方法，造成冲突 6. 常见坑

### 6.1 原型上的引用类型会被所有实例共享

```js
function Person() {}
Person.prototype.friends = [];

const p1 = new Person();
const p2 = new Person();

p1.friends.push("Tom");
console.log(p2.friends); // ["Tom"] ❌ 被共享了
```

解决：引用类型应放在构造函数里：

```js
function Person() {
  this.friends = [];
}
```

### 6.2 修改原型后，constructor 丢失

```js
function Person() {}
Person.prototype = {
  sayHello() {
    console.log("Hello");
  },
};

const p = new Person();
console.log(p.constructor === Person); // false ❌
```

解决：手动修复 constructor：

```js
Person.prototype = {
  constructor: Person,
  sayHello() {
    console.log("Hello");
  },
};
```

## 7. ES6 class 语法糖

ES6 的 class 本质还是原型机制：

```js
class Person {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    // 等价于 Person.prototype.sayHello
    console.log(`Hello, I'm ${this.name}`);
  }

  static create(name) {
    // 静态方法，挂载在构造函数上
    return new Person(name);
  }
}
```

## ✅ 一句话总结：

JavaScript 的原型是实现属性和方法共享的机制，通过 prototype 定义共享内容，通过 **proto** 查找属性，形成原型链实现继承。

