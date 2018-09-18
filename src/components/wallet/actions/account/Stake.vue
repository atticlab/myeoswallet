<template>
  <div id="main">
    <md-card class="md-card-style">
      <md-toolbar class="md-transparent" :md-elevation="0">
          <div class="md-title">Delegate stake</div>
      </md-toolbar>

      <md-card-content class="alw-first-child">
        <md-field :class="recipientError ? 'md-invalid' : ''">
          <label>Recipient</label>
          <span class="md-prefix">@ </span>
          <span class="md-error">Invalid name</span>
          <md-input type="text" v-model="recipient" maxlength="12" required @change="validateAccount"></md-input>
        </md-field>
        <md-field>
          <label>Stake owner</label>
          <span class="md-prefix">@ </span>
          <md-input :value="getAccountName" maxlength="12" required readonly></md-input>
        </md-field>
      </md-card-content>

      <md-card-content>
        <md-field :class="cpuStakeError ? 'md-invalid' : ''">
          <label>Cpu stake (in EOS)</label>
          <span class="md-error">Invalid value</span>
          <span class="md-prefix">EOS </span>
          <md-input type="number" v-model="cpuStake" required @change="validateCpuStake"></md-input>
        </md-field>
        <md-field :class="netStakeError ? 'md-invalid' : ''">
          <label>Net stake (in EOS)</label>
          <span class="md-error">Invalid value</span>
          <span class="md-prefix">EOS </span>
          <md-input type="number" v-model="netStake" required @change="validateNetStake"></md-input>
        </md-field>
      </md-card-content>

      <md-card-content class="alw-buttons">
        <md-switch v-model="transfer" class="md-primary">Transfer</md-switch>
        <md-button @click="onDelegate" style="color: #ffffff; box-shadow: none; width: 260px; "
                   class="md-raised md-primary" :disabled="delegateValidation">Delegate
        </md-button>
      </md-card-content>
    </md-card>
    <md-card class="md-card-style">
      <md-toolbar class="md-transparent" :md-elevation="0">
          <div class="md-title">Undelegate stake</div>
      </md-toolbar>

      <md-card-content class="alw-first-child">
        <md-field :class="stakeHolderError ? 'md-invalid' : ''">
          <label>Stake Holder</label>
          <span class="md-prefix">@ </span>
          <span class="md-error">Invalid name</span>
          <md-input type="text" v-model="stakeHolder" maxlength="12" required @change="validateStakeHolder"></md-input>
        </md-field>
        <md-field>
          <label>Stake owner</label>
          <span class="md-prefix">@ </span>
          <md-input :value="getAccountName" maxlength="12" required readonly></md-input>
        </md-field>
      </md-card-content>

      <md-card-content>
        <md-field :class="cpuUnStakeError ? 'md-invalid' : ''">
          <label>Cpu stake (in EOS)</label>
          <span class="md-error">Invalid value</span>
          <span class="md-prefix">EOS </span>
          <md-input type="number" v-model="cpuUnStake" required @change="validateCpuUnStake"></md-input>
        </md-field>
        <md-field :class="netUnStakeError ? 'md-invalid' : ''">
          <label>Net stake (in EOS)</label>
          <span class="md-prefix">EOS </span>
          <span class="md-error">Invalid value</span>
          <md-input type="number" v-model="netUnStake" required @change="validateNetUnStake"></md-input>
        </md-field>
      </md-card-content>

      <md-card-content class="alw-buttons">
        <md-button @click="onUndelegate" style="color: #ffffff; box-shadow: none; width: 260px; "
                   class="md-raised md-primary" :disabled="undelegateValidation">Undelegate
        </md-button>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import bl from '@/bl';
import ActionType from '@/store/constants';
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'Stake',
  data() {
    return {
      recipientError: false,
      cpuStakeError: false,
      netStakeError: false,
      stakeHolderError: false,
      cpuUnStakeError: false,
      netUnStakeError: false,
      recipient: '',
      stakeHolder: '',
      cpuStake: '0.1',
      netStake: '0.1',
      cpuUnStake: '0.1',
      netUnStake: '0.1',
      transfer: false,
    };
  },
  methods: {
    ...mapActions([
      ActionType.SET_TRANSACTION,
      ActionType.SET_BALANCE,
    ]),
    validateAccount() {
      this.eos.getAccount(this.recipient)
        .then(() => { this.recipientError = false; })
        .catch(() => { this.recipientError = true; });
    },
    validateStakeHolder() {
      this.eos.getAccount(this.stakeHolder)
        .then(() => { this.stakeHolderError = false; })
        .catch(() => { this.stakeHolderError = true; });
    },
    validateCpuStake() {
      this.cpuStakeError = parseFloat(this.cpuStake) < 0;
    },
    validateNetStake() {
      this.netStakeError = parseFloat(this.netStake) < 0;
    },
    validateCpuUnStake() {
      this.cpuStakeError = parseFloat(this.cpuUnStake) < 0;
    },
    validateNetUnStake() {
      this.netStakeError = parseFloat(this.netUnStake) < 0;
    },
    onDelegate() {
      this.eos.delegatebw(
        this.getAccountName,
        this.recipient,
        `${parseFloat(this.netStake).toFixed(4)} EOS`,
        `${parseFloat(this.cpuStake).toFixed(4)} EOS`,
        this.transfer ? 1 : 0,
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
    onUndelegate() {
      this.eos.undelegatebw(
        this.getAccountName,
        this.stakeHolder,
        `${parseFloat(this.netUnStake).toFixed(4)} EOS`,
        `${parseFloat(this.cpuUnStake).toFixed(4)} EOS`,
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
  },
  computed: {
    ...mapState([
      'eos',
      'eosAccount',
    ]),
    ...mapGetters([
      'getAccountName',
    ]),
    delegateValidation() {
      if (this.recipient && this.cpuStake && this.netStake &&
        !this.recipientError && !this.cpuStakeError && !this.netStakeError) {
        return false;
      }
      return true;
    },
    undelegateValidation() {
      if (this.stakeHolder && (parseFloat(this.cpuUnStake) || parseFloat(this.netUnStake)) &&
        !this.stakeHolderError && !this.cpuUnStakeError && !this.netUnStakeError) {
        return false;
      }
      return true;
    },
  },
};
</script>

<style scoped>
  @import '../../../../assets/css/walletaction.css';
</style>
