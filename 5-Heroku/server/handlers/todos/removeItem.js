const mongoose = require('mongoose')
const itemModel = require('../../models/item')
const {removeItemFromDB} = require('../../db')

const removeItem = async (req, res, next) => {
    if (req.params?.id === '') {
        res.status(404).send(`missing item number`)
        return
    }
    try{
        const messege = await removeItemFromDB(req.params.id)
        if(!messege){
            res.status(404).send(`item no: ${req.params.id} not found`)
            return
        }
        res.status(200).send(`deleted item no: ${req.params.id}`)
    }catch(err){
        res.status(500).send(`unable to delete item no: ${req.params.id}, ${err}`)
    }
}
module.exports = removeItem