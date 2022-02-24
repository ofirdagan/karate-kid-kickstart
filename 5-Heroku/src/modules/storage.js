const axios = require('axios')
const { serverBaseURL } = require('./constants')
const TODOList = 'TODO-List'

async function set(id, title, content) {
    const data = {
        id: id,
        title: title,
        content: content
    }
    await axios.post(`${serverBaseURL}storage/set`, data ,{withCredentials: true})
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
    axios.delete(`${serverBaseURL}storage/delete/${id}`,{withCredentials: true})
        .catch(function (error) {
            alert(`item deletion is denied, ${error}`);
        });
}

async function getAll() {
    let todoMap = {}
    await axios.get(`${serverBaseURL}storage/all`,{withCredentials: true})
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
    await axios.get(`${serverBaseURL}storage/get/${id}`,{withCredentials: true})
        .then(function (response) {
            todoItem = response.data
        })
        .catch(function (error) {
            alert(`can not find item no: ${id}`)
        });
    return todoItem
}

export { set, get, getAll, remove }