# Object.defineProperty/defineProperties()

## Object.defineProperties()

方法用于在一个对象上定义多个新属性，或者修改一个对象的现有属性，并返回该对象。

### 概述

静态方法直接在一个对象上定义新的属性或修改现有属性，并返回该对象。

```js
const object1 = {};

Object.defineProperties(object1, {
  property1: {
    value: 42,
    writable: true,
    enumerable: true,
    configurable: true,
  },
  property2: {},
});

console.log(object1.property1);
// Expected output: 42
```

如果一个属性描述符没有 value、writable、get、set 键中的任何一个，那么它被视为一个数据描述符。如果一个属性描述符同时具有 value 或 writable 和 get 或 set 键中的任意一个组合，就会抛出异常。

数据描述符：

- value：属性的值。
- writable：一个布尔值，表示属性是否可以被赋值。
- emumerable：一个布尔值，表示属性是否可以被枚举。
- configurable：一个布尔值，表示属性是否可以被删除或修改。

访问器描述符：

- get：一个函数，在读取属性时调用。
- set：一个函数，在写入属性时调用。
- enumerable：一个布尔值，表示属性是否可以被枚举。
- configurable：一个布尔值，表示属性是否可以被删除或修改。

**注意**

数据描述符和访问描述符不可以同时存在

## Object.defineProperty()

方法用于在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回该对象。

```js
const object1 = {};

Object.defineProperty(object1, "property1", {
  value: 42,
  writable: true,
});

object1.property1 = 77;
// Throws an error in strict mode

console.log(object1.property1);
// Expected output: 77
```

Object.defineProperty(obj, prop, desc)

- obj：要在其中定义或修改属性的对象。
- prop：要定义或修改的属性的名称或 Symbol。
- desc：一个属性描述符，它描述了该属性的配置。

### 属性描述符

属性描述符是一个对象，它包含以下属性：

- value：属性的值。
- writable：一个布尔值，表示属性是否可以被赋值。
- enumerable：一个布尔值，表示属性是否可以被枚举。
- configurable：一个布尔值，表示属性是否可以被删除或修改。

访问器描述符：

- get：一个函数，在读取属性时调用。
- set：一个函数，在写入属性时调用。
- enumerable：一个布尔值，表示属性是否可以被枚举。
- configurable：一个布尔值，表示属性是否可以被删除或修改。

configurable:

- false
  - 该属性的类型不能在数据属性和访问器属性之间更改
  - 该属性不可被删除
  - 其描述符的其他属性也不能被更改
  - 但是，如果它是一个可写的数据描述符，则 value 可以被更改，writable 可以更改为 false

enumerable:

- 当且仅当该属性在对应对象的属性枚举中出现时，值为 true.
- false
- 该属性在对应对象的属性枚举中不出现.
- 该属性不可被枚举.
- 不会出现在 for...in 循环中.
- 不会出现在 Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()
- 不会出现在 Object.assign() ,{...obj1} 中

value:

- 该属性的初始值.

writeable:

- 当且仅当该属性的值可以被赋值时，值为 true.
- false
  - 该属性的值不可被赋值.

get:
set:

- 当且仅当该属性是访问器属性时，才存在这两个属性.
- 这两个属性分别指定了读取属性和写入属性时执行的函数.

```js
const obj = {};
// 1. 使用 null 原型：没有继承的属性
const descriptor = Object.create(null);
descriptor.value = "static";

// 默认情况下，它们不可枚举、不可配置、不可写
Object.defineProperty(obj, "key", descriptor);

// 2. 使用一个包含所有属性的临时对象字面量来明确其属性
Object.defineProperty(obj, "key2", {
  enumerable: false,
  configurable: false,
  writable: false,
  value: "static",
});

// 3. 重复利用同一对象
function withValue(value) {
  const d =
    withValue.d ||
    (withValue.d = {
      enumerable: false,
      writable: false,
      configurable: false,
      value,
    });

  // 避免重复赋值
  if (d.value !== value) d.value = value;

  return d;
}
// 然后
Object.defineProperty(obj, "key", withValue("static"));

// 如果 freeze 可用，防止添加或删除对象原型属性
// （value、get、set、enumerable、writable、configurable）
(Object.freeze || Object)(Object.prototype);
```

```js
const o = {};
Object.defineProperty(o, "a", {
  value: 1,
  enumerable: true,
});
Object.defineProperty(o, "b", {
  value: 2,
  enumerable: false,
});
Object.defineProperty(o, "c", {
  value: 3,
}); // enumerable 默认为 false
o.d = 4; // 通过赋值创建属性时 enumerable 默认为 true
Object.defineProperty(o, Symbol.for("e"), {
  value: 5,
  enumerable: true,
});
Object.defineProperty(o, Symbol.for("f"), {
  value: 6,
  enumerable: false,
});

for (const i in o) {
  console.log(i);
}
// 打印 'a' 和 'd'（总是按这个顺序）

Object.keys(o); // ['a', 'd']

o.propertyIsEnumerable("a"); // true
o.propertyIsEnumerable("b"); // false
o.propertyIsEnumerable("c"); // false
o.propertyIsEnumerable("d"); // true
o.propertyIsEnumerable(Symbol.for("e")); // true
o.propertyIsEnumerable(Symbol.for("f")); // false

const p = { ...o };
p.a; // 1
p.b; // undefined
p.c; // undefined
p.d; // 4
p[Symbol.for("e")]; // 5
p[Symbol.for("f")]; // undefined
```

```js
const o = {};

o.a = 1;
// 等价于：
Object.defineProperty(o, "a", {
  value: 1,
  writable: true,
  configurable: true,
  enumerable: true,
});

// 另一种情况
Object.defineProperty(o, "a", { value: 1 });
// 等价于：
Object.defineProperty(o, "a", {
  value: 1,
  writable: false,
  configurable: false,
  enumerable: false,
});
```

```js
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
```
