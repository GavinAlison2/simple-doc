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
    private _p0: Pointx | null = null; // 初始化为 null
    private _p1: Pointx | null = null; // 初始化为 null

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

console.log(line.p0.x); // 1


//  注意点， 反射工具类 Reflect 必须在全局作用域中使用， 否则会报错。
// import "reflect-metadata";
// @Reflect.metadata() 方法的使用， 该方法可以为指定对象添加元数据， 元数据可以是任何值。
// Reflect.defineMetadata() 方法的使用， 该方法可以为指定对象指定属性添加元数据。
// Reflect.hasMetadata() 方法的使用， 该方法可以判断指定对象是否存在指定属性的元数据。
// Reflect.getMetadataKeys() 方法的使用， 该方法可以获取指定对象所有元数据的键名。
// Reflect.getMetadata() 方法的使用， 该方法可以获取指定对象的指定属性的元数据，
// Reflect.deleteMetadata() 方法的使用， 该方法可以删除指定对象的指定属性的元数据。
// 元数据可以用于很多方面， 比如数据校验、缓存、事件通知、依赖注入等。


