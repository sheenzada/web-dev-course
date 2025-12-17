// const arr = [2,4,6];
// const [first , ...rest]=arr;
// const last = rest [rest.length - 1];

// const sum = first + last;
// console.log(sum % 2 ===0 ? "Even": "Odd");
// if(sum%2===0){
//     console.log("even");
    
// }

// // task 2

// const arr1 = [34,6];
// let max = arrarr[0];

// for(let i = 1 ; i < arr1.length; i++){
//     if(arr1[i] > max){
//         max =arr1[i];
//     }
// }
// console.log(max );
//








let arr1 = [3, 7, 2, 8];

let [first, , , last] = arr1;
let sum = first + last;

console.log(sum % 2 === 0 ? "Even" : "Odd");





let arr2 = [12, 5, 9, 21, 3];
let max = arr2[0];

for (let i = 1; i < arr2.length; i++) {
  if (arr2[i] > max) {
    max = arr2[i];
  }
}

console.log("Largest number:", max);






let arr3 = [4, 8, 12, 16];

let [a, b] = arr3;
let diff = b - a;
let isArithmetic = true;

for (let i = 2; i < arr3.length; i++) {
  if (arr3[i] - arr3[i - 1] !== diff) {
    isArithmetic = false;
    break;
  }
}

console.log(isArithmetic ? "Arithmetic series" : "Not arithmetic");






let arr4 = [10, 20, 30, 40];

let sum4 = arr4.reduce((a, b) => a + b, 0);
let avg = sum4 / arr4.length;

let count = arr4.filter(num => num > avg).length;

console.log("Average:", avg);
console.log("Greater than average:", count);





let arr5 = [5, 9, 12];

[arr5[0], arr5[1]] = [arr5[1], arr5[0]];

console.log(arr5);








let arr6 = [1, 2, 3, 4, 5];
let reversed = [];

for (let i = arr6.length - 1; i >= 0; i--) {
  reversed.push(arr6[i]);
}

console.log(reversed);






let arr7 = [20, 15, 10, 5];

let [x, y] = arr7;

console.log(y > x ? "Increasing" : "Decreasing");







let arr8 = [7, 2, 9, 4, 1];

let smallest = Infinity;
let secondSmallest = Infinity;

for (let num of arr8) {
  if (num < smallest) {
    secondSmallest = smallest;
    smallest = num;
  } else if (num < secondSmallest && num !== smallest) {
    secondSmallest = num;
  }
}

console.log("Second smallest:", secondSmallest);







let arr9 = [100, 200, 300, 400];

let [firstElement, ...rest] = arr9;

console.log("First:", firstElement);
console.log("Remaining:", rest);






let arr10 = [3, 6, 9, 12, 15, 18];

let evenSum = arr10
  .filter(num => num % 2 === 0)
  .reduce((sum, num) => sum + num, 0);

console.log("Sum of even numbers:", evenSum);