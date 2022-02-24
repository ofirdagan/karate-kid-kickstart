const { Schema, model } = require('mongoose')
const itemSchema = Schema({
    userID: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String
    }
})
module.exports = model('item', itemSchema)