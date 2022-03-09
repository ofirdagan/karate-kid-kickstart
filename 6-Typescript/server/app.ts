import * as dotenv from 'dotenv'
dotenv.config({ path: '.env' })
import express, { Application } from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import IDinCookie from './middleware/IDinCookie'
import { todosRouter } from './routes/todos'

export default function(db:any){
    const port: String = process.env.SERVER_PORT || '3000'
    const app: Application = express()
    app.use(bodyParser.json());
    app.use(cookieParser())
    app.use(IDinCookie)
    app.use('/todos', todosRouter(db))
    return app
}
