import axios from 'axios'
import Guid from '../../common/types/Guid'
import Item from '../../common/interfaces/Item'

export async function set(id: Guid, title: string, content: string): Promise<Item> {
    const _id: Guid = id
    const response = await axios.post(`/todos/`, { _id, title, content })
    return response.data
}
export async function remove(id: Guid): Promise<Item> {
    const response = await axios.delete(`/todos/${id}`)
    return response.data
}
export async function getAll(): Promise<Item[]> {
    const response = await axios.get(`/todos/`)
    return response.data
}
export async function get(id: Guid): Promise<Item> {
    const response = await axios.get(`/todos/${id}`)
    return response.data
}