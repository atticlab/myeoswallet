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

const db = require('./db');

const routes = require('./routes/routes');
routes(app);

const addAccountToDb = async (name) => {
  const client = await db.getClient();
  await db.saveAccount(name, client);
  await db.closeConnection(client);
};

addAccountToDb('aaaaaaaaaaaa')
  .then((retId) => {
    console.log(`OK. ada_id ${retId}`);
  })
  .catch((e) => {
    console.error(e);
  });


const server = app.listen(port, () => {
  console.log('Express server listening on port ' + port);
});
