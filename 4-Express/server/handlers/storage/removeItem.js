const removeItem = (req,res,next) => {
    console.log(`deleting item ${req.params.id ? req.params.id : 'no id'}`)
    res.status(200).send(`deleting item ${req.params.id ? req.params.id : 'no id'}`)
}
module.exports = removeItem