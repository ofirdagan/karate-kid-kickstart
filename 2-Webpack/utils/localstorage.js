export class LocalStorage {
  constructor() {
    if (!localStorage.getItem("todoList"))
      localStorage.setItem("todoList", JSON.stringify([]));
  }
  getList() {
    return JSON.parse(localStorage.getItem("todoList"));
  }
  #saveList(list) {
    localStorage.setItem("todoList", JSON.stringify(list));
  }
  addTodo(item) {
    this.#saveList([...this.getList(), item]);
  }
  editTodo(newTodo, id) {
    const newList = this.getList().map((todo) => {
      if (todo.id === id) return newTodo;
      else return todo;
    });
    this.#saveList(newList);
  }
  removeTodo(id) {
    const newList = this.getList().filter((todo) => todo.id === id);
    this.#saveList(newList);
  }
}
