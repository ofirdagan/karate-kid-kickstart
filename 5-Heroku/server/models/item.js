const mongoose = require('mongoose')
const itemSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type:String
    }
})
module.exports = mongoose.model('item',itemSchema)