const obj1 = { a: 0, b: { c: 0 } };
const obj2 = Object.assign({}, obj1);
console.log(obj1); // {a: 0, b: {c: 0}}
console.log(obj2); // {a: 0, b: {c: 0}}
console.log("-----------obj1.a = 1");
obj1.a = 1;
console.log(obj1); // {a: 1, b: {c: 0}}
console.log(obj2); // {a: 0, b: {c: 0}}
console.log("-----------obj2.a = 2");
obj2.a = 2;
console.log(obj1); // { a: 1, b: { c: 0 } }
console.log(obj2); // { a: 2, b: { c: 0 } }
console.log("-----------obj2.b.c = 3");
obj2.b.c = 3;
console.log(obj1); // { a: 1, b: { c: 3 } }
console.log(obj2); // { a: 2, b: { c: 3 } }
// deep copy
console.log("-----------deep copy");
const obj3 = { a: 0, b: { c: 0 } };
const obj4 = JSON.parse(JSON.stringify(obj3));
obj3.a = 4;
obj3.b.c = 4;
console.log(obj3); // { a: 4, b: { c: 4 } }
console.log(obj4); // { a: 0, b: { c: 0 } }
console.log("------------ copy symbol property");
const o1 = { a: 1 };
const o2 = { [Symbol("foo")]: 2 };

const obj = Object.assign({}, o1, o2);
console.log(obj); // { a : 1, [Symbol("foo")]: 2 } (cf. bug 1207182 on Firefox)
Object.getOwnPropertySymbols(obj); // [Symbol(foo)]
console.log("------------ un enumerable property not copied");
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

console.log("------------");
const v1 = "abc";
const v2 = true;
const v3 = 10;
const v4 = Symbol("foo");

const obj_wrap = Object.assign({}, v1, null, v2, undefined, v3, v4);
// 基本类型将被封装，null 和 undefined 将被忽略。
// 注意，只有字符串封装对象才拥有可枚举的自有属性。
console.log(obj_wrap); // { "0": "a", "1": "b", "2": "c" }
console.log("------------------");
const target = Object.defineProperty({}, "foo", {
  value: 1,
  writable: false,
}); // target.foo 是一个只读属性

// Object.assign(target, { bar: 2 }, { foo2: 3, foo: 3, foo3: 3 }, { baz: 4 });
// Cannot assign to read only property 'foo' of object '#<Object>'
// TypeError: "foo" is read-only
// 这个异常会在给 target.foo 赋值的时候抛出
Object.assign(target, { bar: 2 }, { foo2: 3, foo3: 3 }, { baz: 4 });

console.log(target.bar); // 2，第一个源对象成功复制。
console.log(target.foo2); // 3，第二个源对象的第一个属性也成功复制。
// console.log(target.foo || null); // 1，异常在这里被抛出 , Cannot assign to read only property 'foo' of object '#<Object>'
console.log(target.foo3); // 3，属性赋值已经结束，foo3 不会被复制
console.log(target.baz); // 4，第三个源对象也不会被复制
