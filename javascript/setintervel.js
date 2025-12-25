let count = 0;

function incrementCounter(){
    count++;
    console.log(`Count: ${count}`);
    
}

const intervalId = setInterval(incrementCounter,1000)

setTimeout(() => {
    clearInterval(intervalId);
    console.log('Counter stopped');
    
},10000);

// let a=20;
// let b=2+ a++
// console.log(b);

// console.log(a);

// let c=2+ ++a;
// console.log(c);


