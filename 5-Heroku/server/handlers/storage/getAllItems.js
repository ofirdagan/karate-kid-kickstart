const mongoose = require('mongoose')
const itemModel = require('../../models/item')
const getAllItems = async (req, res, next) => {
    const allItems = {}
    const query = itemModel.find()
    query.exec((function (err, items) {
        if (err) {
            res.status(404).send('could not find items')
            return
        }
        for (const item of items) {
            const { _id, title, content } = item
            allItems[_id] = { title: title, content: content }
        }
        res.status(200).send(allItems)
    }))

}
module.exports = getAllItems