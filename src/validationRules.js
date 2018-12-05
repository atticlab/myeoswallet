import store from './store';
import bl from 'src/bl'

const lengthInUtf8Bytes = (str) => {
  const m = encodeURIComponent(str)
    .match(/%[89ABab]/g);
  return str.length + (m ? m.length : 0);
};

export default [
  {
    name: 'accountExist',
    getMessage: field => 'Account not exist',
    validate: (value) => {
      if (store.state.eos) {
        return store.state.eos.getAccount(value)
          .then(() => true)
          .catch(() => false);
      }
      bl.logInPopUP();
      return false;
    },
  },
  {
    name: 'accountNotExist',
    getMessage: field => 'Account exist',
    validate: (value) => {
      if (store.state.eos) {
        return store.state.eos.getAccount(value)
          .then(() => false)
          .catch(() => true);
      }
      bl.logInPopUP();
      return false;
    },
  },
  {
    name: 'accountNotExistWitoutLogin',
    getMessage: field => 'Account exist',
    validate: (value) => {
      if (store.state.eosApi) {
        return store.state.eosApi.getAccount(value)
          .then(() => false)
          .catch(() => true);
      }
      return false;
    },
  },
  {
    name: 'validateMemo',
    getMessage: field => 'Too long value',
    validate: (value) => {
      if (lengthInUtf8Bytes(value) <= 255) {
        return true;
      } else {
        return false;
      }
    },
  },
  {
    name: 'noMoreThenBalance',
    getMessage: field => 'Invalid value',
    validate: (value) => {
      if (value <= store.getters.getBalance) {
        return true;
      }
      return false;
    },
  },
  {
    name: 'publicKey',
    getMessage: field => 'Invalid public key',
    validate: (key) => {
      if (typeof key === 'string' && key.length === 53 && key.substr(0, 3) === 'EOS') {
        return true;
      }
      return false;
    },
  },
  {
    name: 'validateEosAmount',
    getMessage: field => 'Invalid amount',
    validate: (value) => {
      let val = value;
      if (typeof value === 'number') {
        val = value.toString();
      }
      const regEx = /^\d+(\.\d{1,4})?$/;
      return regEx.test(val);
    },
  },
];
