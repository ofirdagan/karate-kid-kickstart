import makeApp from './app'
import { MongoDBController } from "./db/mongoDBController";
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env' })

const port: String = process.env.SERVER_PORT || '3000'
const db = new MongoDBController()
const app = makeApp(db)
app.listen(port, () => console.log('running on port',port))
db.connect()
