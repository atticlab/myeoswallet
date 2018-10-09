'use strict'
module.exports = {
  NODE_ENV: '"stage"',
  BLOCKCHAIN: JSON.stringify(process.env.BLOCKCHAIN),
  EOS_PROTOCOL: JSON.stringify(process.env.EOS_PROTOCOL),
  EOS_HOST: JSON.stringify(process.env.EOS_HOST),
  EOS_PORT: process.env.EOS_PORT,
  EOS_CHAIN_ID: JSON.stringify(process.env.EOS_CHAIN_ID),
  BASE_URL: '"https://api.myeoswallet.one"'
  //  BASE_URL: '"http://ethereum3.atticlab.net:3001"'
};
