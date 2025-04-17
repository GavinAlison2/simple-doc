let add = (x,y)=> x+y;
console.log(add(2,3)); // 5

console.log(typeof add); // function


let numbers = [4,2,6,1,3,5];
numbers.sort((a,b)=> a-b);
console.log(numbers); // [1, 2, 3, 4, 5, 6]

numbers.sort(function(a, b){
    return b-a;
})
console.log(numbers); // [6, 5, 4, 3, 2, 1]

// 单个参数的箭头函数
let names = ['Tom', 'Jerry', 'Kitty'];
let lengths = names.map(name => name.length);
console.log(lengths); // [3, 5, 5]
// 无参数的箭头函数
let sayHello = () => console.log('Hello');
sayHello(); // Hello

// 箭头函数和对象字面量

let setColor = color => ({value: color});
console.log(setColor('red')); // {value: 'red'}


// 箭头函数和 this 值
let obj = {
    count: 0,
    start: function(){
        setTimeout(() => {
            this.count++;
            console.log(this.count); // 1
        }, 1000);
    }
}
obj.start();

function Car(){
    this.speed = 0;
    this.speedUp = function(speed) {
        this.speed = speed
        setTimeout(function(){
            // 这里不能用箭头函数，因为箭头函数不绑定自己的this值，而是继承父作用域的this值。
            // 因此这里的this指向的是全局对象，而不是Car实例。
            // 所以这里的this.speed会是undefined。
            console.log("----------------1")
            console.log(this); // Window
            console.log(this.speed); // undefined
            
        }, 1000);
        // console.log(this.speed);
        let that = this;
        setTimeout(function(){
            console.log("----------------2") 
            console.log(that);// Car { speed: 50, speedUp: [Function (anonymous)] }
            console.log(that.speed); // 50
        },1000)
        
        setTimeout(()=>{
            console.log("----------------3")
            console.log(this);// Car { speed: 50, speedUp: [Function (anonymous)] }
            console.log(this.speed); // 50
        },1000)
    }
}

let car = new Car();
car.speedUp(50);

// 箭头函数和 arguments
// 箭头函数没有 arguments 对象，但是可以通过 rest 参数获取所有参数
function show() {
    //show 函数返回一个新的箭头函数 x => x + arguments[0]。这个箭头函数接受一个参数 x，并返回 x 加上 show 函数被调用时传递的第一个参数的值
    return x => x + arguments[0]; 
}

let display = show(10, 20);
let result = display(5);
console.log(result); // 15

// 箭头函数和 new
// 箭头函数没有 new.target 关键字

// 箭头函数和 prototype 属性
// 箭头函数没有 prototype 属性
// 箭头函数不能用作构造函数，不能使用 new 关键字调用
function dump(message) {
    console.log(message);
}
console.log(dump.hasOwnProperty('prototype')); // true

let dump1 = message => console.log(message);
console.log(dump1.hasOwnProperty('prototype')); // false

