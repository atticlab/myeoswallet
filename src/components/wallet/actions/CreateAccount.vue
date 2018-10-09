<template>
  <div id="main">
    <div class="md-layout twocolumn">
    <md-card class="md-card-style md-layout-item">
      <md-toolbar class="md-transparent" :md-elevation="0">
        <div class="md-title">Create account without existing account (for free)</div>
      </md-toolbar>

      <md-card-content class="alw-first-child">
        <md-field :class="withoutAccountaccountNameError ? 'md-invalid' : ''">
          <label>Account name</label>
          <span class="md-prefix">@ </span>
          <span class="md-error">Invalid name</span>
          <md-input type="text" v-model="withoutAccountaccountName" maxlength="12" required @change="withoutAccountvalidateAccount"></md-input>
        </md-field>
      </md-card-content>

      <md-card-content>
        <md-field :class="withoutAccountownerKeyError ? 'md-invalid' : ''">
          <label>Owner public key</label>
          <span class="md-error">Invalid key</span>
          <md-input type="text" v-model="withoutAccountownerKey" maxlength="53" required @change="withoutAccountvalidateOwnerKey"></md-input>
        </md-field>
        <!--<md-button @click="generateRandomOwnerKeys" style="color: #ffffff; box-shadow: none; width: 300px; background-color: #2a2b31; border: 1px solid white;"-->
                   <!--class="md-raised md-primary">Random Owner Key-->
        <!--</md-button>-->
      </md-card-content>

      <md-card-content>
        <md-field>
          <label>Owner private key</label>
          <md-input type="password" :value="withoutAccountownerKeyPriv" maxlength="51" @change="withoutAccountvalidateOwnerKey"></md-input>
        </md-field>
      </md-card-content>

      <md-card-content>
        <md-field :class="withoutAccountactiveKeyError ? 'md-invalid' : ''">
          <label>Active public key</label>
          <span class="md-error">Invalid key</span>
          <md-input type="text" v-model="withoutAccountactiveKey" maxlength="53" required @change="withoutAccountvalidateActiveKey"></md-input>
        </md-field>
        <!--<md-button @click="generateRandomActiveKeys" style="color: #ffffff; box-shadow: none; width: 300px; background-color: #2a2b31; border: 1px solid white;"-->
                   <!--class="md-raised md-primary">Random Active Key-->
        <!--</md-button>-->
      </md-card-content>

      <md-card-content>
        <md-field>
          <label>Active private key</label>
          <md-input type="password" :value="withoutAccountactiveKeyPriv" maxlength="51" @change="withoutAccountvalidateOwnerKey"></md-input>
        </md-field>
        <!--<md-button @click="copyActiveKeys" style="color: #ffffff; box-shadow: none; width: 300px; background-color: #2a2b31; border: 1px solid white;"-->
                   <!--class="md-raised md-primary">Copy Active Keys-->
        <!--</md-button>-->
      </md-card-content>

      <md-card-content class="alw-buttons">
        <md-button class="col3" @click="random">
          <font-awesome-icon icon="random" />
          <md-tooltip md-direction="top">Randomize Name and Keypairs</md-tooltip>
          Randomize
        </md-button>
        <md-button class="col3" @click="copy">
          <font-awesome-icon icon="copy" />
          <md-tooltip md-direction="top">Copy Name and Keypairs to clipboard</md-tooltip>
          Copy
        </md-button>
        <md-button class="col3 md-raised md-primary" :disabled="withoutAccountcreateAccountValidation" @click="withoutAccountonCreateAccount" style="border: none;">
          <font-awesome-icon icon="plus-square" />
          <md-tooltip md-direction="top">Create Account</md-tooltip>
          Create Account
        </md-button>
        <!--<md-button @click="random" style="color: #ffffff; box-shadow: none; width: 300px; background-color: #2a2b31; border: 1px solid white;"-->
                   <!--class="md-raised md-primary">Random Values-->
        <!--</md-button>-->
        <!--<md-button @click="copy" style="color: #ffffff; box-shadow: none; width: 300px; background-color: #2a2b31; border: 1px solid white;"-->
                   <!--class="md-raised md-primary">Copy Keys-->
        <!--</md-button>-->
        <!--<md-button @click="withoutAccountonCreateAccount" style="color: #ffffff; box-shadow: none; width: 300px; "-->
                   <!--class="md-raised md-primary" :disabled="withoutAccountcreateAccountValidation">Create Account-->
        <!--</md-button>-->
      </md-card-content>
      <TextActionAgree/>
    </md-card>
    <md-card class="md-card-style md-layout-item help">
      <md-toolbar class="md-transparent" :md-elevation="0">
        <div class="md-title">Help</div>
      </md-toolbar>

      <md-card-content class="alw-first-child">
        <div>Create an account on EOS for free. Attic lab provides a new option for those who really need it. First of all, before creating, you need to generate your keys. And there are two ways available: through Scatter or via My EOS Wallet. Note: Attic undertakes not to use the Service for any illegal business or behind the reasons mentioned(no remembering or storing that kind of private info).
          Please choose an account name with up to 12 a-z, 1-5 symbols or generate it clicking the button on the right. Once you generate your keys through Scatter, generate active and owner public key and fill that relevantly. The private key must be kept in the safest place possible and never to be shared.
          If generate, do & use My EOS Wallet- generate your keys, copy the key pairs and save it in the place you only know. Hit the button ‘Create an account’ and enjoy all the options of EOS-world.
          Log in to your new account you could through Scatter that comes with a wide range of options at hand.
          In case you still have any questions feel free to contact us - <a href="mailto:inbox@atticlab.net"> inbox@atticlab.net</a></div>
      </md-card-content>
    </md-card>
  </div>
    <div class="md-layout twocolumn">
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
  </div>
</template>

<script>
import bl from '@/bl';
import ActionType from '@/store/constants';
import { mapState, mapGetters, mapActions } from 'vuex';
import ecc from 'eosjs-ecc';

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
          console.debug(`${this.$options.name} RESULT`, res);
          this[ActionType.SET_TRANSACTION](res);
          bl.renderJSON(res, 'place-for-transaction');
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
  @import '../../../assets/css/walletaction.css';

  .col3 {
    width: 33%;
    color: #ffffff;
    box-shadow: none;
    background-color: #2a2b31;
    border: 1px solid white;
  }
</style>
