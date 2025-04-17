function getUsers(callback) {
    setTimeout(() => {
        callback([
        { username: 'john', email: '[email protected]' },
        { username: 'jane', email: '[email protected]' },
        ]);
    }, 1000);
}
function findUser(username, callback) {
    getUsers((users) => {
        const user = users.find((user) => user.username === username);
        callback(user);
    });
}

function getUsers2(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                { username: 'john', email: '[email protected]' },
                { username: 'jane', email: '[email protected]' },
            ]);
        }, 1000);
    });
}
// findUser('john', console.log);
async function findUser2(username) {
    const users = await getUsers2();
    const user = users.find((user) => user.username === username);
    // console.log(user);
    return user;
}
(async () => {
    console.log(findUser2('john'));
})();
// 通过将 getUsers 改为返回 Promise，并在 findUser2 中使用 async/await，可以更简洁地处理异步操作。同时，使用 IIFE（立即执行函数表达式）来确保 console.log 能够正确输出异步结果。
