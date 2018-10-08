const Eos = require('eosjs');
const db = require('../db');

const validatePublicKey = key => (typeof key === 'string' && key.length === 53 && key.substr(0, 3) === 'EOS');
const nodeHost = 'https://nodes.get-scatter.com';
const chainID = 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906';


const addAccountToDb = async (name) => {
  const client = await db.getClient();
  await db.saveAccount(name, client);
  await db.closeConnection(client);
};

exports.newAccount = async (req, res) => {
  const active = req.body.active;
  const owner = req.body.owner;
  const name = req.body.name;
  console.log(req.body);
  if (!active || !owner || !name) {
    res.json({
      isError: true,
      error: 'Not enough paramaters',
    });
    console.log(`${name} ${owner} ${active}`);
    return;
  }
  if (!validatePublicKey(active) || !validatePublicKey(owner)) {
    res.json({
      isError: true,
      error: 'Invalid public key(s)',
    });
    console.log(`${name} ${owner} ${active}`);
    return;
  }
  const eos = Eos({
    httpEndpoint: nodeHost,
    chainId: chainID,
    keyProvider: process.env.EOS_PRIV,
    broadcast: true,
    verbose: false,
    sign: true,
    expireInSeconds: 3600,
  });

  const creator = 'atticcreator';
  eos.transaction(
    {
      actions: [
        {
          account: 'eosio',
          name: 'newaccount',
          authorization: [{
            actor: creator,
            permission: 'active',
          }],
          data: {
            creator,
            name,
            owner,
            active,
          },
        },
        {
          account: 'eosio',
          name: 'buyrambytes',
          authorization: [{
            actor: creator,
            permission: 'active',
          }],
          data: {
            payer: creator,
            receiver: name,
            bytes: 3000,
          },
        },
        {
          account: 'eosio',
          name: 'delegatebw',
          authorization: [{
            actor: creator,
            permission: 'active',
          }],
          data: {
            from: creator,
            receiver: name,
            stake_net_quantity: '0.0002 EOS',
            stake_cpu_quantity: '0.0215 EOS',
            transfer: 1,
          },
        },
      ],
    })
    .then((result) => {
      res.json(result);
      addAccountToDb(name)
        .then(() => {
          console.log('OK');
        })
        .catch((e) => {
          console.error(e);
        });
    })
    .catch((e) => {
      res.json(e);
      console.error('fail');
      console.error(e);
    });
  console.log('fin');
};
