var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/mtg_db';

const EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter;

module.exports = {
  connect: connect
};

function connect(){
  MongoClient.connect(url, function(err, db) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
      }
      else {
        connection = db;
        console.log('Connected to mongoDB.');
        emitter.emit('connected', connection);
      }
  });
  return emitter;
}
