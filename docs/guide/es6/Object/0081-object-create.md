# Object.create

- [Object.create](#objectcreate)
  - [语法](#语法)
  - [描述](#描述)
    - [用 Object.create() 实现类式继承](#用-objectcreate-实现类式继承)
    - [使用 Object.create() 的 propertyObject 参数](#使用-objectcreate-的-propertyobject-参数)
    - [显式指定 writable、enumerable 和 configurable](#显式指定-writableenumerable-和-configurable)
    - [使用 Object.create() 来模仿 new 运算符的行为](#使用-objectcreate-来模仿-new-运算符的行为)

## 语法

```javascript
Object.create(proto);
Object.create(proto, propertiesObject);
```

## 描述

`Object.create(proto)` 方法创建一个新对象，使用现有的对象作为新对象的原型。

- proto 必须是 null, {}, Object, 不是报错 TypeError。

### 用 Object.create() 实现类式继承

```javascript
// Shape——父类
function Shape() {
  this.x = 0;
  this.y = 0;
}

// 父类方法
Shape.prototype.move = function (x, y) {
  this.x += x;
  this.y += y;
  console.info("Shape moved.");
};

// Rectangle——子类
function Rectangle() {
  Shape.call(this); // 调用父类构造函数。
}

// 子类继承父类
Rectangle.prototype = Object.create(Shape.prototype, {
  // 如果不将 Rectangle.prototype.constructor 设置为 Rectangle，
  // 它将采用 Shape（父类）的 prototype.constructor。
  // 为避免这种情况，我们将 prototype.constructor 设置为 Rectangle（子类）。
  constructor: {
    value: Rectangle,
    enumerable: false,
    writable: true,
    configurable: true,
  },
});

const rect = new Rectangle();

console.log("rect 是 Rectangle 类的实例吗？", rect instanceof Rectangle); // true
console.log("rect 是 Shape 类的实例吗？", rect instanceof Shape); // true
rect.move(1, 1); // 打印 'Shape moved.'
```

### 使用 Object.create() 的 propertyObject 参数

Object.create() 方法还可以接受第二个参数，它是一个属性对象，用于指定新对象的属性。

1. configurable: 是否可以删除或修改属性。
2. enumerable: 是否可以枚举属性。
3. value: 属性的值。

默认情况下，属性是不可写、可枚举和可配置的。

```js
o = {};
// 等价于：
o = Object.create(Object.prototype);

o = Object.create(Object.prototype, {
  // foo 是一个常规数据属性
  foo: {
    value: "hello",
    writable: true,
    configurable: true,
    enumerable: true,
  },
  // bar 是一个访问器属性
  bar: {
    configurable: false,
    get() {
      return 10;
    },
    set(value) {
      console.log("Setting `o.bar` to", value);
    },
  },
});

// 创建一个新对象，它的原型是一个新的空对象，并添加一个名为 'p'，值为 42 的属性。
o = Object.create({}, { p: { value: 42 } });
```

```js
o = Object.create(null);
// 等价于：
o = Object.create(Object.prototype);
// 等价于
o = { __proto__: null };

// ---------------
o.p = 24; // 在严格模式下会报错
o.p; // 42

o.q = 12;
for (const prop in o) {
  console.log(prop);
}
// 'q'

delete o.p;
// false；在严格模式下会报错
```

### 显式指定 writable、enumerable 和 configurable

```js
o2 = Object.create(
  {},
  {
    p: {
      value: 42,
      writable: true,
      enumerable: true,
      configurable: true,
    },
  }
);
// 这与以下语句不等价：
// o2 = Object.create({ p: 42 })
// 后者将创建一个原型为 { p: 42 } 的对象。
```

### 使用 Object.create() 来模仿 new 运算符的行为

```js
function Constructor() {}
o = new Constructor();
// 等价于：
o = Object.create(Constructor.prototype);
```
