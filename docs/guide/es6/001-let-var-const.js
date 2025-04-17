/**
 * var, let, const
 * var: function-scoped or globally scoped
 * let: block-scoped
 * const: block-scoped, cannot be reassigned
 */

// 使用 let 关键字声明变量的新方法
// 只是这些变量是块级作用域
let variable_name = 'value';
console.log(variable_name);


let x=10;
if(x===10){
    let x=20;
    console.log(x);// 20;  referecence x inside the block
}
console.log(x);// 10; reference x outside the block

var a = 10;
console.log(a); //10
let b=20
console.log(b); // 20

// let for loop
for(let i=0;i<5;i++){
    console.log(i); // 0,1,2,3,4
}
for(var j=0;j<5;j++){
    setTimeout(function(){
        console.log(j); // 5,5,5,5,5
    },1000);
    console.log(j); // 0,1,2,3,4
}
// 
// 在es5种，我们只有全局作用域和函数作用域
for(var i=0;i<5;i++){
    function close(i){
        setTimeout(function(){
            console.log(i); // 0,1,2,3,4
        },1000);
    }
    (function(j) {
        setTimeout(function( ){
            console.log(j); // 0,1,2,3,4
        },1000);
    })(i);
}
// 
for(let i=0;i<5;i++){
    setTimeout(()=> console.log(i), 1000);
}
// 
// 重新声明
// var 关键字允许您重新声明变量
// 使用 let 关键字重新声明变量会导致错误
let counter= 0;
// let counter;  // SyntaxError: Identifier 'counter' has already been declared
// 
// let 变量和提升
// {
    // console.log(counter);
    // let counter = 10; // ReferenceError: Cannot access 'counter' before initialization
// }
// 
// 
// const
// 
const  PI = 3.14;
console.log(PI); // 3.14
const message = `Hello ${PI}`;
console.log(message); // Hello 3.14
const str = `
hello
world
`
console.log(str); // hello \n world
// 
let bin=0b10;
console.log(bin); // 2
let oct=0o10;
console.log(oct);// 8
// 
// const 不能被重新赋值
// PI = 3.1415; // TypeError: Assignment to constant variable.




