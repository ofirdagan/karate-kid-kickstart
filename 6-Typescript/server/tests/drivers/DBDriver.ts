import { MongoMemoryServer } from "mongodb-memory-server"
import { dbController } from "../../db/dbController"
import { DB } from "../../interfaces/DB"
import { Item } from "../../interfaces/Item"
import mongoose from "mongoose"

export class DBDriver extends dbController implements DB {
    db: DB
    mongoServer: MongoMemoryServer = new MongoMemoryServer
    constructor(db: DB) {
        super()
        this.db = db
    }
    connect = async (): Promise<boolean> => {
        try {
            this.mongoServer = await MongoMemoryServer.create()
            const uri = this.mongoServer.getUri();
            await mongoose.connect(uri)
            return true
        } catch {
            return false
        }
    }
    disconnect = async (): Promise<boolean> => {
        try {
            await mongoose.connection.dropDatabase();
            await mongoose.connection.close();
            await this.mongoServer.stop()
            return true
        } catch {
            return false
        }
    }
    getAllItemsFromDB = async (userID: string): Promise<Item[]> =>
        await this.db.getAllItemsFromDB(userID)
    setItemInDB = async (userID: string, _id: string, title: string, content: string): Promise<Item> =>
        await this.db.setItemInDB(userID, _id, title, content)
    getItemFromDB = async (_id: string): Promise<Item> =>
        await this.db.getItemFromDB(_id)
    removeItemFromDB = async (_id: string): Promise<Item> =>
        await this.db.removeItemFromDB(_id)
}