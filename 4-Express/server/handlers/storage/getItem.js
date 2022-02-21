const path = require('path')
const db = require(path.resolve('server/db/','db'))

const getItem = (req,res,next) => {
    if(db[req.params.id]){
        res.status(200).send(db[req.params.id])
    }
    else{
        res.status(404).send(`item ${req.params.id ? 'no: '+req.params.id+' ': ''}not found`)
    }
}
module.exports = getItem