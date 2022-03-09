import { Request, Response } from 'express'
export class TodoConteroller {
    db: any
    constructor(db: any) {
        this.db = db
    }
    getAllItems = (req: Request, res: Response) => {
        this.db.getAllItemsFromDB(req.cookies.id)
            .then((itemList: Object) => res.status(200).send(itemList))
            .catch((err: Error) => {
                res.status(500).send('could not get items, ' + err)
            })

    }
    getItem = (req: Request, res: Response) => {
        if (req.params?.id === '') {
            res.status(404).send(`missing item id`)
            return
        }
        this.db.getItemFromDB(req.params.id)
            .then((item: any[]) => res.status(200).send(item))
            .catch((err: Error) => res.status(404).send(`item ${req.params.id ? 'no: ' + req.params.id + ' ' : ''}not found`))
    }
    setItem = (req: Request, res: Response) => {
        if (!req.body?.id) {
            res.status(400).send("missing item information")
            return
        }
        if (req.body?.title === '') {
            res.status(400).send(`can not set an item with no title`)
            return
        }
        this.db.setItemInDB(req.cookies.id, req.body.id, req.body.title, req.body.content)
            .then((item: object) => {
                if (!item) {
                    res.status(500).send(`could not set item`)
                }
                res.status(201).send(item)
            }).catch((err: Error) => res.status(500).send(`could not set item, ${err}`))
    }
    removeItem = (req: Request, res: Response) => {
        if (req.params?.id === '') {
            res.status(404).send(`missing item number`)
            return
        }
        this.db.removeItemFromDB(req.params.id).then((messege: object) => {
            if (!messege) {
                res.status(404).send(`item no: ${req.params.id} not found`)
                return
            }
            res.status(200).send(`deleted item no: ${req.params.id}`)
        }).catch((err: Error) => res.status(500).send(`unable to delete item no: ${req.params.id}, ${err}`))
    }

}




