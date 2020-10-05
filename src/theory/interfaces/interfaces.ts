//console.log('lets try some files from the getting started folder')

// Function type
interface AddFn { 
  (a: number, b: number) : number;
}

let add: AddFn;

add = (n1:number, n2:number) => {
  return n1 + n2;
}

// Normal interface with optional propperty
interface Named {
  readonly name?: string;
  outputName?: string;
}

// Extending Interfaces
interface Greetable extends Named {
  greet(phrase: string):void;
}

class Person implements Greetable {
  name?: string;
  age = 30;

  constructor(n?:string) {
    if(n) this.name = n;
  }

  greet(prhase: string) {
    if(this.name) console.log(prhase + ' ' + this.name);
    else console.log('Hi!');
  }

}

let user1: Greetable;

user1 = new Person()

user1.greet("hello")
console.log(user1)