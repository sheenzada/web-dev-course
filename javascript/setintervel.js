let count = 0;

function incrementCounter(){
    count++;
    console.log(`Count: ${count}`);
    
}

const intervalId = setInterval(incrementCounter,1000)

setTimeout(() => {
    clearInterval(intervalId);
    console.log('Counter stopped');
    
},5000);

// let a=20;
// let b=2+ a++
// console.log(b);

// console.log(a);

// let c=2+ ++a;
// console.log(c);


// let a=5;

// for(let i=5 ; i<5 ; i++){
//     for(j = 1 ; i<=j ; j++){
//         console.log("*");
        
//     }
//     console.log("*");
    
// }