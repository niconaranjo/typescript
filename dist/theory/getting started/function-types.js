"use strict";
function addFunction(n1, n2) {
    return n1 + n2;
}
function printResultFunction(num) {
    console.log('Result: ' + num);
}
// function with callback
function addAndHandle(n1, n2, cb) {
    const result = n1 + n2;
    cb(result);
}
printResultFunction(addFunction(1, 2));
// set a function type
let printValues;
printValues = printResultFunction;
printValues(2);
//function type defined
let combineValues;
combineValues = addFunction;
console.log(combineValues(2, 3));
addAndHandle(10, 20, (num) => console.log(num));
function sendRequest(data, cb) {
    // ... sending a request with "data"
    return cb({ data: 'Hi there!' });
}
sendRequest('Send this!', (response) => {
    console.log(response);
    return true;
});
// never type
function generateError(message, code) {
    throw { message, errorCode: code };
}
generateError('An error occured', 500);
