<template>
  <div id="main">
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
        <span class="md-prefix">{{ currentToken }} </span>
        <span class="md-error">Invalid amount</span>
        <md-input
          v-model="amount"
          type="number" min="0" required @change="validateAmount">
        </md-input>
      </md-field>
      <md-field>
        <label>Token</label>
        <md-select v-model="currentToken">
          <md-option v-for="(token, index) in tokenList" :key="index" :value="token.symbol">{{ token.symbol }}</md-option>
        </md-select>
      </md-field>
    </md-card-content>

    <md-card-content>
      <md-field :class="memoError ? 'md-invalid' : ''">
        <label>Memo</label>
        <span class="md-error">Memo is too long</span>
        <md-input v-model="memo" @change="validateMemo"></md-input>
      </md-field>
    </md-card-content>

    <md-card-content class="alw-buttons">
      <md-button @click="onTransfer" style="color: #ffffff; box-shadow: none; width: 260px; "
                 class="md-raised md-primary" :disabled="transferValidation">TRANSFER
      </md-button>
    </md-card-content>
  </md-card>
  </div>
</template>

<script>
import bl from '@/bl';
import { mapState, mapGetters, mapActions } from 'vuex';
import ActionType from '@/store/constants';

export default {
  name: 'Transfer',
  data: () => ({
    toAccount: '',
    amount: '',
    memo: '',
    accountError: false,
    memoError: false,
    amountError: false,
    currentToken: 'EOS',
  }),
  computed: {
    ...mapState([
      'scatter',
      'identity',
      'eos',
      'eosAccount',
      'tokenList',
      'balance',
    ]),
    ...mapGetters([
      'getAccountName',
      'getBalance',
      'getAuthority',
      'getTokensWithEos',
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
      ActionType.SET_TOKENBALANCE,
    ]),
    validateAmount() {
      const rg = /^\d{1,10}(\.\d{0,4})?$/;
      if (!this.amount || !parseFloat(this.amount) || parseFloat(this.amount) < 0 ||
        (parseFloat(this.amount) > parseFloat(this.getBalance) && this.currentToken === 'EOS') || !rg.test(this.amount)) {
        this.amountError = true;
      } else {
        this.amountError = false;
      }
    },
    validateMemo() {
      if (bl.lengthInUtf8Bytes(this.memo) <= 255) {
        this.memoError = false;
      } else {
        this.memoError = true;
      }
    },
    validateAccount() {
      this.eos.getAccount(this.toAccount)
        .then(() => {
          this.accountError = false;
        })
        .catch(() => {
          this.accountError = true;
        });
    },
    onTransfer() {
      const tokenObj = this.tokenList.find(token => token.symbol === this.currentToken);
      if (!tokenObj) return;
      this.eos.transaction(
        {
          actions: [
            {
              account: tokenObj.account,
              name: 'transfer',
              authorization: [{
                actor: this.getAccountName,
                permission: this.getAuthority,
              }],
              data: {
                from: this.getAccountName,
                to: this.toAccount,
                quantity: `${parseFloat(this.amount).toFixed(4)} ${tokenObj.symbol}`,
                memo: this.memo,
              },
            },
          ],
        },
      )
        .then((res) => {
          console.debug(`${this.$options.name} RESULT`, res);
          this[ActionType.SET_TRANSACTION](res);
          bl.renderJSON(res, 'place-for-transaction');
          bl.requestBalance(this.eos, this.eosAccount).then((respBalance) => {
            this[ActionType.SET_BALANCE](respBalance);
            bl.logDebug('bl.requestBalance(eos).then...', respBalance);
          });
          this.getTokenBalances();
        })
        .catch((e) => {
          bl.handleError(e, 'place-for-transaction');
        });
    },
    getTokenBalances() {
      this.tokenList.forEach((token) => {
        bl.requestBalance(this.eos, this.eosAccount, token).then((respBalance) => {
          this[ActionType.SET_TOKENBALANCE]({ balance: respBalance, symbol: token.symbol });
          bl.logDebug(`bl.requestBalance(${token.symbol}).then...`, respBalance);
        });
      });
      // setInterval(this.getTokenBalances, 40000);
    },
  },
};
</script>

<style scoped>
  @import '../../../assets/css/walletaction.css';
</style>
