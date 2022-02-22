const db = require('../../db')
const mongodb = require('mongodb')
const getAllItems = (req,res,next) => {
    const MongoClient = mongodb.MongoClient
    const url = 'mongodb://localhost:27017';
    const dbName = 'users';
    const mongoClient = new MongoClient(url);
    mongoClient.connect(function(err, client) {
        if(!err){
            console.log('connected to db')
        }
        else{
            console.log('unable to connecte to db')
        }
    const db = client.db(dbName);
    client.close();
    });
    res.status(200).send(db)
}
module.exports = getAllItems