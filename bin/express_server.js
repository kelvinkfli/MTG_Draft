var express = require('express');
var path = require('path');
var app = express();
var router = express.Router();

var api = require('./api.js');
var port = 3000;

app.use(router);
app.listen(port, handleServerError);
api.getConnection();

router.get('/seed/all', seedAll);
router.get('/seed/rares', seedRare);
router.get('/seed/uncommons', seedUncommon);
router.get('/seed/commons', seedCommon);
router.get('/booster/generate', generateBooster);
router.get('/booster', getBooster);

function handleServerError(error) {
  if (error) {
      return console.log('problem with server', error)
  }
  console.log('server is listening on port ' + port);
}

function seedAll(request, res){
  api.seedCards();
  res.send("seeded master database with all cards");
}

function seedCommon(request, res){
  api.seedCommons();
  res.send("seeded commons database");
}

function seedUncommon(request, res){
  api.seedUncommons();
  res.send("seeded uncommons database");
}

function seedRare(request, res){
  api.seedRares();
  res.send("seeded rares database");
}

function generateBooster(request, res){
  booster = api.generateBooster();
  res.send("generated booster");
}

function getBooster(request, res){
  booster = api.getBooster();
  res.send(booster);
}
