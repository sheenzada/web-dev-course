class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('myTasks')) || [];
        this.initUI();
    }

    // --- 2. UI Creation (Pure JS, No HTML file) ---
    initUI() {
        // Body reset
        document.body.innerHTML = '';
        document.body.style.backgroundColor = '#121212';
        document.body.style.color = 'white';
        document.body.style.fontFamily = 'Segoe UI, sans-serif';

        const app = document.createElement('div');
        Object.assign(app.style, {
            maxWidth: '400px',
            margin: '50px auto',
            padding: '20px',
            background: '#1e1e1e',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
        });

        app.innerHTML = `
            <h2 style="text-align:center; color:#bb86fc">JS Master Tasker</h2>
            <div style="display:flex; gap:10px; margin-bottom:20px">
                <input id="taskInp" placeholder="Enter task..." style="flex:1; padding:10px; border-radius:5px; border:none;">
                <button id="addBtn" style="background:#03dac6; border:none; padding:10px; border-radius:5px; cursor:pointer; font-weight:bold">ADD</button>
            </div>
            <div id="status" style="font-size:12px; color:#cf6679; margin-bottom:10px; height:15px"></div>
            <div id="list"></div>
        `;

        document.body.appendChild(app);

        // Event Listeners
        document.getElementById('addBtn').onclick = () => this.handleAddTask();
        this.render();
    }

    // --- 3. Promises & Async Logic (Simulating Data Save) ---
    async saveToCloud() {
        const status = document.getElementById('status');
        status.innerText = "Saving changes...";
        
        return new Promise((resolve) => {
            setTimeout(() => {
                localStorage.setItem('myTasks', JSON.stringify(this.tasks));
                status.innerText = "";
                resolve("Saved!");
            }, 800); // Artificial delay to show async behavior
        });
    }

    // --- 4. Logic & Array Methods ---
    handleAddTask() {
        const input = document.getElementById('taskInp');
        const title = input.value.trim();

        if (!title) {
            alert("Empty task? No way!");
            return;
        }

        const newTask = {
            id: Date.now(),
            title,
            completed: false
        };

        // Spread Operator (...) - Missing Topic
        this.tasks = [...this.tasks, newTask];
        
        input.value = "";
        this.render();
        this.saveToCloud();
    }

    deleteTask(id) {
        // Filter Method
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.render();
        this.saveToCloud();
    }

    // --- 5. Dynamic Rendering (Map Method) ---
    render() {
        const listContainer = document.getElementById('list');
        
        if (this.tasks.length === 0) {
            listContainer.innerHTML = `<p style="text-align:center; opacity:0.5">No tasks yet.</p>`;
            return;
        }

        // Map Method to generate HTML strings
        listContainer.innerHTML = this.tasks.map(task => `
            <div style="display:flex; justify-content:space-between; background:#2c2c2c; padding:10px; margin-bottom:8px; border-radius:6px; align-items:center">
                <span>${task.title}</span>
                <button onclick="app.deleteTask(${task.id})" style="background:#cf6679; color:white; border:none; border-radius:4px; padding:5px 8px; cursor:pointer">Delete</button>
            </div>
        `).join('');
    }
}

// Global instance taake onclick buttons kaam kar saken
window.app = new TaskManager();