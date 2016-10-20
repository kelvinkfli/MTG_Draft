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
  getConnection: getConnection,
  generateZendikarBooster: generateZendikarBooster,  
};

function getConnection(){
  database.connect(setDBConnection); //runs connect in database.js, to establish connection to mongoDB
}

function setDBConnection(connection){ //instantiates mongoDB connection and stores it in 'db' 
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
  db.collection('zendikar_fullset').find({rarity: "Mythic Rare"}).forEach(function (card) {
      db.collection('zendikar_rares').insert(card);
  })    
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

function getBooster(req,res){
  db.collection('zendikar_booster').find({}).toArray(function(err, docs) {
    console.log(err);
    console.log(docs);
    res.send(docs);
  });
}

function generateZendikarBooster(req,res) {
    var storeBooster = [];
    var promise1 = new Promise((resolve, reject) => {
        db.collection('zendikar_rares').aggregate([{$sample: {size: 1}}]).toArray(function (err, docs) {
            resolve(docs);    
        });
    })
    var promise2 = new Promise((resolve, reject) => {
        db.collection('zendikar_uncommon').aggregate([{$sample: {size: 3}}]).toArray(function (err, docs) {
            resolve(docs);    
        });
    })
    var promise3 = new Promise((resolve, reject) => {
        db.collection('zendikar_common').aggregate([{$sample: {size: 11}}]).toArray(function (err, docs) {
            resolve(docs);
        });
    })
    Promise.all([promise1, promise2, promise3]).then(function(data) {
        var flatArray = flatten(data);
        res.send(flatArray);
    })
}

//function used to flatten my array of arrays
function flatten(arrayToFlatten) {
    return arrayToFlatten.reduce(function(a, b){
        return a.concat(b)
    })
}

// express.static folder set as assets folder

// function generateBoosterFixed(req,res) {
//     var storeBooster = [];
//     db.collection('zendikar_rares').aggregate([{$sample: {size: 1}}]).toArray(function (err, docs) {
//         storeBooster = storeBooster.concat(docs);
//     });
//     db.collection('zendikar_uncommon').aggregate([{$sample: {size: 3}}]).toArray(function (err, docs) {
//         storeBooster = storeBooster.concat(docs);
//     });
//
//     db.collection('zendikar_common').aggregate([{$sample: {size: 11}}]).toArray(function (err, docs) {
//         storeBooster = storeBooster.concat(docs);
//         res.send(storeBooster);
//     });
// }