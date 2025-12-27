// Set a reminder after 5 seconds
// const reminder = setTimeout(() => {
//   alert("Time to drink water!");
// }, 5000);

// // Function to cancel the reminder
// function drankWater (){
//   clearTimeout(reminder);
//   console.log("Reminder");
// }
// drankWater();

// Simulate user drinking water before reminder
// Call this function before 5 seconds pass
// drankWater();


// let reminderTimeout = setTimeout( () => {
//     console.log("time");
    
// }, 5000);

// function cancelReminder () {
//     clearTimeout(reminderTimeout);
//     console.log("Reminder");
    
// }


// let score = 0;
// let interval = setInterval( () => {
//     console.log(`Score: ${score}`);
//     score++;
//     if(score>10) clearInterval(interval);
    
// }, 1000);


// let count = 15; 
// function countdown() {
//     if(count === 0) {
//         console.log("Started");
//         return;
        
//     }
//     console.log(count);
//     count--;
//     setTimeout(countdown, 1000);
    
// }
// countdown();

// Question four.......

function create() {
    let count = 1;
    return function(){
        count++;
        console.log(`Button clicked ${count} times`);
        
    };
}
const counter = create();

counter();
counter();

