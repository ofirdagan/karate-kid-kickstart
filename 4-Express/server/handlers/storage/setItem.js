const path = require('path')
const db = require(path.resolve('server/db/','db.js'))

const setItem = (req,res,next) => {
    if(!req.body||!req.body.id)
        res.status(400).send("missing item information")
    const id = req.body.id
    const item = {
        title : req.body.title,
        content : req.body.content
    }
    if(req.body.title && req.body.title !== ''){
        db[id]=item
        res.status(201).send(db[req.params.id])
    }
    else{
        res.status(400).send(`can not set an item with no title`)
    }
}
module.exports = setItem