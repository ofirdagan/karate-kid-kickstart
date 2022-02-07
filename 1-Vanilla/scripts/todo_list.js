(function () {

  let nextId = 0;
  const iconMap = { "edit": "&#xe3c9", "remove": "&#xe14c;", "check": "&#xe876;"}
  const newItemInput = document.getElementById("new-item-name");

  function createButton(id, type, cb) {
    const button = document.createElement("div");
    const icon = iconMap[type] || "&#xe145;";

    const iconSpan = document.createElement("span");
    iconSpan.classList.add("material-icons");
    iconSpan.classList.add("md-36");
    iconSpan.innerHTML = icon;

    button.classList.add("btn");
    button.classList.add(type + "-btn");
    button.id = type + "-btn-" + id;
    button.appendChild(iconSpan);
    button.onclick = cb;

    return button;
  }

  function createTodoItem(id, text) {
    const newItemContainer = document.createElement("div");
    newItemContainer.classList.add("bar");
    newItemContainer.classList.add("item-bar");
    newItemContainer.id = "item-bar-" + id;

    const newItemCheckBtn = createButton(id, "check", checkItemCallback(id));
    newItemContainer.appendChild(newItemCheckBtn);

    const newItemLabel = document.createElement("label");
    newItemLabel.classList.add("item");
    newItemLabel.id = "item-label-" + id;
    newItemLabel.innerText = text;
    newItemContainer.appendChild(newItemLabel);

    const newItemEditBtn = createButton(id, "edit", editItemCallback(id));
    newItemContainer.appendChild(newItemEditBtn);

    const newItemRemoveBtn = createButton(
      id,
      "remove",
      removeItemCallback(id)
    );
    newItemContainer.appendChild(newItemRemoveBtn);

    return newItemContainer;
  }

  function addItem() {
    if (isVaildItemName(newItemInput.value)) {
      const newItem = createTodoItem(nextId, newItemInput.value);

      nextId++;

      document.getElementById("main-container").appendChild(newItem);
      newItemInput.value = "";
    }
  }

  function isVaildItemName(name) {
      let valid = name.length > 0;

      if (!valid) {
        alert("Invalid item name!");
      }

      return valid;
  }

  function removeItemCallback(id) {
    return function () {
      const elementToRemove = document.getElementById("item-bar-" + id);
      document.getElementById("main-container").removeChild(elementToRemove);
    };
  }

  function checkItemCallback(id) {
    return function () {
      const checkBtn = document.getElementById("check-btn-" + id);

      if (checkBtn.dataset.checked == "yes") {
        checkBtn.dataset.checked = "no";
        checkBtn.classList.remove("checked");
      } else {
        checkBtn.dataset.checked = "yes";
        checkBtn.classList.add("checked");
      }
    };
  }

  function confirmItemEditCallback(id) {
    return function () {
      const bar = document.getElementById("item-bar-" + id);
      const input = document.getElementById("item-edit-" + id);
      const confirmBtn = document.getElementById("confirm-btn-" + id);

      if (isVaildItemName(input.value)) {
        const newTextLabel = document.createElement("label");
        newTextLabel.classList.add("item");
        newTextLabel.id = "item-label-" + id;
        newTextLabel.innerText = input.value;
        bar.replaceChild(newTextLabel, input);
  
        const editBtn = createButton(id, "edit", editItemCallback(id));
        bar.replaceChild(editBtn, confirmBtn);
      }
    };
  }

  function editItemCallback(id) {
    return function () {
      const bar = document.getElementById("item-bar-" + id);
      const label = document.getElementById("item-label-" + id);
      const editBtn = document.getElementById("edit-btn-" + id);
      const oldText = label.innerText;

      const newTextInput = document.createElement("input");
      newTextInput.type = "text";
      newTextInput.classList.add("edit");
      newTextInput.id = "item-edit-" + id;
      newTextInput.value = oldText;
      bar.replaceChild(newTextInput, label);

      const confirmBtn = createButton(
        id,
        "confirm",
        confirmItemEditCallback(id)
      );
      bar.replaceChild(confirmBtn, editBtn);
    };
  }

  document.getElementById("add-btn").onclick = addItem;
})();
