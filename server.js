/******************************************************
 * PLEASE DO NOT EDIT THIS FILE
 * the verification process may break
 * ***************************************************/
 

var bGround = require('fcc-express-bground');
var myApp = require('./myApp');
var express = require('express');
var app = express();
require('dotenv').config()

if (!process.env.DISABLE_XORIGIN) {
  app.use(function(req, res, next) {
    var allowedOrigins = ['https://narrow-plane.gomix.me', 'https://www.freecodecamp.com'];
    var origin = req.headers.origin || '*';
    if (!process.env.XORIG_RESTRICT || allowedOrigins.indexOf(origin) > -1) {
      console.log('>>> step 1: here origin get printed', origin);
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    }

    next();
  });
}

app.use(express.static(__dirname + "/public"));

app.get('/', function(req, res) {
  console.log('>>> step 3: server is running :::', __dirname + "/public");
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/json', function(req, res) {
  console.log('>>> step 3: server is running :::', process.env.MESSAGE_STYLE);
  res.json({ "message": process.env.MESSAGE_STYLE === 'uppercase' ? "Hello json".toUpperCase() : "Hello json" });
});

var port = process.env.PORT || 3000;
bGround.setupBackgroundApp(app, myApp, __dirname).listen(port, function() {
  bGround.log('Node is listening on port ' + port + '...')
});
/******************************************************
 * PLEASE DO NOT EDIT THIS FILE
 * the verification process may break
 * ***************************************************/

