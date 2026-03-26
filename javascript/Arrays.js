const products = [
    { id: 1, name: 'Laptop', price: 1200, category: 'Electronics' },
    { id: 2, name: 'Shirt', price: 25, category: 'Fashion' },
    { id: 3, name: 'Phone', price: 800, category: 'Electronics' }
];

// 1. Filter: Sirf sasti cheezein nikalna
const affordable = products.filter(p => p.price < 100);

// 2. Map: Sirf names ki ek nayi list banana
const productNames = products.map(p => p.name);

// 3. Reduce: Total price calculate karna (High-level logic)
const totalPrice = products.reduce((sum, p) => sum + p.price, 0);

console.log(`Total Inventory Value: $${totalPrice}`);