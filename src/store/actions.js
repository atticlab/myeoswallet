import ActionType from './constants';

export default {
  [ActionType.SET_SCATTER]: ({ commit }, scatter) => commit(ActionType.SET_SCATTER, scatter),

  [ActionType.SET_IDENTITY]: ({ commit }, identity) => commit(ActionType.SET_IDENTITY, identity),

  [ActionType.SET_IDENTITY_ACCOUNT]:
    ({ commit }, identityAccount) => commit(ActionType.SET_IDENTITY_ACCOUNT, identityAccount),

  [ActionType.SET_EOS_JS]: ({ commit }, eosjs) => commit(ActionType.SET_EOS_JS, eosjs),

  [ActionType.SET_EOS_JSAPI]: ({ commit }, eosjs) => commit(ActionType.SET_EOS_JSAPI, eosjs),

  [ActionType.SET_EOS_ACCOUNT]:
    ({ commit }, eosAccount) => commit(ActionType.SET_EOS_ACCOUNT, eosAccount),

  [ActionType.SET_BALANCE]:
    ({ commit }, balance) => commit(ActionType.SET_BALANCE, balance),

  [ActionType.SET_TRANSACTION]:
    ({ commit }, transaction) => commit(ActionType.SET_TRANSACTION, transaction),

  [ActionType.SET_TOKENLIST]: ({ commit }, val) => commit(ActionType.SET_TOKENLIST, val),

  [ActionType.SET_TOKENBALANCE]: ({ commit }, val) => commit(ActionType.SET_TOKENBALANCE, val),

  [ActionType.SET_AIRGRABS]: ({ commit }, val) => commit(ActionType.SET_AIRGRABS, val),

  [ActionType.SET_ACTIONINFOPOPUP]: ({ commit }, val) => commit(ActionType.SET_ACTIONINFOPOPUP, val),

  [ActionType.SET_HARDWARE]: ({ commit }, hardware) => commit(ActionType.SET_HARDWARE, hardware),

  [ActionType.SET_LEDGER_WALLET]: ({ commit }, ledgerWallet) => commit(ActionType.SET_LEDGER_WALLET, ledgerWallet),

  [ActionType.LOGOUT]: ({ commit }) => commit(ActionType.LOGOUT),
  [ActionType.RELOGIN_SCATTER_EOS]: ({ commit }) => commit(ActionType.RELOGIN_SCATTER_EOS),

  [ActionType.SET_NODE]: ({ commit }, node) => commit(ActionType.SET_NODE, node),
};
