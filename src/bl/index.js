import JSONFormatter from 'json-formatter-js';
import swal from 'sweetalert2';

function composeCurrencyBalanceRequest(identityAccount, token) {
  return {
    code: token ? token.account : 'eosio.token',
    account: identityAccount.account_name,
    symbol: token ? token.symbol : 'EOS',
  };
}

function renderJSON(json, idForInsert) {
  const formatter = new JSONFormatter(json, 1);
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

  getFirstBalance: balance => ((balance) ? parseFloat(balance[0]) : 0),
  logDebug: (title, obj) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(title);
      console.debug(obj);
    }
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
  logInPopUP: () => {
    swal({
      title: 'You are not logged in',
      html: '<p>Please, login with Scatter on ledger on the left panel</p>',
      buttonsStyling: false,
      showConfirmButton: true,
      showCloseButton: true,
      confirmButtonClass: 'btn btn-primary',
    }).catch((e) => {});
  },
  ledgerAprove: () => {
    swal({
      title: 'Ledger confirm',
      buttonsStyling: false,
      showConfirmButton: true,
      showCloseButton: true,
      confirmButtonClass: 'btn btn-primary',
    }).catch((e) => {});
  },
};
