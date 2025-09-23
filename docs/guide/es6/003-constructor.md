# constructor

- [constructor](#constructor)
  - [默认参数](#默认参数)
  - [参数与实参](#参数与实参)
  - [为函数设置 JavaScript 默认参数](#为函数设置-javascript-默认参数)

## 默认参数

默认函数参数允许您在没有值或 undefined 传递到函数时，将命名参数初始化为默认值。

```javascript
function say(message = "Hi") {
  console.log(message);
}

say(); // 'Hi'
say("Hello"); // 'Hello'
```

## 参数与实参

```javascript
function add(x, y) {
  return x + y;
}

add(100, 200);
```

## 为函数设置 JavaScript 默认参数

在 JavaScript 中，参数的默认值为 undefined。这意味着如果您没有将实参传递到 函数 中，其参数将具有 undefined 的默认值。

```javascript
function say(message) {
  // 使用 三元运算符 测试参数值
  message = typeof message !== "undefined" ? message : "Hi";
  console.log(message);
}

say(); // undefined
```

ES6 提供了一种更简单的方法来设置函数参数的默认值

```javascript
function fn(param1=default1, param2=default2,..) {
}
```

- 1. 传递 undefined 实参

```javascript
function createDiv(
  height = "100px",
  width = "100px",
  border = "solid 1px red"
) {
  let div = document.createElement("div");
  div.style.height = height;
  div.style.width = width;
  div.style.border = border;
  document.body.appendChild(div);
  return div;
}
createDiv(); // 默认值

createDiv(undefined, undefined, "solid 5px blue");
```

- 2. 评估默认参数

```javascript
function put(toy, toyBox = []) {
  toyBox.push(toy);
  return toyBox;
}

console.log(put("Toy Car"));
// -> ['Toy Car']
console.log(put("Teddy Bear"));
// -> ['Teddy Bear'], not ['Toy Car','Teddy Bear']
```

- 3. 使用函数

```javascript
function requiredArg() {
  throw new Error("The argument is required");
}
function add(x = requiredArg(), y = requiredArg()) {
  return x + y;
}

add(10); // error
add(10, 20); // OK
```

- 4. 在默认值中使用其他参数

```javascript
function add(x = 1, y = x, z = x + y) {
  return x + y + z;
}

console.log(add()); // 4
```

- 5. arguments 对象

```javascript
function add(x, y = 1, z = 2) {
  console.log(arguments.length);
  return x + y + z;
}

add(10); // 1
add(10, 20); // 2
add(10, 20, 30); // 3
```
