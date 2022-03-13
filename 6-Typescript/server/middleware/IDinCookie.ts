import { Request, Response, NextFunction} from 'express'
import { v4 as uuidv4 } from 'uuid';
const _id: string = uuidv4().toString()

export default async function IDinCookie(req:Request, res:Response, next:NextFunction) {
    if (!req.cookies?.id) res.cookie('id', uuidv4().toString(), { httpOnly: true, secure: false })
    next()
}
