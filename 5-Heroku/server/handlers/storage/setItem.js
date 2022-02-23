const mongoose = require('mongoose')
const itemModel = require('../../models/item')

const setItem = async (req, res, next) => {
    if (!req.body?.id) {
        res.status(400).send("missing item information")
        return
    }
    if (req.body?.title === '') {
        res.status(400).send(`can not set an item with no title`)
        return
    }
    const id = req.body.id
    const updatedItem = {
        title: req.body.title,
        content: req.body.content
    }
    if (id === 'none') {
        const newID = await itemModel.create(updatedItem);
        res.status(201).send(newID._id.toString())
        return
    }
    const findQuery = itemModel.findById(id)
    await findQuery.exec(async function (findErr, item) {
        if (findErr) {
            res.status(404).send(`item no:${id} not found`)
        }
        const updateQuery = itemModel.updateOne({ _id: id }, updatedItem)
        await updateQuery.exec(async function (updateErr, newItem) {
            if (updateErr) {
                res.status(500).send(`could not update item ${id}`)
            }

        })
    })
}
module.exports = setItem