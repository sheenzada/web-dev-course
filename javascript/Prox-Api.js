/**
 * Professional Reactive State Manager
 * Yeh Proxy API ka use karta hai data changes ko "trap" karne ke liye.
 */

class ReactiveStore {
    constructor(initialState) {
        this.subscribers = new Set(); // Saaray functions jo data change pe run honge
        
        // Proxy: Yeh asli magic hai jo data access ko "intercept" karta hai
        this.state = new Proxy(initialState, {
            set: (target, key, value) => {
                if (target[key] === value) return true; // Agar value same hai to kuch na karo
                
                target[key] = value;
                console.log(`🔔 System: Property "${key}" changed to:`, value);
                
                // Saaray subscribers ko batao ke data badal gaya hai
                this._notify();
                return true;
            }
        });
    }

    // Naya function add karna jo data change pe nazar rakhega
    subscribe(fn) {
        this.subscribers.add(fn);
    }

    // Sab ko update bhejna
    _notify() {
        this.subscribers.forEach(fn => fn(this.state));
    }
}

// --- Implementation: Asli Dunya ka Example ---

const myAppStore = new ReactiveStore({
    userCount: 100,
    status: "Idle",
    theme: "Light"
});

// Subscriber 1: UI Update logic
myAppStore.subscribe((state) => {
    console.log(`🖥️ [UI]: Displaying updated user count: ${state.userCount}`);
});

// Subscriber 2: Database Sync logic
myAppStore.subscribe((state) => {
    console.log(`💾 [DB]: Syncing status "${state.status}" to server...`);
});

// --- Ab data change karke dekhein ---
setTimeout(() => {
    myAppStore.state.userCount = 105; // Khud hi UI aur DB update ho jayenge
}, 2000);

setTimeout(() => {
    myAppStore.state.status = "Processing Data";
}, 4000);