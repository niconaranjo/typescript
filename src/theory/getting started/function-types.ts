
function addFunction(n1:number, n2:number):number {
  return n1 + n2;
}

function printResultFunction(num: number): void {
  console.log('Result: ' + num);
}

// function with callback
function addAndHandle(n1: number, n2: number, cb: (num:number) => void) {
  const result = n1 + n2;
  cb(result);
}

printResultFunction(addFunction(1,2));

// set a function type

let printValues: Function;
printValues = printResultFunction;
printValues(2)

//function type defined
let combineValues: (n1:number, n2:number) => number;

combineValues = addFunction;

console.log(combineValues(2,3))

addAndHandle(10, 20, (num)=> console.log(num) );

function sendRequest(data: string, cb: (response: any) => void) {
  // ... sending a request with "data"
  return cb({data: data});
}
 
sendRequest('Send this!', (response) => { 
  console.log(response);
  return true;
 });

 // never type

 function generateError(message: string, code: number): never {
   throw { message, errorCode: code}
 }

 generateError('An error occured', 500);