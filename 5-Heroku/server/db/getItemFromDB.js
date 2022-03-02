const mongoose = require('mongoose')
const itemModel = require('../models/item')

async function getItemFronDB(id) {
    const query = itemModel.findById(id)
    try {
        const item = await query.exec()
        return item
    } catch (err) { return }
}

module.exports = getItemFronDB