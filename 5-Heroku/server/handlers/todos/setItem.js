const mongoose = require('mongoose')
const itemModel = require('../../models/item')
const { setItemInDB } = require('../../db')

const setItem = async (req, res, next) => {
    if (!req.body?.id) {
        res.status(400).send("missing item information")
        return
    }
    if (req.body?.title === '') {
        res.status(400).send(`can not set an item with no title`)
        return
    }
    const id = await setItemInDB(req.cookies.id,req.body.id,req.body.title,req.body.content)
    if(!id){
        res.status(500).send(`could not set item`)
    }
    res.status(201).send(id)
}
module.exports = setItem