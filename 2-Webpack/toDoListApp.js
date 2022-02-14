import {
  setItemToLocalStorage,
  deleteFromLocalStorage,
  restoreTasksFromStorage,
} from "./localStorage.js";

(function () {
  let idSerializer = 0;
  createAddTaskContainer();
  if (localStorage) {
    const localStorageList = restoreTasksFromStorage();
    localStorageList.forEach((taskInfo) => {
      createTask(JSON.parse(taskInfo).title);
    });
  }

  function createAddTaskContainer() {
    const buttonContainer = document.getElementById("add-button-container");
    const toDoTaskInput = document.getElementById("task-title-input");
    toDoTaskInput.addEventListener("change", () => addNewTask());
    const addButton = createButtonElement(
      ["button-style"],
      "click",
      addNewTask
    );
    addButton.textContent = "add";
    buttonContainer.appendChild(addButton);
  }

  function createButtonElements(taskInfo) {
    const buttonsWrapper = createHtmlElement("div", ["buttons-wrapper"]);
    const editButtonElement = createEditButton(taskInfo);
    const deleteButtonElement = createDeleteButton(taskInfo);
    buttonsWrapper.appendChild(editButtonElement);
    buttonsWrapper.appendChild(deleteButtonElement);
    return buttonsWrapper;
  }

  function createEditButton(taskInfo) {
    const editButtonElement = createButtonElement(
      ["edit-task-info", "button-style"],
      "click",
      editElementButtonHandler,
      taskInfo
    );
    editButtonElement.textContent = "edit";
    return editButtonElement;
  }

  function createDeleteButton(taskInfo) {
    const deleteButtonElement = createButtonElement(
      ["delete-task", "button-style"],
      "click",
      deleteElementButtonHandler,
      taskInfo.id
    );
    deleteButtonElement.textContent = "delete";
    return deleteButtonElement;
  }

  function createTaskInfoElement(title) {
    const taskTitleElement = createHtmlElement("h3", ["to-do-task-title"]);
    taskTitleElement.id = "task-title";
    taskTitleElement.textContent = title;
    return taskTitleElement;
  }

  function createTask(title) {
    const taskInfo = {
      title: title,
      isEditMode: false,
      isDone: false,
      id: getNewTaskId(),
    };
    const toDoTaskElement = createHtmlElement("li", ["to-do-tasks"]);
    toDoTaskElement.id = taskInfo.id;
    const checkBoxElement = createTaskCheckBoxElement(taskInfo);
    toDoTaskElement.appendChild(checkBoxElement);
    const taskInfoElement = createTaskInfoElement(taskInfo.title);
    toDoTaskElement.appendChild(taskInfoElement);
    const buttonsWrapper = createButtonElements(taskInfo);
    toDoTaskElement.appendChild(buttonsWrapper);
    let ulElement = document.getElementById("to-do-list-container");
    ulElement.appendChild(toDoTaskElement);
    setItemToLocalStorage(taskInfo);
  }

  function createTaskCheckBoxElement(taskInfo) {
    const checkBoxElement = createHtmlElement("input", ["to-do-task-checkbox"]);
    checkBoxElement.type = "checkbox";
    checkBoxElement.id = "task-checkbox";
    checkBoxElement.addEventListener("click", (e) => {
      markTaskAsDone(e, taskInfo);
    });
    return checkBoxElement;
  }

  function createHtmlElement(tagName, ...className) {
    const htmlElement = document.createElement(tagName);
    htmlElement.classList.add(...className);
    return htmlElement;
  }

  function getNewTaskId(ev) {
    idSerializer++;
    return idSerializer.toString();
  }

  function deleteElementButtonHandler(event, id) {
    const task = document.getElementById(id);
    task.remove();
    deleteFromLocalStorage(id);
  }

  function editElementButtonHandler(event, taskInfo) {
    if (!taskInfo.isEditMode) {
      editElementTitle(taskInfo);
      taskInfo.isEditMode = true;
    } else {
      setElementTitle(taskInfo);
      taskInfo.isEditMode = false;
    }
  }

  function editElementTitle(taskInfo) {
    const task = document.getElementById(taskInfo.id);
    const taskTitle = task.querySelector("#task-title");
    const taskCheckBox = task.querySelector("#task-checkbox");
    taskCheckBox.disabled = true;
    const taskNewTitle = createHtmlElement("input", ["task-new-title-input"]);
    taskNewTitle.id = "task-input-field";
    taskNewTitle.value = taskInfo.title;
    task.replaceChild(taskNewTitle, taskTitle);
    taskNewTitle.addEventListener("keydown", (e) => {
      if (e.code == "Enter") {
        setElementTitle(taskInfo);
        taskInfo.isEditMode = false;
      }
    });
  }

  function setElementTitle(taskInfo) {
    const task = document.getElementById(taskInfo.id);
    const taskInputField = task.querySelector("#task-input-field");
    const newTitle = createHtmlElement("h3", ["to-do-task-title"]);
    const taskCheckBox = task.querySelector("#task-checkbox");
    taskCheckBox.disabled = false;
    newTitle.id = "task-title";
    newTitle.textContent = taskInputField.value;
    taskInfo.title = newTitle.textContent;
    task.replaceChild(newTitle, taskInputField);
    setItemToLocalStorage(taskInfo);
  }

  function createButtonElement(
    className,
    eventType,
    callBack = () => {},
    ...args
  ) {
    const buttonElement = createHtmlElement("button", className);
    buttonElement.addEventListener(eventType, (event) => {
      callBack(event, ...args);
    });
    return buttonElement;
  }

  function markTaskAsDone(event, taskInfo) {
    const task = document.getElementById(taskInfo.id);
    const taskCheck = task.querySelector("#task-checkbox");
    const title = task.querySelector("#task-title");
    if (taskCheck.checked) {
      title.classList.add("done-task");
      taskInfo.isDone = true;
    } else {
      title.classList.remove("done-task");
      taskInfo.isDone = false;
    }
  }

  function addNewTask(ev) {
    const taskTitleInput = document.getElementById("task-title-input");
    const taskTitle = taskTitleInput.value;
    if (taskTitle) {
      createTask(taskTitle);
      taskTitleInput.value = "";
    }
  }
})();
