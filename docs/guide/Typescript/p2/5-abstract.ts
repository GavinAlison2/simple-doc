(() => {
    abstract class Employee {
        constructor(private firstName: string, private lastName: string) { }
        abstract getSalary(): number;
        get fullName(): string {
            return `${this.firstName} ${this.lastName}`;
        }
        compensationStatement(): string {
            return `${this.fullName} makes ${this.getSalary()} a month.`;
        }
    }
    // let employee = new Employee('John', 'Doe');
    class FullTimeEmployee extends Employee {
        constructor(firstName: string, lastName: string, private salary: number) {
            super(firstName, lastName);
        }
        getSalary(): number {
            return this.salary;
        }
    }
    class Contractor extends Employee {
        constructor(
            firstName: string,
            lastName: string,
            private rate: number,
            private hours: number
        ) {
            super(firstName, lastName);
        }
        getSalary(): number {
            return this.rate * this.hours;
        }
    }
    let john = new FullTimeEmployee('John', 'Doe', 12000);
    let jane = new Contractor('Jane', 'Doe', 100, 160);

    console.log(john.compensationStatement());
    console.log(jane.compensationStatement());
})()