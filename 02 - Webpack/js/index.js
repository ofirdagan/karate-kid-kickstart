(function () {
  const addButton = document.getElementById("add");
  const todoContent = document.getElementById("todo-input");
  const todosContainer = document.getElementById("todos");

  const createInput = ({ value }) => {
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("value", value);
    input.setAttribute("disabled", true);
    return input;
  };

  const createCheckbox = ({ checked, cb }) => {
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    if (checked) {
      checkbox.setAttribute("checked", true);
    }
    checkbox.addEventListener("click", () => cb(checkbox));
    return checkbox;
  };

  const createButton = ({ text, cb }) => {
    const btn = document.createElement("button");
    btn.innerHTML = text;
    btn.addEventListener("click", () => cb(btn));
    return btn;
  };

  const createTodoElement = ({ value, checked, id }) => {
    const container = document.createElement("div");
    container.setAttribute("id", id);
    const input = createInput({ value });
    const checkbox = createCheckbox({ checked, cb: el => editTodo(id, { value: input.value, done: Boolean(el.checked) }) });
    const deleteBtn = createButton({
      text: "delete",
      cb: () => {
        removeTodo(id);
        container.parentNode.removeChild(container)
      }
    });
    const editButton = createButton({
      text: "edit",
      cb: el => {
        if (!input.getAttribute("disabled")) {
          input.setAttribute("disabled", true);
          el.innerHTML = "edit";
          editTodo(id, { value: input.value, done: checkbox.checked })
          return;
        }

        input.removeAttribute("disabled");
        el.innerHTML = "done";
      },
    });

    container.appendChild(input);
    container.appendChild(checkbox);
    container.appendChild(deleteBtn);
    container.appendChild(editButton);
    todosContainer.appendChild(container);
  };

  addButton.addEventListener("click", () => {
    const value = todoContent.value;
    const checked = false;
    const id = addTodo({ value, done: checked });
    createTodoElement({ id, value, checked });
  });

  const todos = getTodos();
  Object.keys(todos).forEach(id => {
    const { value, done } = todos[id]
    createTodoElement({ value, checked: done, id })
  })
})();
