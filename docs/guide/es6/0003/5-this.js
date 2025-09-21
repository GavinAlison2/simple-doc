class Car {
  constructor() {
    // 绑定 sayBye 而不是 sayHi 来展示差异
    this.sayBye = this.sayBye.bind(this);
  }
  sayHi() {
    console.log(`Hello from ${this.name}`);
  }
  sayBye() {
    console.log(`Bye from ${this.name}`);
  }
  get name() {
    return "Ferrari";
  }
}

class Bird {
  get name() {
    return "Tweety";
  }
}

const car = new Car();
const bird = new Bird();

// 方法中 'this' 的值取决于它们的调用者
car.sayHi(); // Hello from Ferrari
bird.sayHi = car.sayHi;
bird.sayHi(); // Hello from Tweety

// 对于绑定方法，'this' 不依赖于调用者
bird.sayBye = car.sayBye;
bird.sayBye(); // Bye from Ferrari
