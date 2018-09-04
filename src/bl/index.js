export function composeCurrencyBalanceRequest(identityAccount) {
  return {
    code: 'eosio.token',
    account: identityAccount.account_name,
    symbol: 'EOS',
  };
}

export function requestBalance(eos, identityAccount) {
  let args;
  if (identityAccount) {
    args = composeCurrencyBalanceRequest(identityAccount);
  }
  return eos.getCurrencyBalance(args.code, args.account, args.symbol)
    .catch((e) => {
      console.error(e);
      return false;
    });
}

export function getFirstBalance(balance) {
  return (balance && balance.length > 0) ? balance[0] : '0 EOS';
}

export function logDebug(title, obj) {
  console.debug(title);
  console.debug(obj);
}
