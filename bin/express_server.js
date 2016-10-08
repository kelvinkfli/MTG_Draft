//module dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var port = 3000;
var fs = require('fs');

var app = express();
var router = express.Router();

var mongo = require('mongodb');
var monk = require('monk');
var db = require('./database.js');

//connect to server
app.listen(port, function(err) {
    if (err) {
        return console.log('problem with server', err)
    }
    console.log('server is listening on port ' + port);
})

// Make our db accessible to our router
/*app.use(function(req,res,next){
    req.db = db;
    next();
});*/

app.get('/booster', function(req,res){
    res.send()
})

// router.get('/boostercard', function(req,res){
//     var db = req.db;
//     var collection = db.get('zendikar_booster');
//     collection.find(function(e,docs){
//         res.render('boostercard', {
//            docs
//         });
//     }).pretty()
// })