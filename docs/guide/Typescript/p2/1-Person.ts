interface PersonType {
    ssn: string;
    firstName: string;
    lastName: string;
    getFullName(): string;
    getAge(): number;
}
function Person(ssn: string, firstName: string, lastName: string): PersonType {
    const person: PersonType = {
        ssn: ssn,
        firstName: firstName,
        lastName: lastName,
        getFullName: function () {
            return this.firstName + " " + this.lastName;
        },
        getAge: function () {
            // calculate age based on birthdate
            return 25;
        }
    };
    return person;
}

// Person.prototype.getFullName = function () {
//     return this.firstName + " " + this.lastName;
// };

// Person.prototype.getAge = function () {
//     // calculate age based on birthdate
//     return 25;
// };

const person1 = Person("123456789", "John", "Doe");
console.log(person1.getFullName()); // output: "John Doe"
console.log(person1.getAge()); // output: 25

class Person2 {
    ssn: string;
    firstName: string;
    lastName: string;
    constructor(ssn: string, firstName: string, lastName: string) {
        this.ssn = ssn;
        this.firstName = firstName;
        this.lastName = lastName;
    }
    getFullName(): string {
        return `${this.firstName}   ${this.lastName}`;
    }

    getAge() {
        // calculate age based on birthdate
        return 25;
    }
}

const person2 = new Person2("123456789", "John", "Doe");
console.log(person2);


// export { person1, person2 }