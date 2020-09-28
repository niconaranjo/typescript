"use strict";
// Advance Types!
var _a;
const Employee1 = {
    name: "Nico",
    privileges: ["admin"],
    startDate: new Date(),
};
const hello = true;
/* -------------------------------- */
/* ---------- Type Guards --------- */
function addInputs(a, b) {
    //check if type is a string
    if (typeof a === "string" || typeof b === "string") {
        return a.toString() + b.toString();
    }
    return a + b;
}
// Type Guard for Object type
function printEmployeeInfo(emp) {
    console.log("Name: " + emp.name);
    // Guard for privileges
    if ("privileges" in emp) {
        console.log("Privileges: " + emp.privileges);
    }
    if ("startDate" in emp) {
        console.log("startDate: " + emp.startDate);
    }
}
printEmployeeInfo(Employee1);
class Car {
    drive() {
        console.log("Driving...");
    }
}
class Truck {
    drive() {
        console.log("Driving...");
    }
    loadCargo(amount) {
        console.log("Loading: " + amount);
    }
}
const v1 = new Car();
const v2 = new Truck();
function useVehicle(vehicle) {
    vehicle.drive();
    // Type Guard for Only Class 'instanceof'
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(1000);
    }
}
useVehicle(v1);
useVehicle(v2);
function moveAnimal(animal) {
    let speed;
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
            break;
    }
    console.log('Moving at speed: ' + speed);
}
moveAnimal({ type: 'bird', flyingSpeed: 10 });
/* -------------------------------- */
/* --------- Type Casting --------- */
//const userInputElement = document.getElementById('user-input')! as HTMLInputElement;
const userInputElement = document.getElementById('user-input');
userInputElement.value = "Hi there";
// Other option:
// No use of '!'
const userInputElement2 = document.getElementById('user-input');
if (userInputElement2) {
    userInputElement2.value = "Hi there!!";
}
const ErrorBagEmpty = {}; // this is good and has no error
const ErrorBag = {
    email: 'Not Valid',
    userName: 'must be a text'
};
function getTypeValues(a, b) {
    //check if type is a string
    if (typeof a === "string" || typeof b === "string") {
        return a.toString() + b.toString();
    }
    return a + b;
}
const value = getTypeValues('h', 'ello'); //string
const numberValue = getTypeValues(1, 2); //number
/* -------------------------------- */
/* ------ Optional  Chaining ------ */
const fetchedUserData = {
    id: 'u1',
    name: 'Nicolas',
    job: { title: 'CEO', description: 'My own Company' }
};
console.log((_a = fetchedUserData === null || fetchedUserData === void 0 ? void 0 : fetchedUserData.job) === null || _a === void 0 ? void 0 : _a.title);
/* -------------------------------- */
/* ------ Nullish Coalescing ------ */
const userInput = undefined;
const storedData = userInput !== null && userInput !== void 0 ? userInput : 'Default'; // ?? -> nullish coalescing will do: userInput !== null && userInput !== void 0 ? userInput : 'Default';
console.log(storedData); //Default
/* -------------------------------- */
