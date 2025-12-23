// Question No 1
// let a = 1;
//     console.log("do");
// do {
//     console.log(a);
//     a++;
    
// } while(a<=50)
    
// // Question No 2
// let v = 4;
// for( v > 1 ;  v-- ; ){
//     console.log(v);
    
// }

// for(let i = 1; i<50 ; i++){
//     if(i%3===0 && i%5===0){
//         console.log("divide");
        
//     }
// }

// let num1=0, num2=1, N=8;
// for (ler i=1; i<=N; i++){

// }
// let a =5;
// for(let i = 0; i<5; i++){
//     row="";
//     if(i%2==0){
//         r="*"
//         console.log("*");
        
//     }
//     console.log(r);
    
// }

// let ab=10;
// for(i=0; i<10;){
    
// }

// let a=5;
// for(let i = 0 ; i < 5; i++){
//     row="";
//     if(i%2==0){
//         r="";
//         console.log("*");
        
//     }
//     console.log("*");
//     for(let j = 0; j >5 ; j--){
//         row="2";
//         console.log("*");
        
//     }
//     console.log("*");
    
    
// }

// for(let i =0 ;  i < 50; i++){
//     if(i%3==0 && i%5 == 0)
//         console.log(i);
        
// }
// num = int(input("7: "))

// if num <= 7:
//     print("Not a prime number")
// else:
//     is_prime = True
//     for i in range(2, num):
//         if num % i == 0:
//             is_prime = False
//             break

//     if is_prime:
//         print("Prime number")
//     else:
// //         print("Not a prime number")
// let num = parseInt(prompt("Enter a number:"));

// let isPrime = true;

// if (num <= 1) {
//     isPrime = false;
// } else {
//     for (let i = 2; i < num; i++) {
//         if (num % i === 0) {
//             isPrime = false;
//             break;
//         }
//     }
// }
// Prime Number Check Program

// let number = 29; // Change this number to test

// let isPrime = true;

// if (number <= 1) {
//     isPrime = false;
// } else {
//     for (let i = 2; i <= Math.sqrt(number); i++) {
//         if (number % i === 0) {
//             isPrime = false;
//             break;
//         }
//     }
// }

// if (isPrime) {
//     console.log(number + " is a prime number.");
// } else {
//     console.log(number + " is not a prime number.");
// }

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter a number: ", (number) => {
    number = parseInt(number);
    let isPrime = true;

    if (number <= 1) {
        isPrime = false;
    } else {
        for (let i = 2; i <= Math.sqrt(number); i++) {
            if (number % i === 0) {
                isPrime = false;
                break;
            }
        }
    }

    console.log(isPrime ? `${number} is a prime number.` : `${number} is not a prime number.`);
    rl.close();
});
// Question 4
