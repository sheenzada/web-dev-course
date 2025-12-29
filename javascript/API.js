// async function fetchData(url) {
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const data = await response.json(); // Parses the body as JSON
//     console.log(data);
//   } catch (error) {
//     console.error('Fetch error:', error.message);
//   }
// }

// // Example GET request
// fetchData('h');



async function createNewUser() {
    const apiUrl = 'https://api.example.com/users'; // Replace with your actual API endpoint
    const newUser = {
        username: 'john_doe',
        email: 'john@example.com'
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST', // Specify the HTTP method
            headers: {
                'Content-Type': 'application/json' // Inform the server we are sending JSON
            },
            body: JSON.stringify(newUser) // Convert the JavaScript object to a JSON string
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const resultData = await response.json();
        console.log('Success:', resultData); // Log the server response

    } catch (error) {
        console.error('Error creating user:', error.message);
    }
}

// Call the function to create a new user
createNewUser();
console.log("hi");
