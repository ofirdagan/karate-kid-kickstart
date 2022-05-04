import express, { Router } from 'express'
import TodoController from '../handlers/todosController'
import DB from '../interfaces/DB'
const router: Router = express.Router()

const todosRouter = (db: DB): Router => {
    const todos = new TodoController(db)
    router.get('/:_id', todos.getItem)
    router.delete('/:_id', todos.removeItem)
    router.post('/', todos.setItem)
    router.get('/', todos.getAllItems)
    return router
}
export default todosRouter
