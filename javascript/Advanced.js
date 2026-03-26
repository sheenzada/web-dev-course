/**
 * ARCHITECTURE: Model-View-Controller (MVC) Pattern
 * Maqsad: Logic aur UI ko alag rakhna.
 */

class TaskEngine {
    #tasks = JSON.parse(localStorage.getItem('pro_tasks')) || []; // Private Data

    // Task add karne ka logic
    addTask(title, priority = 'Medium') {
        const newTask = {
            id: crypto.randomUUID(), // Modern way to generate unique IDs
            title,
            priority,
            status: 'pending',
            createdAt: new Date().toISOString()
        };

        this.#tasks.push(newTask);
        this.#syncStorage();
        return newTask;
    }

    // Advanced Logic: Task filter aur analyze karna ek saath
    getAnalytics() {
        const total = this.#tasks.length;
        if (total === 0) return "No data available.";

        // Reduce ka use karke analytics nikaalna (Barray programmers ka pasandida tool)
        const stats = this.#tasks.reduce((acc, task) => {
            acc[task.priority] = (acc[task.priority] || 0) + 1;
            return acc;
        }, { High: 0, Medium: 0, Low: 0 });

        const completionRate = (this.#tasks.filter(t => t.status === 'completed').length / total) * 100;

        return {
            totalTasks: total,
            priorityBreakdown: stats,
            efficiency: `${completionRate.toFixed(2)}%`
        };
    }

    // Task complete karne ka logic (Immutability pattern)
    toggleTask(id) {
        this.#tasks = this.#tasks.map(task => 
            task.id === id ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' } : task
        );
        this.#syncStorage();
    }

    #syncStorage() {
        localStorage.setItem('pro_tasks', JSON.stringify(this.#tasks));
    }

    get allTasks() {
        return [...this.#tasks]; // Return a copy to prevent direct mutation
    }
}

// --- implementation (Execution) ---

const myEngine = new TaskEngine();

// 1. Kuch tasks add karte hain
myEngine.addTask("Complete JavaScript Deep Dive", "High");
myEngine.addTask("Build Portfolio Site", "Medium");
myEngine.addTask("Fix Security Bugs", "High");

// 2. Ek task ko complete mark karte hain
const firstTaskId = myEngine.allTasks[0].id;
myEngine.toggleTask(firstTaskId);

// 3. Analytics engine run karte hain
console.log("📊 REAL-TIME ANALYTICS:");
console.table(myEngine.getAnalytics());

console.log("📝 CURRENT TASKS:", myEngine.allTasks);