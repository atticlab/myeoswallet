<template>
  <md-card class="md-card-style">
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
        <md-input type="text" :value="ownerKey" maxlength="64" required @change="validateOwnerKey"></md-input>
      </md-field>
      <md-field :class="activeKeyError ? 'md-invalid' : ''">
        <label>Active key</label>
        <span class="md-error">Invalid key</span>
        <md-input type="text" v-model="activeKey" maxlength="64" required @change="validateActiveKey"></md-input>
      </md-field>
    </md-card-content>

    <md-card-content>
      <md-field :class="cpuStakeError ? 'md-invalid' : ''">
        <label>Cpu stake (in EOS)</label>
        <span class="md-error">Invalid value</span>
        <md-input type="number" :value="cpuStake" required @change="validateCpuStake"></md-input>
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
        <md-input type="number" :value="ram" required @change="validateRam"></md-input>
      </md-field>
    </md-card-content>
  </md-card>
</template>

<script>
import bl from '@/bl';
import { mapState, mapGetters } from 'vuex';

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
      cpuStake: 0.1,
      netStake: 0.1,
      ram: 8192,
    };
  },
  computed: {
    ...mapState([
      'eos',
    ]),
    ...mapGetters([
      'getAccountName',
    ]),
  },
  methods: {
    validateAccount() {
      if (this.accountNameError.length === 12) {
        this.eos.getAccount(this.accountName)
          .then(() => {
            this.accountNameError = true;
          })
          .catch(() => {
            this.accountNameError = false;
          });
      } else {
        this.accountNameError = true;
      }
    },
    validateActiveKey() {
      this.activeKeyError = !bl.validateKeyLength(this.activeKey);
    },
    validateOwnerKey() {
      this.ownerKeyError = !bl.validateKeyLength(this.ownerKey);
    },
    validateCpuStake() {
      return true;
    },
    validateNetStake() {
      return true;
    },
    validateRam() {
      return true;
    },
  },
};
</script>

<style scoped>
  @import '../../assets/css/walletaction.css';
</style>
