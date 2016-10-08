// Script to pull data from MTG API
// var db = require('./database');
var mtg = require('mtgsdk');  // get dependancies
var exports = module.exports = {};  // set exports object


//------------------FUNCTIONS TO BE EXPORTED BELOW-----------------------

//Inserts all cards from set into database
exports.getCards = function(collectionname) {
    mtg.card.all({set: 'zen'}).on('data', function (card) {
        collectionname.insert(card);
    });
}

//Function that takes in 4 parameters, one for each database + booster database:
// -randomly selects cards with rarity distribution and inserts into database
exports.generateBooster = function(raredb, uncommondb, commondb, boosterdb) {
    raredb.aggregate([{$sample: {size: 1}}]).forEach(function (card) {
        boosterdb.insert(card);
    })
    uncommondb.aggregate([{$sample: {size: 3}}]).forEach(function (card) {
        boosterdb.insert(card);
    })
    commondb.aggregate([{$sample: {size: 11}}]).forEach(function (card) {
        boosterdb.insert(card);
    })
}

//http://stackoverflow.com/questions/2824157/random-record-from-mongodb
//write generateBooster.js in its own file <-- root URL (eventually will replace "hello world")
/*
 generateBooster.generate
 within generatebooster.js

 generate()
 */