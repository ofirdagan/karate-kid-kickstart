const express = require('express')
const todosRouter = require('./routes/todos')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const db = require('./db/dbController')
const IDinCookie = require('./middleware/IDinCookie')
dotenv.config({ path: '.env' })

try {
    db.connectToDB()
} catch (err) {
    console.log('unable to connect to mongoDB')
}
const app = express()
app.use(bodyParser.json());
app.use(cookieParser())
app.use(IDinCookie)
app.use('/todos', todosRouter)

app.listen(process.env.SERVER_PORT)