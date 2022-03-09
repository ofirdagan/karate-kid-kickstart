import makeApp from './app'
import { MongoDBController } from "./db/mongoDBController";
import itemModel from './models/item'
const port: String = process.env.SERVER_PORT || '3000'
const db = new MongoDBController(itemModel)
const app = makeApp(db)
app.listen(port, () => console.log('running on port',port))
db.connect()
