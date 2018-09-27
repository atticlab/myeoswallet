<template>
  <div id="main" class="md-layout twocolumn">
    <md-card class="md-card-style md-layout-item">
      <md-toolbar class="md-transparent" :md-elevation="0">
        <div class="md-title">Create account</div>
      </md-toolbar>

      <md-card-content class="alw-first-child">
        <md-field>
          <label>Creator</label>
          <span class="md-prefix">@ </span>
          <md-input :value="getAccountName" maxlength="12" required readonly></md-input>
        </md-field>
        <md-field :class="accountNameError ? 'md-invalid' : ''">
          <label>Account name</label>
          <span class="md-prefix">@ </span>
          <span class="md-error">Invalid name</span>
          <md-input type="text" v-model="accountName" maxlength="12" required @change="validateAccount"></md-input>
        </md-field>
      </md-card-content>

      <md-card-content>
        <md-field :class="ownerKeyError ? 'md-invalid' : ''">
          <label>Owner key</label>
          <span class="md-error">Invalid key</span>
          <md-input type="text" v-model="ownerKey" maxlength="53" required @change="validateOwnerKey"></md-input>
        </md-field>
        <md-field :class="activeKeyError ? 'md-invalid' : ''">
          <label>Active key</label>
          <span class="md-error">Invalid key</span>
          <md-input type="text" v-model="activeKey" maxlength="53" required @change="validateActiveKey"></md-input>
        </md-field>
      </md-card-content>

      <md-card-content>
        <md-field :class="cpuStakeError ? 'md-invalid' : ''">
          <label>Cpu stake (in EOS)</label>
          <span class="md-error">Invalid value</span>
          <md-input type="number" v-model="cpuStake" required @change="validateCpuStake"></md-input>
        </md-field>
        <md-field :class="netStakeError ? 'md-invalid' : ''">
          <label>Net stake (in EOS)</label>
          <span class="md-error">Invalid value</span>
          <md-input type="number" v-model="netStake" required @change="validateNetStake"></md-input>
        </md-field>
      </md-card-content>

      <md-card-content>
        <md-field :class="ramError ? 'md-invalid' : ''">
          <label>Ram (in bytes)</label>
          <span class="md-error">Invalid value</span>
          <md-input type="number" v-model="ram" required @change="validateRam"></md-input>
        </md-field>
        <md-switch v-model="transfer" class="md-primary">
          <md-tooltip md-direction="top">Transfer off: owner retains staking control and voting rights. Transfer on: New acc gains staking control and voting rights</md-tooltip>
          Transfer</md-switch>
      </md-card-content>
      <md-card-content class="alw-buttons">
        <md-button @click="onCreateAccount" style="color: #ffffff; box-shadow: none; width: 300px; "
                   class="md-raised md-primary" :disabled="createAccountValidation">Create Account
        </md-button>
      </md-card-content>
      <TextActionAgree/>
    </md-card>
    <md-card class="md-card-style md-layout-item help">
      <md-toolbar class="md-transparent" :md-elevation="0">
        <div class="md-title">Help</div>
      </md-toolbar>

      <md-card-content class="alw-first-child">
        <div>Please follow up the tips on the background. Enter account name, owner key, active key, cpu, net and ram to stake and hit the button ‘create account’.</div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import bl from '@/bl';
import ActionType from '@/store/constants';
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'CreateAccount',
  data() {
    return {
      accountNameError: false,
      ownerKeyError: false,
      activeKeyError: false,
      cpuStakeError: false,
      netStakeError: false,
      ramError: false,
      accountName: '',
      ownerKey: '',
      activeKey: '',
      cpuStake: '0.1',
      netStake: '0.1',
      ram: '8192',
      transfer: false,
    };
  },
  computed: {
    ...mapState([
      'eos',
      'eosAccount',
    ]),
    ...mapGetters([
      'getAccountName',
    ]),
    createAccountValidation() {
      if (this.accountName && this.ownerKey && this.activeKey && parseFloat(this.cpuStake) && parseFloat(this.netStake) && parseInt(this.ram, 10) &&
        !this.accountNameError && !this.ownerKeyError && !this.activeKeyError && !this.cpuStakeError && !this.netStakeError && !this.ramError) {
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
    validateAccount() {
      const rg = /^[a-z1-5]{12}$/;
      if (this.accountName.length === 12 && rg.test(this.accountName)) {
        this.eos.getAccount(this.accountName)
          .then(() => { this.accountNameError = true; })
          .catch(() => { this.accountNameError = false; });
      } else {
        this.accountNameError = true;
      }
    },
    validateActiveKey() {
      this.activeKeyError = !bl.validatePublicKey(this.activeKey) || this.activeKey === this.ownerKey;
    },
    validateOwnerKey() {
      this.ownerKeyError = !bl.validatePublicKey(this.ownerKey) || this.activeKey === this.ownerKey;
    },
    validateCpuStake() {
      this.cpuStakeError = parseFloat(this.cpuStake) < 0;
    },
    validateNetStake() {
      this.netStakeError = parseFloat(this.netStake) < 0;
    },
    validateRam() {
      this.ramError = parseFloat(this.ram) < 0;
    },
    onCreateAccount() {
      this.eos.transaction((tr) => {
        tr.newaccount({
          creator: this.getAccountName,
          name: this.accountName,
          owner: this.ownerKey,
          active: this.activeKey,
        });

        tr.buyrambytes({
          payer: this.getAccountName,
          receiver: this.accountName,
          bytes: parseInt(this.ram, 10),
        });

        tr.delegatebw({
          from: this.getAccountName,
          receiver: this.accountName,
          stake_net_quantity: `${parseFloat(this.cpuStake).toFixed(4)} EOS`,
          stake_cpu_quantity: `${parseFloat(this.netStake).toFixed(4)} EOS`,
          transfer: this.transfer ? 1 : 0,
        });
      })
        .then((res) => {
          console.debug(`${this.$options.name} RESULT`, res);
          this[ActionType.SET_TRANSACTION](res);
          bl.renderJSON(res, 'place-for-transaction');
          bl.requestBalance(this.eos, this.eosAccount).then((respBalance) => {
            this[ActionType.SET_BALANCE](respBalance);
            bl.logDebug('bl.requestBalance(eos).then...', respBalance);
          });
        })
        .catch((e) => {
          bl.handleError(e, 'place-for-transaction');
        });
    },
  },
};
</script>

<style scoped>
  @import '../../../assets/css/walletaction.css';
</style>
