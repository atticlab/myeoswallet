<template>
  <md-card class="md-card-style">
    <md-toolbar class="md-transparent" :md-elevation="0">
      <div class="md-title">Transfer</div>
    </md-toolbar>

    <md-card-content class="alw-first-child">
      <md-field>
        <label>Username</label>
        <span class="md-prefix">@ </span>
        <md-input :value="getAccountName" maxlength="12" required readonly></md-input>
      </md-field>
      <md-field :class="accountError ? 'md-invalid' : ''">
        <label>Destination account</label>
        <span class="md-prefix">@ </span>
        <span class="md-error">Invalid name</span>
        <md-input v-model="toAccount" maxlength="12" required @change="validateAccount"></md-input>
      </md-field>
    </md-card-content>

    <md-card-content>
      <md-field :class="amountError ? 'md-invalid' : ''">
        <label>Amount</label>
        <span class="md-prefix">EOS </span>
        <span class="md-error">Invalid amount</span>
        <md-input
          v-model="amount"
          type="number" min="0" required @change="onChangeAmount">
        </md-input>
      </md-field>
      <md-field :class="memoError ? 'md-invalid' : ''">
        <label>Memo</label>
        <span class="md-error">Memo is too long</span>
        <md-input v-model="memo" @change="onChangeMemo"></md-input>
      </md-field>
    </md-card-content>

    <md-card-content class="alw-buttons">
      <md-button @click="onTransfer" style="color: #ffffff;
      box-shadow: none; width: 260px; " class="md-raised md-primary">TRANSFER
      </md-button>
    </md-card-content>
  </md-card>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import JSONFormatter from 'json-formatter-js';
import ActionType from '../../store/constants';
import * as bl from '../../bl/index';

export default {
  name: 'Transfer',
  data: () => ({
    toAccount: '',
    amount: '',
    memo: '',
    accountError: false,
    memoError: false,
    amountError: false,
  }),
  computed: {
    ...mapState([
      'scatter',
      'identity',
      'eos',
      'eosAccount',
    ]),
    ...mapGetters([
      'getAccountName',
      'getBalance',
    ]),
  },
  methods: {
    ...mapActions([
      ActionType.SET_TRANSACTION,
      ActionType.SET_BALANCE,
    ]),
    onChangeAmount() {
      const rg = /^\d{1,10}(\.\d{0,4})?$/;
      if (!this.amount || this.amount < 0 ||
        this.amount > parseFloat(this.getBalance) || !rg.test(this.amount)) {
        this.amountError = true;
      } else {
        this.amountError = false;
      }
    },
    onChangeMemo() {
      if (this.lengthInUtf8Bytes(this.memo) <= 255) {
        this.memoError = false;
      } else {
        this.memoError = true;
      }
    },
    validateAccount() {
      if (this.toAccount.length === 12) {
        this.eos.getAccount(this.toAccount)
          .then(() => {
            this.accountError = false;
          })
          .catch(() => {
            this.accountError = true;
          });
      } else {
        this.accountError = true;
      }
    },
    validateMemo() {
      return this.lengthInUtf8Bytes(this.memo) <= 255;
    },
    validateAmount: () => true,
    onTransfer() {
      this.eos.transfer(
        this.getAccountName,
        this.toAccount,
        `${parseFloat(this.amount).toFixed(4)} EOS`,
        this.memo || 'memo',
      ).then((transactionResult) => {
        console.debug('TRANSACTION RESULT', transactionResult);
        this[ActionType.SET_TRANSACTION](transactionResult);
        this.renderJSON(transactionResult);
        bl.requestBalance(this.eos, this.eosAccount).then((respBalance) => {
          this[ActionType.SET_BALANCE](respBalance);
          bl.logDebug('bl.requestBalance(eos).then...', respBalance);
        });
      }).catch((e) => {
        console.error(e);
        let error = e;
        if (typeof e === 'string') {
          error = JSON.parse(e);
        }
        this.renderJSON(error);
      });
    },
    renderJSON(json) {
      const formatter = new JSONFormatter(json, 1);
      const placeForTransaction = document.getElementById('place-for-transaction');
      placeForTransaction.textContent = '';
      placeForTransaction.appendChild(formatter.render());
    },
    lengthInUtf8Bytes(str) {
      const m = encodeURIComponent(str).match(/%[89ABab]/g);
      return str.length + (m ? m.length : 0);
    },
  },
};
</script>

<style scoped>
  .md-card {
    display: inline-flex;
    display: -webkit-flex; /* Safari */
    -webkit-flex-direction: column; /* Safari 6.1+ */
    flex-direction: column;
    -ms-flex-direction: column;

    -webkit-justify-content: flex-start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    flex: 1 1 0;

    align-items: center;

    -webkit-align-self: stretch;
    align-self: stretch;
    -ms-flex-item-align: stretch;
  }

  .md-card-content {
    display: flex;
    display: -webkit-flex;
    display: -ms-flexbox;
    flex-direction: row;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex: 1 1 0;
    -webkit-flex: 1 1 0;
    -ms-flex: 1 1 0;

    justify-content: flex-start;
    -webkit-justify-content: flex-start;
    -ms-flex-pack: start;

    align-items: center;
    -webkit-align-items: center;
    -ms-flex-align: center;

    align-self: stretch;
    -webkit-align-self: stretch;
    -ms-flex-item-align: stretch;

    padding: 8px;
  }

  .md-title {
    font-size: 20px;
    color: rgb(156, 164, 171);
  }

  .md-field {
    margin: 8px;
  }

  .alw-first-child {
    border-top: 1px lightgray solid;
  }

  .alw-buttons {
    justify-content: flex-end;
    -webkit-justify-content: center;
    -ms-flex-pack: end;
  }
  .md-card-style {
    border: 2px rgb(233, 236, 239) solid;
    box-shadow: none;
    border-radius: 2px;
    overflow-x: unset;
  }
</style>
