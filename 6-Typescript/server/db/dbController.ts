import { IdbAPI } from "../interfaces/IdbAPI";
import { Item } from '../models/item'
import mongoose from "mongoose";
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env' })

export class dbController implements IdbAPI {
    model: mongoose.Model<Item>
    constructor(model: mongoose.Model<Item>) {
        this.model = model
    }
    async getAllItemsFromDB(userID: String): Promise<object> {
        try {
            return await this.model.find({ userID: userID }).lean(true)
        } catch (err) {
            throw err
        }
    }
    async getItemFromDB(_id: String): Promise<object> {
        try {
            const items: any[] = await this.model.find({ _id }).lean(true)
            if (items.length) {
                const item = {
                    _id: items[0]._id.toString(),
                    userID: items[0].userID,
                    title: items[0].title,
                    content: items[0].content
                }
                return item
            }
            return {}
        } catch (err) {
            throw err
        }
    }
    async setItemInDB(userID: string, _id: string, title: string, content: string): Promise<object> {
        if (!_id || _id === 'none') {
            try {
                const item = await this.model.create({ userID, title, content })
                const _id = item._id.toString()
                return { _id, userID, title, content }
            } catch (err) {
                throw err
            }
        }
        try {
            const existingItem: any = await this.model.find({ _id }).lean(true)
            if (existingItem) {
                try {
                    await this.model.updateOne({ _id }, { userID, title, content }).lean(true)
                    return { _id, userID, title, content }
                } catch (err) {
                    throw err
                }
            }
            throw new Error('item not found')
        } catch (err) {
            throw err
        }
    }
    async removeItemFromDB(itemID: String): Promise<boolean> {
        try {
            await this.model.findByIdAndDelete(itemID).lean(true)
            return true
        } catch (err) {
            return false
        }
    }
}
