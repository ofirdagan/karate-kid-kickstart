import { Request, Response } from 'express'
import { Item } from '../interfaces/Item'
import { DB } from '../interfaces/DB'
export class TodoController {
    db: DB
    constructor(db: DB) {
        this.db = db
    }
    getAllItems = (req: Request, res: Response<Item[] | string>) => {
        this.db.getAllItemsFromDB(req.cookies.id)
            .then((itemList: Item[]) => res.status(200).send(itemList))
            .catch((err: Error) => res.status(400).send('could not get items, ' + err))
    }
    getItem = (req: Request, res: Response<Item | string>) => {
        req.params?.id === '' ? res.status(400).send(`missing item id`) :
            this.db.getItemFromDB(req.params.id)
                .then((item: Item) => {
                    item._id ? res.status(200).send(item) :
                        res.status(404).send(`item ${req.params.id ? `no: ${req.params.id} ` : ''}not found`)
                })
                .catch((err: Error) => err.message == 'Not found' ?
                    res.status(404).send(`item${req.params.id ? ` no: ${req.params.id}` : ''} not found`) :
                    res.status(400).send(`could not get item ${req.params.id ? `no: ${req.body?.id}` : ''}, ${err.message}`))
    }
    setItem = (req: Request, res: Response<Item | string>) => {
        !req.body?.id || req.body?.title === '' ? res.status(400).send("missing item information") :
            this.db.setItemInDB(req.cookies.id, req.body.id, req.body.title, req.body.content)
                .then((item: Item) => {
                    item._id ? res.status(201).send(item) :
                        res.status(400).send(`could not set item`)
                }).catch((err: Error) => err.message == 'Not found' ?
                    res.status(404).send(`item${req.body.id ? ` no: ${req.body.id}` : ''} not found`) :
                    res.status(400).send(`could not set item${req.body.id ? ` no: ${req.body?.id}` : ''}, ${err}`))
    }
    removeItem = (req: Request, res: Response<Item | string>) => {
        req.params?.id === '' ? res.status(404).send(`missing item number`) :
            this.db.removeItemFromDB(req.params.id)
                .then((deletedItem: Item) => {
                    deletedItem?._id ? res.status(200).send(deletedItem) :
                        res.status(404).send(`item ${req.params.id ? 'no: ' + req.params.id + ' ' : ''}not found`)
                }).catch((err: Error) => res.status(400).send(`could not delete item${req.params.id ? ` no: ${req.params.id}` : ''}, ${err}`))

    }

}




