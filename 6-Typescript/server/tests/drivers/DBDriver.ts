import { MongoMemoryServer } from 'mongodb-memory-server'
import dbController from '../../db/dbController'
import DB from '../../interfaces/DB'
import Item from '../../../common/interfaces/Item'
import mongoose from 'mongoose'
import Guid from '../../../common/types/Guid'
import UserID from '../../../common/types/userID'

export default class DBDriver extends dbController implements DB {
    db: DB
    mongoServer?: MongoMemoryServer
    constructor(db: DB) {
        super()
        this.db = db
    }
    connect = async (): Promise<boolean> => {
        try {
            this.mongoServer = await MongoMemoryServer.create()
            const uri = this.mongoServer.getUri()
            await mongoose.connect(uri)
            return true
        } catch (err) {
            console.log('couldnt connect', err)
            return false
        }
    }
    disconnect = async (): Promise<boolean> => {
        try {
            await mongoose.connection.dropDatabase()
            await mongoose.connection.close()
            await this.mongoServer?.stop()
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    }
    getAllItemsFromDB = async (userID: UserID): Promise<Item[]> =>
        await this.db.getAllItemsFromDB(userID)
    setItemInDB = async (item:Item): Promise<Item> =>
        await this.db.setItemInDB(item)
    getItemFromDB = async (_id: Guid): Promise<Item> =>
        await this.db.getItemFromDB(_id)
    removeItemFromDB = async (_id: Guid): Promise<Item> =>
        await this.db.removeItemFromDB(_id)
}