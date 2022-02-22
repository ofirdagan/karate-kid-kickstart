const db = require('../../db')

const getItem = (req, res, next) => {
    if (!db[req.params.id]) {
        res.status(404).send(`item ${req.params.id ? 'no: ' + req.params.id + ' ' : ''}not found`)
        return
    }
    res.status(200).send(db[req.params.id])

}
module.exports = getItem