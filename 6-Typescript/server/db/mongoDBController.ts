
import { connect } from "mongoose"
import { DB } from "../interfaces/DB"
import * as dotenv from 'dotenv'
import { dbController } from "./dbController"
import { Item } from '../interfaces/Item'
import itemModel from '../models/item'

dotenv.config({ path: '.env' })

export class MongoDBController extends dbController implements DB {

    constructor() {
        super()
    }
    getAllItemsFromDB = async (userID: string): Promise<Item[]> => {
        return await itemModel.find({ userID: userID }).lean(true)
    }
    setItemInDB = async (userID: string, _id: string, title: string, content: string): Promise<Item> => {
        const existingItems: Item[] = await itemModel.find({ _id }).lean(true)
        if (!existingItems.length) return await itemModel.create({ _id, userID, title, content })
        await itemModel.findOneAndUpdate({ _id }, { userID, title, content }).lean(true)
        return { _id, userID, title, content }
    }
    getItemFromDB = async (_id: string): Promise<Item> => {
        const items: Item[] = await itemModel.find({ _id }).lean(true)
        if (!items.length) throw new Error('Not found')
        return items[0]
    }
    removeItemFromDB = async (_id: string): Promise<Item> => {
        return await itemModel.findOneAndDelete({ _id }).lean(true)
    }
    connect = async (): Promise<boolean> => {
        const url: string = (process.env.MONGO_URL as string)
        await connect(url)
        return true
    }
    disconnect = async (): Promise<boolean> => { return Promise.resolve(true) }
}