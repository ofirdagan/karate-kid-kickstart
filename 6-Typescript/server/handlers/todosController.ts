import { Request, Response } from 'express'
import Item, { toItem } from '../../common/interfaces/Item'
import DB from '../interfaces/DB'
import Guid from '../../common/types/Guid'
import UserID from '../../common/types/userID'

interface UserCookie {
    userID: UserID
}
export default class TodoController {
    db: DB
    constructor(db: DB) {
        this.db = db
    }
    getAllItems = (req: Request<UserCookie>, res: Response<Item[] | string>) => {
        const userID: UserID = req.cookies.userID
        this.db.getAllItemsFromDB(userID)
            .then((itemList: Item[]) => res.send(itemList))
            .catch((err: Error) => err.message == 'Not found' ?
                res.status(404).send(`user no: ${userID} not found`) :
                res.status(400).send(`could not get items for user ${userID}, ${err.message}`))
    }
    getItem = (req: Request<Item>, res: Response<Item | string>) => {
        const id: Guid = req.params._id
        this.db.getItemFromDB(id)
            .then((item: Item) => res.send(item))
            .catch((err: Error) => err.message == 'Not found' ?
                res.status(404).send(`item no: ${id} not found`) :
                res.status(400).send(`could not get item no: ${id}, ${err.message}`))
    }
    setItem = (req: Request<UserCookie, Item>, res: Response<Item | string>) => {
        const userID: UserID = req.cookies.userID
        const item: Item = toItem({ ...req.body, userID })
        this.db.setItemInDB(item)
            .then((item: Item) => res.status(201).send(item))
            .catch((err: Error) => err.message == 'Not found' ?
                res.status(404).send(`item no: ${item._id} not found`) :
                res.status(400).send(`could not set item no: ${item._id}, ${err.message}`))
    }
    removeItem = (req: Request<Item>, res: Response<Item | string>) => {
        const id: Guid = req.params._id
        this.db.removeItemFromDB(id)
            .then((deletedItem: Item) => res.send(deletedItem))
            .catch((err: Error) => err.message == 'Not found' ?
                res.status(404).send(`item no: ${id} not found`) :
                res.status(400).send(`could not delete item no: ${id}, ${err.message}`))
    }
}




