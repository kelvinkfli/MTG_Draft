var db = require('./database_fixed'); 
var mtg = require('mtgsdk');  // get api functions
var exports = module.exports = {};  // set exports object

/*--------------------FUNCTIONS TO BE EXPORTED BELOW------------------------*/

//Inserts all cards from set into collection
exports.getCards = function () {
    mtg.card.all({set: 'zen'}).on('data', function (card) {
        db.collection('zendikar_fullset').insert(card);
    });
}

//Inserts all commons into its own collection
exports.getCommon = function () {
    db.collection('zendikar_fullset').find({rarity: "Common"}).forEach(function (card) {
        db.collection('zendikar_common').insert(card);
    });
}

//Inserts all uncommons into its own collection
exports.getUncommon = function () {
    db.collection('zendikar_fullset').find({rarity: "Uncommon"}).forEach(function (card) {
        db.collection('zendikar_uncommon').insert(card);
    });
}

//Inserts all rares into its own collection
exports.getRares = function () {
    db.collection('zendikar_fullset').find({rarity: "Rare"}).forEach(function (card) {
        db.collection('zendikar_rares').insert(card);
    });
}

//Randomly generates a booster pack and inserts into collection
exports.generateBooster = function() {
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