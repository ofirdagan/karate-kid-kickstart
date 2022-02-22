const axios = require('axios')
const { serverBaseURL } = require('./constants')
const TODOList = 'TODO-List'

async function set(id, title, content) {
    const data = {
        id: id,
        title: title,
        content: content
    }
    axios.post(`${serverBaseURL}storage/set`, data)
        .then(function (response) {
            if (response.status != 201) {
                alert(`item update is denied, server status ${response.status}`)
                return
            }
        })
        .catch(function (error) {
            alert(`item update is denied, ${error}`);
        });
}

async function remove(id) {
    axios.delete(`${serverBaseURL}storage/delete/${id}`)
        .catch(function (error) {
            alert(`item deletion is denied, ${error}`);
        });
}

async function getAll() {
    let todoMap = {}
    await axios.get(`${serverBaseURL}storage/all`)
        .then(function (response) {
            todoMap = response.data
        })
        .catch(function (error) {
            alert('can\'t get items')
        });
    return todoMap
}

async function get(id) {
    let todoItem = {}
    await axios.get(`${serverBaseURL}storage/get/${id}`)
        .then(function (response) {
            todoItem = response.data
        })
        .catch(function (error) {
            alert(`can not find item no: ${id}`)
        });
    return todoItem
}

export { set, get, getAll, remove }