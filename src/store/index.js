import Vue from 'vue';
import Vuex from 'vuex';
import * as bl from '@/bl';

import mutations from './mutations';
import actions from './actions';


Vue.use(Vuex);

const ROUND = 3;

function getRestPercent(account, usage, quota) {
  if (account === null) {
    console.debug('getRestPercent(...) => (account === null) => result = "N/A"');
    return 'N/A';
  } else if (quota > 0) {
    const rest = (quota - usage) * 100;
    const result = parseFloat((rest / quota).toFixed(ROUND));
    console.debug(`getRestPercent(...) => (quota) > 0) => result = ${result}`);
    return result;
  }
  console.debug('getRestPercent(...) => (else) => result = 0.000');
  return 0.000;
}

const state = {
  scatter: null,
  identity: null,
  identityAccount: null,
  eos: null,
  eosAccount: null,
  balance: [],
  transaction: null,
};

const getters = {
  eosConfig: () => ({
    blockchain: process.env.BLOCKCHAIN,
    chainId: process.env.EOS_CHAIN_ID,
    protocol: process.env.EOS_PROTOCOL,
    host: process.env.EOS_HOST,
    port: process.env.EOS_PORT,
    httpEndpoint: `${process.env.EOS_PROTOCOL}://${process.env.EOS_HOST}:${process.env.EOS_PORT}`,
    expireInSeconds: 60,
    broadcast: true,
    verbose: false,
    sign: true,
  }),
  getAccountName: currentState => ((currentState.eosAccount) ? currentState.eosAccount.account_name : ''),
  userFullName: (currentState) => {
    let res = '';
    if (!currentState.identity || !currentState.identity.personal) {
      return res;
    }
    if (currentState.identity.personal.firstname) {
      res += currentState.identity.personal.firstname;
      res += ' ';
    }
    if (currentState.identity.personal.lastname) {
      res += currentState.identity.personal.lastname;
    }
    return res;
  },
  getBalance: currentState => bl.getFirstBalance(currentState.balance),
  getStacked: (currentState) => {
    if (currentState.eosAccount) {
      if (currentState.eosAccount.voter_info) {
        if (currentState.eosAccount.voter_info.staked) {
          return currentState.eosAccount.voter_info.staked / 10000;
        }
      } else {
        console.debug('getStacked => eosAccount.voter_info is null...');
      }
    } else {
      console.debug('getStacked => eosAccount is null...');
    }
    return 0;
  },
  getRam: (currentState) => {
    if (!currentState.eosAccount) {
      console.debug('getRam => currentState.eosAccount is null...');
      return 0;
    }
    return getRestPercent(
      currentState.eosAccount, currentState.eosAccount.ram_usage, currentState.eosAccount.ram_quota,
    );
  },
  getNet: (currentState) => {
    if (!currentState.eosAccount) {
      console.debug('getNet => currentState.eosAccount is null...');
      return 0;
    }
    return getRestPercent(currentState.eosAccount, currentState.eosAccount.net_limit.used,
      currentState.eosAccount.net_limit.max);
  },
  getCpu: (currentState) => {
    if (!currentState.eosAccount) {
      console.debug('getCpu => currentState.eosAccount is null...');
      return 0;
    }
    return getRestPercent(currentState.eosAccount, currentState.eosAccount.cpu_limit.used,
      currentState.eosAccount.cpu_limit.max);
  },
  getSymbol: (currentState) => {
    if (!currentState.identityAccount || !currentState.identityAccount.blockchain) {
      console.debug('getSymbol => currentState.identityAccount is null...');
      return 'N/A';
    }
    return currentState.identityAccount.blockchain ? currentState.identityAccount.blockchain.toUpperCase() : 'N/A';
  },
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});
