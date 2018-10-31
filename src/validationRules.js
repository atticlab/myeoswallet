import swal from 'sweetalert2';
import store from './store';

const lengthInUtf8Bytes = (str) => {
  const m = encodeURIComponent(str)
    .match(/%[89ABab]/g);
  return str.length + (m ? m.length : 0);
};

function logInPopUP() {
  swal({
    title: 'You are not logged in',
    html: '<p>Please, login with Scatter on ledger on the left panel</p>',
    buttonsStyling: false,
    showConfirmButton: true,
    showCloseButton: true,
    confirmButtonClass: 'btn btn-primary',
  })
    .catch(e => {});
}

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
      logInPopUP();
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
      logInPopUP();
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
];
