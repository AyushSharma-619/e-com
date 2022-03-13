const mongodb = require('mongodb')
const dbClient = mongodb.MongoClient;


let db ; 

const mongoConnect = callback => {
  dbClient.connect('mongodb+srv://ayush:aZNSrLNh6ZqR8Vbb@cluster0.clqvv.mongodb.net/shop?retryWrites=true&w=majority')
.then( client =>{
  console.log("connected")
  db= client.db()
  callback(client)
})
.catch(err =>{
  console.log(err)
  throw err;
})
}

const getDB = ()=>{
  if(db){
    return db;
  }
  throw 'No database Found'
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
