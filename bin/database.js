// Require all dependencies and provide link to database URL
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/mtg_db';
var expfunc = require('./api'); // import module containing our function

// Global variables to store reference db
var zendikarFull;
var zendikarCommon;
var zendikarUncommon;
var zendikarRares;

// Connect to database
MongoClient.connect(url, function(err, db) {
    // Error handler for server connection
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        console.log('Connections established to', url);
    }
    // Change value of global variable to collection path
    zendikarFull = db.collection('zendikar_fullset');
    zendikarCommon = db.collection('zendikar_common');
    zendikarUncommon = db.collection('zendikar_uncommon');
    zendikarRares = db.collection('zendikar_rares');
    zendikarBooster = db.collection('zendikar_booster');

    // Pull data from exported function "getCards" to insert entire set of cards
    zendikarFull.count(function (err, count) {
        if (!err && count === 0) {
            expfunc.getCards(zendikarFull);
        }
    });
    // Add all commons into a sub-collection
    zendikarCommon.count(function (err, count) {
        if (!err && count === 0) {
            zendikarFull.find({rarity: "Common"}).forEach(function(card) {
                db.collection('zendikar_common').insert(card);
            });
        };
    });
    // Add all uncommons into a sub-collection
    zendikarUncommon.count(function (err, count) {
        if (!err && count === 0) {
            zendikarFull.find({rarity: "Uncommon"}).forEach(function(card) {
                db.collection('zendikar_uncommon').insert(card);
            });
        };
    });
    // Add all rares + mythics into a sub-collection
    zendikarRares.count(function (err, count) {
        if (!err && count === 0) {
            zendikarFull.find( {$or: [{rarity: "Rare"}, {rarity: "Mythic Rare"}]}).forEach(function(card) {
                db.collection('zendikar_rares').insert(card);
            });
        };
    });
    
    zendikarBooster.count(function (err, count) {
        if (!err && count === 0 ) {
            expfunc.generateBooster(zendikarRares, zendikarUncommon, zendikarCommon, zendikarBooster)
        }
    })
    console.log("Database is running...");

});



//Sample generateBooster function:
// look into $sample cursor method (but has the possibility or returning the same document more than once)
// {sample: { size: 3 } } is the query for find....
// look into adding cursor method .snapshot(), this makes it so that no document is returned more than once.
// SNAPSHOT must be applied to the cursor before retrieving documents - note: snapshot does not work on unsharded collections

/* Second iteration: simulation with fake users:  apply a delay of random timing (to simulate picking) and implement
   long polling to check every 'x' seconds if the users array has been filled
 */

/* iteration #3, socket.io for user polling.  host can execute files whenever users have joined. */