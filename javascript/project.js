// 1. State Management
let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = 'all';

// 2. Selectors
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const itemsLeft = document.getElementById("itemsLeft");

// 3. Functions
function saveAndRender() {
    localStorage.setItem("todos", JSON.stringify(todos));
    render();
}

function render() {
    taskList.innerHTML = "";
    
    // Filter logic
    const filteredTodos = todos.filter(todo => {
        if (currentFilter === 'pending') return !todo.completed;
        if (currentFilter === 'completed') return todo.completed;
        return true;
    });

    filteredTodos.forEach((todo, index) => {
        const li = document.createElement("li");
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <span onclick="toggleTodo(${index})">${todo.text}</span>
            <button onclick="deleteTodo(${index})" style="background: #ef4444">Delete</button>
        `;
        taskList.appendChild(li);
    });

    itemsLeft.innerText = `${todos.filter(t => !t.completed).length} items left`;
}

// 4. Operations (CRUD)
function addTodo() {
    const text = taskInput.value.trim();
    if (text) {
        todos.push({ text, completed: false });
        taskInput.value = "";
        saveAndRender();
    }
}

function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    saveAndRender();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    saveAndRender();
}

// 5. Event Listeners
addBtn.addEventListener("click", addTodo);

document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
        document.querySelector(".active").classList.remove("active");
        e.target.classList.add("active");
        currentFilter = e.target.dataset.filter;
        render();
    });
});

// Initial Render
render();