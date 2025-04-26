import jsonfile from 'jsonfile';
(() => {
    // function getFullName(person: {
    //     firstName: string;
    //     lastName: string
    // }) {
    //     return `${person.firstName} ${person.lastName}`;
    // }

    interface Person {
        firstName: string;
        lastName: string;
    }

    function getFullName(person: Person) {
        return `${person.firstName} ${person.lastName}`;
    }

    let person = {
        firstName: 'John',
        lastName: 'Doe'
    };

    console.log(getFullName(person));


    let jane = {
        firstName: 'Jane',
        middleName: 'K.',
        lastName: 'Doe',
        age: 22,
    };

    let fullName = getFullName(jane);
    console.log(fullName);


    interface PersonSubset {
        firstName: string;
        lastName: string;
        middleName?: string; // optional property
        readonly ssn: number; // readonly property
    };
    function getFullName2(person: PersonSubset) {
        if (person.middleName) {
            return `${person.firstName} ${person.middleName} ${person.lastName}`;
        }
        return `${person.firstName} ${person.lastName}`;
    }
    // 函数类型
    interface StringFormat {
        (str: string, isUpper: boolean): string
    }
    // 实现函数类型
    let format: StringFormat;

    format = function (str: string, isUpper: boolean) {
        return isUpper ? str.toLocaleUpperCase() : str.toLocaleLowerCase();
    };

    console.log(format('hi', true));

    let lowserCase: StringFormat;
    lowserCase = function (str: string, isUpper: boolean): string {
        console.log(isUpper)
        return str.toLowerCase();
    };
    console.log(lowserCase('hi', false));


    //类类型
    interface Json {
        toJson(): string
    }

    class JsonSub implements Json {
        constructor(private firstName: string, private lastName: string) { }
        toJson() {
            return JSON.stringify(this);
        }
    }

    let jsonSub = new JsonSub('John', 'Doe');
    console.log(jsonSub.toJson());

    // 扩展接口
    interface Mailable {
        send(email: string): boolean
        queue(email: string): boolean
    }
    interface FutureMailable extends Mailable {
        later(email: string, after: number): boolean
    }
    class Mail implements FutureMailable {
        later(email: string, after: number): boolean {
            console.log(`Send email to ${email} in ${after} ms.`);
            return true;
        }
        send(email: string): boolean {
            console.log(`Sent email to ${email} after ${after} ms. `);
            return true;
        }
        queue(email: string): boolean {
            console.log(`Queue an email to ${email}.`);
            return true;
        }
    }
    // 一个接口可以扩展多个接口
    interface A {
        a(): void
    }

    interface B extends A {
        b(): void
    }

    interface C {
        c(): void
    }

    interface D extends B, C {
        d(): void
    }
    //error
    class Control {
        private state: boolean;
    }
    // 接口继承类：当接口继承自一个类时，实现该接口的类必须也继承该类。
    interface StatefulControl extends Control {
        enable(): void
    }

    class Button extends Control implements StatefulControl {
        enable() { }
    }
    class TextBox extends Control implements StatefulControl {
        enable() { }
    }
    class Label extends Control { }


    // Error: cannot implement
    // class Chart implements StatefulControl { // 需要添加 extends Control
    //     enable() { }
    // }

    // 交集类型
    type typeA = string;
    type typeB = number;
    type typeAB = typeA & typeB; // string & number
    type typeAOrB = typeA | typeB; // string | number
    interface BusinessPartner {
        name: string;
        credit: number;
    }

    interface Identity {
        id: number;
        name: string;
    }

    interface Contact {
        email: string;
        phone: string;
    }

    type Employee = Identity & Contact;
    type Customer = BusinessPartner & Contact;

    let e: Employee = {
        id: 100,
        name: 'John Doe',
        email: '[email protected]',
        phone: '(408)-897-5684'
    };

    let c: Customer = {
        name: 'ABC Inc.',
        credit: 1000000,
        email: '[email protected]',
        phone: '(408)-897-5735'
    };
    type EmployeeAll = Identity & BusinessPartner & Contact;

    let e2: EmployeeAll = {
        id: 100,
        name: 'John Doe',
        email: '[email protected]',
        phone: '(408)-897-5684',
        credit: 1000
    };

    // 类型守卫 typeof instanceof
    // typeof 关键字 用来获取一个变量的类型
    // instanceof 关键字 用来判断一个变量是否属于某个类型
    type alphanumeric = string | number;

    function add(a: alphanumeric, b: alphanumeric) {
        if (typeof a === 'number' && typeof b === 'number') {
            return a + b;
        }

        if (typeof a === 'string' && typeof b === 'string') {
            return a.concat(b);
        }

        throw new Error('Invalid arguments. Both arguments must be either numbers or strings.');
    }
    class CustomerA {
        isCreditAllowed(): boolean {
            // ...
            return true;
        }
    }

    class SupplierA {
        isInShortList(): boolean {
            // ...
            return true;
        }
    }

    type BusinessPartnerA = CustomerA | SupplierA;

    function signContract(partner: BusinessPartner): string {
        let message: string;
        if (partner instanceof CustomerA) {
            message = partner.isCreditAllowed() ? 'Sign a new contract with the customer' : 'Credit issue';
        }

        if (partner instanceof SupplierA) {
            message = partner.isInShortList() ? 'Sign a new contract the supplier' : 'Need to evaluate further';
        }

        return message;
    }

    // 类型断言 as
    let price = '9.99';
    // let netPrice = price as number; // error 1) 编译时错误
    let el = document.querySelector('#name');
    let input = el as HTMLInputElement; //  2) 运行时错误
    console.log(input.value.length);
})()