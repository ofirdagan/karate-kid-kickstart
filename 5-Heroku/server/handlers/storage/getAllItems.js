const db = require('../../db')
const MongoClient = require('mongodb').MongoClient
const getAllItems = (req,res,next) => {
    const url = 'mongodb://localhost:27017/data';
    const dbName = 'data';
    const mongoClient = new MongoClient(url);
    mongoClient.connect(function(err, client) {
        console.log("connecting...",client)
        if(!err){
            console.log('connected to db')
        }
        else{
            console.log('unable to connecte to db',err)
        }
        const dbFromMongo = client.db(dbName);
        console.log(dbFromMongo)
        client.close();
    });
    res.status(200).send(db)
}
module.exports = getAllItems