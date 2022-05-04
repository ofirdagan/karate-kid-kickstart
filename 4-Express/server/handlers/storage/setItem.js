const db = require('../../db')

const setItem = (req, res, next) => {
    if (!req.body?.id) {
        res.status(400).send("missing item information")
        return
    }
    if (req.body?.title === '') {
        res.status(400).send(`can not set an item with no title`)
        return
    }
    const id = req.body.id
    const item = {
        title: req.body.title,
        content: req.body.content
    }
    db[id] = item
    res.status(201).send(db[req.body.id])
}
module.exports = setItem