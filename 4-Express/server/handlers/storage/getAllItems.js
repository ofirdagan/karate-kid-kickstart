const db = require('../../db')

const getAllItems = (req, res, next) => {
    res.status(200).send(db)
}
module.exports = getAllItems