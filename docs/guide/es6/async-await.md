# Async/Await

```javascript

/*
async：
用于声明一个异步函数。
异步函数会自动返回一个 Promise 对象。如果函数返回值不是 Promise，它会被自动包装成一个 resolved 的 Promise。

await：
只能在 async 函数内部使用。
用于等待一个 Promise 对象的状态变为 resolved（成功）或 rejected（失败）。
如果 Promise 成功，await 会返回 Promise 的结果值；如果 Promise 失败，await 会抛出异常（可以通过 try...catch 捕获）
*/

// 定义一个返回 Promise 的函数
function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Data fetched!');
        }, 1000);
    });
}

// 使用 async 和 await
async function getData() {
    console.log('Fetching data...');
    const result = await fetchData(); // 等待 Promise 完成
    console.log(result); // 输出: Data fetched!
}

getData();



// 示例 2：处理错误
async function fetchDataWithError() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('Error: Failed to fetch data!');
        }, 1000);
    });
}

async function getDataWithErrorHandling() {
    try {
        console.log('Fetching data...');
        const result = await fetchDataWithError(); // 等待 Promise 完成
        console.log(result); // 不会执行
    } catch (error) {
        console.error(error); // 输出: Error: Failed to fetch data!
    }
}

getDataWithErrorHandling();


// 3. 并行执行多个异步任务
// 如果需要同时执行多个异步任务，可以使用 Promise.all 结合 await。
async function fetchUserData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('User data fetched!');
        }, 1000);
    });
}

async function fetchProductData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Product data fetched!');
        }, 1500);
    });
}

async function getAllData() {
    console.log('Fetching all data...');
    const [userData, productData] = await Promise.all([
        fetchUserData(),
        fetchProductData(),
    ]);
    console.log(userData); // 输出: User data fetched!
    console.log(productData); // 输出: Product data fetched!
}

getAllData();

// 4. async 函数的返回值
// async 函数总是返回一个 Promise 对象。即使函数内部返回的是一个非 Promise 值，它也会被包装成一个 resolved 的 Promise。
async function returnValue() {
    return 'Hello, async!';
}

returnValue().then((result) => {
    console.log(result); // 输出: Hello, async!
});

// 5. await 的注意事项
// await 只能在 async 函数中使用，否则会报错。
// 如果 await 后面的表达式不是 Promise，它会自动转换为一个 resolved 的 Promise。
// 如果 await 的 Promise 被 reject，会抛出异常，需要使用 try...catch 捕获。

async function awaitNonPromise() {
    const result = await 42; // 42 会被转换为 Promise.resolve(42)
    console.log(result); // 输出: 42
}

awaitNonPromise();


// 6. 实际应用场景
// async 和 await 常用于以下场景：

// 从 API 获取数据。
// 读取文件或数据库操作。
// 任何需要等待异步操作完成的任务。
// 示例 6：从 API 获取数据

async function fetchUserFromAPI() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        const user = await response.json();
        console.log(user);
    } catch (error) {
        console.error(error);
    }
}

fetchUserFromAPI();

// 7. 总结
// async 用于声明异步函数，自动返回 Promise。
// await 用于等待 Promise 完成，只能在 async 函数中使用。
// 使用 try...catch 捕获 await 的异常。
// 结合 Promise.all 可以并行执行多个异步任务。


```