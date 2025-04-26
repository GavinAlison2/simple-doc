// 泛型
(function () {
    console.log("111111111111111")
    function getRandomAnyElement(items: any[]): any {
        let randomIndex = Math.floor(Math.random() * items.length);
        return items[randomIndex];
    }

    let numbers = [1, 5, 7, 4, 2, 9];
    let colors = ['red', 'green', 'blue'];

    console.log(getRandomAnyElement(numbers));
    console.log(getRandomAnyElement(colors));
})();

(function () {
    console.log("22222222222222")
    function getRandomElement<T>(items: T[]): T {
        let randomIndex = Math.floor(Math.random() * items.length);
        return items[randomIndex];
    }
    let numbers = [1, 5, 7, 4, 2, 9];
    let colors = ['red', 'green', 'blue'];

    console.log(getRandomElement(numbers));
    console.log(getRandomElement(colors));

})();


(function () {
    console.log("3333333333333333")
    function merge<U, V>(obj1: U, obj2: V) {
        return {
            ...obj1,
            ...obj2
        };
    }

    let obj1 = { name: 'John', age: 30 };
    let obj2 = { city: 'New York', job: 'Developer' };
    console.log(merge(obj1, obj2));

})();

(function () {
    console.log("4444444444444444")
    // 泛型约束
    // 使用 extends 关键字将类型参数约束为特定类型。
    // 使用 extends keyof 来约束作为另一个对象属性的类型。
    function merge<U extends object, V extends object>(obj1: U, obj2: V) {
        return {
            ...obj1,
            ...obj2
        };
    }
    let person = merge(
        { name: 'John' },
        // 25 // 类型错误，第二个参数类型不匹配
        { age: 25 }
    );


    function prop<T, K extends keyof T>(obj: T, key: K) {
        return obj[key];
    }
    let str = prop({ name: 'John', age: 30 }, "name"); // John
    console.log(str)
})();

(function () {
    console.log("555555555555");
    // 泛型类
    class Stack<T> {
        private elements: T[] = [];

        constructor(private size: number) {
        }
        isEmpty(): boolean {
            return this.elements.length === 0;
        }
        isFull(): boolean {
            return this.elements.length === this.size;
        }
        push(element: T): void {
            if (this.elements.length === this.size) {
                throw new Error('The stack is overflow!');
            }
            this.elements.push(element);

        }
        pop(): T {
            if (this.elements.length == 0) {
                throw new Error('The stack is empty!');
            }
            return this.elements.pop();
        }
    }

    function randBetween(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    let stack = new Stack<number>(5);
    // stack.push(1);
    // stack.push(2);
    while (!stack.isFull()) {
        let n = randBetween(1, 10);
        console.log(`push ${n} into stack`);
        stack.push(n);
    }
    while (!stack.isEmpty()) {
        let n = stack.pop();
        console.log(`Pop ${n} from the stack.`);
    }
    let words = 'The quick brown fox jumps over the lazy dog'.split(' ');

    let wordStack = new Stack<string>(words.length);

    // push words into the stack
    words.forEach(word => wordStack.push(word));

    // pop words from the stack
    while (!wordStack.isEmpty()) {
        console.log(wordStack.pop());
    }

})();


(function () {
    console.log("66666666666666");
    interface interfaceName<T> {
        // ...
    }
    interface interfaceName2<U, V> {
        // ...
    }
    interface Pair<K, V> {
        key: K;
        value: V;
    }
    let month: Pair<string, number> = {
        key: 'Jan',
        value: 1
    };

    console.log(month);


    interface Collection<T> {
        add(item: T): void;
        remove(item: T): boolean;
        foreach(callback: (item: T) => void): void;
    }
    class List<T> implements Collection<T> {
        private items: T[] = [];

        add(item: T): void {
            this.items.push(item);
        }
        remove(item: T): boolean {
            const index = this.items.indexOf(item);
            if (index === -1) return false;
            this.items.splice(index, 1);
            return true;
        }
        foreach(callback: (item: T) => void): void {
            for (let i = 0; i < this.items.length; i++) {
                callback(this.items[i]);
            }
        }
    }
    let list = new List<number>();

    for (let i = 0; i < 10; i++) {
        list.add(i);
    }
    console.log('888888')
    list.foreach(item => console.log(item)); // 0 1 2 3 4 5 6 7 8 9
})();

(function () {
    // 索引签名
    // 索引签名的使用场景

    // 动态属性：当你不知道一个对象会有哪些属性，或者对象的属性是动态添加的时候，可以使用索引签名。
    // 灵活的对象结构：在处理来自外部源（如JSON对象）的数据时，索引签名可以提供一种灵活的方式来描述这些数据结构

    interface Options<T> {
        [name: string]: T;
    }
    let inputOptions: Options<boolean> = {
        'disabled': false,
        'visible': true
    }
    console.log(inputOptions.disabled)
    interface StringDirection<T> {
        [index: string]: T;
    }
    let myDict: StringDirection<string> = {
        'name': 'John',
        'age': '30'
    }

})();