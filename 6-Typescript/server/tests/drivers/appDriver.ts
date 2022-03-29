import express, { Application } from 'express'
import { v4 as uuid } from 'uuid'
import { Server } from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import IDinCookie from '../../middleware/IDinCookie'
import todosRouter from '../../routes/todos'
import Item from '../../../common/interfaces/Item'
import App from '../../../src/interfaces/App'
import DB from '../../interfaces/DB'
import axios from 'axios'
import Guid from '../../../common/types/Guid'
import UserID from '../../../common/types/userID'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env' })

export default class AppDriver implements App {
    url: string
    userID: UserID
    connection?: Server
    constructor(baseURL: string) {
        this.url = baseURL
        this.userID = uuid()
    }
    setUserIDInCookie(userID: Guid) {
        this.userID = userID
    }
    cookieHeader(userID?: Guid) {
        return {
            headers: {
                Cookie: `userID=${userID || this.userID};`,
            }
        }
    }
    start(db: DB): void {
        const port: string = process.env.SERVER_PORT || '3000'
        const app: Application = express()
        app.use(bodyParser.json());
        app.use(cookieParser())
        app.use(IDinCookie)
        app.use('/', todosRouter(db))
        this.connection = app.listen(port, () => console.log('running on port', port))
    }
    close(): void {
        this.connection?.close()
    }
    async set(item: Item): Promise<Item> {
        const response = await axios.post(`${this.url}/`, item, this.cookieHeader())
        return response.data
    }
    async remove(id: Guid): Promise<Item> {
        const response = await axios.delete(`${this.url}/${id}`, this.cookieHeader())
        return response.data
    }
    async getAll(): Promise<Item[]> {
        const response = await axios.get(`${this.url}/`, this.cookieHeader())
        return response.data
    }
    async get(id: Guid): Promise<Item> {
        const response = await axios.get(`${this.url}/${id}`, this.cookieHeader())
        return response.data
    }
}