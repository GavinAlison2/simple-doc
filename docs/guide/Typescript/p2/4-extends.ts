(() => {
    class Person {
        constructor(private firstName: string, private lastName: string) { }
        getFullName(): string {
            return `${this.firstName} ${this.lastName}`;
        }
        describe(): string {
            return `This is ${this.firstName} ${this.lastName}.`;
        }
    }
    class Employee extends Person {

        private i: number;

        constructor(firstName: string, lastName: string, jobTitle: string);
        constructor(firstName: string, lastName: string, jobTitle: string, num?: number);
        constructor(
            firstName: string,
            lastName: string,
            private jobTitle: string,
            num?: number) {
            // call the constructor of the Person class:
            super(firstName, lastName);
            this.i = num;
        }

        override describe(): string {
            return `${super.describe()} He is a ${this.jobTitle}.`;
        }
    }

    let employee = new Employee('John', 'Doe', 'Web Developer', 10);

    console.log(employee.getFullName());
    console.log(employee.describe());




})()