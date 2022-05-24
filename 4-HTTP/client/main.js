import { v4 as uuidv4 } from "uuid";
import { classes } from "./js-styles/style";
import { TodosAPI } from "./utils/TodosAPI";
import {
  createEditTodoElem,
  createItem,
  createTodoItem,
} from "./utils/generateElements";
import { editTodoSuffix } from "./utils/constants";

(async function () {
  const URL = "http://localhost:3000";
  const todosAPI = new TodosAPI(URL);
  const editModeItems = [];
  const todoList = document.getElementById("todoList");
  const inputText = document.getElementById("addTodo");

  const loadToDoList = (list) => {
    todoList.innerHTML = "";
    list.forEach((item) =>
      todoList.appendChild(createItem(item, removeTodo, editTodo, toggleTodo))
    );
  };

  const errorHandler = (e) => {
    console.error(e);
  };

  const addTodo = () => {
    const newTodo = {
      text: inputText.value,
      isFinished: false,
      id: uuidv4(),
    };
    todosAPI
      .addTodo(newTodo)
      .then(() => {
        todoList.prepend(createItem(newTodo, removeTodo, editTodo, toggleTodo));
      })
      .catch(errorHandler);
    inputText.value = "";
  };

  const removeTodo = (item) => {
    document.getElementById(item.id).remove();
    todosAPI.removeTodo(item.id).catch(errorHandler);
  };

  function removeElement(array, elem) {
    const index = array.findIndex((el) => el.id == elem.id);
    if (index > -1) array.splice(index, 1);
  }

  const replaceTodoTextWithEditInput = (elem, curr, modifiedElem) => {
    elem
      .querySelector(`.${classes.listItemText}`)
      .replaceChild(curr, modifiedElem);
  };

  const editTodo = (item) => {
    const todoListItem = document.getElementById(item.id);
    const isFound = editModeItems.some((element) => element.id === item.id);
    const elemToChange = todoListItem.querySelector(`.${classes.todoText}`);
    if (isFound) {
      removeElement(editModeItems, item);
      const todoItem = createTodoItem(item, todoListItem);
      //const switchElem = createSwitchElem(() => toggleTodo(item));
      replaceTodoTextWithEditInput(todoListItem, todoItem, elemToChange);
      todosAPI
        .editTodo(
          { ...item, text: todoItem.innerText, isFinished: item.isFinished },
          item.id
        )
        .catch(errorHandler);
    } else {
      editModeItems.push(item);
      const inputText = createEditTodoElem(elemToChange, item);
      replaceTodoTextWithEditInput(todoListItem, inputText, elemToChange);
    }
  };

  const toggleTodo = (item) => {
    const todoItem = document.getElementById(item.id);
    const todoText = todoItem.querySelector(`.${classes.todoText}`);
    todoText.classList.toggle(classes.finishedTodo);
    todoText.classList.toggle(classes.unfinishedTodo);
    item.isFinished = !item.isFinished;
    todosAPI.editTodo(item, item.id).catch(errorHandler);
  };

  const editListenerHandler = (e) => {
    const editInputElem = e.target;
    const id = editInputElem.id.split(editTodoSuffix)[0];
    const switchElem = document.getElementById(id);
    const isTodoFinished = switchElem.querySelector(
      'input[type="checkbox"]'
    ).checked;
    editTodo({ id, text: editInputElem.value, isFinished: isTodoFinished });
  };

  document.querySelector("#addTodo").addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTodo();
  });

  document.querySelector("#todoList").addEventListener("keypress", (e) => {
    if (e.key === "Enter") editListenerHandler(e);
  });
  todosAPI
    .getTodos()
    .then(({ data }) => {
      loadToDoList(data.reverse());
    })
    .catch(errorHandler);
})();
