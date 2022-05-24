import axios from "axios";

export class TodosAPI {
  constructor(url) {
    this.url = url;
  }
  getTodos() {
    return axios.get(`${this.url}/todos`);
  }
  addTodo(newTodo) {
    return axios.post(`${this.url}/todos`, newTodo);
  }

  editTodo(newTodo, id) {
    return axios.put(`${this.url}/todos/${id}`, { data: newTodo });
  }

  removeTodo(id) {
    return axios.delete(`${this.url}/todos/${id}`);
  }
}
