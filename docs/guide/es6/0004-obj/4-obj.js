function Person(name, age) {
  console.log(this); // Person {}
  this.name = name;
  this.age = age;
  function constructor(name, age) {
    this.name = "tom";
    this.age = 22;
  }
}
const person1 = new Person("John", 25);
console.log(` person1: ${person1.name}, ${person1.age}`);
const test = {
  name: "test",
  out: this?.name || undefined,
  prop: 42,
  func: function () {
    // context of this is the object test
    console.log(this);
    return this.prop;
  },
};
// console.log(test.func()); // 42
console.log(test.out); // undefined
