import "reflect-metadata";
// 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器 , 类装饰器
function f() {
    console.log("f(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("f(): called");
    }
}

function g() {
    console.log("g(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("g(): called");
    }
}

class C {
    // 方法装饰器
    @f()
    @g()
    method() { }
}

// ========================类装饰器

// 类装饰器(@sealed)的例子，应用在Greeter类
// 该装饰器会使类的构造函数和原型对象不可扩展，即无法添加新的属性
// 类定义的时候就会执行
function sealed(constructor: Function) {
    console.log("sealed: function")
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
// const gx = new Greeter("world");
// console.log(gx.greet()); // "Hello, world"

console.log("111111111111111111")
function classDecorator<T extends { new(...args: any[]): {} }>(constructor: T) {
    console.log("classDecorator: function")
    return class extends constructor {
        newProperty = "new property";
        hello = "override";
    }
}

@classDecorator
class Greeter2 {
    property = "property";
    hello: string;
    constructor(m: string) {
        this.hello = m;
    }
}

console.log(new Greeter2("world"));


console.log("2222222222222")

// ========================方法装饰器(@enumerable(false))
class Greeter3 {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }

    @enumerable(false)
    greet() {
        return "Hello, " + this.greeting;
    }
}

function enumerable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("target:" + JSON.stringify(target));
        console.log("propertyKey:" + propertyKey);
        console.log("descriptor:" + JSON.stringify(descriptor));
        descriptor.enumerable = value;
    };
}
// {
//     "writable": true, // 布尔值，表示属性值是否可以被修改。这里为 true，表示属性值可以被修改。
//     "enumerable": false,//布尔值，表示属性是否可枚举。这里为 false，表示属性默认不可枚举，即在 for...in 循环或 Object.keys 方法中不会被列出。
//     "configurable": true // 布尔值，表示属性的描述符是否可以被修改，以及属性是否可以被删除。这里为 true，表示描述符可以被修改，属性也可以被删除。
// }

console.log(new Greeter3('tommy').greet()); // "Hello, tommy"

// ========================访问器装饰器
class Point {
    private _x: number;
    private _y: number;
    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    @configurable(false)
    get x() { return this._x; }

    @configurable(false)
    get y() { return this._y; }
}
function configurable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("configurable function called: " + propertyKey + ", value: " + value)
        descriptor.configurable = value;
    };
};


console.log("-------------------------");
// ==================属性装饰器

// (function () {
const formatMetadataKey = Symbol("format");

function format(formatString: string) {
    console.log("format function called: " + formatString)
    console.log("format function called: formatMetadataKey: " + JSON.stringify(formatMetadataKey))
    return Reflect.metadata(formatMetadataKey, formatString);
}

function getFormat(target: any, propertyKey: string) {
    console.log("getFormat function called: propertyKey: " + propertyKey)
    console.log("getFormat function called: formatMetadataKey: " + JSON.stringify(formatMetadataKey))
    console.log("getFormat function called: target: " + JSON.stringify(target))
    return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}

class Greeter4 {
    @format("Hello, %s")
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        let formatString = getFormat(this, "greeting");
        console.log("formatString: " + formatString);
        return formatString.replace("%s", this.greeting);
    }
}

console.log(new Greeter4("world").greet()); // "Hello, world"
// })();

console.log("=======================")
//参数装饰器

import "reflect-metadata";

const requiredMetadataKey = Symbol("required");

function required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
    console.log("target: " + JSON.stringify(target))
    console.log("propertyKey: " + JSON.stringify(propertyKey))
    console.log("parameterIndex: " + JSON.stringify(parameterIndex))
    let existingRequiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
    console.log("existingRequiredParameters: " + JSON.stringify(existingRequiredParameters));
    existingRequiredParameters.push(parameterIndex);
    Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, propertyKey);
}

function validate(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
    let method = descriptor.value;
    console.log("validate function called: method: " + method)
    descriptor.value = function () {
        let requiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName);
        console.log("validate function called: requiredParameters: " + JSON.stringify(requiredParameters))
        if (requiredParameters) {
            for (let parameterIndex of requiredParameters) {
                if (parameterIndex >= arguments.length || arguments[parameterIndex] === undefined) {
                    throw new Error("Missing required argument.");
                }
            }
        }

        return method.apply(this, arguments);
    }
}
class Greeter5 {
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }

    @validate
    greet(@required name: string) {
        return "Hello " + name + ", " + this.greeting;
    }
}

console.log(new Greeter5("world").greet("tommy")); // "Hello tommy, world"
// console.log(new Greeter5("world").greet(undefined)); // Error: Missing required argument.



console.log("000000000000000000000000000")

import "reflect-metadata";

// 元数据
// (function () {
class Pointx {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

class Line {
    private _p0: Pointx; // 初始化为 null
    private _p1: Pointx; // 初始化为 null

    @validate2
    @Reflect.metadata("design:type", Pointx)
    set p0(value: Pointx) { this._p0 = value; }
    get p0() { return this._p0; }

    @validate2
    @Reflect.metadata("design:type", Pointx)
    set p1(value: Pointx) { this._p1 = value; }
    get p1() { return this._p1; }
}

function validate2<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>) {
    let set = descriptor.set;
    // console.log("validate2 function called: target: " + JSON.stringify(target));
    // console.log("validate2 function called: propertyKey: " + JSON.stringify(propertyKey));
    // console.log("validate2 function called: descriptor: " + JSON.stringify(descriptor));
    // console.log("validate2 function called: set: " + set);
    descriptor.set = function (value: T) {
        let type = Reflect.getMetadata("design:type", target, propertyKey);
        if (!(value instanceof type)) {
            throw new TypeError("Invalid type.");
        }
        set.call(this, value);
    };
}

let line = new Line();
let p0 = new Pointx(1, 2); // OK
line.p0 = p0;

if (line.p0) {
    console.log(line.p0.x);
}


// })();