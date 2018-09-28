import JSONFormatter from 'json-formatter-js';

function composeCurrencyBalanceRequest(identityAccount, token) {
  return {
    code: token ? token.account : 'eosio.token',
    account: identityAccount.account_name,
    symbol: token ? token.symbol : 'EOS',
  };
}

function renderJSON(json, idForInsert) {
  const formatter = new JSONFormatter(json, 1, { theme: 'dark' });
  const placeForTransaction = document.getElementById(idForInsert);
  if (placeForTransaction) {
    placeForTransaction.textContent = '';
    placeForTransaction.appendChild(formatter.render());
  }
}

// composeCurrencyBalanceRequest: identityAccount => ({
//   code: 'eosio.token',
//   account: identityAccount.account_name,
//   symbol: 'EOS',
// }),

export default {
  requestBalance: (eos, identityAccount, token) => {
    let args;
    if (identityAccount) {
      args = composeCurrencyBalanceRequest(identityAccount, token);
    }
    return eos.getCurrencyBalance(args.code, args.account, args.symbol)
      .catch((e) => {
        console.error(e);
        return false;
      });
  },

  getFirstBalance: balance => ((balance && balance.length > 0) ? balance[0] : '0 EOS'),

  logDebug: (title, obj) => {
    console.debug(title);
    console.debug(obj);
  },

  renderJSON,

  handleError: (e, idForInsert) => {
    console.error(e);
    let error = e;
    if (typeof e === 'string') {
      error = JSON.parse(e);
    }
    renderJSON(error, idForInsert);
  },

  lengthInUtf8Bytes: (str) => {
    const m = encodeURIComponent(str)
      .match(/%[89ABab]/g);
    return str.length + (m ? m.length : 0);
  },

  validatePublicKey: key => (typeof key === 'string' && key.length === 53 && key.substr(0, 3) === 'EOS'),
};
