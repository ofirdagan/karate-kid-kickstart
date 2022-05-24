import axios from "axios";
import { Guid, ITodo, UserID } from "../../../../common/interfaces/Todo";
import { addCookieToEndPoint } from "../../utils/utils";

export class AppDriver {
  userID: UserID;
  constructor(private url: string) {}

  setUserCookie(userID: UserID) {
    this.userID = userID;
  }
  clearUserCookie() {
    this.userID = undefined;
  }

  private todosURL = (id: string = "") => {
    return `${this.url}/todos/${id}`;
  };

  async getTodos() {
    return axios.get(this.todosURL(), addCookieToEndPoint(this.userID));
  }
  createTodo(newTodo:ITodo) {
    return axios.post(
      this.todosURL(),
      newTodo,
      addCookieToEndPoint(this.userID)
    );
  }

  editTodo(newTodo:ITodo, id:Guid) {
    return axios.put(
      this.todosURL(id),
      { data: newTodo },
      addCookieToEndPoint(this.userID)
    );
  }

  removeTodo(id:Guid) {
    return axios.delete(this.todosURL(id), addCookieToEndPoint(this.userID));
  }
}
