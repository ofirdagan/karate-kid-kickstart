import { DB } from "../interfaces/DB";
import { Item } from '../interfaces/Item'

export class dbController implements DB {
    constructor() {}
    getAllItemsFromDB = async function (userID: string): Promise<Item[]> {
        throw new Error('not implemented')
    }
    setItemInDB = async function (userID: string, _id: string, title: string, content: string): Promise<Item> {
        throw new Error('not implemented')
    }
    getItemFromDB = async function (_id: string): Promise<Item> {
        throw new Error('not implemented')
    }
    removeItemFromDB = async function (_id: string): Promise<Item> {
        throw new Error('not implemented')
    }
    connect = async function (): Promise<boolean> { return true }
    disconnect = async function (): Promise<boolean> { return true }
}
