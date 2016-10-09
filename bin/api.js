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
  database.connect(setDBConnection);
}

function setDBConnection(connection){
  db = connection;
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
