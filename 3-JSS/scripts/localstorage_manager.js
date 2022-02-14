const LOCAL_STORAGE_KEY = "myChecklist";

function canUseLocalStorage() {
  return typeof Storage !== "undefined";
}

function setJsonToLocalStorage(json) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(json));
}

function getJsonFromLocalStorage() {
  let json = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

  if (json == null) {
    json = {};
  }

  return json;
}

function addOrUpdateItem(id, item) {
  if (canUseLocalStorage()) {
    const json = getJsonFromLocalStorage();
    json[id] = item;
    setJsonToLocalStorage(json);
  }
}

function removeItem(id) {
  if (canUseLocalStorage()) {
    const json = getJsonFromLocalStorage();
    delete json[id];
    setJsonToLocalStorage(json);
  }
}

function getItems() {
  let items = {};

  if (canUseLocalStorage()) {
    items = getJsonFromLocalStorage();
  }

  return items;
}

export { addOrUpdateItem, removeItem, getItems };
