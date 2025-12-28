// const myPromise = new Promise((resolve, reject) => {
//   // Asynchronous operation here (e.g., a setTimeout, network request)
//   const success = true; // Placeholder for actual async result

//   if (success) {
//     resolve('Operation successful!'); // Call resolve on success
//   } else {
//     reject(new Error('Operation failed!')); // Call reject on failure
//   }
// });


// const Promise=new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log("jp");
//         resolve()
//     },1000);
//     reject();
// });
// Promise.then(() => {
//     console.log("resolve");
    
// })




// const myFirstPromise = new Promise((resolve, reject) => {
//   // Simulate an asynchronous operation (e.g., an API call or a timeout)
//   setTimeout(() => {
//     const success = true; // Set to false to test rejection
//     if (success) {
//       resolve("Success! Data fetched successfully."); // Marks the promise as fulfilled
//     } else {
//       reject("Error: Failed to fetch data."); // Marks the promise as rejected
//     }
//   }, 1000); // Operation completes after 1 second
// });

// // Consume the promise using .then(), .catch(), and .finally()
// myFirstPromise
//   .then((successMessage) => {
//     // This block runs if the promise is resolved (fulfilled)
//     console.log(`Yay! ${successMessage}`);
//   })
//   .catch((error) => {
//     // This block runs if the promise is rejected
//     console.error(`Oops: ${error}`);
//   })
//   .finally(() => {
//     // This block runs regardless of the outcome (for cleanup, etc.)
//     console.log("Promise settled (operation finished).");
//   });

// console.log("Code execution continues immediately while the promise is pending...");
// Expected output order in console:
// "Code execution continues immediately while the promise is pending..."
// "Yay! Success! Data fetched successfully." (after ~1 second)
// "Promise settled (operation finished)." (after ~1 second)





// Create a Promise Object
// let myPromise = new Promise(function(myResolve, myReject) {
//   let result = true;

// // Code that may take some time goes here

//   if (result == true) {
//     myResolve("OK");
//   } else {
//     myReject("Error");
//   }
// });

// // Using then() to display result
// myPromise.then(x => myDisplay(x), x => myDisplay(x));









// let myPromise = new Promise(function(myResolve, myReject) {
// // "Producing Code" (May take some time)

//   myResolve(); // when successful
//   myReject();  // when error
// });

// // "Consuming Code" (Must wait for a fulfilled Promise)
// myPromise.then(
//   function(value) { /* code if successful */ },
//   function(error) { /* code if some error */ }
// );



function stepOne() {
  return Promise.resolve("Data from Step One");
}

function stepTwo(data) {
  console.log(data); // "Data from Step One"
  return "Data from Step Two"; // This value is implicitly wrapped in a new Promise
}

function stepThree(data) {
  console.log(data); // "Data from Step Two"
  return "Final Result";
}

stepOne()
  .then(stepTwo)
  .then(stepThree)
  .then(finalResult => console.log(finalResult)) // "Final Result"
  .catch(error => console.error(error));












  const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = false; 
    if (success) {
      resolve("Operation successful!"); 
    } else {
      reject(new Error("Something went wrong.")); 
    }
  }, 1000); 
});

myPromise
  .then((result) => {
    console.log(result); 
  })
  .catch((error) => {
    console.error(error.message);
  })
  .finally(() => {

    console.log("Promise settled (completed)");
  });
