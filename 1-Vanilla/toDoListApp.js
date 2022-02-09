(function () {
  let idSerializer = 0;
  createAddButton();

  function createAddButton() {
    const buttonContainer = document.getElementById("add-button-container");
    const addButton = createButtonElement(
      ["button-style"],
      "click",
      addNewTask
    );
    addButton.textContent = "add";
    buttonContainer.appendChild(addButton);
  }
  function createButtonElements(taskId) {
    const buttonsWrapper = createHtmlElement("div", ["buttons-wrapper"]);
    const editButtonElement = createEditButton(taskId);
    const deleteButtonElement = createDeleteButton(taskId);
    buttonsWrapper.appendChild(editButtonElement);
    buttonsWrapper.appendChild(deleteButtonElement);
    return buttonsWrapper;
  }
  function createEditButton(taskId) {
    const editButtonElement = createButtonElement(
      ["edit-task-info", "button-style"],
      "click",
      editElementButtonHandler,
      taskId
    );
    editButtonElement.textContent = "edit";
    return editButtonElement;
  }
  function createDeleteButton(taskId) {
    const deleteButtonElement = createButtonElement(
      ["delete-task", "button-style"],
      "click",
      deleteElementButtonHandler,
      taskId
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
    const taskId = getNewTaskId();
    const toDoTaskElement = createHtmlElement("li", ["to-do-tasks"]);
    toDoTaskElement.id = taskId;
    const checkBoxElement = createCheckBoxElement(taskId);
    toDoTaskElement.appendChild(checkBoxElement);
    const taskInfoElement = createTaskInfoElement(title);
    toDoTaskElement.appendChild(taskInfoElement);
    const buttonsWrapper = createButtonElements(taskId);
    toDoTaskElement.appendChild(buttonsWrapper);
    let ulElement = document.getElementById("to-do-list-container");
    ulElement.appendChild(toDoTaskElement);
  }
  function createCheckBoxElement(taskId) {
    const checkBoxElement = createHtmlElement("input", ["to-do-task-checkbox"]);
    checkBoxElement.type = "checkbox";
    checkBoxElement.addEventListener("click", () => {
      markTaskAsDone(taskId);
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

  function deleteElementButtonHandler(event,id) {
    const task = document.getElementById(id);
    task.remove();
  }

  function editElementButtonHandler(id) {
    let task = document.getElementById(id);
    let newInput = document.getElementById("task-title-input");
    let taskTitle = task.querySelector("#task-title");
    taskTitle.textContent = newInput.value;
  }
  function createButtonElement(className, eventType, callBack = () => {}, ...args) {
    let buttonElement = createHtmlElement("button", className);
    buttonElement.addEventListener(eventType, (event) => {
      callBack(event,...args);
    
    });
    return buttonElement;
  }
  function markTaskAsDone(event,taskId) {
    let task = document.getElementById(taskId);
    let title = task.querySelector("#task-title");
    title.classList.add("done-task");
  }

  function addNewTask(ev) {
    const taskTitle = document.getElementById("task-title-input").value;
    createTask(taskTitle);
  }

})();

