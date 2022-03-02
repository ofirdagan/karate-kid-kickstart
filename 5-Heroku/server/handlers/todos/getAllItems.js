const mongoose = require('mongoose')
const itemModel = require('../../models/item')
const {getAllItemsFromDB} = require('../../db')
const getAllItems = async (req, res, next) => {
    const allItems = await getAllItemsFromDB(req.cookies.id)
    res.status(200).send(allItems)
}
module.exports = getAllItems