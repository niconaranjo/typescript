// Advance Types!

/* -------- Intersection Types -------- */
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

// Combination
type ElevatedEmployee = Admin & Employee;

const Employee1: ElevatedEmployee = {
  name: "Nico",
  privileges: ["admin"],
  startDate: new Date(),
};

type CombinableType = string | number;
type Numeric = number | boolean;

// intersection type = number
type UniversalIntersection = CombinableType & Numeric;

//Union type = string | number| boolean
type Universal = CombinableType | Numeric;

const hello: Universal = true;

/* -------------------------------- */

/* ---------- Type Guards --------- */

function addInputs(a: CombinableType, b: CombinableType) {
  //check if type is a string
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

type UnknownEmployee = Employee | Admin;

// Type Guard for Object type
function printEmployeeInfo(emp: UnknownEmployee) {
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

  loadCargo(amount: number) {
    console.log("Loading: " + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle:Vehicle) {
  vehicle.drive();
  // Type Guard for Only Class 'instanceof'
  if(vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}

useVehicle(v1);
useVehicle(v2);

/* -------------------------------- */

/* ----- Discriminated Unions ----- */
// Available for Objects and Interfaces

interface Bird {
  type: 'bird', // Literal type
  flyingSpeed: number
}

interface Horse {
  type: 'horse', // Literal type
  runningSpeed: number
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch(animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
      break;
  }
  console.log('Moving at speed: ' + speed);
}

moveAnimal({type:'bird', flyingSpeed: 10});

/* -------------------------------- */

/* --------- Type Casting --------- */

//const userInputElement = document.getElementById('user-input')! as HTMLInputElement;
const userInputElement = <HTMLInputElement>document.getElementById('user-input')!;

userInputElement.value = "Hi there";

// Other option:

// No use of '!'
const userInputElement2 = document.getElementById('user-input');

if(userInputElement2){

  (userInputElement2 as HTMLInputElement).value = "Hi there!!";
}

/* -------------------------------- */

/* -------- Index Property -------- */

// allow to create an interface or object
//of a certain type and enter any property
interface ErrorContainer { // {email: ' not valid', text: 'not a text' }
  [prop: string]: string;
}

const ErrorBagEmpty: ErrorContainer = {}; // this is good and has no error

const ErrorBag: ErrorContainer = {
  email: 'Not Valid',
  userName: 'must be a text'
}

/* -------------------------------- */

/* ------ Function Overloads ------ */

function getTypeValues(a: number, b: number): number;
function getTypeValues(a: string, b: string): string;
function getTypeValues(a: string, b: number): string;
function getTypeValues(a: number, b: string): string;
function getTypeValues(a: CombinableType, b: CombinableType) {
  //check if type is a string
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

const value = getTypeValues('h','ello'); //string
const numberValue = getTypeValues(1,2)//number

/* -------------------------------- */

/* ------ Optional  Chaining ------ */

const fetchedUserData = {
  id: 'u1',
  name: 'Nicolas',
  job: { title: 'CEO', description: 'My own Company'}
};

console.log(fetchedUserData?.job?.title);

/* -------------------------------- */

/* ------ Nullish Coalescing ------ */

const userInput = undefined;
const storedData = userInput ?? 'Default'; // ?? -> nullish coalescing will do: userInput !== null && userInput !== void 0 ? userInput : 'Default';
console.log(storedData); //Default
/* -------------------------------- */
