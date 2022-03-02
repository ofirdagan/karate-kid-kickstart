const mongoose = require('mongoose')
const itemSchema = mongoose.Schema({
    userID:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    content:{
        type:String
    }
})
module.exports = mongoose.model('item',itemSchema)