import { Item } from './Item'
import { DB } from './DB'
export interface App {
    start: (db:DB) => void
    get: (id: string) => Promise<Item>
    getAll: () => Promise<Item[]>
    remove: (id: string) => Promise<Item>
    set: (id: string, title: string, content: string) => Promise<Item>
}