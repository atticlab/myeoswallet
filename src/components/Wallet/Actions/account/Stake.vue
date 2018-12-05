<template>
  <div id="main">
    <div class="row">
      <div class="col-md-8 col-12">
        <div class="card">
          <div class="card-header"><h4 class="title">Delegate stake</h4></div>
          <div class="card-body">
            <form>
              <div class="row">
                <div class="col-md-6 col-12">
                  <fg-input label="Stake owner" :value="getAccountName" maxlength="12" readonly></fg-input>
                </div>
                <div class="col-md-6 col-12">
                  <fg-input title="Invalid value" label="Recipient" type="text" v-model="recipient" maxlength="12" required
                            name="recipient" v-validate="modelValidation.recipient" :error="getError('recipient')"
                  ></fg-input>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 col-12">
                  <fg-input label="Cpu stake (in EOS)" v-model.number="cpuStake" required
                            name="cpuStake" v-validate="modelValidation.cpuStake" :error="getError('cpuStake')" data-vv-as="cpu Stake"
                  ></fg-input>
                </div>
                <div class="col-md-6 col-12">
                  <fg-input title="Invalid value" label="Net stake (in EOS)" v-model.number="netStake" required
                            name="netStake" v-validate="modelValidation.netStake" :error="getError('netStake')" data-vv-as="net Stake"
                  ></fg-input>
                </div>
              </div>

              <div class="row">
                <div class="col-12">
                  <p class="category">Transfer</p>
                  <el-tooltip content="Temp or Permanent transfer" placement="top">
                    <p-switch v-model="transfer">
                      <i class="fa fa-check" slot="on"></i>
                      <i class="fa fa-times" slot="off"></i>
                    </p-switch>
                  </el-tooltip>
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
      <div class="col-md-4 col-12">
        <div class="card">
          <div class="card-header"><h4 class="title">Help</h4></div>
          <div class="card-body pb-4">
            <div>There are three resources running on the EOS network: CPU, NET and RAM. When staking, you delegate some access to CPU and NET. To stake your tokens, you need to follow the instructions tipped on the background. You can unstake tokens by clicking ‘unstake’, the period of set after the moment of clicking the button is three days.</div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-8 col-12">
        <div class="card">
          <div class="card-header"><h4 class="title">Undelegate stake</h4></div>
          <div class="card-body">
            <form>
              <div class="row">
                <div class="col-md-6 col-12">
                  <fg-input label="Stake owner" :value="getAccountName" maxlength="12" required readonly></fg-input>
                </div>
                <div class="col-md-6 col-12">
                  <fg-input title="Invalid name" label="Stake Holder" type="text" v-model="stakeHolder" maxlength="12" required
                            name="stakeHolder" v-validate="undelegatemodelValidation.stakeHolder" :error="getError('stakeHolder')" data-vv-as="stake holder"
                  ></fg-input>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 col-12">
                  <fg-input label="Cpu stake (in EOS)" v-model.number="cpuUnStake" required
                            name="cpuUnStake" v-validate="undelegatemodelValidation.cpuUnStake" :error="getError('cpuUnStake')" data-vv-as="cpu unStake"
                  ></fg-input>
                </div>
                <div class="col-md-6 col-12">
                  <fg-input title="Invalid name" label="Net stake (in EOS)" v-model.number="netUnStake" required
                            name="netUnStake" v-validate="undelegatemodelValidation.netUnStake" :error="getError('netUnStake')" data-vv-as="net unStake"
                  ></fg-input>
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
      <div class="col-md-4 col-12">
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
import PSwitch from 'src/components/UIComponents/Switch.vue';
import { Tooltip } from 'element-ui';

export default {
  name: 'Stake',
  components: {
    PSwitch,
    [Tooltip.name]: Tooltip,
  },
  data() {
    return {
      recipient: '',
      stakeHolder: '',
      cpuStake: 0.1,
      netStake: 0.1,
      cpuUnStake: 0.1,
      netUnStake: 0.1,
      transfer: false,
      modelValidation: {
        recipient: {
          required: true,
          accountExist: true,
        },
        cpuStake: {
          required: true,
          decimal: true,
          min_value: 0,
          validateEosAmount: true,
        },
        netStake: {
          required: true,
          decimal: true,
          min_value: 0,
          validateEosAmount: true,
        },
      },
      undelegatemodelValidation: {
        stakeHolder: {
          required: true,
          accountExist: true,
        },
        cpuUnStake: {
          required: true,
          decimal: true,
          min_value: 0,
          validateEosAmount: true,
        },
        netUnStake: {
          required: true,
          decimal: true,
          min_value: 0,
          validateEosAmount: true,
        },
      },
    };
  },
  methods: {
    ...mapActions([
      ActionType.SET_TRANSACTION,
      ActionType.SET_BALANCE,
    ]),
    getError(fieldName) {
      return this.errors.first(fieldName);
    },
    onDelegate() {
      if (!this.eos) {
        bl.logInPopUP();
        return;
      }
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
              stake_net_quantity: `${this.netStake.toFixed(4)} EOS`,
              stake_cpu_quantity: `${this.cpuStake.toFixed(4)} EOS`,
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
      if (!this.eos) {
        bl.logInPopUP();
        return;
      }
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
              unstake_net_quantity: `${this.netUnStake.toFixed(4)} EOS`,
              unstake_cpu_quantity: `${this.cpuUnStake.toFixed(4)} EOS`,
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
      return !Object.keys(this.modelValidation).every(key => this.fields[key] && this.fields[key].valid);
    },
    undelegateValidation() {
      return !Object.keys(this.undelegatemodelValidation).every(key => this.fields[key] && this.fields[key].valid);
    },
  },
};
</script>

<style scoped>
</style>
