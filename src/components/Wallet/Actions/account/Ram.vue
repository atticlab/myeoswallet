<template>
  <div id="main">
    <div class="row">
      <div class="col-8">
        <div class="card">
          <div class="card-header"><h4 class="title">Buy RAM</h4></div>
          <div class="card-body">
            <form>
              <div class="row">
                <div class="col-6">
                  <fg-input label="Payer" :value="getAccountName" maxlength="12" required readonly></fg-input>
                </div>
                <div class="col-6">
                  <fg-input title="Invalid name" label="Receiver" type="text" v-model="receiver" maxlength="12" required @change="validateAccount"></fg-input>
                </div>
              </div>

              <div class="row">
                <div class="col-6">
                  <p class="category">In bytes / In EOS</p>
                    <p-switch v-model="inEos" @change="validateRamToBuy">
                      <i class="fa fa-check" slot="on"></i>
                      <i class="fa fa-times" slot="off"></i>
                    </p-switch>
                </div>
                <div class="col-6">
                  <fg-input title="Invalid value" :label="'Ram in ' + inEos ? 'EOS' : 'bytes'" type="number" v-model="ramToBuy" required @change="validateRamToBuy"></fg-input>
                </div>
              </div>

              <div class="row">
                <div class="col text-center">
                  <p-button @click="onBuyRam" :disabled="buyRamValidation" type="primary">Buy RAM</p-button>
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
            <div>RAM can’t be transferred between accounts. Users can only buy, sell or delegate RAM. Please follow all the tips on the background.
              Note: Amount indicated in bytes</div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-8">
        <div class="card">
          <div class="card-header"><h4 class="title">Sell RAM</h4></div>
          <div class="card-body">
            <form>
              <div class="row">
                <div class="col-6">
                  <fg-input label="Seller" :value="getAccountName" maxlength="12" required readonly></fg-input>
                </div>
                <div class="col-6">
                  <fg-input title="Invalid value" label="Ram to Sell (in bytes)" type="number" v-model="ramToSell" required @change="validateRamToSell"></fg-input>
                </div>
              </div>

              <div class="row">
                <div class="col text-center">
                  <p-button @click="onSellRam" :disabled="sellRamValidation" type="primary">Sell RAM</p-button>
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
            <div>Users can sell RAM following up the tips on the background. Please pay attention to the inscriptions.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bl from '@/bl';
import ActionType from '@/store/constants';
import { mapState, mapGetters, mapActions } from 'vuex';
import PSwitch from 'src/components/UIComponents/Switch.vue';


export default {
  name: 'Ram',
  data() {
    return {
      ramToSellError: false,
      ramToBuyError: false,
      receiverError: false,
      ramToBuy: '8192',
      ramToSell: '8192',
      receiver: '',
      inEos: false,
    };
  },
  components: {
    PSwitch
  },
  methods: {
    ...mapActions([
      ActionType.SET_TRANSACTION,
      ActionType.SET_BALANCE,
    ]),
    onBuyRam() {
      if (this.inEos) {
        this.eos.transaction({
          actions: [
            {
              account: 'eosio',
              name: 'buyram',
              authorization: [{
                actor: this.getAccountName,
                permission: this.getAuthority,
              }],
              data: {
                payer: this.getAccountName,
                receiver: this.receiver,
                quant: `${parseFloat(this.ramToBuy).toFixed(4)} EOS`,
              },
            },
          ],
        }).then((transactionResult) => {
          console.debug(`${this.$options.name} RESULT`, transactionResult);
          this[ActionType.SET_TRANSACTION](transactionResult);
          bl.renderJSON(transactionResult, 'place-for-transaction');
          bl.requestBalance(this.eos, this.eosAccount).then((respBalance) => {
            this[ActionType.SET_BALANCE](respBalance);
            bl.logDebug('bl.requestBalance(eos).then...', respBalance);
          });
        }).catch((e) => {
          this[ActionType.SET_TRANSACTION](e);
          bl.handleError(e, 'place-for-transaction');
        });
      } else {
        this.eos.transaction({
          actions: [
            {
              account: 'eosio',
              name: 'buyrambytes',
              authorization: [{
                actor: this.getAccountName,
                permission: this.getAuthority,
              }],
              data: {
                payer: this.getAccountName,
                receiver: this.receiver,
                bytes: parseInt(this.ramToBuy, 10),
              },
            },
          ],
        }).then((transactionResult) => {
          console.debug(`${this.$options.name} RESULT`, transactionResult);
          this[ActionType.SET_TRANSACTION](transactionResult);
          bl.renderJSON(transactionResult, 'place-for-transaction');
          bl.requestBalance(this.eos, this.eosAccount).then((respBalance) => {
            this[ActionType.SET_BALANCE](respBalance);
            bl.logDebug('bl.requestBalance(eos).then...', respBalance);
          });
        }).catch((e) => {
          this[ActionType.SET_TRANSACTION](e);
          bl.handleError(e, 'place-for-transaction');
        });
      }
    },
    onSellRam() {
      this.eos.transaction({
        actions: [
          {
            account: 'eosio',
            name: 'sellram',
            authorization: [{
              actor: this.getAccountName,
              permission: this.getAuthority,
            }],
            data: {
              payer: this.getAccountName,
              bytes: this.ramToSell,
            },
          },
        ],
      }).then((transactionResult) => {
        console.debug(`${this.$options.name} RESULT`, transactionResult);
        this[ActionType.SET_TRANSACTION](transactionResult);
        bl.renderJSON(transactionResult, 'place-for-transaction');
        bl.requestBalance(this.eos, this.eosAccount).then((respBalance) => {
          this[ActionType.SET_BALANCE](respBalance);
          bl.logDebug('bl.requestBalance(eos).then...', respBalance);
        });
      }).catch((e) => {
        this[ActionType.SET_TRANSACTION](e);
        bl.handleError(e, 'place-for-transaction');
      });
    },
    validateRamToBuy() {
      this.ramToBuyError = parseFloat(this.ramToBuy) < 0;
      if (!this.ramToBuyError && this.inEos) {
        const rg = /^\d{1,10}(\.\d{0,4})?$/;
        this.ramToBuyError = parseFloat(this.getBalance) < parseFloat(this.ramToBuy) || !rg.test(this.ramToBuy);
      } else if (!this.ramToBuyError) {
        const rg = /^\d+$/;
        this.ramToBuyError = !rg.test(this.ramToBuy);
      }
    },
    validateRamToSell() {
      this.ramToSellError = parseFloat(this.ramToSell) < 0 || parseFloat(this.ramToSell) > this.getFreeRamInBytes;
    },
    validateAccount() {
      this.eos.getAccount(this.receiver)
        .then(() => { this.receiverError = false; })
        .catch(() => { this.receiverError = true; });
    },
  },
  computed: {
    ...mapState([
      'eos',
      'eosAccount',
    ]),
    ...mapGetters([
      'getAccountName',
      'getFreeRamInBytes',
      'getBalance',
      'getAuthority',
    ]),
    sellRamValidation() {
      if (parseFloat(this.ramToSell) && !this.ramToSellError) {
        return false;
      }
      return true;
    },
    buyRamValidation() {
      if (parseFloat(this.ramToBuy) && this.receiver && !this.receiverError && !this.ramToBuyError) {
        return false;
      }
      return true;
    },
  },
  created() {
    this.ramToSell = this.getFreeRamInBytes.toString();
  },
};
</script>

<style scoped>
</style>
