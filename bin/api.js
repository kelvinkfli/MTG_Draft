var mtg = require('mtgsdk');  // get api functions
var database = require('./database');
var db;

module.exports = {
  seedCards: getCards,
  seedCommons: getCommon,
  seedUncommons: getUncommon,
  seedRares: getRares,
  generateBooster: generateBooster,
  getBooster: getBooster,
  getConnection: getConnection
};

function getConnection(){
  connection = database.connect();  //immediately stores emitter so we are listening to events in database.js
  connection.on('connected', setDBConnection); //event listener: when 'connected' message is received, run setDBConnection
  //callback function from mongoClient.connect will emit 'connected' message, thus triggering setDBConnection on line 17
}

function setDBConnection(connection){ //these connection parameters are taken from line 19 of database.js
  db = connection; //this variable holds an instance of our mongo connection, so we can use mongodb commands
  console.log('MongoDB connection established with API.')
}

//Inserts all cards from set into collection
function getCards() {
  mtg.card.all({set: 'zen'}).on('data', function (card) {
    db.collection('zendikar_fullset').insert(card);
  });
}

//Inserts all commons into its own collection
function getCommon() {
  db.collection('zendikar_fullset').find({rarity: "Common"}).forEach(function (card) {
      db.collection('zendikar_common').insert(card);
  });
}

//Inserts all uncommons into its own collection
function getUncommon() {
  db.collection('zendikar_fullset').find({rarity: "Uncommon"}).forEach(function (card) {
      db.collection('zendikar_uncommon').insert(card);
  });
}

//Inserts all rares into its own collection
function getRares() {
  db.collection('zendikar_fullset').find({rarity: "Rare"}).forEach(function (card) {
      db.collection('zendikar_rares').insert(card);
  });
}

//Randomly generates a booster pack and inserts into collection
function generateBooster() {
  db.collection('zendikar_rares').aggregate([{$sample: {size: 1}}]).forEach(function (card) {
    db.collection('zendikar_booster').insert(card);
  })
  db.collection('zendikar_uncommon').aggregate([{$sample: {size: 3}}]).forEach(function (card) {
    db.collection('zendikar_booster').insert(card);
  })
  db.collection('zendikar_common').aggregate([{$sample: {size: 11}}]).forEach(function (card) {
    db.collection('zendikar_booster').insert(card);
  })
}

function getBooster(){
  //return db.collection('zendikar_booster').find();
  return 'this is the generated booster!';
}
