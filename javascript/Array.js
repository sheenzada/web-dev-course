const { log } = require("node:console");

let arr=[1,3,4,5,6,7,8,9,45]
console.log(arr);

console.log(arr[1]);

arr.pop()
arr.pop()
arr.pop()
arr.pop()
arr.pop()
arr.pop()

arr.push(128);

console.log(arr);
console.log(arr[1]);
// arr [a, b,c]=arr
// console.log(a);

let [a,b,c ,...res]=arr;
console.log(c);
console.log(res);

let aray = [1,2,3,4,[5,6,7],7,8,9]
console.log(aray);


