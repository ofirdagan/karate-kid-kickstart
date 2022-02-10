import { addOrUpdateItem, removeItem, getItems, canUseLocalStorage } from "./localstorage_manager";
import { v4  as uuidv4 } from "uuid";

(function () {
  const TYPE_ITEM_INPUT = "item-input";
  const TYPE_ITEM_LABEL = "item-label";
  const TYPE_EDIT_BTN = "edit";
  const TYPE_REMOVE_BTN = "remove";
  const TYPE_CHECK_BTN = "check";
  const TYPE_CONFIRM_BTN = "confirm";

  const KEY_CODE_ENTER = 13;

  const iconMap = { edit: "&#xe3c9", remove: "&#xe14c;", check: "&#xe876;" };
  const newItemInput = document.getElementById("new-item-name");
  const addBtn = document.getElementById("add-btn");

  function createButton(type, cb) {
    const button = document.createElement("div");
    const icon = iconMap[type] || "&#xe145;";

    const iconSpan = document.createElement("span");
    iconSpan.classList.add("material-icons", "md-36");
    iconSpan.innerHTML = icon;

    button.classList.add("btn", type + "-btn");
    button.dataset.type = type;
    button.appendChild(iconSpan);
    button.addEventListener("click", cb);

    return button;
  }

  function createItemLabel(id, text) {
    const label = document.createElement("label");
    label.classList.add("item");
    label.dataset.type = TYPE_ITEM_LABEL;
    label.innerText = text;
    label.addEventListener("dblclick", editItemCallback(id));

    return label;
  }

  function createItemInput(id, text) {
    const input = document.createElement("input");
    input.type = "text";
    input.classList.add("edit");
    input.dataset.type = TYPE_ITEM_INPUT;
    input.value = text;
    input.addEventListener("keyup", confirmItemEditCallback(id));

    return input;
  }

  function createTodoItem(id, text, check) {
    const newItemContainer = document.createElement("div");
    newItemContainer.classList.add("bar", "item-bar");
    newItemContainer.dataset.id = id;

    const newItemCheckBtn = createButton(TYPE_CHECK_BTN, checkItemCallback(id));
    newItemContainer.appendChild(newItemCheckBtn);

    if (check) {
      newItemCheckBtn.dataset.checked = "true";
      newItemCheckBtn.classList.add("checked");
    }
    else {
      newItemCheckBtn.dataset.checked = "false";
    }

    const newItemLabel = createItemLabel(id, text);
    newItemContainer.appendChild(newItemLabel);

    const newItemEditBtn = createButton(TYPE_EDIT_BTN, editItemCallback(id));
    newItemContainer.appendChild(newItemEditBtn);

    const newItemRemoveBtn = createButton(
      TYPE_REMOVE_BTN,
      removeItemCallback(id)
    );
    newItemContainer.appendChild(newItemRemoveBtn);

    return newItemContainer;
  }

  function addItemCallback(event) {
    if (
      event.type === "click" ||
      (event.type === "keyup" && event.keyCode === KEY_CODE_ENTER)
    ) {
      if (isVaildItemName(newItemInput.value)) {
        const uniqueId = uuidv4();
        const newItem = createTodoItem(uniqueId, newItemInput.value, false);

        document.getElementById("main-container").appendChild(newItem);
        saveToLocalStorage(uniqueId);

        newItemInput.value = "";
      }
    }
  }

  function isVaildItemName(name) {
    let valid = name.length > 0;

    if (!valid) {
      alert("Invalid item name!");
    }

    return valid;
  }

  function getItemElement(id, type) {
    let element = document.querySelector("[data-id='" + id + "']");

    if (type) {
      element = element.querySelector("[data-type='" + type + "']");
    }

    return element;
  }

  function isInEditMode(id) {
    return getItemElement(id, TYPE_ITEM_INPUT) !== null;
  }

  function removeItemCallback(id) {
    return function () {
      if (!isInEditMode(id)) {
        const todoItem = getItemElement(id);

        document.getElementById("main-container").removeChild(todoItem);
        removeFromLocalStorage(id);
      }
    };
  }

  function checkItemCallback(id) {
    return function () {
      if (!isInEditMode(id)) {
        const checkBtn = getItemElement(id, TYPE_CHECK_BTN);

        if (checkBtn.dataset.checked == "true") {
          checkBtn.dataset.checked = "false";
          checkBtn.classList.remove("checked");
        } else {
          checkBtn.dataset.checked = "true";
          checkBtn.classList.add("checked");
        }

        saveToLocalStorage(id);
      }
    };
  }

  function confirmItemEditCallback(id) {
    return function (event) {
      if (
        event.type === "click" ||
        (event.type === "keyup" && event.keyCode === KEY_CODE_ENTER)
      ) {
        const todoItem = getItemElement(id);
        const input = getItemElement(id, TYPE_ITEM_INPUT);
        const confirmBtn = getItemElement(id, TYPE_CONFIRM_BTN);
        const checkBtn = getItemElement(id, TYPE_CHECK_BTN);
        const removeBtn = getItemElement(id, TYPE_REMOVE_BTN);

        if (isVaildItemName(input.value)) {
          const newTextLabel = createItemLabel(id, input.value);
          todoItem.replaceChild(newTextLabel, input);

          checkBtn.classList.remove("disabled");
          removeBtn.classList.remove("disabled");

          const editBtn = createButton(TYPE_EDIT_BTN, editItemCallback(id));
          todoItem.replaceChild(editBtn, confirmBtn);

          saveToLocalStorage(id);
        }
      }
    };
  }

  function editItemCallback(id) {
    return function () {
      const todoItem = getItemElement(id);
      const label = getItemElement(id, TYPE_ITEM_LABEL);
      const editBtn = getItemElement(id, TYPE_EDIT_BTN);
      const checkBtn = getItemElement(id, TYPE_CHECK_BTN);
      const removeBtn = getItemElement(id, TYPE_REMOVE_BTN);
      const oldText = label.innerText;

      const newTextInput = createItemInput(id, oldText);
      todoItem.replaceChild(newTextInput, label);
      newTextInput.focus();

      checkBtn.classList.add("disabled");
      removeBtn.classList.add("disabled");

      const confirmBtn = createButton(
        TYPE_CONFIRM_BTN,
        confirmItemEditCallback(id)
      );
      todoItem.replaceChild(confirmBtn, editBtn);
    };
  }

  function saveToLocalStorage(id) {
    if (canUseLocalStorage()) {
      const label = getItemElement(id, TYPE_ITEM_LABEL);
      const checkBtn = getItemElement(id, TYPE_CHECK_BTN);
      let isChecked = checkBtn.dataset.checked === "true";

      addOrUpdateItem(id, {
        text: label.innerText,
        check: isChecked,
      });
    }
  }

  function removeFromLocalStorage(id) {
    if (canUseLocalStorage()) {
      removeItem(id);
    }
  }

  function loadLocalStorage() {
    if (canUseLocalStorage()) {
      let numericIds = [];
      let map = getItems();

      for (const [id, value] of map) {
        const newItem = createTodoItem(id, value.text, value.check);
        document.getElementById("main-container").appendChild(newItem);
      }
    }
  }

  addBtn.addEventListener("click", addItemCallback);
  newItemInput.addEventListener("keyup", addItemCallback);

  loadLocalStorage();
})();
