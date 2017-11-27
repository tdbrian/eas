let MongoClient = require('mongodb').MongoClient
let url = 'mongodb://localhost:38611/applicationServerStack'
let dbConnection;

exports.connect = async () => {
    dbConnection = await MongoClient.connect(url)
    console.log("Connected successfully to database")
}

exports.getAppsCollection = () => {
    return dbConnection.collection('applications')
}