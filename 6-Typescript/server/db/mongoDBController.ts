
import { connect } from "mongoose"
import { DB } from "../interfaces/DB"
import * as dotenv from 'dotenv'
import { dbController } from "./dbController"
import mongoose from "mongoose"
import { Item } from '../interfaces/Item'
dotenv.config({ path: '.env' })

export class MongoDBController extends dbController implements DB {

    constructor(model: mongoose.Model<Item>) {
        super(model)
    }
    async getAllItemsFromDB(userID: string): Promise<Item[]> {
        return await this.model.find({ userID: userID }).lean(true)
    }
    async setItemInDB(userID: string, _id: string, title: string, content: string): Promise<Item> {
        const existingItems: Item[] = await this.model.find({ _id }).lean(true)
        if (!existingItems.length) return await this.model.create({ _id, userID, title, content })
        await this.model.findOneAndUpdate({ _id }, { userID, title, content }).lean(true)
        return { _id, userID, title, content }
    }
    async getItemFromDB(_id: string): Promise<Item> {
        const items: Item[] = await this.model.find({ _id }).lean(true)
        if(!items.length) throw new Error('item not found')
        return items[0] 
    }
    async removeItemFromDB(_id: string): Promise<Item> {
        return await this.model.findOneAndDelete({ _id }).lean(true)
    }
    async connect(): Promise<boolean> {
        const url: string = (process.env.MONGO_URL as string)
        await connect(url)
        return true
    }
    async disconnect(): Promise<boolean> { return Promise.resolve(true) }
}