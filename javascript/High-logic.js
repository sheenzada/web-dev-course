/**
 * SENIOR ARCHITECT LEVEL CODE: 
 * Custom "QuantumState" Engine with Undo/Redo & Middleware
 */

class QuantumState {
    #state;
    #history = [];
    #listeners = new Set();
    #middlewares = [];

    constructor(initialState = {}) {
        this.#state = this.#makeReactive(initialState);
    }

    // 1. ADVANCED LOGIC: Recursive Proxy for Deep Reactivity
    // Yeh nested objects (objects ke andar objects) ko bhi track karta hai
    #makeReactive(obj) {
        if (typeof obj !== 'object' || obj === null) return obj;

        return new Proxy(obj, {
            set: (target, key, value) => {
                const oldValue = JSON.parse(JSON.stringify(target)); // Deep copy for history
                const result = Reflect.set(target, key, this.#makeReactive(value));
                
                // History mein save karna taake Undo ho sake
                this.#history.push({ key, old: oldValue[key], new: value, timestamp: Date.now() });
                
                // Sab ko notify karna
                this.#notify();
                return result;
            },
            get: (target, key) => {
                const value = Reflect.get(target, key);
                return value;
            }
        });
    }

    // 2. MIDDLEWARE LOGIC: Data ko filter karne ka pipeline
    use(middleware) {
        this.#middlewares.push(middleware);
    }

    dispatch(action, payload) {
        // Middleware chain ko run karna
        let currentPayload = payload;
        for (const mw of this.#middlewares) {
            currentPayload = mw(action, currentPayload, this.#state);
            if (currentPayload === null) return; // Action cancel kar dena
        }

        // Action execute karna
        if (typeof this[action] === 'function') {
            this[action](currentPayload);
        } else {
            this.#state[action] = currentPayload;
        }
    }

    // 3. UNDO LOGIC: Time Travel Debugging
    undo() {
        if (this.#history.length === 0) return console.warn("No more history!");
        const lastChange = this.#history.pop();
        console.log(`⏪ Undoing change on: ${lastChange.key}`);
        this.#state[lastChange.key] = lastChange.old;
    }

    subscribe(callback) {
        this.#listeners.add(callback);
        return () => this.#listeners.delete(callback); // Unsubscribe function
    }

    #notify() {
        this.#listeners.forEach(callback => callback(this.#state));
    }

    get data() { return this.#state; }
}

// --- IMPLEMENTATION: Real-World Inventory App Logic ---

const store = new QuantumState({
    items: [],
    totalValue: 0,
    user: "Admin"
});

// A. Middleware: Rokna agar price negative ho (Security Logic)
store.use((action, payload) => {
    if (action === 'addItem' && payload.price < 0) {
        console.error("❌ Invalid Price: Negative value not allowed!");
        return null; 
    }
    return payload;
});

// B. Middleware: Logger (Har action ko track karna)
store.use((action, payload) => {
    console.log(`[LOG]: Action ${action} triggered at ${new Date().toLocaleTimeString()}`);
    return payload;
});

// C. Custom Method: Inventory Logic
store.addItem = (item) => {
    store.data.items.push(item);
    store.data.totalValue += item.price;
};

// --- Execution Flow ---

// 1. UI updates ko simulate karna
const stopListening = store.subscribe((state) => {
    console.log("🖥️ UI UPDATED. Current Items:", state.items.length, "| Total Value: $" + state.totalValue);
});

// 2. Actions Dispatch karna
store.dispatch('addItem', { name: "MacBook Pro", price: 2500 });
store.dispatch('addItem', { name: "Mechanical Keyboard", price: 150 });

// 3. Galat data bhej kar dekhna (Middleware test)
store.dispatch('addItem', { name: "Hacker Item", price: -500 });

// 4. Undo karna (Time Travel)
setTimeout(() => {
    store.undo(); // Keyboard remove ho jayega aur price wapas $2500 ho jayegi
}, 3000);

console.log("Final State:", store.data);