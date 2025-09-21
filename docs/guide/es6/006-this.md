# This

- 指向 JavaScript 运行时环境的对象
- 不同函数调用方式，`this` 指向不同对象
- 全局环境中，`this` 指向 `window` 对象/global 对象
- strict 模式下，`this` 指向 `undefined`
- 箭头函数中, `this` 指向定义它的对象
- ES5 引入了 bind 方法来设置函数的 this 指向
- ES6 引入了箭头函数，`this` 指向定义它的对象
- nodejs 中，`this` =undefined, 不能直接使用`this.a`, 而是使用 global.a, 因为 nodejs 的模块隔离机制导致的.
- `this` 可以在代码块,函数,对象,箭头函数中使用
- getter/setter 函数中, `this` 指向调用它的对象
- DOM 事件处理器中的 `this` 指向 DOM 元素
- 内联事件处理器中的 `this` 指向 DOM 元素 和 IIFF 函数中的 `this` 指向全局对象

## 1. 指向 JavaScript 运行时环境的对象

In JavaScript, the `this` keyword refers to the object that is currently executing the code. It is a special keyword that is used to refer to the current object within a function.

The value of `this` depends on the context in which it is used. In a global context, `this` refers to the global object, which is usually `window` in a web browser. In a function, `this` refers to the object that the function is a method of. If the function is not a method of an object, `this` refers to the global object.

In a method of an object, `this` refers to the object that the method belongs to. For example, in the following code:

```javascript
const person = {
  name: "John",
  sayName: function () {
    console.log(this.name);
  },
};

person.sayName(); // Output: "John"
```

## 2. 不同函数调用方式，`this` 指向不同对象

The `sayName` method belongs to the `person` object, so `this` refers to the `person` object. When the `sayName` method is called, it logs the value of `this.name`, which is "John".
In a function that is not a method of an object, `this` refers to the global object. For example, in the following code:

```javascript
function sayName() {
  console.log(this.name);
}

const person = { name: "John" };

sayName(); // Output: "undefined"
```

```javascript
function getThis() {
  return this;
}

console.log(getThis()); // Output: Window {...}

const obj1 = { name: "obj1" };
const obj2 = { name: "obj2" };

obj1.getThis = getThis();
obj2.getThis = getThis;

console.log(obj1.getThis()); // Output: {name: 'obj1'}
console.log(obj2.getThis()); // Output: Window {...}
```

The `sayName` function is not a method of the `person` object, so `this` refers to the global object. When the `sayName` function is called, it logs the value of `this.name`, which is "undefined".

## 3. 全局环境中，`this` 指向 `window` 对象/global 对象

```javascript
console.log(this === window); // Output: true
console.log(this === global); // Output: true
```

## 4. strict 模式下，`this` 指向 `undefined`

```javascript
"use strict";

console.log(this); // Output: undefined
```

## 5. 箭头函数中, `this` 指向定义它的对象

在定义的时候指定,不是在执行的时候绑定.

```javascript
const obj = {
  name: "obj",
  sayName: () => {
    console.log(this.name);
  },
};
obj.sayName(); // Output: "obj"
```

## 6. ES5 引入了 bind 方法来设置函数的 this 指向

```javascript
// 调用 f.bind(someObject) 会创建一个新函数，这个新函数具有与 f 相同的函数体和作用域，但 this 的值永久绑定到 bind 的第一个参数，无论函数如何被调用。
function f() {
  return this.a;
}

const g = f.bind({ a: "azerty" });
console.log(g()); // azerty
/*
const g = f.bind({ a: "azerty" })

const g = function f({a: "azerty"}){
  this = {a: "azerty"};
  return function(){
    return this.a;
  }
}

g() =====> function(){
  this = {a: "azerty"};
    return this.a;
  }
*/

const h = g.bind({ a: "yoo" }); // bind 只能生效一次！
console.log(h()); // azerty

const o = { a: 37, f, g, h };
console.log(o.a, o.f(), o.g(), o.h()); // 37 37 azerty azerty
```

## 7. ES6 引入了箭头函数，`this` 指向定义它的对象

```javascript
const obj = {
  name: "obj",
  sayName: () => {
    console.log(this.name);
  },
  getThisGetter() {
    const getter = () => this;
    return getter;
  },
  getThisGetter2() {
    return () => this;
  },
  getThisArrow: () => this,
};

obj.sayName(); // Output: "obj"

const getter = obj.getThisGetter();
console.log(getter()); // Output: {name: "obj"}

const getter2 = obj.getThisGetter2();
console.log(getter2()); // Output: {name: "obj"}

console.log(obj.getThisArrow()); // Output: undefined/window
```

## 8. getter/setter 函数中, `this` 指向调用它的对象

```javascript
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
```

## 9. DOM 事件处理器中的 this

```javascript
// 当作为监听器调用时，将相关元素变为蓝色
function bluify(e) {
  // 总是为 true
  console.log(this === e.currentTarget);
  // 当 currentTarget 和 target 是同一个对象时为 true
  console.log(this === e.target);
  this.style.backgroundColor = "#A5D9F3";
}

// 获取文档中的每一个元素
const elements = document.getElementsByTagName("*");

// 添加 bluify 作为点击监听器，所以当元素被点击时，它会变蓝
for (const element of elements) {
  element.addEventListener("click", bluify, false);
}
```

## 10. 内联事件处理器中的 this 指向 DOM 元素 和 IIFF 函数中的 this 指向全局对象

IIFF 函数中的 this 指向全局对象，因为它是在全局作用域中定义的。

```html
<button onclick="alert(this.tagName.toLowerCase());">Show this</button>
```

```html
<button onclick="alert((function(){return this})());">Show inner this</button>
```

## 11. 类中绑定的方法

方法中的 this 值取决于它们如何被调用. 如果方法是通过实例调用的，那么 this 指向实例对象. 如果方法是通过类调用的，那么 this 指向类本身.

```javascript
class Car {
  constructor() {
    // 绑定 sayBye 而不是 sayHi 来展示差异
    this.sayBye = this.sayBye.bind(this);
  }
  sayHi() {
    console.log(`Hello from ${this.name}`);
  }
  sayBye() {
    console.log(`Bye from ${this.name}`);
  }
  get name() {
    return "Ferrari";
  }
}

class Bird {
  get name() {
    return "Tweety";
  }
}

const car = new Car();
const bird = new Bird();

// 方法中 'this' 的值取决于它们的调用者
car.sayHi(); // Hello from Ferrari
bird.sayHi = car.sayHi;
bird.sayHi(); // Hello from Tweety

// 对于绑定方法，'this' 不依赖于调用者
bird.sayBye = car.sayBye;
bird.sayBye(); // Bye from Ferrari
```
