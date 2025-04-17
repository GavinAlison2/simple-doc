//  access modifier
// private, public, protected 

class PersonVo {
    param: string;//public by default
    protected param2: string;//protected 
    readonly param3: string = 'readonly param';//readonly
    private ssn: string;
    private firstName: string;
    private lastName: string;
    constructor(ssn: string, firstName: string, lastName: string) {
        this.ssn = ssn;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    getFullName(): string { // public by default
        return `${this.firstName} ${this.lastName}`;
    }
}

class Sub extends PersonVo {
    getParam2(): string { // public by default
        return this.param2;
    }
}

let person = new PersonVo('153-07-3130', 'John', 'Doe');
// console.log(person.ssn); // compile error
console.log(person['ssn']); // 153-07-3130
console.log(person.param); // undefined
const sub = new Sub('153-07-3130', 'John', 'Doe');
console.log(sub.param); // undefined
console.log(sub.getParam2()); // undefined
console.log(sub['param2']); // undefined
console.log(sub.getFullName()); // John Doe

console.log(person.param3)
// person.param3 = 'new value'; // compile error

// readonly const的区别
// const修饰的变量不能被重新赋值，但是可以修改它的属性值。
// readonly修饰的变量不能被修改，但是可以修改它的属性值。
// 总结：readonly 可以在声明中活着同类的构造函数中初始化

