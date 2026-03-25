// ==========================================
// JAVASCRIPT BASIC TO INTERMEDIATE GUIDE
// ==========================================

// 1. Variables aur Data Types
let name = "Ali";            // String
const age = 22;              // Number (Constant - change nahi ho sakta)
let isDeveloper = true;      // Boolean
let skills = ["HTML", "CSS", "JS"]; // Array
let user = {                 // Object
    city: "Karachi",
    role: "Web Dev"
};

console.log("--- User Profile ---");
console.log(`Name: ${name}, Age: ${age}`);

// 2. Arithmetic Operations
let a = 10;
let b = 5;
let sum = a + b;
let product = a * b;

// 3. Conditional Statements (If-Else)
console.log("--- Decision Making ---");
if (age >= 18) {
    console.log(name + " is eligible for a CNIC.");
} else {
    console.log(name + " is a minor.");
}

// 4. Functions (The Power of JS)
// Standard Function
function greetUser(userName) {
    return "Assalam-o-Alaikum, " + userName + "!";
}

// Arrow Function (Modern Way)
const addNumbers = (num1, num2) => num1 + num2;

console.log(greetUser(name));
console.log("Total Sum: " + addNumbers(20, 30));

// 5. Loops (Iterating through data)
console.log("--- Loop through Skills ---");
for (let i = 0; i < skills.length; i++) {
    console.log("Skill " + (i + 1) + ": " + skills[i]);
}

// 6. Array Methods (Modern Approach)
console.log("--- Array Methods ---");
skills.push("Node.js"); // Naya item add karna
skills.forEach((skill) => {
    console.log("Learning: " + skill);
});

// 7. Event Listeners (Basic Idea for Web)
// Yeh code tab kaam karega jab aapke paas HTML mein button ho
/*
const myButton = document.getElementById("btn");
myButton.addEventListener("click", () => {
    alert("Button Clicked!");
});
*/

console.log("--- Code Execution Complete ---");