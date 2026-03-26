/**
 * Professional User Service Module
 * Iska maqsad API se data manage karna hai ek organized tareekay se.
 */
class UserService {
    // # symbol ka matlab hai 'Private Variable' (Bahir se koi isse change nahi kar sakta)
    #apiBaseUrl = "https://jsonplaceholder.typicode.com";

    constructor(endpoint) {
        this.endpoint = endpoint;
    }

    // Modern Method: Data fetch karne ka professional tarika
    async getUser(id) {
        try {
            const response = await fetch(`${this.#apiBaseUrl}/${this.endpoint}/${id}`);
            
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }

            const data = await response.json();
            return this.#formatUser(data); // Data ko clean karke return karna

        } catch (error) {
            this.#logError(error);
            return null;
        }
    }

    // Private Helper Method: Sirf wohi data nikalna jo zaroori hai
    #formatUser({ id, name, email, address }) {
        return {
            userId: id,
            fullName: name.toUpperCase(),
            contact: email.toLowerCase(),
            city: address?.city || "Unknown"
        };
    }

    // Error logging (Professional practice)
    #logError(err) {
        console.error(`[UserService Error]: ${new Date().toISOString()} - ${err.message}`);
    }
}

// --- Implementation (Usage) ---
const userManager = new UserService("users");

// IIFE (Immediately Invoked Function Expression) for execution
(async () => {
    const user = await userManager.getUser(5);
    
    if (user) {
        console.log("✅ Formatted User Data:", user);
    } else {
        console.log("❌ User load nahi ho saka.");
    }
})();