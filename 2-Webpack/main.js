import { v4 as uuidv4 } from "uuid";
import { LocalStorage } from "./utils/localstorage";

(function () {
  const LS = new LocalStorage();
  const editModeItems = [];
  const todoList = document.getElementById("todoList");
  const inputText = document.getElementById("addTodo");

  const loadToDoList = (list) => {
    todoList.innerHTML = "";
    list.forEach((item) => todoList.appendChild(createItem(list, item)));
  };

  const addTodo = () => {
    const newTodo = {
      text: inputText.value,
      isFinished: false,
      id: uuidv4(),
    };
    LS.addTodo(newTodo);
    todoList.insertBefore(
      createItem(LS.getList(), newTodo),
      todoList.firstChild
    );
    inputText.value = "";
  };

  const removeTodo = (item) => {
    document.getElementById(item.id).remove();
    LS.removeTodo(item.id);
  };

  function removeElement(array, elem) {
    const index = array.findIndex((el) => el.id == elem.id);
    if (index > -1) array.splice(index, 1);
  }

  const swapDOMComponents = (elem, curr, modifiedElem) => {
    elem.querySelector(".list-item-text").replaceChild(curr, modifiedElem);
  };

  const createTodoItem = (item, todoListItem) => {
    const todoItem = document.createElement("span");
    todoItem.innerText = document.getElementById(`${item.id}-editTodo`).value;
    todoItem.classList.add("todo-text");
    if (item.isFinished) {
      todoItem.classList.add("finished-todo");
      todoListItem.firstChild.checked = true;
    }
    return todoItem;
  };

  const createEditTodoElem = (elemToChange, item) => {
    const inputText = document.createElement("input");
    inputText.type = "text";
    inputText.value = elemToChange.innerText;
    inputText.classList.add("todo-text", "edit-todo");
    inputText.id = `${item.id}-editTodo`;
    return inputText;
  };

  const editTodo = (item) => {
    const todoListItem = document.getElementById(item.id);
    const isFound = editModeItems.some((element) => element.id === item.id);
    const elemToChange = todoListItem.querySelector(`.todo-text`);
    if (isFound) {
      removeElement(editModeItems, item);
      const todoItem = createTodoItem(item, todoListItem);
      swapDOMComponents(todoListItem, todoItem, elemToChange);
      LS.editTodo(
        { ...item, text: todoItem.innerText, isFinished: item.isFinished },
        item.id
      );
    } else {
      editModeItems.push(item);
      const inputText = createEditTodoElem(elemToChange, item);
      swapDOMComponents(todoListItem, inputText, elemToChange);
    }
  };

  const toggleTodo = (item) => {
    const todoListItem = document.getElementById(item.id);
    const todoDescription = todoListItem.firstChild.children[1];
    if (item.isFinished) {
      todoDescription.classList.remove("finished-todo");
      todoDescription.classList.add("unfinished-todo");
      item.isFinished = false;
    } else {
      todoDescription.classList.remove("unfinished-todo");
      todoDescription.classList.add("finished-todo");
      item.isFinished = true;
    }
    LS.editTodo(item, item.id);
  };

  const createButton = (cb, icon, className) => {
    const button = document.createElement("button");
    const iTag = document.createElement("i");
    iTag.className = icon;
    button.append(iTag);
    button.classList.add(className);
    button.addEventListener("click", cb);
    button.style.cursor = "pointer";
    return button;
  };

  const createSwitchElem = (cb) => {
    const switchElem = document.createElement("label");
    switchElem.classList.add("switch");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.onclick = cb;

    const slider = document.createElement("span");
    slider.classList.add("slider");
    slider.classList.add("round");

    switchElem.appendChild(checkbox);
    switchElem.appendChild(slider);
    return switchElem;
  };

  const createTextItem = (item, switchElem) => {
    const todoDescription = document.createElement("span");
    todoDescription.innerText = item.text;
    todoDescription.classList.add("todo-text");
    if (item.isFinished) {
      todoDescription.classList.add("finished-todo");
      switchElem.firstChild.checked = true;
    }
    return todoDescription;
  };

  const createListItem = (item) => {
    const listItemContainer = document.createElement("div");
    listItemContainer.classList.add("list-item-text");
    const switchElem = createSwitchElem(() => toggleTodo(item));
    listItemContainer.appendChild(switchElem);
    listItemContainer.appendChild(createTextItem(item, switchElem));
    return listItemContainer;
  };

  const createItem = (list, item) => {
    const todoListItemContainer = document.createElement("li");
    todoListItemContainer.id = item.id;
    const listItem = createListItem(item);

    const itemActions = document.createElement("span");
    itemActions.classList.add("list-item-actions");
    itemActions.appendChild(
      createButton(() => removeTodo(item), "fa fa-trash", "button")
    );
    itemActions.appendChild(
      createButton(() => editTodo(item), "fa fa-pencil", "edit")
    );

    todoListItemContainer.appendChild(listItem);
    todoListItemContainer.appendChild(itemActions);
    return todoListItemContainer;
  };

  const editListenerHandler = (e) => {
    const editInputElem = e.target;
    const id = editInputElem.id.split("-editTodo")[0];
    let updatedItem = LS.getList().find((ele) => ele.id === id);
    updatedItem.text = editInputElem.value;
    editTodo(updatedItem);
  };

  document.querySelector("#addTodo").addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTodo();
  });

  document.querySelector("#todoList").addEventListener("keypress", (e) => {
    if (e.key === "Enter") editListenerHandler(e);
  });
  loadToDoList(LS.getList().reverse());
})();
