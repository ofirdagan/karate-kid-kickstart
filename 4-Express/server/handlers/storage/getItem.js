const getItem = (req,res,next) => {
    console.log(`/storage/get/${req.params.id ? req.params.id: ''}`)
    res.status(200).send(`getting item ${req.params.id ? req.params.id: 'no id'}`)
}
module.exports = getItem