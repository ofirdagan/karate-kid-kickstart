import DB from '../interfaces/DB'
import Item from '../../common/interfaces/Item'
import Guid from '../../common/types/Guid'
import UserID from '../../common/types/userID'

export default class dbController implements DB {
    constructor() { }
    async getAllItemsFromDB(userID: UserID): Promise<Item[]> {
        throw new Error('not implemented')
    }
    async setItemInDB(item: Item): Promise<Item> {
        throw new Error('not implemented')
    }
    async getItemFromDB(_id: Guid): Promise<Item> {
        throw new Error('not implemented')
    }
    async removeItemFromDB(_id: Guid): Promise<Item> {
        throw new Error('not implemented')
    }
    async connect(): Promise<boolean> { return true }
    async disconnect(): Promise<boolean> { return true }
}
