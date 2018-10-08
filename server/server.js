var express = require('express'),
    http = require('http'),
    https = require('https'),
    fs = require('fs'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, PATCH, OPTIONS');
  next();
});

const routes = require('./routes/routes');
routes(app);


const server = app.listen(port, () => {
  console.log('Express server listening on port ' + port);
});
