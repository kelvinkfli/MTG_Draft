var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/mtg_db';

module.exports = {
  connect: connect
};

function connect(callback){
  MongoClient.connect(url, function(err, db) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
      }
      else {
        console.log('Connected to mongoDB.');
        callback(db);
      }
  });
}
