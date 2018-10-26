<template>
  <div id="main">
    <div class="row">
      <div class="col-8">
        <div class="card">
          <div class="card-header"><h4 class="title">Create account without existing account (for free)</h4></div>
          <div class="card-body">
            <form>
              <div class="row">
                <div class="col-12">
                  <fg-input type="text" label="Account name" :value="withoutAccountaccountName" maxlength="12" required @change="withoutAccountvalidateAccount"></fg-input>
                </div>
              </div>

              <div class="row">
                <div class="col-12">
                  <fg-input type="text" label="Owner public key" :value="withoutAccountaccountName" maxlength="53" required @change="withoutAccountvalidateOwnerKey"></fg-input>
                </div>
              </div>

              <div class="row">
                <div class="col-12">
                  <fg-input type="password" label="Owner private key" :value="withoutAccountownerKeyPriv" maxlength="51" required @change="withoutAccountvalidateOwnerKey"></fg-input>
                </div>
              </div>

              <div class="row">
                <div class="col-12">
                  <fg-input type="text" label="Active public key" :value="withoutAccountactiveKey" maxlength="53" required @change="withoutAccountvalidateActiveKey"></fg-input>
                </div>
              </div>

              <div class="row">
                <div class="col-12">
                  <fg-input type="password" label="Active private key" :value="withoutAccountactiveKeyPriv" maxlength="51" required @change="withoutAccountvalidateOwnerKey"></fg-input>
                </div>
              </div>

              <div class="row text-center">
                <div class="col-4">
                  <el-tooltip content="Randomize Name and Keypairs" placement="top">
                    <p-button @click="random" type="primary">
                      <font-awesome-icon icon="random" />
                    </p-button>
                  </el-tooltip>
                </div>

                <div class="col-4">
                  <el-tooltip content="Copy Name and Keypairs to clipboard" placement="top">
                    <p-button @click="copy" type="primary">
                      <font-awesome-icon icon="copy" />
                    </p-button>
                  </el-tooltip>
                </div>
                <div class="col-4">
                  <el-tooltip content="Create Account" placement="top">
                    <p-button @click="withoutAccountonCreateAccount" :disabled="withoutAccountcreateAccountValidation" type="primary">
                      <font-awesome-icon icon="plus-square" />
                    </p-button>
                  </el-tooltip>
                </div>
              </div>

              <div class="row">
                <TextActionAgree/>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="card">
          <div class="card-header"><h4 class="title">Help</h4></div>
          <div class="card-body pb-4">
            <div>Create an account on EOS for free. Attic lab provides a new option for those who really need it. First of all, before creating, you need to generate your keys. And there are two ways available: through Scatter or via My EOS Wallet. Note: Attic undertakes not to use the Service for any illegal business or behind the reasons mentioned(no remembering or storing that kind of private info).
              Please choose an account name with up to 12 a-z, 1-5 symbols or generate it clicking the button on the right. Once you generate your keys through Scatter, generate active and owner public key and fill that relevantly. The private key must be kept in the safest place possible and never to be shared.
              If generate, do & use My EOS Wallet- generate your keys, copy the key pairs and save it in the place you only know. Hit the button ‘Create an account’ and enjoy all the options of EOS-world.
              Log in to your new account you could through Scatter that comes with a wide range of options at hand.
              In case you still have any questions feel free to contact us - <a href="mailto:inbox@atticlab.net"> inbox@atticlab.net</a></div>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-if="eosAccount">
      <div class="col-8">
        <div class="card">
          <div class="card-header"><h4 class="title">Create account</h4></div>

          <div class="card-body">
            <form>
              <div class="row">
                <div class="col-md-6">
                  <fg-input label="Creator" :value="getAccountName" maxlength="12" required readonly></fg-input>
                </div>
                <div class="col-md-6">
                  <fg-input title="Invalid name" label="Account name" v-model="accountName" maxlength="12" required @change="validateAccount"></fg-input>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <fg-input label="Owner public key" type="text" v-model="ownerKey" maxlength="53" required @change="validateOwnerKey"></fg-input>
                </div>
                <div class="col-md-6">
                  <fg-input title="Invalid name" label="Active public key" type="text" v-model="activeKey" maxlength="53" required @change="validateActiveKey"></fg-input>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <fg-input label="Cpu stake (in EOS)" type="number" v-model="cpuStake" required @change="validateCpuStake"></fg-input>
                </div>
                <div class="col-md-6">
                  <fg-input title="Invalid name" label="Net stake (in EOS)" type="number" v-model="netStake" required @change="validateNetStake"></fg-input>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <fg-input label="Ram (in bytes)" type="number" v-model="ram" required @change="validateRam"></fg-input>
                </div>
                <div class="col-md-6">
                  <p class="category">Transfer</p>
                  <el-tooltip content="Transfer off: owner retains staking control and voting rights. Transfer on: New acc gains staking control and voting rights" placement="top">
                    <p-switch v-model="transfer">
                      <i class="fa fa-check" slot="on"></i>
                      <i class="fa fa-times" slot="off"></i>
                    </p-switch>
                  </el-tooltip>
                </div>
              </div>

              <div class="row">
                <div class="col text-center">
                  <p-button @click="onCreateAccount" :disabled="createAccountValidation" type="primary">Create Account</p-button>
                </div>
              </div>

              <div class="row">
                <TextActionAgree/>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="card">
          <div class="card-header"><h4 class="title">Help</h4></div>
          <div class="card-body pb-4">
            <div>Please follow up the tips on the background. Enter account name, owner key, active key, cpu, net and ram to stake and hit the button ‘create account’.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bl from 'src/bl';
import ActionType from 'src/store/constants';
import { mapState, mapGetters, mapActions } from 'vuex';
import ecc from 'eosjs-ecc';
import PSwitch from 'src/components/UIComponents/Switch.vue';
import { Tooltip } from 'element-ui';

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
      withoutAccountaccountNameError: false,
      withoutAccountownerKeyError: false,
      withoutAccountactiveKeyError: false,
      withoutAccountaccountName: '',
      withoutAccountownerKey: '',
      withoutAccountactiveKey: '',
      withoutAccountownerKeyPriv: '',
      withoutAccountactiveKeyPriv: '',
    };
  },
  components: {
    PSwitch,
    [Tooltip.name]: Tooltip
  },
  computed: {
    ...mapState([
      'eos',
      'eosApi',
      'eosAccount',
    ]),
    ...mapGetters([
      'getAccountName',
      'getAuthority',
    ]),
    createAccountValidation() {
      if (this.accountName && this.ownerKey && this.activeKey && parseFloat(this.cpuStake) && parseFloat(this.netStake) && parseInt(this.ram, 10) &&
        !this.accountNameError && !this.ownerKeyError && !this.activeKeyError && !this.cpuStakeError && !this.netStakeError && !this.ramError) {
        return false;
      }
      return true;
    },
    withoutAccountcreateAccountValidation() {
      if (this.withoutAccountaccountName && this.withoutAccountownerKey && this.withoutAccountactiveKey &&
        !this.withoutAccountaccountNameError && !this.withoutAccountownerKeyError && !this.withoutAccountactiveKeyError) {
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
      if (this.accountName && this.accountName.length <= 12 && rg.test(this.accountName)) {
        this.eos.getAccount(this.accountName)
          .then(() => { this.accountNameError = true; })
          .catch(() => { this.accountNameError = false; });
      } else {
        this.accountNameError = true;
      }
    },
    withoutAccountvalidateAccount() {
      const rg = /^[a-z1-5]{12}$/;
      if (this.withoutAccountaccountName && this.withoutAccountaccountName.length <= 12 && rg.test(this.withoutAccountaccountName)) {
        this.eosApi.getAccount(this.withoutAccountaccountName)
          .then(() => { this.withoutAccountaccountNameError = true; })
          .catch(() => { this.withoutAccountaccountNameError = false; });
      } else {
        this.withoutAccountaccountNameError = true;
      }
    },
    validateActiveKey() {
      this.activeKeyError = !bl.validatePublicKey(this.activeKey);
    },
    validateOwnerKey() {
      this.ownerKeyError = !bl.validatePublicKey(this.ownerKey);
    },
    withoutAccountvalidateActiveKey() {
      this.withoutAccountactiveKeyError = !bl.validatePublicKey(this.withoutAccountactiveKey);
      console.log(this.withoutAccountactiveKeyError);
    },
    withoutAccountvalidateOwnerKey() {
      this.withoutAccountownerKeyError = !bl.validatePublicKey(this.withoutAccountownerKey);
      console.log(this.withoutAccountownerKeyError);
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
    async generateRandomName() {
      function choices(population, k) {
        const out = [];
        // eslint-disable-next-line
        for (let i = 0; i < k; i++) {
          out.push(population[Math.floor(population.length * Math.random())]);
        }
        return out.join('');
      }
      function validAccountName(accountName) {
        const re = new RegExp('^([a-z1-5]){12}$');
        return re.test(accountName);
      }

      const alphabet = 'abcdefghijklmnopqrstuvwxyz12345';

      let res = '';
      res = choices(alphabet, 12);
      while (!validAccountName(res)) {
        res = choices(alphabet, 12);
      }

      return (this.eosApi.getAccount(res)
        .then(() => {
          this.generateRandomName();
        })
        .catch(() => {
          this.withoutAccountaccountName = res;
          return res;
        }));
    },
    withoutAccountonCreateAccount() {
      // http://ethereum3.atticlab.net
      this.$http.post('newaccount', {
        name: this.withoutAccountaccountName,
        active: this.withoutAccountactiveKey,
        owner: this.withoutAccountownerKey,
      })
        .then((res) => {
          let r = res;
          if (!r.body) {
            r = { isError: true, message: 'Empty body' };
          } else {
            r = r.body;
          }
          console.debug(`${this.$options.name} RESULT`, r);
          this[ActionType.SET_TRANSACTION](r);
          bl.renderJSON(r, 'place-for-transaction');
        })
        .catch((e) => {
          this[ActionType.SET_TRANSACTION](e);
          bl.handleError(e, 'place-for-transaction');
        });
    },
    onCreateAccount() {
      const options = {
        authorization: `${this.getAccountName}@${this.getAuthority}`,
      };
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
      },
      options,
      ).then((res) => {
        console.debug(`${this.$options.name} RESULT`, res);
        this[ActionType.SET_TRANSACTION](res);
        bl.renderJSON(res, 'place-for-transaction');
        bl.requestBalance(this.eos, this.eosAccount).then((respBalance) => {
          this[ActionType.SET_BALANCE](respBalance);
          bl.logDebug('bl.requestBalance(eos).then...', respBalance);
        });
      })
        .catch((e) => {
          this[ActionType.SET_TRANSACTION](e);
          bl.handleError(e, 'place-for-transaction');
        });
    },
    async generateRandomOwnerKeys() {
      this.withoutAccountownerKeyPriv = await ecc.randomKey();
      this.withoutAccountownerKey = ecc.privateToPublic(this.withoutAccountownerKeyPriv);
    },
    async generateRandomActiveKeys() {
      this.withoutAccountactiveKeyPriv = await ecc.randomKey();
      this.withoutAccountactiveKey = ecc.privateToPublic(this.withoutAccountactiveKeyPriv);
    },
    random() {
      this.generateRandomName();
      this.generateRandomOwnerKeys();
      this.generateRandomActiveKeys();
      this.withoutAccountaccountNameError = false;
      this.withoutAccountownerKeyError = false;
      this.withoutAccountactiveKeyError = false;
    },
    copyActiveKeys() {
      this.$copyText(`Active public: ${this.withoutAccountactiveKey} Active private: ${this.withoutAccountactiveKeyPriv}`);
    },
    copyOwnerKeys() {
      this.$copyText(`Owner public: ${this.withoutAccountownerKey} Owner private: ${this.withoutAccountownerKeyPriv}`);
    },
    copy() {
      this.$copyText(`Name: ${this.withoutAccountaccountName}\nOwner public: ${this.withoutAccountownerKey}\nOwner private: ${this.withoutAccountownerKeyPriv}\nActive public: ${this.withoutAccountactiveKey}\nActive private: ${this.withoutAccountactiveKeyPriv}`);
    },
  },
};
</script>

<style scoped>

  .col3 {
    width: 33%;
    color: #ffffff;
    box-shadow: none;
    background-color: #2a2b31;
    border: 1px solid white;
  }
</style>
