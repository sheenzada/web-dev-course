function sum() {
    console.log("running");
        
}
sum()

function sums() {
    console.log("running 2");
        
}
sums()

//  setTimeout(() => {
//         console.log("function run");
        
// }, 3000);
// setTimeout();


// let inam=setTimeout(() => {
//     console.log("The function is running");
    
// },2000);
// inam()

// let person={
//     firstName:"inam",
//     lastName:"Ullah",
//     FullName:()=>{
//         console.log(`${this.firstName} ${this.lastName}`);
        
//     }
// }
// console.log(person.FullName);


console.log("Start of script.");

setTimeout(() => {
  console.log("This message appears after 2 seconds (2000ms)."); // This runs later
}, 5000);

console.log("End of script.");

