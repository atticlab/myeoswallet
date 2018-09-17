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

  [ActionType.SET_EOS_ACCOUNT]: (state, eosAccount) => {
    state.eosAccount = eosAccount;
  },

  [ActionType.SET_BALANCE]: (state, balance) => {
    state.balance = balance;
  },

  [ActionType.SET_TRANSACTION]: (state, transaction) => {
    state.transaction = transaction;
  },

  [ActionType.SET_TOKENLIST]: (state, val) => {
    state.tokenList = val;
  },
};
