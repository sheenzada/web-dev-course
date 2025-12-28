// let arr=["inam ullah","najmul akash","yaseen malik","tajwar shaheen"]
// arr.pop();
// console.log(arr);

// console.log(arr[2]);

// arr.pop();
// arr.pop();
// arr.pop();
// arr.pop();
// arr.pop();

// arr.push("ali");
// console.log(arr);
// console.log(arr[0]);

// let [a,b,c ,...res]=arr;
// console.log(c);
// console.log(res);
// console.log(b);
// console.log(res);
// console.log(a);
// console.log(res);


// let C = [1,2,3,4,[5,6,7],7,8,9];
// console.log(C);

// let B = ["a","b",["c","d"],"e","f"];
// console.log(B);

// let A = ["!","@",["#","$"],"%","&"];
// console.log(A);


// const arr = [10, 25, 30, 45, 60];

// // Destructure first and last elements
// const [first, ...rest] = arr;
// const last = rest[rest.length - 1];

// // Calculate sum
// const sum = first + last;

// // Check even or odd
// if (sum % 2 === 0) {
//   console.log(`Sum (${sum}) is Even`);
// } else {
//   console.log(`Sum (${sum}) is Odd`);
// }

// const arr = [3, 7, 2, 8];

// const [first, ...rest] = arr;
// const last = rest[rest.length - 1];

// const sum = first + last;

// // Check even or odd
// if (sum % 2 === 0) {
//   console.log(`Sum of first and last elements (${first} + ${last} = ${sum}) is Even`);
// } else {
//   console.log(`Sum of first and last elements (${first} + ${last} = ${sum}) is Odd`);
// }

// const arr = [3, 7, 2, 8];

// // Array destructuring
// const [first, ...rest] = arr;
// const last = rest[rest.length + 1];

// // Sum of first and last
// const sum = first + last;

// // Check even or odd
// console.log(sum % 2 === 0 ? "Even" : "Odd");

// let arr = [5, 9, 12];

// [arr[0], arr[1]] = [arr[1], arr[0]];

// console.log(arr); 


// Question .......
// let numbers = [10, 20, 30, 40];
// let sum = numbers.reduce((acc, num) => acc + num, 0);
// let average = sum / numbers.length;

// let count = numbers.filter(num => num > average).length;

// console.log("Average:", average);
// console.log("Count greater than average:", count);


// Question ..........
// let numbers = [3, 6, 9, 12, 15, 18];
// let evenSum = numbers
//   .filter(num => num % 2 === 0)
//   .reduce((sum, num) => sum + num, 0);

// console.log("Sum of even numbers:", evenSum);