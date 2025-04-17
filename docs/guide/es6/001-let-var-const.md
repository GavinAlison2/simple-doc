# let 命令

## 简介

let 命令用于声明一个变量，该变量**只在 let 命令所在的代码块内有效**。
var, let, const
var: function-scoped or globally scoped
let: block-scoped
const: block-scoped, cannot be reassigned

## 基本用法

使用 let 关键字声明变量的新方法
只是这些变量是块级作用域

```javascript
let variable_name = 'value';
console.log(variable_name);


// 情况1
let x=10;
if(x===10){
    let x=20;
    console.log(x);// 20;  referecence x inside the block
}
console.log(x);// 10; reference x outside the block

// 情况2
var a =10;
console.log(a); //10
let b=20
console.log(b); // 20
```

## 不存在变量提升

```javascript
// 情况3
{
  let a = 10;
  var b = 1;
}
a // ReferenceError: a is not defined. 
b // 1 b 变量会提升， 给全局对象,window.b

// 情况4
// let for loop
for(let i=0;i<5;i++){
    console.log(i); // 0,1,2,3,4
}
for(var j=0;j<5;j++){
    setTimeout(function(){
        console.log(j); // 5,5,5,5,5 #var用的是全局作用域
        // 在全局范围内都有效，所以全局只有一个变量i
    },1000);
    console.log(j); // 0,1,2,3,4
}

// 情况5

// 在es5种，我们只有全局作用域和函数作用域
for(var i=0;i<5;i++){
    function close(i){
        setTimeout(function(){
            console.log(i); // 0,1,2,3,4
        },1000);
    }
    (function(j) {
        setTimeout(function( ){
            console.log(j); // 0,1,2,3,4
        },1000);
    })(i);
}

for(let i=0;i<5;i++){
    setTimeout(()=> console.log(i), 1000);
}

// 重新声明
// var 关键字允许您重新声明变量
// 使用 let 关键字重新声明变量会导致错误
let counter= 0;
// let counter;  // SyntaxError: Identifier 'counter' has already been declared

// let 变量和提升
// {
    // console.log(counter);
    // let counter = 10; // ReferenceError: Cannot access 'counter' before initialization
// }

```

## const

const声明一个只读的常量。一旦声明，常量的值就不能改变。

```javascript
const  PI = 3.14;
console.log(PI); // 3.14
const message = `Hello ${PI}`;
console.log(message); // Hello 3.14
const str = `
hello
world
`
console.log(str); // hello \n world


const foo; // SyntaxError: Missing initializer in const declaration
// 对于const来说，只声明不赋值，就会报错。
// const的作用域与let命令相同：只在声明所在的块级作用域内有效。
// const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。

if (true) {
  const MAX = 5;
}
MAX // Uncaught ReferenceError: MAX is not defined



```

- 对于const来说，只声明不赋值，就会报错。
- const的作用域与let命令相同：只在声明所在的块级作用域内有效。
- const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。
- 本质, 并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动
- 对于简单类型的数据, 值就保存在变量指向的那个内存地址，因此等同于常量。
- 但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针

```javascript
const foo = {};
// 为 foo 添加一个属性，可以成功
foo.prop = 123;
foo.prop // 123
// 将 foo 指向另一个对象，就会报错
foo = {}; // TypeError: "foo" is read-only


const a = [];
a.push('Hello'); // 可执行
a.length = 0;    // 可执行
a = ['Dave'];    // 报错

// 如果真的想将对象冻结，应该使用Object.freeze方法。
const foo = Object.freeze({});
// 常规模式时，下面一行不起作用；
// 严格模式时，该行会报错
foo.prop = 123; // 无效

// 除了将对象本身冻结，对象的属性也应该冻结。下面是一个将对象彻底冻结的函数。

var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, i) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};
```

## ES6 声明变量的六种方法

- var
- function
- let
- const
- import
- class


## 数字字面量的二进制和八进制表示法

```javascript
let bin=0b10;
console.log(bin); // 2
let oct=0o10;
console.log(oct);// 8

// const 不能被重新赋值
// PI = 3.1415; // TypeError: Assignment to constant variable.
```

## 暂时性死区

只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。

```javascript
var tmp = 123;
if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}
```
上面代码中，存在全局变量tmp，但是块级作用域内let又声明了一个局部变量tmp，导致后者绑定这个块级作用域，所以在let声明变量前，对tmp赋值会报错。

ES6 明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。

总之，在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。

```javascript
if (true) {
  // TDZ开始
  tmp = 'abc'; // ReferenceError
  console.log(tmp); // ReferenceError
  let tmp; // TDZ结束
  console.log(tmp); // undefined
  tmp = 123;
  console.log(tmp); // 123
}
```

上面代码中，在let命令声明变量tmp之前，都属于变量tmp的“死区”。

“暂时性死区”也意味着typeof不再是一个百分之百安全的操作。

```javascript
typeof x; // ReferenceError
let x;
```

上面代码中，变量x使用let命令声明，所以在声明之前，都属于x的“死区”，只要用到该变量就会报错。因此，typeof运行时就会抛出一个ReferenceError。

作为比较，如果一个变量根本没有被声明，使用typeof反而不会报错。

```javascript
typeof undeclared_variable // "undefined"
```

上面代码中，undeclared_variable是一个不存在的变量名，结果返回“undefined”。所以，在没有let之前，typeof运算符是百分之百安全的，永远不会报错。现在这一点不成立了。这样的设计是为了让大家养成良好的编程习惯，变量一定要在声明之后使用，否则就报错。

有些“死区”比较隐蔽，不太容易发现。

```javascript
function bar(x = y, y = 2) {
  return [x, y];
}
bar(); // 报错
```

上面代码中，调用bar函数之所以报错（某些实现可能不报错），是因为参数x默认值等于另一个参数y，而此时y还没有声明，属于“死区”。如果y的默认值是x，就不会报错，因为此时x已经声明了。

```javascript
function bar(x = 2, y = x) {
  return [x, y];
}
bar(); // [2, 2]
```

另外，下面的代码也会报错，与var的行为不同。
```javascript

// 不报错
var x = x;
// 报错
let x = x;
// ReferenceError: x is not defined
```
上面代码报错，也是因为暂时性死区。使用let声明变量时，只要变量在还没有声明完成前使用，就会报错。上面这行就属于这个情况，在变量x的声明语句还没有执行完成前，就去取x的值，导致报错”x 未定义“。

总之，暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。

## 不允许重复声明

let不允许在相同作用域内，重复声明同一个变量

```javascript
// 报错
function func() {
  let a = 10;
  var a = 1;
}
// 报错
function func() {
  let a = 10;
  let a = 1;
}

function func(arg) {
  let arg;
}
func() // 报错
function func(arg) {
  {
    let arg;
  }
}
func() // 不报错
```

## 块级作用域

```javascript
function f1() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n); // 5
}


```

### 块级作用域与函数声明

ES5 规定，函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明。

根据 ES5 的规定都是非法的。

```javascript
// 情况一
if (true) {
  function f() {} // SyntaxError错误
}
// 情况二
try {
  function f() {} // SyntaxError错误
} catch(e) {
  // ...
}
```

ES6 规定，块级作用域之中，函数声明语句的行为类似于let，在块级作用域之外不可引用。

```javascript
function f() { console.log('I am outside!'); }
(function () { //匿名立即执行函数表达式
  if (false) {
    // 重复声明一次函数f
    function f() { console.log('I am inside!'); }
  }
  f();
}()); 
```


```javascript
// 块级作用域内部的函数声明语句，建议不要使用
{
  let a = 'secret';
  function f() {
    return a;
  }
}
// 块级作用域内部，优先使用函数表达式
{
  let a = 'secret';
  let f = function () {
    return a;
  };
}

```

ES6 的块级作用域必须有大括号，如果没有大括号，JavaScript 引擎就认为不存在块级作用域。

```javascript
// 第一种写法，报错
if (true) let x = 1;
// 第二种写法，不报错
if (true) {
  let x = 1;
}
```
