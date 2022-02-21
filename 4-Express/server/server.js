const express = require('express')
const storageRouter = require('./routes/storage')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config({path: '.env'})

app.use(cors({origin: `${process.env.CLIENT_URL}:${process.env.CLIENT_PORT}`}));
app.use(bodyParser.json());

app.use('/storage', storageRouter)
app.listen(process.env.SERVER_PORT)