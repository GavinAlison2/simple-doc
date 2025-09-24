# Object.entries()

Object.entries() 静态方法返回一个数组，包含给定对象自有的可枚举字符串键属性的键值对。

## 语法：

```javascript
Object.entries(obj);
```

```js
const object1 = {
  a: "someString",
  b: 42,
};
console.log(Object.entries(object1));
// [["a", "someString"], ["b", 42]]
for (let [key, value] of Object.entries(object1)) {
  //   console.log(key, value);
  console.log(`${key} : ${value}`);
}
// a : someString
// b : 42
```

返回数组， 二维数组，每个键值对转换成一个数组。
数组的第一个元素是属性的键，第二个元素是属性的值。

Object.keys() 方法返回一个数组，包含给定对象自有的可枚举属性的键。
Object.values() 方法返回一个数组，包含给定对象自有的可枚举属性的值。

```js
const obj = { foo: "bar", baz: 42 };
console.log(Object.entries(obj)); // [ ['foo', 'bar'], ['baz', 42] ]

// 类数组对象
const obj = { 0: "a", 1: "b", 2: "c" };
console.log(Object.entries(obj)); // [ ['0', 'a'], ['1', 'b'], ['2', 'c'] ]

// 具有随机键排序的类数组对象
const anObj = { 100: "a", 2: "b", 7: "c" };
console.log(Object.entries(anObj)); // [ ['2', 'b'], ['7', 'c'], ['100', 'a'] ]

// getFoo 是一个不可枚举的属性
const myObj = Object.create(
  {},
  {
    getFoo: {
      value() {
        return this.foo;
      },
    },
  }
);
myObj.foo = "bar";
console.log(Object.entries(myObj)); // [ ['foo', 'bar'] ]
```

## 在基本类型中使用 Object.entries()

undefined 和 null 类型没有自有属性，因此调用 Object.entries() 方法时，会返回一个空数组。
string 类型具有索引作为可枚举的自有属性，因此调用 Object.entries() 方法时，会返回一个二维数组，包含每个字符的索引和字符本身。
boolean, number, symbol 类型没有自有属性，因此调用 Object.entries() 方法时，会返回一个空数组。

```js
// 字符串具有索引作为可枚举的自有属性
console.log(Object.entries("foo")); // [ ['0', 'f'], ['1', 'o'], ['2', 'o'] ]

// 其他基本类型（除了 undefined 和 null）没有自有属性
console.log(Object.entries(100)); // []
console.log(Object.entries(true)); // []
console.log(Object.entries(undefined)); // []
console.log(Object.entries(null)); // []
```

## 将 Object 转换成 Map

```js
const obj = { foo: "bar", baz: 42 };
const map = new Map(Object.entries(obj));
console.log(map); // Map(2) {"foo" => "bar", "baz" => 42}
```

## foreach 方法

```js
// 使用 for...of 循环
const obj = { a: 5, b: 7, c: 9 };
for (const [key, value] of Object.entries(obj)) {
  console.log(`${key} ${value}`); // "a 5", "b 7", "c 9"
}

// 使用数组方法
Object.entries(obj).forEach(([key, value]) => {
  console.log(`${key} ${value}`); // "a 5", "b 7", "c 9"
});
```
