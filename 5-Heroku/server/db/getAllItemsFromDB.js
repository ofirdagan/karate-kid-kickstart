const mongoose = require('mongoose')
const itemModel = require('../models/item')

async function getAllItemsFromDB(userID) {
    const query = itemModel.find({ userID: userID })
    try {
        let allItems = {}
        const items = await query.exec()
        for (const item of items) {
            const { _id, title, content } = item
            allItems[_id] = { title: title, content: content }
        }
        return allItems
    } catch (err) { return {} }
}

module.exports = getAllItemsFromDB