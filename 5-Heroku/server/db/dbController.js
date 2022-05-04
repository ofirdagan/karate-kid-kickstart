require('dotenv').config('../../../.env')
const mongoose = require('mongoose')
const itemModel = require('../models/item')
const url = process.env.MONGO_URL;

module.exports.connectToDB = async function () {
    await mongoose.connect(url, { useNewUrlParser: true })
}
module.exports.getAllItemsFromDB = async function (userID) {
    return await itemModel.find({ userID: userID }).lean(true)
}
module.exports.getItemFromDB = async function (_id) {
    const items = await itemModel.find({ _id }).lean(true)
    if (!items.length) throw new Error('Not found')
    return items[0]
}
module.exports.setItemInDB = async function (userID, _id, title, content) {
    const existingItems = await itemModel.find({ _id }).lean(true)
    if (!existingItems.length) return await itemModel.create({ _id, userID, title, content })
    await itemModel.findOneAndUpdate({ _id }, { userID, title, content }).lean(true)
    return { _id, userID, title, content }
}
module.exports.removeItemFromDB = async function (_id) {
    return await itemModel.findOneAndDelete({ _id }).lean(true)
}