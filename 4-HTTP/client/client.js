import axios from "axios";

const baseURL = "http://localhost:3000";
const instance = axios;

const getToDoList = async function () {
  return instance
    .get(`${baseURL}/todos`)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};
const addTask = async function (taskTitle) {
  return instance
    .post(`${baseURL}/todos`, { title: taskTitle })
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};
const editTask = async function (taskInfo) {
  const taskId = taskInfo.id;
  const newTitle = taskInfo.title;
  return instance
    .patch(`${baseURL}/todos/${taskId}`, { title: newTitle })
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};
const deleteTask = async function (taskId) {
  return instance
    .delete(`${baseURL}/todos/${taskId}`)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};

export { getToDoList, addTask, editTask, deleteTask };
