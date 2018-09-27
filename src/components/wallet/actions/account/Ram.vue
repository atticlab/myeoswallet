<template>
  <div id="main">
    <div class="md-layout twocolumn">
      <md-card class="md-card-style md-layout-item">
        <md-toolbar class="md-transparent" :md-elevation="0">
          <div class="md-title">Buy RAM</div>
        </md-toolbar>

        <md-card-content class="alw-first-child">
          <md-field>
            <label>Payer</label>
            <span class="md-prefix">@ </span>
            <md-input :value="getAccountName" maxlength="12" required readonly></md-input>
          </md-field>
          <md-field :class="receiverError ? 'md-invalid' : ''">
            <label>Receiver</label>
            <span class="md-prefix">@ </span>
            <span class="md-error">Invalid name</span>
            <md-input type="text" v-model="receiver" maxlength="12" required @change="validateAccount"></md-input>
          </md-field>
        </md-card-content>

        <md-card-content>
          <md-switch @change="validateRamToBuy" v-model="inEos" class="md-primary">In bytes / In EOS</md-switch>
          <md-field :class="ramToBuyError ? 'md-invalid' : ''">
            <label>Ram in <span v-if="inEos">EOS</span> <span v-else>bytes</span></label>
            <span class="md-error">Invalid value</span>
            <md-input type="number" v-model="ramToBuy" required @change="validateRamToBuy"></md-input>
          </md-field>
        </md-card-content>

        <md-card-content class="alw-buttons">
          <md-button @click="onBuyRam" style="color: #ffffff; box-shadow: none; width: 260px; "
                     class="md-raised md-primary" :disabled="buyRamValidation">Buy RAM
          </md-button>
        </md-card-content>
      </md-card>
      <md-card class="md-card-style md-layout-item help">
      <md-toolbar class="md-transparent" :md-elevation="0">
        <div class="md-title">Help</div>
      </md-toolbar>

      <md-card-content class="alw-first-child">
        <div>RAM can’t be transferred between accounts. Users can only buy, sell or delegate RAM. Please follow all the tips on the background.
          Note: Amount indicated in bytes</div>
      </md-card-content>
    </md-card>
    </div>

    <div class="md-layout twocolumn">
      <md-card class="md-card-style md-layout-item">
        <md-toolbar class="md-transparent" :md-elevation="0">
          <div class="md-title">Sell RAM</div>
        </md-toolbar>

        <md-card-content class="alw-first-child">
          <md-field>
            <label>Seller</label>
            <span class="md-prefix">@ </span>
            <md-input :value="getAccountName" maxlength="12" required readonly></md-input>
          </md-field>
          <md-field :class="ramToSellError ? 'md-invalid' : ''">
            <label>Ram to Sell (in bytes)</label>
            <span class="md-error">Invalid value</span>
            <md-input type="number" v-model="ramToSell" required @change="validateRamToSell"></md-input>
          </md-field>
        </md-card-content>

        <md-card-content class="alw-buttons">
          <md-button @click="onSellRam" style="color: #ffffff; box-shadow: none; width: 260px; "
                     class="md-raised md-primary" :disabled="sellRamValidation">Sell RAM
          </md-button>
        </md-card-content>
      </md-card>
      <md-card class="md-card-style md-layout-item help">
        <md-toolbar class="md-transparent" :md-elevation="0">
          <div class="md-title">Help</div>
        </md-toolbar>

        <md-card-content class="alw-first-child">
          <div>Users can sell RAM following up the tips on the background. Please pay attention to the inscriptions.</div>
        </md-card-content>
  </md-card>
    </div>
  </div>
</template>

<script>
import bl from '@/bl';
import ActionType from '@/store/constants';
import { mapState, mapGetters, mapActions } from 'vuex';

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
  methods: {
    ...mapActions([
      ActionType.SET_TRANSACTION,
      ActionType.SET_BALANCE,
    ]),
    onBuyRam() {
      if (this.inEos) {
        this.eos.buyram(
          this.getAccountName,
          this.receiver,
          `${parseFloat(this.ramToBuy).toFixed(4)} EOS`,
        ).then((transactionResult) => {
          console.debug(`${this.$options.name} RESULT`, transactionResult);
          this[ActionType.SET_TRANSACTION](transactionResult);
          bl.renderJSON(transactionResult, 'place-for-transaction');
          bl.requestBalance(this.eos, this.eosAccount).then((respBalance) => {
            this[ActionType.SET_BALANCE](respBalance);
            bl.logDebug('bl.requestBalance(eos).then...', respBalance);
          });
        }).catch((e) => {
          bl.handleError(e, 'place-for-transaction');
        });
      } else {
        this.eos.buyrambytes(
          this.getAccountName,
          this.receiver,
          parseInt(this.ramToBuy, 10),
        ).then((transactionResult) => {
          console.debug(`${this.$options.name} RESULT`, transactionResult);
          this[ActionType.SET_TRANSACTION](transactionResult);
          bl.renderJSON(transactionResult, 'place-for-transaction');
          bl.requestBalance(this.eos, this.eosAccount).then((respBalance) => {
            this[ActionType.SET_BALANCE](respBalance);
            bl.logDebug('bl.requestBalance(eos).then...', respBalance);
          });
        }).catch((e) => {
          bl.handleError(e, 'place-for-transaction');
        });
      }
    },
    onSellRam() {
      this.eos.sellram(
        this.getAccountName,
        this.ramToSell,
      ).then((transactionResult) => {
        console.debug(`${this.$options.name} RESULT`, transactionResult);
        this[ActionType.SET_TRANSACTION](transactionResult);
        bl.renderJSON(transactionResult, 'place-for-transaction');
        bl.requestBalance(this.eos, this.eosAccount).then((respBalance) => {
          this[ActionType.SET_BALANCE](respBalance);
          bl.logDebug('bl.requestBalance(eos).then...', respBalance);
        });
      }).catch((e) => {
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
  @import '../../../../assets/css/walletaction.css';
</style>
