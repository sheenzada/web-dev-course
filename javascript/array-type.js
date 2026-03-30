
// ---------------- DATA ----------------
const orders = [
  {
    id: 1,
    customer: "Ali",
    items: [
      { name: "Laptop", category: "Electronics", price: 1000, qty: 1 },
      { name: "Mouse", category: "Electronics", price: 50, qty: 2 }
    ]
  },
  {
    id: 2,
    customer: "Sara",
    items: [
      { name: "Phone", category: "Electronics", price: 800, qty: 1 },
      { name: "Shoes", category: "Fashion", price: 120, qty: 1 }
    ]
  },
  {
    id: 3,
    customer: "Ali",
    items: [
      { name: "Keyboard", category: "Electronics", price: 150, qty: 1 }
    ]
  },
  {
    id: 4,
    customer: "Zain",
    items: [
      { name: "T-Shirt", category: "Fashion", price: 40, qty: 3 }
    ]
  }
];

// ---------------- CORE ENGINE ----------------
class AnalyticsEngine {
  constructor(data) {
    this.orders = data;
  }

  // Total Revenue
  getTotalRevenue() {
    return this.orders.reduce((total, order) => {
      return (
        total +
        order.items.reduce((sum, item) => sum + item.price * item.qty, 0)
      );
    }, 0);
  }

  // Flatten all items
  getAllItems() {
    return this.orders.flatMap(order => order.items);
  }

  // Top Selling Products
  getTopProducts() {
    const map = {};

    this.getAllItems().forEach(item => {
      if (!map[item.name]) {
        map[item.name] = 0;
      }
      map[item.name] += item.qty;
    });

    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .map(([name, qty]) => ({ name, qty }));
  }

  // Revenue by Category
  getCategoryRevenue() {
    const result = {};

    this.getAllItems().forEach(item => {
      if (!result[item.category]) {
        result[item.category] = 0;
      }
      result[item.category] += item.price * item.qty;
    });

    return result;
  }

  // Top Customers
  getTopCustomers() {
    const map = {};

    this.orders.forEach(order => {
      let total = order.items.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
      );

      if (!map[order.customer]) {
        map[order.customer] = 0;
      }

      map[order.customer] += total;
    });

    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .map(([name, spent]) => ({ name, spent }));
  }

  // Smart Insights
  getInsights() {
    const revenue = this.getTotalRevenue();
    const topProduct = this.getTopProducts()[0];
    const topCustomer = this.getTopCustomers()[0];

    return {
      revenue,
      topProduct,
      topCustomer,
      message: `Top product is ${topProduct.name} and best customer is ${topCustomer.name}`
    };
  }

  // Filter Expensive Orders
  getHighValueOrders(threshold) {
    return this.orders.filter(order => {
      let total = order.items.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
      );
      return total >= threshold;
    });
  }
}

// ---------------- RUN SYSTEM ----------------
const engine = new AnalyticsEngine(orders);

console.log("Total Revenue:", engine.getTotalRevenue());

console.log("\nTop Products:");
console.log(engine.getTopProducts());

console.log("\nCategory Revenue:");
console.log(engine.getCategoryRevenue());

console.log("\nTop Customers:");
console.log(engine.getTopCustomers());

console.log("\nInsights:");
console.log(engine.getInsights());

console.log("\nHigh Value Orders (>500):");
console.log(engine.getHighValueOrders(500));

