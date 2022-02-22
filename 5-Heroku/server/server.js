const express = require('express')
const storageRouter = require('./routes/storage')
const cors = require('cors');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongo = require('mongodb')
const dotenv = require('dotenv')
dotenv.config({path: '.env'})

const app = express()
app.use(cors({origin: true,credentials:true}));
app.use(bodyParser.json());
app.use(cookieParser())

app.use('/storage', storageRouter)
app.listen(process.env.SERVER_PORT)