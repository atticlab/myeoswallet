<template>
  <div id="main">
    <div class="row">
      <div class="col-md-8 col-12">
        <div class="card">
          <div class="card-header"><h4 class="title">Buy RAM</h4></div>
          <div class="card-body">
            <form>
              <div class="row">
                <div class="col-md-6 col-12">
                  <fg-input label="Payer" :value="getAccountName" maxlength="12" readonly></fg-input>
                </div>
                <div class="col-md-6 col-12">
                  <fg-input label="Receiver" type="text" v-model="receiver" maxlength="12" required
                            name="receiver" v-validate="modelValidation.receiver" :error="getError('receiver')"
                  ></fg-input>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 col-12">
                  <p class="category">In bytes / In EOS</p>
                    <p-switch v-model="inEos">
                      <i class="fa fa-check" slot="on"></i>
                      <i class="fa fa-times" slot="off"></i>
                    </p-switch>
                </div>
                <div class="col-md-6 col-12">
                  <fg-input :label="'Ram in ' + (inEos ? 'EOS' : 'bytes')" v-model.number="ramToBuy" required
                            name="ramToBuy" v-validate="modelValidation.ramToBuy" :error="getError('ramToBuy')" data-vv-as="ram to buy"
                  ></fg-input>
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
      <div class="col-md-4 col-12">
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
      <div class="col-md-8 col-12">
        <div class="card">
          <div class="card-header"><h4 class="title">Sell RAM</h4></div>
          <div class="card-body">
            <form>
              <div class="row">
                <div class="col-md-6 col-12">
                  <fg-input label="Seller" :value="getAccountName" maxlength="12" required readonly></fg-input>
                </div>
                <div class="col-md-6 col-12">
                  <fg-input label="Ram to Sell (in bytes)" type="number" v-model.number="ramToSell" required
                            name="ramToSell" v-validate="sellmodelValidation.ramToSell" :error="getError('ramToSell')" data-vv-as="ram to sell"
                  ></fg-input>
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
      <div class="col-md-4 col-12">
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
      ramToBuy: 8192,
      ramToSell: 8192,
      receiver: '',
      inEos: false,
      modelValidation: {
        receiver: {
          required: true,
          accountExist: true,
        },
        ramToBuy: {
          required: true,
          decimal: true,
          min_value: 0,
          validateEosAmount: true,
        },
      },
      sellmodelValidation: {
        ramToSell: {
          required: true,
          decimal: true,
          min_value: 1,
        },
      },
    };
  },
  components: {
    PSwitch,
  },
  methods: {
    ...mapActions([
      ActionType.SET_TRANSACTION,
      ActionType.SET_BALANCE,
    ]),
    getError(fieldName) {
      return this.errors.first(fieldName);
    },
    onBuyRam() {
      if (!this.eos) {
        bl.logInPopUP();
        return;
      }
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
                quant: `${this.ramToBuy.toFixed(4)} EOS`,
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
                bytes: parseInt(this.ramToBuy.toFixed(0), 10),
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
      if (!this.eos) {
        bl.logInPopUP();
        return;
      }
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
              account: this.getAccountName,
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
      return !Object.keys(this.sellmodelValidation).every(key => this.fields[key] && this.fields[key].valid) || this.ramToSell > this.getFreeRamInBytes;
    },
    buyRamValidation() {
      return !Object.keys(this.modelValidation).every(key => this.fields[key] && this.fields[key].valid );
    },
  },
  watch: {
    getFreeRamInBytes() {
      this.ramToSell = this.getFreeRamInBytes;
    },
  },
};
</script>

<style scoped>
</style>
