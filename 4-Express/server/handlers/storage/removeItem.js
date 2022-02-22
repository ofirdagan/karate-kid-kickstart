const db = require('../../db')

const removeItem = (req, res, next) => {
    const id = req.params.id
    if (!db[id]) {
        res.status(404).send(`can not find item no: ${req.params.id}`)
        return
    }
    delete db[id]
    res.status(200).send(`deleted item no: ${req.params.id}`)
}
module.exports = removeItem