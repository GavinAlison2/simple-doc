# JavaScript rest 参数介绍

## ES6 提供了一种新的参数类型，称为 rest 参数，其前缀为三个点 (...)。
rest 参数允许您将无限数量的参数表示为一个数组。请参见以下语法

```javascript
function fn(a,b,...args) {
   //...
}

// function fn(a,...rest, b) {// 语法错误
//  // error
// }

function sum(...args) {
    let total = 0;
    for (const a of args) {
        total += a;
    }
    return total;
}

sum(1, 2, 3);// 6

console.log(sum(1, 2, 3));// 6


function sum2(...args) {
return args
    .filter(item => typeof item === 'number'))
    .reduce((acc, cur) => acc + cur);
}

let result = sum(10,'Hi',null,undefined,20); 
console.log(result);// 30
```

## 在 ES5 中，您必须使用Array.prototype.filter.call()

```javascript
function sum() {
  return Array.prototype.filter
    .call(arguments, function (e) {
      return typeof e === 'number';
    })
    .reduce(function (prev, curr) {
      return prev + curr;
    });
}


function filterBy(type, ...args) {
  return args.filter(function (e) {
    return typeof e === type;
  });
}
```

## JavaScript rest 参数和箭头函数

```javascript
const combine = (...args) => return args.reduce((prev, curr)=> prev + " " + curr);

let message = combine('Hello', 'World', '!'); // "Hello World !"

const sum = (...args) => args.reduce((acc, cur) => acc + cur);
console.log(sum(1, 2, 3)); // 6

// 使用箭头函数和rest参数的filterBy示例：
const filterBy = type => (...args) => args.filter(e => typeof e === type);

let result = filterBy('number')(10,'Hi',null,undefined,20);
console.log(result); // [10, 20]
```

## JavaScript rest 参数在动态函数中

```javascript
function dynamicFn(...args) {
  return function (...innerArgs) {
    return args.concat(innerArgs);
  };
}

let fn = dynamicFn('Hello', 'World');
console.log(fn()); // ['Hello', 'World']
console.log(fn('!', 'How')); // ['Hello', 'World', '!', 'How']


var showNumbers = new Function('...numbers', 'console.log(numbers)');
showNumbers(1, 2, 3); // [1, 2, 3]
```
