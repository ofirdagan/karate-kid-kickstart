const mongodb = require('mongodb')
async function IDinCookie(req,res,next){
    if(!req.cookies?.id){
        const objectID = new mongodb.ObjectId()
        const id = objectID.toHexString()
        res.cookie('id',id,{httpOnly: true, secure: false })
    }
    next()
}
module.exports = IDinCookie