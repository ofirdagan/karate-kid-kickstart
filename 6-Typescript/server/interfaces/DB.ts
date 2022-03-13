import { Item } from './Item'
export interface DB {
    connect: () => Promise<boolean>
    disconnect: () => Promise<boolean>
    getAllItemsFromDB: (userID: string) => Promise<Item[]>
    getItemFromDB: (_id: string) => Promise<Item>
    setItemInDB: (userID: string, _id: string, title: string, content: string) => Promise<Item>
    removeItemFromDB: (itemID: string) => Promise<Item>
}