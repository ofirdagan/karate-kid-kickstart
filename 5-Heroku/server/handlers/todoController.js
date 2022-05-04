const db = require('../db/dbController')
module.exports.getItem = function (req, res) {
    req.params?.id === '' ? res.status(400).send(`missing item id`) :
        db.getItemFromDB(req.params.id)
            .then(item => {
                item._id ? res.status(200).send(item) :
                    res.status(404).send(`item ${req.params.id ? `no: ${req.params.id} ` : ''}not found`)
            })
            .catch(err => err.message == 'Not found' ?
                res.status(404).send(`item${req.params.id ? ` no: ${req.params.id}` : ''} not found`) :
                res.status(400).send(`could not get item ${req.params.id ? `no: ${req.body?.id}` : ''}, ${err.message}`))
}
module.exports.setItem = function (req, res) {
    !req.body._id || !req.body.title ? res.status(400).send("missing item information") :
        db.setItemInDB(req.cookies.id, req.body.id, req.body.title, req.body.content)
            .then(item => res.status(201).send(item))
            .catch(err => err.message == 'Not found' ?
                res.status(404).send(`item${req.body.id ? ` no: ${req.body.id}` : ''} not found`) :
                res.status(400).send(`could not set item${req.body.id ? ` no: ${req.body?.id}` : ''}, ${err}`))
}
module.exports.removeItem = function (req, res) {
    req.params?.id === '' ? res.status(404).send(`missing item number`) :
        db.removeItemFromDB(req.params.id)
            .then(deletedItem => res.status(200).send(deletedItem))
            .catch(err => res.status(400).send(`could not delete item${req.params.id ? ` no: ${req.params.id}` : ''}, ${err}`))
}
module.exports.getAllItems = function (req, res) {
    db.getAllItemsFromDB(req.cookies.id)
        .then(itemList => res.status(200).send(itemList))
        .catch(err => res.status(400).send(`could not get items, ${err}`))

}