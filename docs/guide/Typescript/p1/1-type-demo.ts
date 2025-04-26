let counter: number = 0;
let t_name: string = 'John';
let age: number = 30;
let active: boolean = true;
let t_message: string = `Hello, my name is ${t_name} and I am ${age} years old.`;

let name_arr: string[] = ['John', 'Mary', 'Peter'];
let age_arr: number[] = [25, 30, 35];
let active_arr: boolean[] = [true, false, true];

let t_person: {
    name: string;
    age: number;
    active: boolean;
} = {
    name: 'John',
    age: 30,
    active: true
};

let greetings: (name: string) => string;
greetings = function (name: string) {
    return `Hello, ${name}!`
}

greetings('John')

let bin = 0b100; // binary
let octal: number = 0o10; // octal
let hexadecimal: number = 0XA; // hexadecimal
let anotherBin: number = 0B010;
let price = 9.95;
let big: bigint = 9007199254740991n; // for large numbers


let firstName: string = 'John'; // string
let title: string = "Web Developer";
let profile: string = `I'm ${firstName}. 
I'm a ${title}`; // string interpolation

let pending: boolean;
pending = true;
// after a while
// ..
pending = false;

// NOT operator
const pendings: boolean = true;
const notPending = !pendings; // false
let results = false;
console.log(results); // false

const hasError: boolean = false;
const completed: boolean = true;

// AND operator
let result: boolean = completed && hasError;
console.log(result); // false

// OR operator
result = completed || hasError;
console.log(result); // true



let employee: object;

employee = {
    firstName: 'John',
    lastName: 'Doe',
    age: 25,
    jobTitle: 'Web Developer'
};

console.log(employee);

// employee = "Jane"; //
// console.log(employee.hireDate);

let employee2: {
    firstName: string;
    lastName: string;
    age: number;
    jobTitle: string;
};
employee2 = {
    firstName: 'John',
    lastName: 'Doe',
    age: 25,
    jobTitle: 'Web Developer'
};
console.log(employee2)

let employee3: {
    firstName: string;
    lastName: string;
    age: number;
    jobTitle: string;
} = {
    firstName: 'John',
    lastName: 'Doe',
    age: 25,
    jobTitle: 'Web Developer'
};

let vacant: {};
// vacant.firstName = 'John';
let vacant2: {} = {};
console.log(vacant2.toString());
Object.assign(vacant2, { firstName: 'John' });
// vacant2.firstName = 'John';
console.log(vacant2.toString())
console.log(vacant2)


let skills: string[] = [];

skills[0] = "Problem Solving";
skills[1] = "Programming";

skills.push('Software Design');
let skills2 = ['Problem Sovling', 'Software Design', 'Programming'];

// skills.push(100);

let skill = skills[0];
console.log(typeof (skill));
// arr  forEach map filter reduce
let scores: (string | number)[] = ['Programming', 5, 'Software Design', 4];

let result2: unknown;
result2 = 1;
result2 = 'programming';
result2 = true;
result2 = null;
result2 = undefined
result2 = { name: 'John', age: 30 };
result2 = [1, 2, 3];
console.log(result2)

let result3: unknown;
result3 = [1, 2, 3];

// const total = result.reduce((a: number, b: number) => a + b, 0);// 需要使用 类型断言 明确告诉 TypeScript 编译器 result 的类型为 数组
// console.log(total);
const total = (result3 as number[]).reduce((a: number, b: number) => a + b, 0);
console.log(total);


const fetchData = async (url: string) => {
    // 发送网络请求获取数据
    const response = await fetch(url);
    // 将响应体解析为JSON格式的数据
    return response.json();
};
const showPosts = async () => {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    try {
        const posts = await fetchData(url);
        (posts as {
            userId: number;
            id: number;
            title: string;
            body: string;
        }[]).map((post) => {
            console.log(post.title)
        })
    } catch (error) {
        console.log(error)
    }
}
function format(value: unknown): void {
    switch (typeof value) {
        case 'string':
            console.log('String:', value.toUpperCase());
            break;
        case 'number':
            console.log('Number:', value.toFixed(2));
            break;
        default:
            console.log('Other types:', value);
    }
}
showPosts();

// 元组
// 元组是具有固定数量元素的数组，这些元素的类型是已知的。
let bgColor, headerColor: [number, number, number, number?];
bgColor = [0, 255, 255, 0.5];
headerColor = [0, 255, 255];