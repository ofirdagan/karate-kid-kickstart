import { MongoMemoryServer } from "mongodb-memory-server"
import { dbController } from "../../db/dbController"
import { DB } from "../../interfaces/DB"
import mongoose from "mongoose"

export class DBDriver extends dbController implements DB {
    model: any
    db: DB
    mongoServer: MongoMemoryServer = new MongoMemoryServer
    constructor(db: DB, model: any) {
        super(model)
        this.model = model
        this.db = db
    }
    async connect(): Promise<boolean> {
        try {
            this.mongoServer = await MongoMemoryServer.create()
            const uri = this.mongoServer.getUri();
            await mongoose.connect(uri)
            return true
        } catch {
            return false
        }
    }
    async disconnect(): Promise<boolean> {
        try {
            await mongoose.connection.dropDatabase();
            await mongoose.connection.close();
            await this.mongoServer.stop()
            return true
        } catch {
            return false
        }
    }
}