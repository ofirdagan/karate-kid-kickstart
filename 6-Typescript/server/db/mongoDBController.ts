
import mongoose, { connect } from 'mongoose'
import Item, { toItem } from '../../common/interfaces/Item'
import DB from '../interfaces/DB'
import dbController from './dbController'
import itemModel from '../models/item'
import Guid from '../../common/types/Guid'
import UserID from '../../common/types/userID'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env' })

export default class MongoDBController extends dbController implements DB {

    constructor() {
        super()
    }
    async getAllItemsFromDB(userID: UserID): Promise<Item[]> {
        const itemFromDB = await itemModel.find({ userID: userID }).lean(true)
        const itemList: Item[] = []
        itemFromDB.forEach((item: Item) => itemList.push(toItem(item)))
        return itemList
    }
    async setItemInDB(item: Item): Promise<Item> {
        const { _id, userID, title, content } = item
        const existingItems: Item[] = await itemModel.find({ _id }).lean(true)
        if (!existingItems.length) return toItem(await itemModel.create({ _id, userID, title, content }))
        await itemModel.findOneAndUpdate({ _id }, { userID, title, content }).lean(true)
        return item
    }
    async getItemFromDB(id: Guid): Promise<Item> {
        const items: Item[] = await itemModel.find({ _id: id }).lean(true)
        if (!items.length) throw new Error('Not found')
        return toItem(items[0])
    }
    async removeItemFromDB(id: Guid): Promise<Item> {
        const deletedItem = await itemModel.findOneAndDelete({ _id: id }).lean(true)
        if (!deletedItem) throw new Error('Not found')
        return toItem(deletedItem)
    }
    connect = async (): Promise<boolean> => {
        const url: string = (process.env.MONGO_URL as string)
        try {
            await connect(url)
            return true
        } catch (err) {
            return false
        }
    }
    disconnect = async (): Promise<boolean> => {
        try {
            await mongoose.connection.close()
            return true
        } catch (err) {
            return false
        }
    }
}