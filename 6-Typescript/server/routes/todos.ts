import express, { Router } from 'express'
import { TodoConteroller } from '../handlers/todosController'
const router: Router = express.Router()

export const todosRouter = (db: any) => {
    const todos = new TodoConteroller(db)
    router.get('/all', todos.getAllItems)
    router.get('/get/:id', todos.getItem)
    router.post('/set', todos.setItem)
    router.delete('/delete/:id', todos.removeItem)
    return router
}
