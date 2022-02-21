import { classes } from "./styles.js";
import { getToDoList, addTask, editTask, deleteTask } from "./client.js";

(async function () {
  let idSerializer = 0;
  createAddTaskContainer();
  const toDoList = await getToDoList();
  const toDoListKeys = Object.keys(toDoList);
  if (toDoListKeys.length > 0) {
    toDoListKeys.forEach((key) => {
      const { title } = toDoList[key];
      createTask(title,key,false);
    });
  }

  function createAddTaskContainer() {
    const buttonContainer = document.getElementById("add-button-container");
    const toDoTaskInput = document.getElementById("task-title-input");
    toDoTaskInput.addEventListener("change", () => addNewTask());
    const addButton = createButtonElement(
      [classes.buttonStyle],
      "click",
      addNewTask
    );
    addButton.textContent = "add";
    buttonContainer.appendChild(addButton);
  }

  function createButtonElements(taskInfo) {
    const buttonsWrapper = createHtmlElement("div", [classes.buttonsWrapper]);
    const editButtonElement = createEditButton(taskInfo);
    const deleteButtonElement = createDeleteButton(taskInfo);
    buttonsWrapper.appendChild(editButtonElement);
    buttonsWrapper.appendChild(deleteButtonElement);
    return buttonsWrapper;
  }

  function createEditButton(taskInfo) {
    const editButtonElement = createButtonElement(
      [classes.editTaskInfo, classes.buttonStyle],
      "click",
      editElementButtonHandler,
      taskInfo
    );
    editButtonElement.textContent = "edit";
    return editButtonElement;
  }

  function createDeleteButton(taskInfo) {
    const deleteButtonElement = createButtonElement(
      [classes.deleteTask, classes.buttonStyle],
      "click",
      deleteElementButtonHandler,
      taskInfo.id
    );
    deleteButtonElement.textContent = "delete";
    return deleteButtonElement;
  }

  function createTaskInfoElement(title) {
    const taskTitleElement = createHtmlElement("h3", [classes.toDoTaskTitle]);
    taskTitleElement.id = "task-title";
    taskTitleElement.textContent = title;
    return taskTitleElement;
  }

  async function createTask(title,id='', isNewTask = true) {
    let taskId = id;
    if (isNewTask){
      taskId = (await addTask(title)).id;
    }
    const taskInfo = {
      id: taskId,
      title: title,
      isEditMode: false,
      isDone: false,
      
    };
    const toDoTaskElement = createHtmlElement("li", [classes.toDoTasks]);
    toDoTaskElement.id = taskInfo.id;
    const checkBoxElement = createTaskCheckBoxElement(taskInfo);
    toDoTaskElement.appendChild(checkBoxElement);
    const taskInfoElement = createTaskInfoElement(taskInfo.title);
    toDoTaskElement.appendChild(taskInfoElement);
    const buttonsWrapper = createButtonElements(taskInfo);
    toDoTaskElement.appendChild(buttonsWrapper);
    let ulElement = document.getElementById("to-do-list-container");
    ulElement.appendChild(toDoTaskElement);
  }

  function createTaskCheckBoxElement(taskInfo) {
    const checkBoxElement = createHtmlElement("input");
    checkBoxElement.type = "checkbox";
    checkBoxElement.id = "task-checkbox";
    checkBoxElement.addEventListener("click", (e) => {
      markTaskAsDone(e, taskInfo);
    });
    return checkBoxElement;
  }

  function createHtmlElement(tagName, className = []) {
    const htmlElement = document.createElement(tagName);
    htmlElement.classList.add(...className);
    return htmlElement;
  }

  function getNewTaskId(ev) {
    idSerializer++;
    return idSerializer.toString();
  }

  async function deleteElementButtonHandler(event, id) {
    const task = document.getElementById(id);
    task.remove();
    await deleteTask(id);
  }

  function editElementButtonHandler(event, taskInfo) {
    if (!taskInfo.isEditMode) {
      editElementTitle(taskInfo);
    } else {
      setElementTitle(taskInfo);
    }
    taskInfo.isEditMode = !taskInfo.isEditMode;
  }

  function editElementTitle(taskInfo) {
    const task = document.getElementById(taskInfo.id);
    const taskTitle = task.querySelector("#task-title");
    const taskCheckBox = task.querySelector("#task-checkbox");
    taskCheckBox.disabled = true;
    const taskNewTitle = createHtmlElement("input", [
      classes.taskNewTitleInput,
    ]);
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

  async function setElementTitle(taskInfo) {
    const task = document.getElementById(taskInfo.id);
    const taskInputField = task.querySelector("#task-input-field");
    const newTitle = createHtmlElement("h3", [classes.toDoTaskTitle]);
    const taskCheckBox = task.querySelector("#task-checkbox");
    taskCheckBox.disabled = false;
    newTitle.id = "task-title";
    newTitle.textContent = taskInputField.value;
    taskInfo.title = newTitle.textContent;
    await editTask(taskInfo);
    task.replaceChild(newTitle, taskInputField);
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
      title.classList.add(classes.doneTask);
      taskInfo.isDone = true;
    } else {
      title.classList.remove(classes.doneTask);
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
