import axios from "axios";
import { Item } from '../../server/interfaces/Item'

export async function set(id: string, title: string, content: string):Promise<Item> {
    const response = await axios.post(`/todos/set`, { id, title, content })
    return response.data
}
export async function remove(id: string):Promise<Item> {
    const response = await axios.delete(`/todos/delete/${id}`)
    return response.data
}
export async function getAll():Promise<Item[]> {
    const response = await axios.get(`/todos/all`)
    return response.data
}
export async function get(id: string):Promise<Item> {
    const response = await axios.get(`/todos/get/${id}`)
    return response.data
}