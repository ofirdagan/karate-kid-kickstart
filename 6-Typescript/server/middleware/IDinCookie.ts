import { Request, Response, NextFunction } from 'express'
import { v4 as uuid } from 'uuid'

export default async function IDinCookie(req: Request, res: Response, next: NextFunction) {
    if (!req.cookies?.userID) res.cookie('userID', uuid(), { httpOnly: true, secure: false })
    next()
}
