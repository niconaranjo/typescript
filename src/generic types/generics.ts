//console.log('lets try some files from the getting started folder')

/* ----- definition of generic types ------- */

// Define an array of strings, this lets the var
// names to have Typescript support as an array of strings
const names: Array<string> = [];

// Allowed to:
//names[0].split(' ');

// Not allowed:
// names.push(1);

/* ----- promises ----- */

// Define a promise that returns a value string
const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("This is solved");
  }, 200);
});

promise.then((data) => {
  data.split("");
});

interface objectResponse {
  nombre: string;
  apellido: string;
  id?: number;
}

const promisedObject: Promise<objectResponse> = new Promise(
  (resolve, reject) => {
    setTimeout(() => {
      const objectico: objectResponse = {
        nombre: "Nico",
        apellido: "Naranjo",
      };
      resolve(objectico);
    }, 200);
  }
);

promisedObject.then((data) => {
  console.log(data);
});

/* ------- Generic Types ------ */
// Constrains: the generic type extends a type
const merge = <T extends object, U>(ObjA: T, ObjB: U) => {
  return Object.assign(ObjA, ObjB);
};

const merge1 = merge({ name: "Nico" }, { lastName: "Naranjo" });

console.log(merge1.name);

interface lengthy {
  length: number;
}

/**
 * With the interface we ensure that the element
 * has a length propperty
 */
const countAndDescribe = <T extends lengthy>(element: T): [T, string] => {
  let describe = "Got no value";

  if (element.length === 1) {
    describe = "Got 1 element.";
  } else if (element.length > 1) {
    describe = "Got " + element.length + " elements.";
  }

  return [element, describe];
};

console.log(countAndDescribe("hello"));
console.log(countAndDescribe(["Moto", "Car"]));

/* ----- KEYOF ------ */
const extractAndConvert = <T extends object, U extends keyof T>(ObjA: T, key: U) => {
  return "Key's value in element is " + ObjA[key];
}

console.log(extractAndConvert({name: 'nico'}, 'name'))