const setItem = (req,res,next) => {
    console.log('/storage/get')
    res.status(200).json({message:'post: /storage/set'})
}
module.exports = setItem