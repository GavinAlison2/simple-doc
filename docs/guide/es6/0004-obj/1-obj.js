function test_method1() {
  const obj = Object.create(null);
  const obj2 = { __proto__: null };
  console.log(obj); // {}
  console.log(obj2); // {}
  console.log(obj.__proto__); // undefined
  console.log(obj2.__proto__);

  console.log("---------------");
  // Object.create(null)
  // 创建一个空对象，其原型为null。
  // 无法使用 Object.protorype.toString()方法
  const normalObj = {}; // 创建一个普通对象
  const nullProtoObj = Object.create(null); // 创建一个 "null" 原型对象

  console.log(`normalObj 是：${normalObj}`); // 显示 "normalObj 是：[object Object]"
  // console.log(`nullProtoObj 是：${nullProtoObj}`); // 抛出错误：Cannot convert object to primitive value

  // alter(normalObj); // 显示 [object Object]
  // alter(nullProtoObj); // 抛出错误：Cannot convert object to primitive value
  normalObj.valueOf(); // 显示 {}
  // nullProtoObj.valueOf(); // 抛出错误：nullProtoObj.valueOf is not a function

  normalObj.hasOwnProperty("p"); // 显示 "true"
  // nullProtoObj.hasOwnProperty("p"); // 抛出错误：nullProtoObj.hasOwnProperty is not a function

  console.log(normalObj.constructor.toString()); // 显示 "function Object() { [native code] }"
  console.log(nullProtoObj.constructor); // 显示 "undefined"

  console.log("---------");
  nullProtoObj.toString = Object.prototype.toString; // 由于新对象缺少 `toString` 方法，因此需要将原始的通用 `toString` 方法添加回来。

  console.log(nullProtoObj.toString()); // 显示 "[object Object]"
  console.log(`nullProtoObj 是：${nullProtoObj}`); // 显示 "nullProtoObj 是：[object Object]"

  console.log("---------");

  const ages = { alice: 18, bob: 27 };

  function hasPerson(name) {
    return name in ages;
  }

  function getAge(name) {
    return ages[name];
  }

  console.log(hasPerson("hasOwnProperty")); // true
  console.log(getAge("toString")); // [Function: toString]
  console.log("-----------");
  const ages_obj = Object.create(null, {
    alice: { value: 18, enumerable: true },
    bob: { value: 27, enumerable: true },
  });

  function hasPerson2(name) {
    return name in ages_obj;
  }

  function getAge2(name) {
    return ages_obj[name];
  }

  console.log(hasPerson2("hasOwnProperty")); // false
  console.log(getAge2("toString")); // undefined
}

console.log("-------------object()");
function test_obbject() {
  const obj = Object();
  console.log(obj); // {}
  console.log(typeof obj); // object
  console.log(obj.constructor); // function Object() { [native code] }
  console.log(obj.hasOwnProperty("constructor")); // false
  console.log(obj.hasOwnProperty("toString")); // false
  console.log(obj.hasOwnProperty("valueOf")); // false
  console.log(obj.hasOwnProperty("hasOwnProperty")); // false
  console.log("--------------new Object()");
  const obj2 = new Object();
  console.log(obj2); // {}
  console.log(typeof obj2); // object
  console.log(obj2.constructor); // function Object() { [native code] }
  const obj3 = new Object(null);
  console.log(obj3); // {}
  console.log(typeof obj3); // object
  console.log(obj3.constructor); // function Object() { [native code] }
  console.log(obj3.hasOwnProperty("constructor")); // false
  console.log("--------------new Object(1)");
  const obj4 = new Object(1);
  console.log(obj4); // [Number: 1]
  console.log(new Object(BigInt(1))); // [BigInt: 1n]

  console.log("--------------Object(); .foo=xx");
  const obj5 = Object();
  obj5.foo = 22;
  console.log(obj5); // {foo: 22}
  console.log("-----------new Object(undefined|null)");
  const obj6 = new Object(undefined);
  console.log("new Object(undefined):", obj6);
  const obj7 = new Object(null);
  console.log("new Object(null):", obj7);
  const numberobj = new Number(1);
  console.log(typeof numberobj); // object
  const bigintobj = Object(1n);
  console.log(typeof bigintobj); // object
  const symbolobj = Object(Symbol("foo"));
  console.log(typeof symbolobj); // object
}

function main() {
  // test_method1();
  test_obbject();
}

main();
