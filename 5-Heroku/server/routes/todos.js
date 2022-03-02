const express = require('express')
const router = express.Router()
const storage = require('../handlers/todos')

router.get('/get/:id', storage.getItem)
router.post('/set', storage.setItem)
router.delete('/delete/:id', storage.removeItem)
router.get('/All', storage.getAllItems)

module.exports = router