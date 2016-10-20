var express = require('express');
var path = require('path');
var app = express();
var router = express.Router();

var api = require('./api.js');
var port = 3000;

//set headers to *, so ajax requests can be made
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // Set to true if you need the website to include cookies in the requests sent
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

app.use(router);
app.listen(port, handleServerError);
api.getConnection(); //establish mongoDB connection

//these should not be in their own routes, should seed on start-up
router.get('/seed/zendikar/all', seedAll);
router.get('/seed/zendikar/rares', seedRare);
router.get('/seed/zendikar/uncommons', seedUncommon);
router.get('/seed/zendikar/commons', seedCommon);
router.get('/seed/zendikar/generate', generateBooster);
router.get('/generate/zendikar/booster', api.generateZendikarBooster);

function handleServerError(error) {
  if (error) {
      return console.log('problem with server', error)
  }
  console.log('server is listening on port ' + port);
}

function seedAll(req, res){
  api.seedCards();
  res.send("seeded master database with all cards");
}

function seedCommon(req, res){
  api.seedCommons();
  res.send("seeded commons database");
}

function seedUncommon(req, res){
  api.seedUncommons();
  res.send("seeded uncommons database");
}

function seedRare(req, res){
  api.seedRares();
  res.send("seeded rares database");
}

function generateBooster(req, res){
  var booster = api.generateBooster();
  res("generated booster");
}

