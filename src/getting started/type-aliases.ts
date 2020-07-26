type Combinable = number | string;
type ConversionText = "as-number" | "as-text";

function combineAlias(
  input1: Combinable,
  input2: Combinable,
  resultConversion: ConversionText
) {
  let result;
  if (
    (typeof input1 === "number" && typeof input2 === "number") ||
    resultConversion === "as-number"
  ) {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
}

console.log(combineAlias(1, "hello", "as-text"));

// example

// from
function greet(user: { name: string; age: number }) {
  console.log('Hi, I am ' + user.name);
}

function isOlder(user: { name: string; age: number }, checkAge: number) {
  return checkAge > user.age;
}

// to

type User = { name: string; age: number };

function greetRes(user: User) {
  console.log('Hi, I am ' + user.name);
}

function isOlderRes(user: User, checkAge: number) {
  return checkAge > user.age;
}