const LOCAL_STORAGE_KEY = "myChecklist";

function setMapToLocalStorage(map) {
  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify(Array.from(map.entries()))
  );
}

function getMapFromLocalStorage() {
  let jsonObject = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  let map = jsonObject != null ? new Map(jsonObject) : new Map();

  return map;
}

function addOrUpdateItem(id, item) {
  let map = getMapFromLocalStorage();
  map.set(id, item);
  setMapToLocalStorage(map);
}

function removeItem(id) {
  let map = getMapFromLocalStorage();
  map.delete(id);
  setMapToLocalStorage(map);
}

function getItems() {
  return getMapFromLocalStorage();
}

function canUseLocalStorage() {
  return typeof Storage !== "undefined";
}

export { addOrUpdateItem, removeItem, getItems, canUseLocalStorage }