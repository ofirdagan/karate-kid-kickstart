export const todoListNameLocalStorage = "My Todo List";

function loadTodoListFromLS() {
    let todoListArr = []
    let todoListFromLocalStorage = localStorage.getItem(todoListNameLocalStorage);
    if (todoListFromLocalStorage == null) {
        todoListArr = []
    } else {
        todoListArr = JSON.parse(todoListFromLocalStorage);
    }
    return todoListArr
}

function getTodoById(todoId){
    let todos = loadTodoListFromLS();
    return todos.find(todo => todo.todoId === todoId);

}
function updateTodoInLS(myTodo){
    let todos = loadTodoListFromLS()
    const todoIndex = todos.findIndex((todo => todo.todoId === myTodo.todoId));
    todos[todoIndex] = myTodo
    localStorage.setItem(todoListNameLocalStorage, JSON.stringify(todos))
}
function removeTodoFromLocalStorage(todoId){
        
    let todos = loadTodoListFromLS()
    todos = todos.filter(todo => todo.todoId != todoId)
    localStorage.setItem(todoListNameLocalStorage, JSON.stringify(todos))
}
function saveTodoToLocalStorage(newTodo) {
    let todos = loadTodoListFromLS()
    todos.push(newTodo);
    localStorage.setItem(todoListNameLocalStorage, JSON.stringify(todos))
}  
export {
    loadTodoListFromLS,
    updateTodoInLS,
    removeTodoFromLocalStorage,
    saveTodoToLocalStorage,
    getTodoById
}