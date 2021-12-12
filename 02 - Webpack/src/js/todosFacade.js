export function addTodo({ id, value, done }) {
  const todos = JSON.parse(localStorage.getItem("todos")) || {};
  todos[id] = { value, done };
  localStorage.setItem("todos", JSON.stringify(todos));
}

export function removeTodo(id) {
  const todos = JSON.parse(localStorage.getItem("todos")) || {};

  if (!todos[id]) {
    throw new Error(`item with id ${id} doesn't exist`);
  }

  delete todos[id]
  localStorage.setItem("todos", JSON.stringify(todos))
}

export function editTodo(id, { value, done }) {
  const todos = JSON.parse(localStorage.getItem("todos")) || {};

  if (!todos[id]) {
    throw new Error(`item with id ${id} doesn't exist`);
  }

  todos[id] = { value, done };
  localStorage.setItem("todos", JSON.stringify(todos))
}

export function getTodos() {
  return JSON.parse(localStorage.getItem("todos")) || {};
}
