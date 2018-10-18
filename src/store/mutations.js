import ActionType from './constants';

export default {
  [ActionType.SET_SCATTER]: (state, scatter) => {
    state.scatter = scatter;
  },

  [ActionType.SET_IDENTITY]: (state, identity) => {
    state.identity = identity;
  },

  [ActionType.SET_IDENTITY_ACCOUNT]: (state, identityAccount) => {
    state.identityAccount = identityAccount;
  },

  [ActionType.SET_EOS_JS]: (state, eosjs) => {
    state.eos = eosjs;
  },

  [ActionType.SET_EOS_JSAPI]: (state, eosjs) => {
    state.eosApi = eosjs;
  },

  [ActionType.SET_EOS_ACCOUNT]: (state, eosAccount) => {
    state.eosAccount = eosAccount;
  },

  [ActionType.SET_BALANCE]: (state, balance) => {
    state.balance = balance;
  },

  [ActionType.SET_TRANSACTION]: (state, transaction) => {
    let t = transaction;
    if (typeof transaction === 'string') {
      t = JSON.parse(transaction);
    }
    state.transaction = t;
    if (transaction) {
      state.actionInfoPopUp = true;
    }
  },

  [ActionType.SET_TOKENLIST]: (state, val) => {
    state.tokenList = val;
  },

  [ActionType.SET_TOKENBALANCE]: (state, val) => {
    if (!val) return;
    const tokenObj = state.tokenList.find(obj => obj.symbol === val.symbol);
    tokenObj.balance = val.balance.length ? val.balance[0] : null;
  },

  [ActionType.SET_AIRGRABS]: (state, val) => {
    state.airgrabs = val;
  },

  [ActionType.SET_ACTIONINFOPOPUP]: (state, val) => {
    state.actionInfoPopUp = val;
  },

  [ActionType.SET_HARDWARE]: (state, hardware) => {
    state.hardware = hardware;
  },
  [ActionType.SET_LEDGER_WALLET]: (state, ledgerWallet) => {
    state.ledgerWallet = ledgerWallet;
  },
};
