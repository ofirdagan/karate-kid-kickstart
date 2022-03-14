import * as dotenv from 'dotenv'
dotenv.config({ path: '.env' })
import express, { Application } from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import IDinCookie from '../../middleware/IDinCookie'
import { todosRouter } from '../../routes/todos'
import { Item } from '../../interfaces/Item'
import { App } from '../../interfaces/App'
import { DB } from '../../interfaces/DB'
import axios from 'axios'
import {v4 as uuid} from 'uuid'
export class AppDriver implements App{
    url: string
    userID: string
    constructor(baseURL: string) {
        this.url = baseURL
        this.userID = uuid()
    }
    cookieHeader(userID: string) {
        return {
            headers: {
                Cookie: `id=${userID};`,
            }
        }
    }
    start(db: DB):void {
        const port: string = process.env.SERVER_PORT || '3000'
        const app: Application = express()
        app.use(bodyParser.json());
        app.use(cookieParser())
        app.use(IDinCookie)
        app.use('/todos', todosRouter(db))
        app.listen(port, () => console.log('running on port', port))
    }
    close() {
    }
    async set(id: string, title: string, content: string): Promise<Item> {
        const response = await axios.post(`${this.url}todos/set`, { id, title, content }, this.cookieHeader(this.userID))
        return response.data
    }
    async remove(id: string): Promise<Item> {
        const response = await axios.delete(`${this.url}todos/delete/${id}`, this.cookieHeader(this.userID))
        return response.data
    }
    async getAll(): Promise<Item[]> {
        const response = await axios.get(`${this.url}todos/all`, this.cookieHeader(this.userID))
        return response.data
    }
    async get(id: string): Promise<Item> {
        const response = await axios.get(`${this.url}todos/get/${id}`, this.cookieHeader(this.userID))
        return response.data
    }
}