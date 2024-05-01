const var1 = 1;
let var2 = 3;

for (let i = 0; i < 5; i++) {
    console.log(i);
}

const calculateArea = (length, width) => length * width;

const printName = name => console.log(`Hello, ${name}!`);

const numbers = [1, 2, 3, 4, 5];
const doubledValues = numbers.map(num => num * 2);

const names = ["Alice", "Bob", "Charlie"];
const greetings = names.map(name => `Hello, ${name}`);

const filterGreaterThan = (arr, maxVal) => arr.filter(num => num > maxVal);