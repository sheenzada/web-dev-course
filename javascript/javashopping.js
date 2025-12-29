// Promise.all([
//     new Promise((resolve) =>
//         setTimeout(() =>
//             resolve("Task A done"), 1000)),
//     new Promise((resolve) =>
//         setTimeout(() =>
//             resolve("Task B done"), 500))
// ])
//     .then(([resultA, resultB]) => {
//         console.log(resultA, resultB);
//         return new Promise((resolve) =>
//             setTimeout(() => resolve("Final Task done"), 700));
//     })
//     .then((finalResult) =>
//         console.log(finalResult));




// Shopping Cart using JavaScript 

// Product list (store)
const products = [
  { id: 1, name: "Apple", price: 2 },
  { id: 2, name: "Banana", price: 1 },
  { id: 3, name: "Orange", price: 3 }
];

// Cart
let cart = [];

// Add item to cart
function addToCart(productId, quantity = 1) {
  const product = products.find(p => p.id === productId);

  if (!product) {
    console.log("❌ Product not found");
    return;
  }

  const cartItem = cart.find(item => item.id === productId);

  if (cartItem) {
    cartItem.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }

  console.log(`✅ Added ${quantity} ${product.name}(s) to cart`);
}

// Remove item from cart
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  console.log("🗑️ Item removed from cart");
}

// Update quantity
function updateQuantity(productId, quantity) {
  const item = cart.find(item => item.id === productId);

  if (!item) {
    console.log("❌ Item not found in cart");
    return;
  }

  item.quantity = quantity;
  console.log("🔄 Quantity updated");
}

// View cart
function viewCart() {
  if (cart.length === 0) {
    console.log("🛒 Cart is empty");
    return;
  }

  console.log("🛒 Your Cart:");
  cart.forEach(item => {
    console.log(
      `${item.name} - $${item.price} x ${item.quantity} = $${item.price * item.quantity}`
    );
  });

  console.log(`💰 Total: $${getTotal()}`);
}

// Get total price
function getTotal() {
  return cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
}

// --------------------
// Example Usage
// --------------------
addToCart(1, 2);   // Add 2 Apples
addToCart(2, 3);   // Add 3 Bananas
addToCart(3);      // Add 1 Orange
viewCart();

updateQuantity(2, 5);
viewCart();

removeFromCart(1);
viewCart();
