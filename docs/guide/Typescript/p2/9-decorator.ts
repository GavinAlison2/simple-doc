//  装饰器
// 装饰器的基本概念
// 定义：装饰器是一种特殊类型的声明，它能够被附加到类声明、方法、
// 访问器、属性或参数上。装饰器使用@expression这种形式，
// expression必须求值为一个函数，它会在运行时被调用，
// 被装饰的声明信息作为参数传入

// 装饰器的使用

// 类装饰器：用于修改类的构造函数或类的属性。
// 属性装饰器：用于观察或修改类的属性。
// 方法装饰器：用于修改类的方法的行为。
// 参数装饰器：用于修改类的方法的参数。

// tsconfig.json中需要开启experimentalDecorators和emitDecoratorMetadata选项
// experimentalDecorators: true,
// emitDecoratorMetadata: true,

import "reflect-metadata";
// 类装饰器
/**
 * 封闭构造函数及其原型对象，防止对其进行修改。
 *
 * @param constructor 需要封闭的构造函数
 */
function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

@sealed
class Greeter {
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }

    greet() {
        return "Hello, " + this.greeting;
    }
}

const greeter = new Greeter("world");
// console.log(greeter.greet()); // Hello, world


// 属性装饰器
function logPropertyAccess(target: any, propertyName: string) {
    // 用于保存原始值
    let value: any;

    // 定义 getter 和 setter
    const getter = function () {
        console.log(`Get: ${propertyName} => ${value}`);
        return value;
    };

    const setter = function (newVal: any) {
        console.log(`Set: ${propertyName} => ${newVal}`);
        value = newVal;
    };

    // 使用 Object.defineProperty 来定义 getter 和 setter
    Object.defineProperty(target, propertyName, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true,
    });
}

class PersonX {
    // 这里的装饰器可以正常工作
    @logPropertyAccess
    name: string;

    constructor() {
        // 构造函数可以保持为空
        // 在构造函数中初始化属性值，可以是默认值
        this.name = "";  // 或者你可以赋其他任何默认值
    }

    initialize(name: string) {
        this.name = name;  // 此时会触发 setter
    }
}

console.log("----------------");
const p = new PersonX();
p.initialize("Tom"); // Set: name => Tom
p.name = "Jerry"; // Set: name => Jerry
console.log(p.name); // Get: name => Jerry