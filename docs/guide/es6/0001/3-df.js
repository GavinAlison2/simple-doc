let success = false;
function getUsers() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (success) {
                throw new Error("Failed to get the user list");
                resolve([
                    { name: 'John', age: 25 },
                    { name: 'Jane', age: 30 },
                    { name: 'Bob', age: 35 }
                ]);
            } else {
                reject("Failed to the user list");
            }
        }, 1000);
    });
}

function onFullfilled(users) {
    console.log(users);
}

function onRejected(error) {
    console.log(error);
}

const promise = getUsers();
// promise.then(onFullfilled);
// promise.then((users) => console.log(users));
promise.then(onFullfilled, onRejected);
promise.catch(onRejected);


const render = () => {
    //...
};
