# JavaScript 原型链全景图（文字版）

- [JavaScript 原型链全景图（文字版）](#javascript-原型链全景图文字版)
  - [可视化关系图（层级结构）](#可视化关系图层级结构)
    - [详细原型链（以 p 为例）](#详细原型链以-p-为例)
    - [详细原型链（以 arr 为例）](#详细原型链以-arr-为例)
    - [详细原型链（以 Object 为例）](#详细原型链以-object-为例)
  - [核心要点](#核心要点)
  - [为什么要理解这个图？](#为什么要理解这个图)

```plaintext
// ---------------- 函数对象 & 原型对象关系 ----------------
Function.__proto__ → Function.prototype
Function.prototype.__proto__ → Object.prototype
Object.prototype.__proto__ → null

// 所有函数都是 Function 的实例
Object.__proto__ → Function.prototype
Array.__proto__  → Function.prototype
Person.__proto__ → Function.prototype  (假设 Person 是自定义构造函数)

// ---------------- 构造函数与实例的关系 ----------------
Object.prototype   // Object 的原型对象
Array.prototype    // Array 的原型对象
Person.prototype   // Person 的原型对象

// 实例的 __proto__ 指向 构造函数的 prototype
const obj = new Object();
obj.__proto__ → Object.prototype

const arr = new Array();
arr.__proto__ → Array.prototype

const p = new Person();
p.__proto__ → Person.prototype

// ---------------- 原型链继承关系 ----------------
Person.prototype.__proto__ → Object.prototype
Array.prototype.__proto__  → Object.prototype
Function.prototype.__proto__ → Object.prototype
```

## 可视化关系图（层级结构）

```plaintext
null
↑
Object.prototype <-- Object.**proto**.**proto**
↑
Function.prototype <-- Object.**proto**, Array.**proto**, Person.**proto**
↑
Function <-- Object.constructor, Array.constructor, Person.constructor
```

### 详细原型链（以 p 为例）

```plaintext
p → Person.prototype → Object.prototype → null
```

### 详细原型链（以 arr 为例）

```plaintext
arr → Array.prototype → Object.prototype → null
```

### 详细原型链（以 Object 为例）

```plaintext
Object → Function.prototype → Object.prototype → null
```

## 核心要点

- 所有函数都是 `Function` 的实例包括 `Object、Array、Function` 本身。
- 所有对象都能追溯到 `Object.prototype` 除了 `null`，所有对象最终原型链顶端都是 `Object.prototype`。
- 函数同时是函数和对象
  - 作为函数：有 `prototype` 属性
  - 作为对象：有 `__proto__` 属性
- `Function.__proto__  === Function.prototype` 这是 JavaScript 的 “鸡生蛋、蛋生鸡” 的根节点。

## 为什么要理解这个图？

- 原型链查找：当访问对象属性时，JS 会沿着 `__proto__` 向上查找。
- 继承实现：可以通过修改 prototype 实现继承。
- 内置对象行为：解释了为什么 arr.toString() 能调用到 Object.prototype.toString。
