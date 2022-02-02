const list = [
  {
    text: "Doing the Dishes",
    status: "unfinished",
    isEditMode: false,
    id: 1,
  },
  {
    text: "Fold Laundry",
    status: "unfinished",
    isEditMode: false,
    id: 2,
  },
  {
    text: "Build Todo App",
    status: "finished",
    isEditMode: false,
    id: 3,
  },
  {
    text: "Get a haircut",
    status: "unfinished",
    isEditMode: false,
    id: 4,
  },
  {
    text: "Call to mom and dad",
    status: "unfinished",
    isEditMode: false,
    id: 5,
  },
  {
    text: "Game day against Elitzur Tel-Aviv",
    status: "unfinished",
    isEditMode: false,
    id: 6,
  },
  {
    text: "Make dinner",
    status: "unfinished",
    isEditMode: false,
    id: 7,
  },
  {
    text: "Eat lunch",
    status: "finished",
    isEditMode: false,
    id: 8,
  },
  {
    text: "Go to Wix offices",
    status: "unfinished",
    isEditMode: false,
    id: 9,
  },
  {
    text: "Watch Deni Avdjia game",
    status: "unfinished",
    isEditMode: false,
    id: 10,
  },
  {
    text: "Go to step 2",
    status: "unfinished",
    isEditMode: false,
    id: 11,
  },
  {
    text: "Infra webinar at 3",
    status: "unfinished",
    isEditMode: false,
    id: 12,
  },
  {
    text: "Pay the bills",
    status: "unfinished",
    isEditMode: false,
    id: 13,
  },
  {
    text: "Contribute code to open source",
    status: "unfinished",
    isEditMode: false,
    id: 14,
  },
  {
    text: "Finish Velo site",
    status: "unfinished",
    isEditMode: false,
    id: 15,
  },
];

const loadToDoList = (list) => {
  const ul = document.getElementById("todoList");
  ul.innerHTML = "";
  list.forEach((item) => {
    ul.appendChild(createItem(list, item));
  });
};

const addTodo = () => {
  const inputText = document.getElementById("addTodo").value;
  list.push({
    text: inputText,
    status: "unfinished",
    id: list.length + 1,
  });
  loadToDoList(list);
};

const removeTodo = (list, item) => {
  list = list.filter(function (ele) {
    return ele.id != item.id;
  });

  loadToDoList(list);
};

const editTodo = (list, item) => {
  list = list.map((ele) => {
    if (ele.id === item.id) {
      ele.isEditMode = !ele.isEditMode;
    }
    return ele;
  });
  loadToDoList(list);
};

const toggleTodo = (item) => {
  const li = document.getElementById(item.id);
  const text = li.children[0].children[1];
  if (item.status === "finished") {
    text.style["text-decoration"] = "none";
    item.status = "unfinished";
  } else {
    text.style["text-decoration"] = "line-through";
    item.status = "finished";
  }
};

const createButton = (cb, icon, className) => {
  const button = document.createElement("button");
  button.innerHTML = `<i class="${icon}" aria-hidden="true"></i>`;
  button.classList.add(className);
  button.onclick = cb;
  button.style.cursor = "pointer";
  return button;
};

const createItem = (list, item) => {
  const li = document.createElement("li");
  li.id = item.id;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.onclick = () => toggleTodo(item);

  const spanText = document.createElement("span");
  spanText.classList.add("spanText");
  spanText.appendChild(checkbox);

  if (item.isEditMode) {
    //edit model
    const inputText = document.createElement("input");
    inputText.type = "text";
    inputText.value = item.text;
    inputText.classList.add("edit-todo");
    inputText.id = `${item.id}-editTodo`;
    spanText.appendChild(inputText);
  } else {
    //text mode
    const text = document.createElement("span");
    text.innerText = item.text;
    text.style.marginLeft = "20px";
    if (item.status === "finished") {
      text.style["text-decoration"] = "line-through";
      checkbox.checked = true;
    }
    spanText.appendChild(text);
  }

  const spanButton = document.createElement("span");
  spanButton.classList.add("spanActions");

  const removeButton = createButton(
    () => removeTodo(list, item),
    "fa fa-trash",
    "button"
  );
  const editButton = createButton(
    () => editTodo(list, item),
    "fa fa-pencil",
    "edit"
  );
  spanButton.appendChild(removeButton);
  spanButton.appendChild(editButton);

  li.appendChild(spanText);
  li.appendChild(spanButton);
  return li;
};

const editListenerHandler = () => {
  const text = e.target.parentNode.children[1];
  const id = Number(text.id.split("-")[0]);
  let updatedList = list.map((ele) => {
    if (ele.id === id) {
      ele.text = text.value;
      ele.isEditMode = false;
    }
    return ele;
  });
  loadToDoList(updatedList);
};

(function () {
  document.querySelector("#addTodo").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  });

  document.querySelector("#todoList").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        editListenerHandler()
    }
  });
  loadToDoList(list);
})();
