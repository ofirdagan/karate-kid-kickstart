const express = require('express')
const todosRouter = require('./routes/todos')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongodb = require('mongodb')
const dotenv = require('dotenv')
const IDinCookie = require('./middleware/IDinCookie')
dotenv.config({ path: '.env' })

require('./db/connectToDB')


const app = express()
app.use(bodyParser.json());
app.use(cookieParser())

app.use(IDinCookie)

app.use('/todos', todosRouter)

app.listen(process.env.SERVER_PORT)