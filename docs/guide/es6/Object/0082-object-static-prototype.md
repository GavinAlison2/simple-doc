# 构造函数、原型、静态方法的对比清单，包含用法和场景示例

- [构造函数、原型、静态方法的对比清单，包含用法和场景示例](#构造函数原型静态方法的对比清单包含用法和场景示例)
  - [1. 构造函数](#1-构造函数)
    - [1.1 核心概念](#11-核心概念)
    - [1.2 适用场景](#12-适用场景)
  - [2. 原型（Prototype）](#2-原型prototype)
    - [2.1 核心概念](#21-核心概念)
    - [2.2 适用场景](#22-适用场景)
  - [3. 静态方法（Static Method）](#3-静态方法static-method)
    - [3.1 核心概念](#31-核心概念)
    - [3.2 适用场景](#32-适用场景)
  - [区别](#区别)

## 1. 构造函数

### 1.1 核心概念

- 用于创建对象的函数，通过 new 关键字生成实例。
- 内部用 this 指向新创建的实例，用于初始化实例属性。

```js
// 定义构造函数
function Person(name, age) {
  // 实例属性（每个实例独立拥有）
  this.name = name;
  this.age = age;
}

// 创建实例
const person1 = new Person("Alice", 20);
const person2 = new Person("Bob", 22);

console.log(person1.name); // "Alice"（实例属性）
console.log(person2.age); // 22（实例属性）
```

### 1.2 适用场景

- 需要创建多个具有相同结构但不同数据的对象（如用户、商品）。
- 用于初始化实例的私有属性（每个实例独立存储）。

## 2. 原型（Prototype）

### 2.1 核心概念

- 每个构造函数都有 prototype 属性，指向原型对象。
- 所有实例共享原型对象上的属性和方法，节省内存。
- 实例通过 `__proto__` 访问原型（隐式原型链）

```js
// 构造函数
function Person(name) {
  this.name = name;
}

// 原型方法（所有实例共享）
Person.prototype.sayHello = function () {
  console.log(`Hello, I'm ${this.name}`);
};

// 原型属性（所有实例共享）
Person.prototype.species = "Human";

// 创建实例
const person1 = new Person("Alice");
const person2 = new Person("Bob");

// 调用原型方法（共享逻辑）
person1.sayHello(); // "Hello, I'm Alice"
person2.sayHello(); // "Hello, I'm Bob"

// 访问原型属性（共享数据）
console.log(person1.species); // "Human"
console.log(person2.species); // "Human"
```

### 2.2 适用场景

- 定义实例的共享方法（如 sayHello）或共享属性（如 species）。
- 实现继承（通过修改原型指向父类实例）。
- 避免方法在每个实例中重复创建（节省内存）。

## 3. 静态方法（Static Method）

### 3.1 核心概念

- 定义在构造函数上的方法，不通过实例访问，可以通过类名访问。
- 一般用于工具函数或类方法。
- 通过构造函数直接调用，this 指向构造函数本身。

```js
// 构造函数
function Person(name) {
  this.name = name;
}

// 静态方法（挂载在构造函数上）
Person.createAnonymous = function () {
  // this 指向 Person 构造函数
  return new this("Anonymous"); // 等价于 new Person("Anonymous")
};

// 静态工具方法
Person.getSpecies = function () {
  return "Human";
};

// 调用静态方法（无需创建实例）
const anonymous = Person.createAnonymous();
console.log(anonymous.name); // "Anonymous"

console.log(Person.getSpecies()); // "Human"（直接通过构造函数调用）
```

### 3.2 适用场景

- 工具类方法（如数据格式化、类型判断）。
- 工厂方法（用于创建特定配置的实例，如 createAnonymous）。
- 与实例无关的操作（不需要访问实例属性）。

## 区别

- 特性 构造函数（Constructor） 原型（Prototype） 静态方法（Static Method）
- 挂载位置 函数本身（通过 new 调用） 构造函数的 prototype 属性 构造函数本身
- 调用方式 通过 new 创建实例 实例调用（instance.method()） 构造函数直接调用（Class.method()）`******重要*****`
- this 指向 新创建的实例 调用方法的实例 构造函数本身
- 适用场景 数据共享 每个实例独立拥有属性 所有实例共享方法 / 属性 无实例相关数据
- 典型用途 初始化实例属性 定义共享方法 / 属性 工具方法、工厂方法

```js
// 构造函数：初始化实例属性
function User(id, name) {
  this.id = id;
  this.name = name;
}

// 原型：共享方法（每个用户都需要登录逻辑）
User.prototype.login = function () {
  console.log(`${this.name} 登录了`);
};

// 静态方法：工具函数（生成用户ID，与具体实例无关）
User.generateId = function () {
  return Math.random().toString(36).slice(2, 10);
};

// 使用
const id = User.generateId(); // 调用静态方法
const user = new User(id, "Alice"); // 调用构造函数
user.login(); // 调用原型方法
```
