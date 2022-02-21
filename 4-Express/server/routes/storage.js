const express = require('express')
const router = express.Router()
const getItem = require('../handlers/storage/getItem')
const setItem = require('../handlers/storage/setItem')
const removeItem = require('../handlers/storage/removeItem')
const getAllItems = require('../handlers/storage/getAllItems')


router.get('/get/:id', getItem)
router.post('/set', setItem)
router.delete('/delete/:id', removeItem)
router.get('/All', getAllItems)

module.exports = router