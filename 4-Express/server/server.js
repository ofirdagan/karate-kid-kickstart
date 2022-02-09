const express = require('express')
const storageRouter = require('./routes/storage')
const app = express()

app.get('/', (req,res,next) => {
    console.log('sending yo to you :)')
    res.status(200).send('yo yo!')
})

app.use('/storage', storageRouter)

app.listen(3000)