<template>
  <div class="root" id="main">
    <md-card class="md-card-style">
      <md-card-content>
        <div>
          <img class="logo" src="./../assets/eos_logo.png">
        </div>
      </md-card-content>

      <md-card-header class="md-title">EOS WALLET <br><span class="md-subheading">by attic.tech</span></md-card-header>

      <md-card-actions style="padding: 0px 20px 20px">
        <md-button
          @click="doOnLoginDesktop"
          class="md-raised md-primary"
          style="color: #ffffff; text-transform: none; padding: 8px"
        >
          Login with Scatter
        </md-button>
      </md-card-actions>
      <md-card-content>
        You must have <a href="http://get-scatter.com/" target="_blank">Scatter</a> installed to safely send transactions to the EOS Network.
        If you have any question - look out our <a href="https://t.me/atticlabeosb" target="_blank">Telegram group</a>
      </md-card-content>
    </md-card>

    <md-dialog :md-active.sync="noScatterAlert">
      <md-dialog-title>No scatter detected!</md-dialog-title>

      <md-dialog-content>
        Please <a href="https://get-scatter.com/" target="_blank">install Scatter plugin or desktop application</a> and refresh this page.
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="noScatterAlert = false">Ok</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import bl from '@/bl';
import axios from 'axios';
import { mapActions, mapGetters, mapState } from 'vuex';
import Eos from 'eosjs';
import ScatterJS from 'scatter-js/dist/scatter.esm';
import ActionType from '@/store/constants';

export default {
  name: 'Login',
  data() {
    return {
      noScatterAlert: false,
    };
  },
  computed: {
    ...mapState([
      'scatter',
      'identity',
      'eos',
      'eosAccount',
      'tokenList',
    ]),
    ...mapGetters([
      'httpEndpoint',
      'eosConfig',
    ]),
  },
  methods: {
    ...mapActions([
      ActionType.SET_SCATTER,
      ActionType.SET_IDENTITY,
      ActionType.SET_IDENTITY_ACCOUNT,
      ActionType.SET_EOS_JS,
      ActionType.SET_EOS_ACCOUNT,
      ActionType.SET_BALANCE,
      ActionType.SET_TOKENLIST,
      ActionType.SET_TOKENBALANCE,
    ]),
    initIdentity(identity) {
      if (identity) {
        bl.logDebug('IDENTITY...', identity);
        this[ActionType.SET_IDENTITY](identity);
        return identity;
      }
      return false;
    },
    initIdentityAccount(identity) {
      if (identity.accounts) {
        const identityAccount = identity.accounts.find(e => e.blockchain === 'eos');
        bl.logDebug('IDENTITY.accounts...', identity.accounts);
        bl.logDebug('IDENTITY.accounts.find...', identityAccount);
        this[ActionType.SET_IDENTITY_ACCOUNT](identityAccount);
        return identityAccount;
      }
      return false;
    },
    initEos() {
      const eosOptions = { expireInSeconds: 60 };
      const eos = this.scatter.eos(this.eosConfig, Eos, eosOptions);
      this[ActionType.SET_EOS_JS](eos);
      return eos;
    },
    doOnLoginDesktop() {
      ScatterJS.scatter.connect('Attic Wallet').then((connected) => {
        if (!connected) {
          this.noScatterAlert = true;
          return false;
        }

        const scatter = ScatterJS.scatter;
        window.scatter = null;
        this[ActionType.SET_SCATTER](scatter);

        const requiredFields = { accounts: [this.eosConfig] };
        scatter.getIdentity(requiredFields).then((identity) => {
          if (this.initIdentity(identity)) {
            const identityAccount = this.initIdentityAccount(identity);

            if (identityAccount) {
              const eos = this.initEos();

              if (eos && identityAccount.name) {
                eos.getAccount(identityAccount.name).then((respEosAccount) => {
                  bl.logDebug(`getAccount('${identityAccount.name}').then((eosAccount) => ...`, respEosAccount);
                  this[ActionType.SET_EOS_ACCOUNT](respEosAccount);

                  this.getTokenList();
                  // this.$router.push('/wallet');
                  bl.requestBalance(eos, respEosAccount).then((respBalance) => {
                    this[ActionType.SET_BALANCE](respBalance);
                    bl.logDebug('bl.requestBalance(eos).then...', respBalance);

                    this.$router.push('/wallet');
                  });
                });
              }
            }
          }
        })
          .catch(error => console.error(error));
        return true;
      });
    },
    getTokenList() {
      axios.get('https://raw.githubusercontent.com/eoscafe/eos-airdrops/master/tokens.json')
        .then((res) => {
          let data = res.data;
          data.push({ account: 'eosio.token', symbol: 'EOS' });
          data = data.map(val => Object.assign(val, { balance: 0 }));
          this[ActionType.SET_TOKENLIST](data);
          this.getTokenBalances();
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getTokenBalances() {
      this.tokenList.forEach((token) => {
        bl.requestBalance(this.eos, this.eosAccount, token).then((respBalance) => {
          this[ActionType.SET_TOKENBALANCE]({ balance: respBalance, symbol: token.symbol });
          bl.logDebug(`bl.requestBalance(${token.symbol}).then...`, respBalance);
        });
      });
      // setInterval(this.getTokenBalances, 40000);
    },
  },
  created() {
    this.doOnLoginDesktop();
  },
};
</script>

<style scoped>
  .root {
    min-height: 100vh;
    min-width: 40vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .md-card {
    width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .md-card-actions {
    justify-content: center;
  }

  .md-card-style {
    border: 0;
    box-shadow: none;
    border-radius: 2px;
    background-color: transparent;
  }

  .logo {
    max-height: 200px;
  }

  #main {
    background-image: url("../assets/logo_bg.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    text-align: center;
  }
</style>
