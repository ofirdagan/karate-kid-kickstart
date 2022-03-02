const mongoose = require('mongoose')
const itemModel = require('../models/item')

async function setItemInDB(userID, itemID, title, content) {
    const receivedItem = {
        userID: userID,
        title: title,
        content: content
    }
    if (!itemID || itemID === 'none') {
        const newID = await itemModel.create(receivedItem);
        return newID._id.toString()
    }
    const findQuery = itemModel.findById(itemID)
    try {
        await findQuery.exec()
        try {
            const updateQuery = itemModel.updateOne({ _id: itemID }, receivedItem)
            const item = await updateQuery.exec()
            if (item)
                return itemID
        }
        catch (err) { return }
    } catch (err) { return }
}

module.exports = setItemInDB