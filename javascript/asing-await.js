// Ek professional "Asynchronous" function jo internet se data lata hai
const fetchUserData = async (userId) => {
    const url = `https://jsonplaceholder.typicode.com/users/${userId}`;

    try {
        console.log("Fetching data... Please wait.");
        
        const response = await fetch(url);

        // Check karna ke response sahi hai ya nahi (Professional practice)
        if (!response.ok) {
            throw new Error(`User nahi mila! Status: ${response.status}`);
        }

        const userData = await response.json();

        // Destructuring: Data se zaroori cheezein nikalna
        const { name, email, company: { name: companyName } } = userData;

        console.log(`✅ Success: ${name} (${email}) works at ${companyName}.`);

    } catch (error) {
        // Error handling: Agar internet band ho ya URL galat ho
        console.error("❌ Error:", error.message);
    } finally {
        console.log("Operation complete.");
    }
};

// Function call karna
fetchUserData(1);