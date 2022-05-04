const { Router } = require('express')
const router = Router()
const todoConteroller = require('../handlers/todoController')

router.get('/get/:id', todoConteroller.getItem)
router.post('/set', todoConteroller.setItem)
router.delete('/delete/:id', todoConteroller.removeItem)
router.get('/All', todoConteroller.getAllItems)

module.exports = router