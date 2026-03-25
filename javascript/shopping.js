// Sample Products
const products = [
    { id: 1, name: "Laptop", price: 1000 },
    { id: 2, name: "Phone", price: 500 },
    { id: 3, name: "Headphones", price: 100 },
];

// Shopping Cart
let cart = [];

// Cart Operations
const cartAction = (action, productId = null, quantity = 1) => {
    const findProduct = id => products.find(p => p.id === id);

    switch(action){
        case "add":
            if (!productId) return console.log("Select product to add");
            const product = findProduct(productId);
            if (!product) return console.log("Product not found");
            const existing = cart.find(p => p.id === productId);
            existing ? existing.quantity += quantity : cart.push({ ...product, quantity });
            console.log(`${product.name} added (Qty: ${quantity})`);
            break;

        case "remove":
            if (!productId) return console.log("Select product to remove");
            cart = cart.filter(p => p.id !== productId);
            console.log("Product removed from cart");
            break;

        case "update":
            if (!productId) return console.log("Select product to update");
            const item = cart.find(p => p.id === productId);
            if (!item) return console.log("Product not in cart");
            item.quantity = quantity;
            console.log(`Updated ${item.name} quantity to ${quantity}`);
            break;

        case "checkout":
            if (!cart.length) return console.log("Cart is empty");
            console.log("🛒 Cart Summary:");
            const total = cart.reduce((sum, p) => {
                console.log(`${p.name} x ${p.quantity} = $${p.price * p.quantity}`);
                return sum + p.price * p.quantity;
            }, 0);
            console.log(`Total: $${total}`);
            cart = [];
            console.log("✅ Checkout complete!");
            break;

        default:
            console.log("Invalid action! Use: add, remove, update, checkout");
    }
};

// ✅ Example Usage
cartAction("add", 1);
cartAction("add", 2, 2);
cartAction("update", 2, 3);
cartAction("remove", 1);
cartAction("checkout");

