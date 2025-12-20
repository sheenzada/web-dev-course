// --- Sample Data ---
const numbers = [1, 2, 3, 4, 5, 6];
const users = [
    { firstName: "Neeraj", lastName: "Kumar", age: 25 },
    { firstName: "Sandeep", lastName: "Kumar", age: 26 },
    { firstName: "Mayank", lastName: "Roy", age: 25 },
    { firstName: "Peter", lastName: "Mukherjee", age: 28 },
];

console.log("Original numbers array:", numbers);
console.log("Original users array:", users);
console.log("----------------------------------------");

// --- 1. Map() Method ---
// Creates a new array with the results of calling a provided function on every element.
const doubledNumbers = numbers.map(function(num) {
    return num * 2;
});

// Using arrow function for cleaner syntax
const squaredNumbers = numbers.map(num => num * num);

console.log("Doubled numbers (map):", doubledNumbers);
console.log("Squared numbers (map):", squaredNumbers);

// Example with objects: Get an array of full names
const fullNames = users.map(user => `${user.firstName} ${user.lastName}`);
console.log("Full names (map):", fullNames);
console.log("----------------------------------------");


// --- 2. Filter() Method ---
// Creates a new array with all elements that pass the test implemented by the provided function.
const evenNumbers = numbers.filter(function(num) {
    return num % 2 === 0;
});

// Using arrow function for cleaner syntax
const oddNumbers = numbers.filter(num => num % 2 !== 0);

console.log("Even numbers (filter):", evenNumbers);
console.log("Odd numbers (filter):", oddNumbers);

// Example with objects: Filter users who are 26 or older
const adults = users.filter(user => user.age >= 26);
console.log("Adults 26+ (filter):", adults);
console.log("----------------------------------------");


// --- 3. Reduce() Method ---
// Executes a reducer function on each element of the array, resulting in a single output value.
const sumOfAllNumbers = numbers.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue;
}, 0); // The '0' is the initial value for the accumulator

// Using arrow function for cleaner syntax
const productOfAllNumbers = numbers.reduce((acc, curr) => acc * curr, 1);

console.log("Sum of all numbers (reduce):", sumOfAllNumbers);
console.log("Product of all numbers (reduce):", productOfAllNumbers);

// Example with objects: Calculate the total age of all users
const totalAge = users.reduce((acc, user) => acc + user.age, 0);
console.log("Total age of users (reduce):", totalAge);
console.log("----------------------------------------");


// --- Chaining Map, Filter, and Reduce ---
// Find the sum of the squares of only the even numbers
const sumOfSquaredEvenNumbers = numbers
    .filter(num => num % 2 === 0) // [2, 4, 6] (intermediate array)
    .map(num => num * num)       // [4, 16, 36] (intermediate array)
    .reduce((acc, curr) => acc + curr, 0); // 56 (single value)

console.log("Sum of squares of even numbers (chained):", sumOfSquaredEvenNumbers); // Output: 56
