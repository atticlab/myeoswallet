var express = require('express'),
    http = require('http'),
    https = require('https'),
    fs = require('fs'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, PATCH")
  next();
});

var routes = require('./routes/routes')
routes(app);

var options = {}

var server = https.createServer(options, app).listen(port, function(){
  console.log("Express server listening on port " + port);
});
