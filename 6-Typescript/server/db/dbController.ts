import { DB } from "../interfaces/DB";
import { Item } from '../interfaces/Item'
import mongoose, { connect } from "mongoose";

export class dbController implements DB {
    model: mongoose.Model<Item>
    constructor(model: mongoose.Model<Item>) {
        this.model = model
    }
    async getAllItemsFromDB(userID: string): Promise<Item[]> {
        throw new Error('not implemented')
    }
    async setItemInDB(userID: string, _id: string, title: string, content: string): Promise<Item> {
        throw new Error('not implemented')
    }
    async getItemFromDB(_id: string): Promise<Item> {
        throw new Error('not implemented')
    }
    async removeItemFromDB(_id: string): Promise<Item> {
        throw new Error('not implemented')
    }
    async connect(): Promise<boolean> { return true }
    async disconnect(): Promise<boolean> { return true }
}
