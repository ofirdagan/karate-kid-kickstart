const setItemToLocalStorage = function (taskInfo) {
  localStorage.setItem(`${taskInfo.id}`, JSON.stringify(taskInfo));
};

const deleteFromLocalStorage = function (id) {
  localStorage.removeItem(`${id}`);
};

const restoreTasksFromStorage = function () {
  if (localStorage) {
    return Object.values(localStorage);
  }
};

export {
  setItemToLocalStorage,
  deleteFromLocalStorage,
  restoreTasksFromStorage,
};
