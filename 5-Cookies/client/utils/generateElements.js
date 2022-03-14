import { classes } from "../js-styles/style";
import { editTodoSuffix } from "./constants";

const createEditTodoElem = (elemToChange, item) => {
  const inputText = document.createElement("input");
  inputText.type = "text";
  inputText.value = elemToChange.innerText;
  inputText.classList.add(classes.todoText, classes.editTodo);
  inputText.id = `${item.id}${editTodoSuffix}`;
  return inputText;
};

const createIconButton = (cb, icon, className) => {
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
  todoDescription.classList.add(classes.todoText);
  if (item.isFinished) {
    todoDescription.classList.add(classes.finishedTodo);
    switchElem.querySelector('input[type="checkbox"]').checked = true;
  } else todoDescription.classList.add(classes.unfinishedTodo);
  return todoDescription;
};

const createListItem = (item, toggleTodo) => {
  const listItemContainer = document.createElement("div");
  listItemContainer.classList.add(classes.listItemText);
  const switchElem = createSwitchElem(() => toggleTodo(item));
  listItemContainer.appendChild(switchElem);
  listItemContainer.appendChild(createTextItem(item, switchElem));
  return listItemContainer;
};

const createItem = (item, removeTodo, editTodo, toggleTodo) => {
  const todoListItemContainer = document.createElement("li");
  todoListItemContainer.id = item.id;
  const listItem = createListItem(item, toggleTodo);

  const itemActions = document.createElement("span");
  itemActions.classList.add(classes.listItemActions);
  itemActions.appendChild(
    createIconButton(() => removeTodo(item), "fa fa-trash", classes.button)
  );
  itemActions.appendChild(
    createIconButton(() => editTodo(item), "fa fa-pencil", classes.edit)
  );

  todoListItemContainer.appendChild(listItem);
  todoListItemContainer.appendChild(itemActions);
  return todoListItemContainer;
};

const createTodoItem = (item) => {
  const todoItem = document.createElement("span");
  todoItem.innerText = document.getElementById(
    `${item.id}${editTodoSuffix}`
  ).value;
  todoItem.classList.add(classes.todoText);
  if (item.isFinished) todoItem.classList.add(classes.finishedTodo);
  else todoItem.classList.add(classes.unfinishedTodo);
  return todoItem;
};

export { createEditTodoElem, createItem, createTodoItem };
