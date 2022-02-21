import axios from "axios";
const baseURL = "http://localhost:3000";


const getToDoList = function () {
  return axios
  .get(`${baseURL}/todos`)
    .then((res) => res.data)
    .catch(errorHandler);
};
const addTask = function (taskTitle) {
  return axios
    .post(`${baseURL}/todos`, { title: taskTitle })
    .then((res) => res.data)
    .catch(errorHandler);
};
const editTask = function (taskInfo) {
  const { taskId, newTitle } = taskInfo;
  return axios
    .patch(`${baseURL}/todos/${taskId}`, { title: newTitle })
    .then((res) => res.data)
    .catch(errorHandler);
};
const deleteTask = function (taskId) {
  return axios
    .delete(`${baseURL}/todos/${taskId}`)
    .then((res) => res.data)
    .catch(errorHandler);
};

const errorHandler = (err) => {
  console.log(err);
};

export { getToDoList, addTask, editTask, deleteTask };
