const number = [1,2,3,4];
const double = number.map(num => num * 2);
console.log(double);
let comp=["Inam","taju","akash"];

console.log(comp.map(n=>n));

const numbers = [1,2,3,4];
const evenNumbers = number.filter(num => num % 2=== 0);
console.log(evenNumbers);

const akash = number.filter (num => num% 2!=0)
console.log(akash);


// const nums = [1,2,3,4];

// const num = num.reduce(total, num) = >{

// }

// const orderSummary = cart
//     .filter(item => item.inStock)

//     .map(item =>){
//         const discountPri
//     }

// let arr= [2, 4, 8, 10]
// let updatedArr = arr.map(val=> val+2)
// console.log(arr);
// console.log(updatedArr);


// let arr = [2, 4, 8, 10];
// let updatedArr = arr.slice().filter(val => val < 5);
// console.log(arr);
// console.log(updatedArr);


let arr= [2,4,8,10]
let updatedArr = arr.reduce((prev, curr)=> curr= prev+curr)
console.log(arr);
console.log(updatedArr);