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

export class AppDriver implements App{
    url: string
    httpClient: any
    constructor(baseURL: any, httpClient: any) {
        this.url = baseURL
        this.httpClient = httpClient
    }
    cookieHeader(id: string) {
        return {
            headers: {
                Cookie: `id=${id};`,
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
        const response = await this.httpClient.post(`${this.url}todos/set`, { id, title, content }, this.cookieHeader('1'))
        return response.data
    }
    async remove(id: string): Promise<Item> {
        const response = await this.httpClient.delete(`${this.url}todos/delete/${id}`, this.cookieHeader('1'))
        return response.data
    }
    async getAll(): Promise<Item[]> {
        const response = await this.httpClient.get(`${this.url}todos/all`, this.cookieHeader('1'))
        return response.data
    }
    async get(id: string): Promise<Item> {
        const response = await this.httpClient.get(`${this.url}todos/get/${id}`, this.cookieHeader('1'))
        return response.data
    }
}