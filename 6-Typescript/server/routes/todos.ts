import express, { Router } from 'express'
import { TodoController } from '../handlers/todosController'
import { DB } from '../interfaces/DB'
const router: Router = express.Router()

export const todosRouter = (db: DB): Router => {
    const todos = new TodoController(db)
    router.get('/all', todos.getAllItems)
    router.get('/get/:id', todos.getItem)
    router.post('/set', todos.setItem)
    router.delete('/delete/:id', todos.removeItem)
    return router
}
