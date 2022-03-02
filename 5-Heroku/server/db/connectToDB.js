require('dotenv').config('../../../.env')
const mongoose = require('mongoose')
const url = process.env.MONGO_URL;
const dbName = 'users';
let connection = {}
try {
    connection = mongoose.connect(url, { useNewUrlParser: true })
} catch {
    console.log('unable to connect to mongoDB')
}
module.exports = connection