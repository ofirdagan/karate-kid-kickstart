(function () {
  const todos = [];
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

  const createCheckbox = ({ checked }) => {
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    if (checked) {
      checkbox.setAttribute("checked", true);
    }
    return checkbox;
  };

  const createButton = ({ text, cb }) => {
    const btn = document.createElement("button");
    btn.innerHTML = text;
    btn.addEventListener("click", () => cb());
    return btn;
  };

  const createTodoElement = ({ value, checked }) => {
    const container = document.createElement("div");
    const input = createInput({ value });
    const checkbox = createCheckbox({ checked });
    const deleteBtn = createButton({
      text: "delete",
      cb: () => container.parentNode.removeChild(container),
    });
    const editButton = createButton({
      text: "edit",
      cb: () => {
        if (!input.getAttribute("disabled")) {
          input.setAttribute("disabled", true);
          return;
        }

        input.removeAttribute("disabled");
      },
    });

    container.appendChild(input);
    container.appendChild(checkbox);
    container.appendChild(deleteBtn);
    container.appendChild(editButton);
    todosContainer.appendChild(container);
  };

  addButton.addEventListener("click", () => {
    createTodoElement({ value: todoContent.value, checked: false });
  });
})();
