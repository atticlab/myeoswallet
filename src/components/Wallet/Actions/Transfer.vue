<template>
  <div id="main">
    <div class="row">
      <div class="col-8">
        <div class="card">
        <div class="card-header"><h4 class="title">Transfer</h4></div>
        <div class="card-body">
          <form>
            <div class="row">
              <div class="col-6">
                <fg-input label="Account name" :value="getAccountName" maxlength="12" required readonly></fg-input>
              </div>
              <div class="col-6">
                <fg-input title="Invalid name" label="Destination account" v-model="toAccount" maxlength="12" required @change="validateAccount"></fg-input>
              </div>
            </div>

            <div class="row">
              <div class="col-6">
                <fg-input
                  v-model="amount" title="Invalid amount" label="Amount"
                  type="number" min="0" required @change="validateAmount">
                </fg-input>
              </div>
              <div class="col-6 d-flex align-items-center pt-2">
                <el-select class="select-primary"
                           size="large"
                           placeholder="Token"
                           v-model="currentToken">
                  <el-option v-for="token in getTokensWithEos"
                             class="select-primary"
                             :value="token.symbol"
                             :label="token.symbol"
                             :key="token.symbol">
                  </el-option>
                </el-select>
              </div>
            </div>

            <div class="row">
              <div class="col-12">
                <fg-input v-model="memo" @change="validateMemo" type="text" title="Memo is too long" label="Memo"></fg-input>
              </div>
            </div>
            <div class="row">
              <div class="col text-center">
                <p-button @click="onTransfer" :disabled="transferValidation" type="primary">TRANSFER</p-button>
              </div>
            </div>
            <div class="row"><TextActionAgree/></div>
          </form>
        </div>
        </div>
      </div>
      <div class="col-4">
        <div class="card">
          <div class="card-header"><h4 class="title">Help</h4></div>
          <div class="card-body pb-4">
            <div>Please fill in the info tipped on the background and transfer your tokens.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bl from 'src/bl';
import { Select, Option } from 'element-ui';
import { mapState, mapGetters, mapActions } from 'vuex';
import ActionType from 'src/store/constants';

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
  components: {
    [Select.name]: Select,
    [Option.name]: Option,
  },
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
          this[ActionType.SET_TRANSACTION](e);
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
    },
  },
};
</script>

<style scoped>
</style>
