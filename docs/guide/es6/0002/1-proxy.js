const user = {
    firstName: 'John',
    lastName: 'Doe',
    email: '[email protected]'
}

const handler = {
    get(target, propName) {
        if (propName === 'email') {
            return '[email protected]';
        }
        if (propName === 'fullName') {
            return `${target.firstName} ${target.lastName}`;
        }
        return target[propName];
    },

    set(target, property, value) {
        if (property === 'age') {
            if (typeof value !== 'number') {
                throw new Error('Age must be a number.');
            }
            if (value < 18) {
                throw new Error('The user must be 18 or older.')
            }
        }
        target[property] = value;
    },
    // apply(target, thisArg, argumentsList) {

    // }
}

const proxyUser = new Proxy(user, handler);

console.log(proxyUser.firstName); // John
console.log(proxyUser.lastName); // Doe
console.log(proxyUser.email); // [email protected]
console.log(proxyUser.fullName); // John Doe
proxyUser.age = 20;
console.log(proxyUser.age); // 20
// proxyUser.age = 'foo';
// Error: Age must be a number.

// --------------------------
const user2 = {
    firstName: 'John',
    lastName: 'Doe',
    email: '[email protected]'
}
const getFullName = function (user) {
    return `${user.firstName} ${user.lastName}`;
}

const getFullNameProxy = new Proxy(getFullName, {
    apply(target, thisArg, argumentsList) {
        return target.apply(thisArg, argumentsList).toUpperCase();
    }
});

console.log(getFullNameProxy(user2)); // JOHN DOE


