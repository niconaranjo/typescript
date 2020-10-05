"use strict";
//console.log('lets try some files from the getting started folder')
/* ----- definition of generic types ------- */
// Define an array of strings, this lets the var
// names to have Typescript support as an array of strings
const names = [];
// Allowed to:
//names[0].split(' ');
// Not allowed:
// names.push(1);
/* ----- promises ----- */
// Define a promise that returns a value string
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("This is solved");
    }, 200);
});
promise.then((data) => {
    data.split("");
});
const promisedObject = new Promise((resolve, reject) => {
    setTimeout(() => {
        const objectico = {
            nombre: "Nico",
            apellido: "Naranjo",
        };
        resolve(objectico);
    }, 200);
});
promisedObject.then((data) => {
    console.log(data);
});
/* ------- Generic Types ------ */
// Constrains: the generic type extends a type
const merge = (ObjA, ObjB) => {
    return Object.assign(ObjA, ObjB);
};
const merge1 = merge({ name: "Nico" }, { lastName: "Naranjo" });
console.log(merge1.name);
/**
 * With the interface we ensure that the element
 * has a length propperty
 */
const countAndDescribe = (element) => {
    let describe = "Got no value";
    if (element.length === 1) {
        describe = "Got 1 element.";
    }
    else if (element.length > 1) {
        describe = "Got " + element.length + " elements.";
    }
    return [element, describe];
};
console.log(countAndDescribe("hello"));
console.log(countAndDescribe(["Moto", "Car"]));
/* ----- KEYOF ------ */
const extractAndConvert = (ObjA, key) => {
    return "Key's value in element is " + ObjA[key];
};
console.log(extractAndConvert({ name: 'nico' }, 'name'));
