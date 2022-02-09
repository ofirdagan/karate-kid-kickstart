const getAllItems = (req,res,next) => {
    console.log(`getting all items in storage`)
    res.status(200).send('getting all items in storage')
}
module.exports = getAllItems