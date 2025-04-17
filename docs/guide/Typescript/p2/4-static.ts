class Employee {
    static salary: number = 5000;
    constructor(
        public firstName: string,
        public lastName: string,
        public jobTitle: string
    ) {
        Employee.salary++;
    }

    public static getSalary() {
        return Employee.salary;
    }
}
(() => {
    let john = new Employee('John', 'Doe', 'Front-end Developer');
    let jane = new Employee('Jane', 'Doe', 'Back-end Developer');

    console.log(Employee.salary); // 5002
    console.log(Employee.getSalary()); // 5002
})()