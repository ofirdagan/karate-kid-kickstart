import axios from "axios";
import { AxiosResponse } from "axios";

export function set(id: string, title: string, content: string) {
    return axios.post(`/todos/set`, { id, title, content })
        .then((response) => response.data)
        .catch((error: Error) => { throw error })
}

export function remove(id: string) {
    return axios.delete(`/todos/delete/${id}`)
        .catch((error: Error) => { throw error })
}

export function getAll() {
    return axios.get(`/todos/all`)
        .then((response) => response.data)
        .catch((error: Error) => { throw error })
}

export function get(id: string) {
    return axios.get(`/todos/get/${id}`)
        .then((response) => response.data)
        .catch((error: Error) => { throw error })
}