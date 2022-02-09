const express = require('express')
const router = express.Router()
const getItem = require('../handlers/storage/getItem.js')
const setItem = require('../handlers/storage/setItem.js')
const removeItem = require('../handlers/storage/removeItem.js')
const getAllItems = require('../handlers/storage/getAllItems.js')


router.get('/get/:id', getItem)
router.post('/set', setItem)
router.delete('/delete/:id', removeItem)
router.get('/All', getAllItems)

module.exports = router