"use strict";
function combineAlias(input1, input2, resultConversion) {
    let result;
    if ((typeof input1 === "number" && typeof input2 === "number") ||
        resultConversion === "as-number") {
        result = +input1 + +input2;
    }
    else {
        result = input1.toString() + input2.toString();
    }
    return result;
}
console.log(combineAlias(1, "hello", "as-text"));
// example
// from
function greet(user) {
    console.log('Hi, I am ' + user.name);
}
function isOlder(user, checkAge) {
    return checkAge > user.age;
}
function greetRes(user) {
    console.log('Hi, I am ' + user.name);
}
function isOlderRes(user, checkAge) {
    return checkAge > user.age;
}
