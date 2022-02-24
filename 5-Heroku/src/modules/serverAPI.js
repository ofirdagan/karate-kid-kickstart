const axios = require('axios')

export async function set(_id, title, content) {
    const response = await axios.post(`/todos/set`, { _id, title, content })
    return response.data
}
export async function remove(id) {
    return await axios.delete(`/todos/delete/${id}`)
}
export async function getAll() {
    const response = await axios.get(`/todos/all`)
    return response.data
}
export async function get(id) {
    const response = await axios.get(`/todos/get/${id}`)
    return response.data
}