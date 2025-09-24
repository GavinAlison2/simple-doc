# Object

- [Object](#object)
  - [Object 的函数](#object-的函数)
  - [1. 对象简介](#1-对象简介)
  - [2. 对象原型属性](#2-对象原型属性)
  - [3. 方法](#3-方法)
    - [1. Object()](#1-object)
    - [2. Object.assign()](#2-objectassign)

## Object 的函数

- [object-create](./Object/0081-object-create.md)
- [object-static-prototype](./Object/0082-object-static-prototype.md)
- [object-defineproperty](./Object/0083-object-defineproperty.md)

## 1. 对象简介

1. Object 是 JavaScript 的一种数据类型。它用于存储各种键值集合和更复杂的实体
2. 对象是一组键值对的集合，其中每个键都是字符串，值可以是任意类型。

## 2. 对象原型属性

```js
Object.prototype;
```

## 3. 方法

- valueOf()：返回对象本身
- toString()：返回对象的字符串表示
- toLocaleString()：根据本地语言环境返回对象的字符串表示
- defineProperty(prop, descriptor)：定义或修改对象的属性
- deleteProperty(prop)：删除对象的属性
- getOwnPropertyDescriptor(prop)：获取对象的属性描述符
- getPrototypeOf()：获取对象的原型
- setPrototypeOf(proto)：设置对象的原型
- hasOwnProperty(prop)：判断对象是否包含指定属性
- hasOwnProperty(prop)：判断对象是否包含指定属性
- isPrototypeOf(obj)：判断对象是否为指定对象的原型
- instanceof()：判断对象是否为指定类型实例
- delete xx : 删除对象属性
- Object.create(null): 创建一个没有原型的对象

### 1. Object()

1. Object() 构造函数可以用来创建对象。

```js
let obj = new Object();
new Object(null);
new Object(undefined);
new Object(123);
Object(true);
Object("hello");
Object([1, 2, 3]);
Object(BigInt(1n));
```

### 2. Object.assign()

1. Object.assign() 方法用于将所有可枚举自有属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
2. 注意,这里拷贝的是自有属性,不是原型属性,
   `原型属性比如 Object.create({foo: 12}, {bar: {value: 42, enumerable: true}})`, 这里{foo: 12}是新建对象的原型,foo 是原型属性, {bar: 42,...} 这个是自有属性
3. 就是拷贝属性，如果目标对象有同名属性，则会覆盖。

```js
let target = { a: 1, b: 2 };
let source1 = { b: 4, c: 3 };
let source2 = { d: 5 };

const returnedTarget = Object.assign(target, source1, source2);
console.log(target); // {a: 1, b: 4, c: 3, d: 5}
// target 的值会改变,不用重新赋值
console.log(returnedTarget); // {a: 1, b: 4, c: 3, d: 5}
console.log(target === returnedTarget); // true

// 赋值对象
console.log("-------------------");
const obj = { a: 1 };
const copy = Object.assign({}, obj);
console.log(copy); // {a: 1}
// 深拷贝
// Object.assign(target, source1, source2) 只是浅拷贝
const obj1 = { a: 0, b: { c: 0 } };
const obj2 = Object.assign({}, obj1);
console.log(obj1); // {a: 0, b: {c: 0}}
obj1.a = 1;
console.log(obj1); // {a: 1, b: {c: 0}}
console.log(obj2); // {a: 0, b: {c: 0}}
obj2.a = 2;
console.log(obj1); // { a: 1, b: { c: 0 } }
console.log(obj2); // { a: 2, b: { c: 0 } }
obj2.b.c = 3;
console.log(obj1); // { a: 1, b: { c: 3 } }
console.log(obj2); // { a: 2, b: { c: 3 } }

// 深拷贝
const obj3 = { a: 0, b: { c: 0 } };
const obj4 = JSON.parse(JSON.stringify(obj3));
obj3.a = 4;
obj3.b.c = 4;
console.log(obj4); // { a: 0, b: { c: 0 } }
```

合并具有相同属性的对象

```js
const o1 = { a: 1, b: 1, c: 1 };
const o2 = { b: 2, c: 2 };
const o3 = { c: 3 };

const obj = Object.assign({}, o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }
```

拷贝 Symbol 类型属性

```js
const o1 = { a: 1 };
const o2 = { [Symbol("foo")]: 2 };

const obj = Object.assign({}, o1, o2);
console.log(obj); // { a : 1, [Symbol("foo")]: 2 } (cf. bug 1207182 on Firefox)
Object.getOwnPropertySymbols(obj); // [Symbol(foo)]
```

原型链上的属性和不可枚举的属性不能被复制

```js
const obj_create = Object.create(
  // foo 在 obj 的原型链上
  { foo: 1 },
  {
    bar: {
      value: 2, // bar 是不可枚举的属性
    },
    baz: {
      value: 3,
      enumerable: true, // baz 是可枚举的自有属性
    },
  }
);

const copy = Object.assign({}, obj_create);
console.log(copy); // { baz: 3 }
console.log(copy.foo); // undefined (foo 不是 obj_create 的自有属性)
console.log(copy.bar); // undefined (bar 不是 obj_create 的自有属性)
console.log(copy.__proto__.foo); // undefined (foo 存在于 obj_create 的原型链上)
for (let key in copy) {
  console.log(`${key}: ${copy[key]}`); // baz : 3 (baz 是可枚举的自有属性)
}
// 如果需要这个foo属性,使用object.defineProperty()方法添加到copy对象上
Object.defineProperty(copy, "foo", {
  value: 4,
  enumerable: true,
});
console.log(copy); // { baz: 3, foo: 4 }
```

基本类型会被封装为对象

```js
const v1 = "abc";
const v2 = true;
const v3 = 10;
const v4 = Symbol("foo");

const obj = Object.assign({}, v1, null, v2, undefined, v3, v4);
// 基本类型将被封装，null 和 undefined 将被忽略。
// 注意，只有字符串封装对象才拥有可枚举的自有属性。
console.log(obj); // { "0": "a", "1": "b", "2": "c" }
// v1 , 转换为字符串包装对象 new String("abc")，其可枚举自有属性是索引（0:"a", 1:"b", 2:"c"），会被复制到目标对象
// null, undefined 被忽略
// true, 转换为布尔包装对象 new Boolean(true)，但它 没有可枚举的自有属性（只有不可枚举的 [[PrimitiveValue]]），所以无属性被复制。
// 10, 转换为数字包装对象 new Number(10)，同样 没有可枚举的自有属性，无属性被复制
// Symbol("foo"), 转换为符号包装对象 new Symbol("foo")，没有可枚举的自有属性，无属性被复制
```

异常会中断后续的复制

```js
const target = Object.defineProperty({}, "foo", {
  value: 1,
  writable: false,
}); // target.foo 是一个只读属性

Object.assign(target, { bar: 2 }, { foo2: 3, foo: 3, foo3: 3 }, { baz: 4 });
// TypeError: "foo" is read-only
// 这个异常会在给 target.foo 赋值的时候抛出

console.log(target.bar); // 2，第一个源对象成功复制。
console.log(target.foo2); // 3，第二个源对象的第一个属性也成功复制。
console.log(target.foo); // 1，异常在这里被抛出
console.log(target.foo3); // undefined，属性赋值已经结束，foo3 不会被复制
console.log(target.baz); // undefined，第三个源对象也不会被复制
```

> 参考：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object
