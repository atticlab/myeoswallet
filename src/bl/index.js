import JSONFormatter from 'json-formatter-js';

export default {
  composeCurrencyBalanceRequest: identityAccount => ({
    code: 'eosio.token',
    account: identityAccount.account_name,
    symbol: 'EOS',
  }),

  requestBalance: (eos, identityAccount) => {
    let args;
    if (identityAccount) {
      args = this.composeCurrencyBalanceRequest(identityAccount);
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

  renderJSON: (json, idForInsert) => {
    const formatter = new JSONFormatter(json, 1);
    const placeForTransaction = document.getElementById(idForInsert);
    placeForTransaction.textContent = '';
    placeForTransaction.appendChild(formatter.render());
  },

  lengthInUtf8Bytes: (str) => {
    const m = encodeURIComponent(str).match(/%[89ABab]/g);
    return str.length + (m ? m.length : 0);
  },

};
