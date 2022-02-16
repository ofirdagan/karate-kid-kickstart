const path = require('path')
const db = require(path.resolve('server/db/','db.js')) 

const getAllItems = (req,res,next) => {
    res.status(200).send(db)
}
module.exports = getAllItems