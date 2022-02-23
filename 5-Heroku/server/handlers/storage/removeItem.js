const mongoose = require('mongoose')
const itemModel = require('../../models/item')

const removeItem = (req, res, next) => {
    if (req.params?.id === '') {
        res.status(404).send(`missing item number`)
        return
    }
    const query = itemModel.findByIdAndDelete(req.params.id)
    query.exec((function (err, item) {
        if (err) {
            res.status(404).send(`item ${req.params.id ? 'no: ' + req.params.id + ' ' : ''}not found`)
            return
        }
        res.status(200).send(`item no: ${req.params.id} deleted`)
    }))
}
module.exports = removeItem