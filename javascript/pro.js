const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory storage for todos
let todos = [];
let idCounter = 1;

// GET /todos - Retrieve all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// POST /todos - Add a new todo
app.post('/todos', (req, res) => {
  const { title, completed = false } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const newTodo = { id: idCounter++, title, completed };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT /todos/:id - Update a todo
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, completed } = req.body;
  const todo = todos.find(t => t.id === id);
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;
  res.json(todo);
});

// DELETE /todos/:id - Delete a todo
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  todos.splice(index, 1);
  res.status(204).send();
});

// Start server
app.listen(port, () => {
  console.log(`Todo API running at http://localhost:${port}`);
});