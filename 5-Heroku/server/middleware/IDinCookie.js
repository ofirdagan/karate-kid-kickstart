const v4 = require('uuid')
module.exports = async function IDinCookie(req, res, next) {
    if (!req.cookies?.id) res.cookie('id', v4(), { httpOnly: true, secure: false })
    next()
}