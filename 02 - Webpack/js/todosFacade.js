function generateId() {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return "_" + Math.random().toString(36).substr(2, 9);
}

function addTodo({ value, done }) {
  const todos = JSON.parse(localStorage.getItem("todos")) || {};
  const id = generateId();
  todos[id] = { value, done };
  localStorage.setItem("todos", JSON.stringify(todos));
  return id;
}

function removeTodo(id) {
  const todos = JSON.parse(localStorage.getItem("todos")) || {};

  if (!todos[id]) {
    throw new Error(`item with id ${id} doesn't exist`);
  }

  delete todos[id]
  localStorage.setItem("todos", JSON.stringify(todos))
}

function editTodo(id, { value, done }) {
  const todos = JSON.parse(localStorage.getItem("todos")) || {};

  if (!todos[id]) {
    throw new Error(`item with id ${id} doesn't exist`);
  }

  todos[id] = { value, done };
  localStorage.setItem("todos", JSON.stringify(todos))
}

function getTodos() {
  return JSON.parse(localStorage.getItem("todos")) || {};
}
