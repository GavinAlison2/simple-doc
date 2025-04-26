import fetch from 'node-fetch';

fetch('https://jsonplaceholder.typicode.com/todos/1') // promise
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(error => console.error('Error:', error))
    .finally(() => console.log('Completed!'));


async function f() {
    console.log('f');
    const repsonse = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const json = await repsonse.json();
}
f();

async function f2() {
    const promiseA = fetch('https://jsonplaceholder.typicode.com/todos/1');
    const promiseB = fetch('https://jsonplaceholder.typicode.com/todos/2');
    const [a, b] = await Promise.all([promiseA, promiseB]);
}

f2();

// await someAsyncOperation();//  await is only valid in async function
async function f3() {
    await someAsyncOperation();
}

f3();

(async () => {
    await someAsyncOperation();
})();




