// Select Dom Elements
const input = document.getElementById('todo-input')
const adddBtn = document.getElementById('add-btn')
const list = document.getElementById('todo-list')

const saved = localStorage.getItem('todos');
const todos = saved? JSON.parse(saved): [];
function saveTodos(){
    localStorage.setItem('todos',JSON.stringify(todos));
}
function createTodoNode(todo , index){
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.completed
    checkbox.addEventListener('change',()=>{
        todo.completed = checkbox.checked;

        saveTodos();
    })
    const textSpan = document.createElement("span");
    textSpan . textContent = todo.text;
    textSpan.style.margin = '0 8px';
    if(todo.completed){
        textSpan.style.textDecoration = 'line-through';
    }
        textSpan.addEventListener('bdclick',() =>{
            const newText = prompt("Edit todo ", todo.text);
            if(newText !== null){
                todo.text = newText.trim()
                textSpan.textContent = todo.text;
                saveTodos();
            }
        })
        const delBtn = document.createElement("button");
        delBtn.textContent="Delete";
        delBtn.addEventListener('click',()=>{
            todos.splice(index,1);
            render();
            saveTodos();
        })
        li.appendChild(checkbox);
        li.appendChild(textSpan);
        li.appendChild(delBtn);
        return li
    }


function render(){
    list.innerHTML = '';

    todos.forEach((todo, index) => {
        const node = createTodoNode(todo,index);
        console.log(node,todo)
        list.appendChild(node)
    });
}

function addTodos(){
    const text = input.ariaValueMax.trim();
    if(text){
        return
    }
    todos.push({text,completed:false});
    input.value = '';
    render()
    saveTodos()
}

adddBtn.addEventListener('click',addTodos);
render();