# 扩展运算符

ES6 提供了一个新的运算符，称为展开运算符，它由三个点组成 (...)
展开运算符允许您展开可迭代对象的元素，例如 数组、映射 或 集合。

展开运算符（...）是一个在ES6中引入的语法糖，它允许您将数组或对象中的元素展开到某个地方。

## 合并数组

```javascript
const odd = [1, 3, 5];
const combined = [2, 4, ...odd, 6];
console.log(combined); // [2, 4, 1, 3, 5, 6]

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const mergedArray = [...arr1, ...arr2];
console.log(mergedArray); // 输出: [1, 2, 3, 4, 5, 6]


// 位于 odd 数组前面的三个点 ( ...) 是展开运算符。 展开运算符 (...) 解包 odd 数组的元素。
```

函数调用时传递数组作为参数：

```javascript
function sum(a, b, c) {
  return a + b + c;
}
const numbers = [1, 2, 3];
console.log(sum(...numbers)); // 输出: 6
```

## 对象属性展开

```javascript
const obj1 = { foo: 'bar', x: 42 };
const obj2 = { foo: 'baz', y: 13 };
const clonedObj = { ...obj1 };
console.log(clonedObj); // 输出: { foo: 'bar', x: 42 }
```

## apply() 方法

apply()是函数原型上的一个方法，它允许您调用一个函数，并指定该函数的this值以及作为数组（或类数组对象）提供的参数。

## 指定this上下文

```javascript
function greet() {
  console.log(`Hello, my name is ${this.name}`);
}
const person = { name: 'Alice' };
greet.apply(person); // 输出: Hello, my name is Alice
```

## 传递数组作为参数

```javascript
function sum(a, b, c) {
  return a + b + c;
}
const numbers = [1, 2, 3];
console.log(sum.apply(null, numbers)); // 输出: 6
```
<!-- 
sum.apply(null, numbers) 为什么要设置null
在JavaScript中，当您使用apply()方法调用一个函数时，第一个参数是可选的，它指定了函数运行时this的值。如果您不关心this的值，或者函数不依赖于特定的this上下文，则可以传递null或undefined作为第一个参数。

在sum.apply(null, numbers)这个例子中，sum函数很可能是一个不依赖于this上下文的纯函数。因此，传递null作为第一个参数是安全的，它不会影响函数的执行结果。实际上，在这个特定的情况下，您甚至可以省略第一个参数，直接调用sum.apply(numbers)，JavaScript引擎会自动将this设置为全局对象（在浏览器中是window对象，在Node.js中是global对象）或严格模式下的undefined。

然而，明确传递null或undefined作为this的值是一种良好的编程习惯，因为它使代码的意图更加清晰：您是在故意忽略this的值，而不是忘记了它。这样做还可以避免在将来修改函数时引入难以发现的错误，尤其是当函数的行为开始依赖于this上下文时。

 -->

## 展开运算符和 apply() 方法 比较与总结

| 特性 | 展开运算符 (...) | apply() 方法 |
| --- | --- | --- |
| 引入版本 | ES6 | ES3 |
| 主要用途 | 展开数组或对象 | 调用函数并设置this值，传递数组作为参数 |
| 语法简洁性 | 非常简洁，易于使用 | 相对复杂，需要调用函数的方法 |
| 适用场景 | 数组/对象合并，函数调用 | 函数调用，特别是需要设置this值时 |

## 使用数组的 push() 方法的更好方法示例

```javascript
let rivers = ['Nile', 'Ganges', 'Yangte'];
let moreRivers = ['Danube', 'Amazon'];

[].push.apply(rivers, moreRivers);
console.log(rivers);

// 等效于
rivers.push(...moreRivers);
```

## JavaScript 展开运算符和数组操作

1) 构建数组文字

```javascript
let initialChars = ['A', 'B'];
let chars = [...initialChars, 'C', 'D'];
console.log(chars); // ["A", "B", "C", "D"]
```

2) 连接数组

```javascript
let numbers = [1, 2];
let moreNumbers = [3, 4];
let allNumbers = [...numbers, ...moreNumbers];
console.log(allNumbers); // [1, 2, 3, 4]
```

3) 复制数组

```javascript
let scores = [80, 70, 90];
let copiedScores = [...scores];
console.log(copiedScores); // [80, 70, 90]
```

## JavaScript 展开运算符和字符串

```javascript
let chars = ['A', ...'BC', 'D'];
console.log(chars); // ["A", "B", "C", "D"]
//在此示例中，我们从单个字符串构造了 chars 数组。 当我们将展开运算符应用于 'BC' 字符串时，它将 'BC' 字符串的每个字符展开到单个字符中。
```
