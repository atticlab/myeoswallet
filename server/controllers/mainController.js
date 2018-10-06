const Eos = require('eosjs')

const validatePublicKey = key => (typeof key === 'string' && key.length === 53 && key.substr(0, 3) === 'EOS');
const nodeHost = 'https://nodes.get-scatter.com';
const chainID = 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906';

exports.newAccount = (req, res) => {
  const active = req.body.active;
  const owner = req.body.owner;
  const name = req.body.name;
  if (!active || !owner || !name) {
    res.json({
      isError: true,
      error: 'Not enough paramaters',
    });
    return;
  }
  if (!validatePublicKey(active) || !validatePublicKey(owner)) {
    res.json({
      isError: true,
      error: 'Invalid public key(s)',
    });
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
            transfer: 0,
          },
        },
      ],
    })
    .then((result) => {
      res.json(result);
    })
    .catch((e) => {
      res.json(e);
    });
}
