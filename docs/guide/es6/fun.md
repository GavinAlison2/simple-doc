# fun

```javascript
let person = {
  name: "John Doe",
  getName: function () {
    console.log(this); //Timeout
    console.log(this.name);
  },
  getName2() {
    console.log(this); //Timeout
    console.log(this.name);
  },
  getName3: () => {
    console.log(this); //{}
    console.log(this.name);
  },
};

// setTimeout(person.getName, 1000);
// setTimeout(person.getName2, 1000);
// setTimeout(person.getName3, 1000);
// setTimeout(() => {
//     person.getName(); //this = window 直接调用, this = person
// }, 1000);
// setTimeout(() => {
//     person.getName2(); //this = person
// }, 1000);
let f = person.getName.bind(person);
setTimeout(f, 1000);
```
