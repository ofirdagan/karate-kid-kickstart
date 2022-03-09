
import { connect } from "mongoose";
import * as dotenv from 'dotenv'
import { dbController } from "./dbController";
import { IdbConnection } from "../interfaces/idbConnection";
import mongoose from "mongoose"
import { Item } from '../models/item'
dotenv.config({ path: '.env' })

export class MongoDBController extends dbController implements IdbConnection {

    constructor(model: mongoose.Model<Item>) {
        super(model)
    }
    connect(): Promise<boolean> {
        return connect(process.env.MONGO_URL as string)
            .then(() => { return true })
            .catch((err: Error) => { throw err })
    }
    disconnect(): Promise<boolean> { return Promise.resolve(true) }

}