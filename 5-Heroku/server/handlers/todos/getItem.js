const mongoose = require('mongoose')
const itemModel = require('../../models/item')
const getItem = async (req, res, next) => {
    if (req.params?.id === '') {
        res.status(404).send(`missing item id`)
        return
    }
    const query = itemModel.findById(req.params.id)
    query.exec((function (err, item) {
        if (err) {
            res.status(404).send(`item ${req.params.id ? 'no: ' + req.params.id + ' ' : ''}not found`)
            return
        }
        res.status(200).send(item)
    }))
}
module.exports = getItem