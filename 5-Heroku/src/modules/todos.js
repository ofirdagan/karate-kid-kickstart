const axios = require('axios')
const TODOList = 'TODO-List'

async function set(id, title, content) {
    const data = {
        id: id,
        title: title,
        content: content
    }
    await axios.post(`/todos/set`, data)
        .then(function (response) {
            if (response.status == 201) {
                data.id = response.data
                return
            }
            alert(`item update is denied, server status ${response.status}`)
            return
        })
        .catch(function (error) {
            alert(`item update is denied, ${error}`);
        });
    return data.id
}

async function remove(id) {
    axios.delete(`/todos/delete/${id}`)
        .catch(function (error) {
            alert(`item deletion is denied, ${error}`);
        });
}

async function getAll() {
    let todoMap = {}
    await axios.get(`/todos/all`)
        .then(function (response) {
            todoMap = response.data
        })
        .catch(function (error) {
            alert('Can\'t get items, Please try refreshing the page')
        });
    return todoMap
}

async function get(id) {
    let todoItem = {}
    await axios.get(`/todos/get/${id}`)
        .then(function (response) {
            todoItem = response.data
        })
        .catch(function (error) {
            alert(`can not find item no: ${id}`)
        });
    return todoItem
}

export { set, get, getAll, remove }