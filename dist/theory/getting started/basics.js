"use strict";
function addBaiscs(n1, n2, showResult, phrase) {
    const result = n1 + n2;
    if (showResult) {
        console.log(phrase + result);
    }
    else {
        return n1 + n2;
    }
}
const number1 = 5;
const number2 = 6.3;
const printResult = true;
const resultPhrase = "Result is: ";
addBaiscs(1, 2, printResult, resultPhrase);
