var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/mtg_db';
var x;

const EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter;

module.exports = {
  connect: connect
};

function connect(){
  MongoClient.connect(url, function(err, db) { //this callback function will start, and will execute code whenever its ready
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
      }
      else {
        console.log('Connected to mongoDB.');
        emitter.emit('connected', db); //emits the message "connected" upon successful connection to mongoDB
      }
  });
  return emitter; //because its asynchronous, this emitter is returned before the callback is finished
}
