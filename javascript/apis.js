

async function createNewUser() {
    const apiUrl = 'http://localhost:3000/users';

    const newUser = {
        username: 'john_doe',
        email: 'john@example.com'
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        console.log('User created:', data);

    } catch (error) {
        console.error('Error:', error.message);
    }
}

createNewUser();
