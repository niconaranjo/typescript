function add(
  n1: number,
  n2: number,
  showResult: boolean,
  phrase: string
): number {
  const result = n1 + n2;

  if (showResult) {
    console.log(phrase + result);
  } else {
    return n1 + n2;
  }
}

const number1 = 5;
const number2 = 6.3;
const printResult = true;
const resultPhrase = "Result is: ";

add(1, 2, printResult, resultPhrase);
