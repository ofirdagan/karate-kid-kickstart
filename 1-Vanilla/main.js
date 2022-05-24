(function () {
  const list = [
    {
      text: "Doing the Dishes",
      status: "unfinished",
      id: 1,
    },
    {
      text: "Fold Laundry",
      status: "unfinished",
      id: 2,
    },
    {
      text: "Build Todo App",
      status: "finished",
      id: 3,
    },
    {
      text: "Get a haircut",
      status: "unfinished",
      id: 4,
    },
    {
      text: "Call to mom and dad",
      status: "unfinished",
      id: 5,
    },
    {
      text: "Game day against Elitzur Tel-Aviv",
      status: "unfinished",
      id: 6,
    },
    {
      text: "Make dinner",
      status: "unfinished",
      id: 7,
    },
    {
      text: "Eat lunch",
      status: "finished",
      id: 8,
    },
    {
      text: "Go to Wix offices",
      status: "unfinished",
      id: 9,
    },
    {
      text: "Watch Deni Avdjia game",
      status: "unfinished",
      id: 10,
    },
    {
      text: "Go to step 2",
      status: "unfinished",
      id: 11,
    },
    {
      text: "Infra webinar at 3",
      status: "unfinished",
      id: 12,
    },
    {
      text: "Pay the bills",
      status: "unfinished",
      id: 13,
    },
    {
      text: "Contribute code to open source",
      status: "unfinished",
      id: 14,
    },
    {
      text: "Finish Velo site",
      status: "unfinished",
      id: 15,
    },
  ];

  const editModeItems = [];

  const todoList = document.getElementById("todoList");
  const inputText = document.getElementById("addTodo");

  const loadToDoList = (list) => {
    todoList.innerHTML = "";
    list.forEach((item) => {
      todoList.appendChild(createItem(list, item));
    });
  };

  const addTodo = () => {
    const newTodo = {
      text: inputText.value,
      status: "unfinished",
      id: list.length + 1,
    };
    list.push(newTodo);
    todoList.insertBefore(createItem(list, newTodo), todoList.firstChild);
    inputText.value = ""; //clear input text
  };

  // Remove the todo item from the list and from the DOM
  const removeTodo = (list, item) => {
    list = list.filter(function (ele) {
      return ele.id != item.id;
    });
    const todoListItem = document.getElementById(item.id);
    todoListItem.remove();
  };

  function removeElement(array, elem) {
    const index = array.indexOf(elem);
    if (index > -1) {
      array.splice(index, 1);
    }
  }

  const renderComponent = (elem, curr, modifiedElem) => {
    elem.firstChild.replaceChild(curr, modifiedElem);
  };

  const editTodo = (item) => {
    const todoListItem = document.getElementById(item.id);
    const isFound = editModeItems.some((element) => {
      if (element.id === item.id) {
        return true;
      }
    });

    const elemToChange = todoListItem.firstChild.children[1];
    if (isFound) {
      removeElement(editModeItems, item);
      const todoItem = document.createElement("span");
      const editedText = document.getElementById(`${item.id}-editTodo`);
      todoItem.innerText = editedText.value;
      todoItem.classList.add("todo-text");
      if (item.status === "finished") {
        todoItem.classList.add("finished-todo");
        todoListItem.firstChild.checked = true;
      }
      renderComponent(todoListItem, todoItem, elemToChange);
    } else {
      editModeItems.push(item);
      const inputText = document.createElement("input");
      inputText.type = "text";
      inputText.value = item.text;
      inputText.classList.add("todo-text", "edit-todo");
      inputText.id = `${item.id}-editTodo`;
      renderComponent(todoListItem, inputText, elemToChange);
    }
  };

  const toggleTodo = (item) => {
    const todoListItem = document.getElementById(item.id);
    const todoDescription = todoListItem.firstChild.children[1];
    if (item.status === "finished") {
      todoDescription.classList.remove("finished-todo");
      todoDescription.classList.add("unfinished-todo");
      item.status = "unfinished";
    } else {
      todoDescription.classList.remove("unfinished-todo");
      todoDescription.classList.add("finished-todo");
      item.status = "finished";
    }
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
    if (item.status === "finished") {
      todoDescription.classList.add("finished-todo");
      switchElem.firstChild.checked = true;
    }
    return todoDescription;
  };

  const createItem = (list, item) => {
    const todoListItem = document.createElement("li");
    todoListItem.id = item.id;

    const listItemContainer = document.createElement("div");
    listItemContainer.classList.add("list-item-text");
    const switchElem = createSwitchElem(() => toggleTodo(item));
    listItemContainer.appendChild(switchElem);
    listItemContainer.appendChild(createTextItem(item, switchElem));

    const itemActions = document.createElement("span");
    itemActions.classList.add("list-item-actions");

    const removeButton = createButton(
      () => removeTodo(list, item),
      "fa fa-trash",
      "button"
    );
    const editButton = createButton(
      () => editTodo(item),
      "fa fa-pencil",
      "edit"
    );
    itemActions.appendChild(removeButton);
    itemActions.appendChild(editButton);

    todoListItem.appendChild(listItemContainer);
    todoListItem.appendChild(itemActions);
    return todoListItem;
  };

  const editListenerHandler = (e) => {
    const editInputElem = e.target;
    const id = Number(editInputElem.id.split("-")[0]);
    let updatedItem = list.find((ele) => {
      if (ele.id === id) {
        ele.text = editInputElem.value;
        return true;
      }
    });
    editTodo(updatedItem);
  };

  document.querySelector("#addTodo").addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTodo();
  });

  document.querySelector("#todoList").addEventListener("keypress", (e) => {
    if (e.key === "Enter") editListenerHandler(e);
  });
  loadToDoList(list);
})();
