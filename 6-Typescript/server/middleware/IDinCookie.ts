import { Request, Response, NextFunction} from 'express'
import { ObjectId } from 'mongodb'

export default async function IDinCookie(req:Request, res:Response, next:NextFunction) {
    if (!req.cookies?.id) {
        const objectID: ObjectId = new ObjectId()
        const id: String = objectID.toHexString()
        res.cookie('id', id, { httpOnly: true, secure: false })
    }
    next()
}
