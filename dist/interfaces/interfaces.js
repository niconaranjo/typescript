"use strict";
//console.log('lets try some files from the getting started folder')
let add;
add = (n1, n2) => {
    return n1 + n2;
};
class Person {
    constructor(n) {
        this.age = 30;
        if (n)
            this.name = n;
    }
    greet(prhase) {
        if (this.name)
            console.log(prhase + ' ' + this.name);
        else
            console.log('Hi!');
    }
}
let user1;
user1 = new Person();
user1.greet("hello");
console.log(user1);
