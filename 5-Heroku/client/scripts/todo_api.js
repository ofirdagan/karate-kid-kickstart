import axios from "axios";
const SERVER_URL = process.env.TODO_SERVER_URL;
const TODOS_ENDPOINT = "todos";

function errorHandling(error) {
  console.log(error);
}

function createItemData(item) {
  return axios
    .post(`${SERVER_URL}/${TODOS_ENDPOINT}`, item, {withCredentials: true})
    .then(response => response)
    .catch(error => errorHandling(error));
}

function editItemData(item) {
  const urlWithId = `${SERVER_URL}/${TODOS_ENDPOINT}/${item.id}`;

  return axios
    .put(urlWithId, item, {withCredentials: true})
    .then(response => response)
    .catch(error => errorHandling(error));
}

function removeItemData(id) {
  const urlWithId = `${SERVER_URL}/${TODOS_ENDPOINT}/${id}`;

  return axios
    .delete(urlWithId, {withCredentials: true})
    .then(response => response)
    .catch(error => errorHandling(error));
}

function getItems() {
  return axios
    .get(`${SERVER_URL}/${TODOS_ENDPOINT}`, {withCredentials: true})
    .then(response => response.data)
    .catch(error => errorHandling(error));
}

export { createItemData, editItemData, removeItemData, getItems };
