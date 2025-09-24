# Object.freeze()

The `Object.freeze()` method is used to make an object immutable. Once an object is frozen, it cannot be changed.

静态方法可以使一个对象被冻结。冻结对象可以防止扩展，并使现有的属性不可写入和不可配置

```js
const obj = {
  prop: 42,
};

Object.freeze(obj);

obj.prop = 33;
// Throws an error in strict mode

console.log(obj.prop);
// Expected output: 42
```

```js
Object.freeze(new Uint8Array(0)); // 没有元素
// Uint8Array []

Object.freeze(new Uint8Array(1)); // 有元素
// TypeError: Cannot freeze array buffer views with elements

Object.freeze(new DataView(new ArrayBuffer(32))); // 没有元素
// DataView {}

Object.freeze(new Float64Array(new ArrayBuffer(64), 63, 0)); // 没有元素
// Float64Array []

Object.freeze(new Float64Array(new ArrayBuffer(64), 32, 2)); // 有元素
// TypeError: Cannot freeze array buffer views with elements
```

## 冻结对象

```js
const obj = {
  prop() {},
  foo: "bar",
};

// 冻结前：可以添加新属性，也可以更改或删除现有属性
obj.foo = "baz";
obj.lumpy = "woof";
delete obj.prop;

// 冻结。
const o = Object.freeze(obj);

// 返回值和我们传入的对象相同。
o === obj; // true

// 对象已冻结。
Object.isFrozen(obj); // === true

// 现在任何更改都会失败。
obj.foo = "quux"; // 静默但什么都没做
// 静默且没有添加属性
obj.quaxxor = "the friendly duck";

// 严格模式下，这样的尝试会抛出 TypeError
function fail() {
  "use strict";
  obj.foo = "sparky"; // 抛出 TypeError
  delete obj.foo; // 抛出 TypeError
  delete obj.quaxxor; // 返回 true，因为属性‘quaxxor’从未被添加过。
  obj.sparky = "arf"; // 抛出 TypeError
}

fail();

// 尝试通过 Object.defineProperty 更改；
// 下面的两个语句都会抛出 TypeError。
Object.defineProperty(obj, "ohai", { value: 17 });
Object.defineProperty(obj, "foo", { value: "eit" });

// 同样无法更改原型
// 下面的两个语句都会抛出 TypeError。
Object.setPrototypeOf(obj, { x: 20 });
obj.__proto__ = { x: 20 };
```

## 冻结数组

```js
const a = [0];
Object.freeze(a); // 数组现在开始无法被修改

a[0] = 1; // 静默失败

// 严格模式下，这样的尝试将抛出 TypeError
function fail() {
  "use strict";
  a[0] = 1;
}

fail();

// 尝试在数组末尾追加元素
a.push(2); // 抛出 TypeError
```

```js
const obj1 = {
  internal: {},
};

Object.freeze(obj1);
obj1.internal.a = "aValue";

obj1.internal.a; // 'aValue'
```

deep freeze

```js
function deepFreeze(object) {
  // 获取对象的属性名
  const propNames = Reflect.ownKeys(object);

  // 冻结自身前先冻结属性
  for (const name of propNames) {
    const value = object[name];

    if ((value && typeof value === "object") || typeof value === "function") {
      deepFreeze(value);
    }
  }

  return Object.freeze(object);
}

const obj2 = {
  internal: {
    a: null,
  },
};

deepFreeze(obj2);

obj2.internal.a = "anotherValue"; // 非严格模式下会静默失败
obj2.internal.a; // null
```
