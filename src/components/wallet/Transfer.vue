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
      <md-button @click="onTransfer" style="color: #ffffff; box-shadow: none; width: 260px; "
                 class="md-raised md-primary" :disabled="transferValidation">TRANSFER
      </md-button>
    </md-card-content>
  </md-card>
</template>

<script>
import bl from '@/bl';
import { mapState, mapGetters, mapActions } from 'vuex';
import ActionType from '../../store/constants';

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
    transferValidation() {
      if (this.amount && this.toAccount && !this.accountError && !this.memoError &&
        !this.amountError) {
        return false;
      }
      return true;
    },
  },
  methods: {
    ...mapActions([
      ActionType.SET_TRANSACTION,
      ActionType.SET_BALANCE,
    ]),
    onChangeAmount() {
      const rg = /^\d{1,10}(\.\d{0,4})?$/;
      if (!this.amount || !parseFloat(this.amount) || parseFloat(this.amount) < 0 ||
        parseFloat(this.amount) > parseFloat(this.getBalance) || !rg.test(this.amount)) {
        this.amountError = true;
      } else {
        this.amountError = false;
      }
    },
    onChangeMemo() {
      if (bl.lengthInUtf8Bytes(this.memo) <= 255) {
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
    onTransfer() {
      this.eos.transfer(
        this.getAccountName,
        this.toAccount,
        `${parseFloat(this.amount).toFixed(4)} EOS`,
        this.memo || 'memo',
      ).then((transactionResult) => {
        console.debug('TRANSACTION RESULT', transactionResult);
        this[ActionType.SET_TRANSACTION](transactionResult);
        bl.renderJSON(transactionResult, 'place-for-transaction');
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
        bl.renderJSON(error, 'place-for-transaction');
      });
    },
  },
};
</script>

<style scoped>
  @import '../../assets/css/walletaction.css';
</style>
