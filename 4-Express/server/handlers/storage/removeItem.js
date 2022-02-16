const path = require('path')
const db = require(path.resolve('server/db/','db.js'))

const removeItem = (req,res,next) => {
    const id = req.params.id   
    if(db[id]){
        const title = db[id].title
        delete db[id]
        res.status(200).send(`deleted item no: ${req.params.id}`)
    }
    else{
        res.status(404).send(`can not find item no:${eq.params.id}`)
    }
}
module.exports = removeItem