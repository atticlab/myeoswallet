<template>
  <div id="main">
    <div class="row">
      <div class="col-8">
        <div class="card">
          <div class="card-header"><h4 class="title">Delegate stake</h4></div>
          <div class="card-body">
            <form>
              <div class="row">
                <div class="col-6">
                  <fg-input label="Stake owner" :value="getAccountName" maxlength="12" required readonly></fg-input>
                </div>
                <div class="col-6">
                  <fg-input title="Invalid value" label="Recipient" type="text" v-model="recipient" maxlength="12" required @change="validateAccount"></fg-input>
                </div>
              </div>

              <div class="row">
                <div class="col-6">
                  <fg-input label="Cpu stake (in EOS)" type="number" v-model="cpuStake" required @change="validateCpuStake"></fg-input>
                </div>
                <div class="col-6">
                  <fg-input title="Invalid value" label="Net stake (in EOS)" type="number" v-model="netStake" required @change="validateNetStake"></fg-input>
                </div>
              </div>

              <div class="row">
                <div class="col text-center">
                  <p-button @click="onDelegate" :disabled="delegateValidation" type="primary">Delegate</p-button>
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
            <div>There are 3 Resources CPU, NET and RAM, running on the EOS network. Staking, you delegate some access for CPU and NET.</div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-8">
        <div class="card">
          <div class="card-header"><h4 class="title">Undelegate stake</h4></div>
          <div class="card-body">
            <form>
              <div class="row">
                <div class="col-6">
                  <fg-input label="Stake owner" :value="getAccountName" maxlength="12" required readonly></fg-input>
                </div>
                <div class="col-6">
                  <fg-input title="Invalid name" label="Stake Holder" type="text" v-model="stakeHolder" maxlength="12" required @change="validateStakeHolder"></fg-input>
                </div>
              </div>

              <div class="row">
                <div class="col-6">
                  <fg-input label="Cpu stake (in EOS)" type="number" v-model="cpuUnStake" required @change="validateCpuUnStake"></fg-input>
                </div>
                <div class="col-6">
                  <fg-input title="Invalid name" label="Net stake (in EOS)" type="number" v-model="netUnStake" required @change="validateNetUnStake"></fg-input>
                </div>
              </div>

              <div class="row">
                <div class="col text-center">
                  <p-button @click="onUndelegate" :disabled="undelegateValidation" type="primary">Undelegate</p-button>
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
            <div>To stake your tokens you need to follow up the instructions tipped on the background. Unstake the tokens you could by using ‘unstake’ button with 3 days period time set since the moment of hitting the button ‘unstake’.</div>
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
      this.eos.transaction({
        actions: [
          {
            account: 'eosio',
            name: 'delegatebw',
            authorization: [{
              actor: this.getAccountName,
              permission: this.getAuthority,
            }],
            data: {
              from: this.getAccountName,
              receiver: this.recipient,
              stake_net_quantity: `${parseFloat(this.netStake).toFixed(4)} EOS`,
              stake_cpu_quantity: `${parseFloat(this.cpuStake).toFixed(4)} EOS`,
              transfer: this.transfer ? 1 : 0,
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
    onUndelegate() {
      this.eos.transaction({
        actions: [
          {
            account: 'eosio',
            name: 'undelegatebw',
            authorization: [{
              actor: this.getAccountName,
              permission: this.getAuthority,
            }],
            data: {
              from: this.getAccountName,
              receiver: this.stakeHolder,
              unstake_net_quantity: `${parseFloat(this.netUnStake).toFixed(4)} EOS`,
              unstake_cpu_quantity: `${parseFloat(this.cpuUnStake).toFixed(4)} EOS`,
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
      'getAuthority',
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
</style>
