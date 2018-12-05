<template>
  <div id="main">
    <div class="row">
      <div class="col-md-8 col-12">
        <div class="card">
        <div class="card-header"><h4 class="title">Transfer</h4></div>
        <div class="card-body">
          <form>
            <div class="row">
              <div class="col-md-6 col-12">
                <fg-input label="Account name" :value="getAccountName" readonly></fg-input>
              </div>
              <div class="col-md-6 col-12">
                <fg-input label="Destination account" v-model="transferModel.toAccount" maxlength="12" required
                          name="toAccount" v-validate="transferModelValidation.toAccount" :error="getError('toAccount')" data-vv-as="destination account"
                ></fg-input>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 col-12">
                <fg-input
                  v-model.number="transferModel.amount" label="Amount"
                  type="text" min="0"
                  name="amount" v-validate="transferModelValidation.amount" :error="getError('amount')" data-vv-as="amount"
                >
                </fg-input>
              </div>
              <div class="col-md-6 col-12 d-flex align-items-center pt-2">
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
                <fg-input v-model="transferModel.memo" type="text" label="Memo"
                          name="memo" v-validate="transferModelValidation.memo" :error="getError('memo')" data-vv-as="memo"></fg-input>
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
      <div class="col-md-4 col-12">
        <div class="card">
          <div class="card-header"><h4 class="title">Help</h4></div>
          <div class="card-body pb-4">
            <div>You can send EOS or EOS tokens to as many users as you like. Please be careful when checking the recipient’s address and remember the memo when sending tokens to exchange.</div>
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
  data() {
    return {
      transferModel: {
        toAccount: '',
        amount: 0.0001,
        memo: '',
      },
      transferModelValidation: {
        toAccount: {
          required: true,
          accountExist: true,
        },
        amount: {
          required: true,
          decimal: true,
          min_value: 0,
          validateEosAmount: true,
        },
        memo: {
          required: false,
          validateMemo: true,
        },
      },
      currentToken: 'EOS',
    };
  },
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
      return !Object.keys(this.fields).every(key => this.fields[key].valid);
    },
  },
  methods: {
    ...mapActions([
      ActionType.SET_TRANSACTION,
      ActionType.SET_BALANCE,
      ActionType.SET_TOKENBALANCE,
    ]),
    getError(fieldName) {
      return this.errors.first(fieldName);
    },
    onTransfer() {
      if (!this.eos) {
        bl.logInPopUP();
        return;
      }
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
                to: this.transferModel.toAccount,
                quantity: `${this.transferModel.amount.toFixed(4)} ${tokenObj.symbol}`,
                memo: this.transferModel.memo,
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
