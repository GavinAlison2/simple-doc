setTimeout(() => {
    person.getName(); //this = window 直接调用, this = person
}, 1000);