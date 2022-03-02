const mongoose = require('mongoose')
const itemModel = require('../models/item')

async function removeItemFromDB(itemID) {
    const query = itemModel.findByIdAndDelete(itemID)
    try {
        await query.exec()
        return `item no: ${itemID} deleted`
    } catch (err) {
        return `item no:${itemID} not found`
    }
}

module.exports = removeItemFromDB