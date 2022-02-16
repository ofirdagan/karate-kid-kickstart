const express = require('express')
const storageRouter = require('./routes/storage')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser')

app.use(cors({
    origin: 'http://localhost:5001'
}));
app.use(bodyParser.json());

app.get('/', (req,res,next) => {
    console.log('sending yo to you :)')
    res.status(200).send('yo yo!')
})

app.use('/storage', storageRouter)

app.listen(3000)