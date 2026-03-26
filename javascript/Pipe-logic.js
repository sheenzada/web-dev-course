/**
 * Advanced Functional Pipe Logic
 * Yeh function multiple functions ko aapas mein "chain" kar deta hai.
 */
const pipe = (...functions) => (initialValue) => 
    functions.reduce((value, func) => func(value), initialValue);

// --- Individual Logic Blocks (Pure Functions) ---

// 1. Data saaf karne ka logic
const trimData = (user) => ({ ...user, name: user.name.trim() });

// 2. Email validate karne ka logic
const validateEmail = (user) => {
    const isValid = user.email.includes("@");
    return { ...user, isEmailValid: isValid };
};

// 3. Currency convert karne ka logic (e.g., USD to PKR)
const attachCurrency = (user) => ({
    ...user,
    balancePKR: user.balanceUSD * 280,
    formattedBalance: `Rs. ${user.balanceUSD * 280}`
});

// 4. Security check logic (Sensitive info remove karna)
const secureProfile = (user) => {
    const { password, ...safeData } = user; // Password nikal dena
    return safeData;
};

// --- Execution (The "Magic" Part) ---

const rawUserData = {
    name: "   Zeeshan Ahmed   ",
    email: "zeeshan@example.com",
    balanceUSD: 50,
    password: "secret_password_123"
};

// Professional Pipeline: Saaray logics ko ek line mein jama kar dena
const processUser = pipe(
    trimData,
    validateEmail,
    attachCurrency,
    secureProfile
);

const finalUser = processUser(rawUserData);

console.log("🚀 Highly Logical Processed Data:", finalUser);