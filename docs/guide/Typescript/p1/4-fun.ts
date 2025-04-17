import { Counter } from "./counter";
let add1 = function (a: number, b: number): number {
    return a + b;
}

console.log(add1(1, 2))

function multiply(a: number, b: number, c?: number): number {
    if (typeof c !== 'undefined') {
        return a * b * c;
    }
    return a * b;
}


type Struct = {
    a: number;
    b: number;
    c?: number;
}
function structMultiply(s: Struct): number {
    if (typeof s.c !== 'undefined') {
        return s.a * s.b * s.c;
    }
    return s.a * s.b;
}

function defautFun(parameter1: string = "default") {
    return parameter1;
}
function defautFun2(parameter1: string = "default", ...rest: any[]) {
    return parameter1;
}

// 不能在函数类型定义中包含默认参数
// let promotion: (price: number, discount: number = 0.05) => number;
// type Struct2 = {
//     a: number = 2; // A type literal property cannot have an initializer.
//     b: number;
//     c?: number;
// }

// 具有多个类型的剩余参数
function combine(...args: (number | string)[]): [number, string] {
    let total = 0;
    let str = '';
    args.forEach((arg) => {
        if (typeof arg === 'number') {
            total += arg;
        } else if (typeof arg === 'string') {
            str += arg;
        }
    });

    return [total, str];
}

const [total2, str] = combine(3, 'Happy', 2, 1, ' New Year');

console.log({ total2 });
console.log({ str });

// 重载
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') {
        return a + b;
    } else if (typeof a === 'string' && typeof b === 'string') {
        return a + b;
    }
    throw new Error('Invalid arguments');
}

//  类里的重载

let counter2 = new Counter();

console.log("----------------")
console.log(counter2.count()); // return a number
console.log(counter2.count(5)); // return an array