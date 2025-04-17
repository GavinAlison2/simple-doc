import { register } from '../project/ts-vote-app/voting-system-frontend/src/services/api';
function add(a: number | string, b: number | string): any {
    function add(a: any, b: any) {
        if (typeof a === 'number' && typeof b === 'number') {
            return a + b;
        }
        if (typeof a === 'string' && typeof b === 'string') {
            return a.concat(b);
        }
        throw new Error('Parameters must be numbers or strings');
    }
}

let result: number | string;
result = 10;
result = 'hello';
// result = false; // Error: Parameter must be numbers or strings


// 类型别名

type Name = string;
let firstName: Name = 'John';
let lastName: Name = 'Doe';
// let age: Name = 30; // Error: Type 'number' is not assignable to type 'Name'.

type Person = {
    name: Name;
    age: number;
};
let person: Person = {
    name: 'John',
    age: 30
}
// person.name = 30; // Error: Type 'number' is not assignable to type 'Name'.

// 联合类型

type NameOrAge = Name | number;
let nameOrAge: NameOrAge = 'John';
nameOrAge = 30;

type PersonOrNumber = Person | number;
let personOrNumber: PersonOrNumber = {
    name: 'John',
    age: 30
}
personOrNumber = 10;
// 交叉类型
type Personal = {
    name: string;
    age: number;
};

type Contact = {
    email: string;
    phone: string;
};

type Candidate = Personal & Contact;

let candidate: Candidate = {
    name: "Joe",
    age: 25,
    email: "[email protected]",
    phone: "(408)-123-4567"
};

// 字符串字面量类型
let click: 'click';
click = 'click';
// click = 'doubleClick'; // Error: Type '"doubleClick"' is not assignable to type '"click"'.

let moustEvent: 'click' | 'doubleClick' | 'mouseup' | 'mousedown';
moustEvent = 'click';
moustEvent = 'doubleClick';
moustEvent = 'mouseup';
moustEvent = 'mousedown';
// moustEvent = 'mousemove'; // Error: Type '"mousemove"' is not assignable to type '"click" | "doubleClick" | "mouseup" | "mousedown"'.

// never 类型
// 就是一种不可达到的状态, 不能赋值, 也不能赋值给其他类型
// let my_empty: never = 'hello' // Error: Type 'string' is not assignable to type 'never'.
type alp = string & number; // Error: Type 'string' is not assignable to type 'number'.

function raiseError(message: string): never {
    throw new Error(message);
}

function forever(): never {
    while (true) {
        // do something
    }
}

type Role = 'admin' | 'user';
const authorize = (role: Role) => {
    if (role === 'admin') {
        // do something
    } else if (role === 'user') {
        // do something
    } else {
        const _unreacheable: never = role; // Error: Type 'never' is not assignable to type 'never'.
        throw new Error(`Invalid role: ${role}`);
    }
}



// 类型保护

function isName(value: NameOrAge): value is Name {
    return typeof value === 'string';
}

if (isName(nameOrAge)) {
    console.log(nameOrAge.toUpperCase());
} else {
    console.log(nameOrAge);
}

// 类型断言

let value: any = 'hello';
let str = value as string;
// let num = value as number; // Error: Type 'string' is not assignable to type 'number'.
interface IContact {
    email: string;
    phone: string;
};
// 类型别名与接口的区别

// 1. 类型别名可以给一个类型起一个新名字，而接口只能描述一个对象。
// 2. 类型别名可以与其他类型组合使用，而接口只能描述一个对象。
// 3. 类型别名可以有自己的属性和方法，而接口只能描述公共属性和方法。
// 4. 类型别名可以被赋值，而接口不能。
// 5. 类型别名可以被 extends 继承，而接口只能被 implements 实现。
// 6. 类型别名可以被 typeof 运算符操作，而接口不能。
// 7. 类型别名可以被 keyof 运算符操作，而接口不能。
// 8. 类型别名可以被映射类型操作，而接口不能。
// 9. 类型别名可以被索引访问操作，而接口不能。
// 10. 类型别名可以被条件类型操作，而接口不能。
// 11. 类型别名可以被泛型操作，而接口不能。
// 12. 类型别名可以被声明合并，而接口不能。
// 13. 类型别名可以被递归地比较，而接口不能。
// 14. 类型别名可以被索引签名操作，而接口不能。
// 15. 类型别名可以被构造签名操作，而接口不能。
// 16. 类型别名可以被函数签名操作，而接口不能。
// 17. 类型别名可以被推断，而接口不能。
// 18. 类型别名可以被联合类型操作，而接口不能。
// 19. 类型别名可以被交叉类型操作，而接口不能。
// 20. 类型别名可以被字面量类型操作，而接口不能。
// 21. 类型别名可以被类型保护操作，而接口不能。
// 22. 类型别名可以被类型别名操作，而接口不能。
// 23. 类型别名可以被类型断言操作，而接口不能。
// 24. 类型别名可以被类型查询操作，而接口不能。
