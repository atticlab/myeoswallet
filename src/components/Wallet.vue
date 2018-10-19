<template>
  <div class="content">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-accent">
        <TopBar @authorizationEvent="authorizationHandler" @toggleMenu="toggleMenu" @ledgerEvent="connectLedger" />
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible" md-permanent="full">
        <md-toolbar class="md-toolbardrawer" md-elevation="0">
          <div class="center"><img class="logo" src="../assets/logo.png" alt="eos logo"></div>
        </md-toolbar>
        <Menu @changeMenu="menuChange" />
      </md-app-drawer>

      <md-app-content>
        <div class="column">
          <router-view/>
          <div class="pinbottom">
            <BottomBar/>
          </div>
        </div>
        <md-dialog :md-active.sync="noScatterAlert">
          <md-dialog-title>No scatter detected!</md-dialog-title>

          <md-dialog-content>
            Please <a href="https://get-scatter.com/" target="_blank">install Scatter plugin or desktop application</a> and refresh this page.
          </md-dialog-content>

          <md-dialog-actions>
            <md-button class="md-primary" @click="noScatterAlert = false">Ok</md-button>
          </md-dialog-actions>
        </md-dialog>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import bl from '@/bl';
import { mapActions, mapGetters, mapState } from 'vuex';
import ActionType from '@/store/constants';
import axios from 'axios';
import Eos from 'eosjs';
import ScatterJS from 'scatter-js/dist/scatter.esm';
import ExternalWallet, { EXT_WALLET_TYPES, bip44Path } from '../models/ExternalWallet';
import TopBar from './wallet/TopBar';
import Menu from './wallet/Menu';

export default {
  name: 'Wallet',
  data() {
    return {
      currentComponent: 'Transfer',
      noScatterAlert: false,
      menuVisible: false,
    };
  },
  created() {
    this.authorizationHandler();
    this.initEosApi();
    setInterval(() => {
      this.getTokenList();
    }, 50000);
    setInterval(() => {
      this.balanceUpdate();
    }, 20000);
    const ledgerWallet = new ExternalWallet(EXT_WALLET_TYPES.LEDGER);
    this[ActionType.SET_LEDGER_WALLET](ledgerWallet);
  },
  computed: {
    ...mapState([
      'scatter',
      'identity',
      'eos',
      'eosApi',
      'eosAccount',
      'tokenList',
      'ledgerWallet',
    ]),
    ...mapGetters([
      'httpEndpoint',
      'eosConfig',
      'eosConfigLedger',
    ]),
  },
  components: {
    TopBar,
    Menu,
  },
  methods: {
    ...mapActions([
      ActionType.SET_SCATTER,
      ActionType.SET_IDENTITY,
      ActionType.SET_IDENTITY_ACCOUNT,
      ActionType.SET_EOS_ACCOUNT,
      ActionType.SET_EOS_JS,
      ActionType.SET_EOS_JSAPI,
      ActionType.SET_BALANCE,
      ActionType.SET_TRANSACTION,
      ActionType.SET_TOKENLIST,
      ActionType.SET_TOKENBALANCE,
      ActionType.SET_LEDGER_WALLET,
      ActionType.SET_HARDWARE,
    ]),
    menuChange(val) {
      this.currentComponent = val;
    },
    authorizationHandler() {
      if (this.identity === null) {
        this.doOnLoginDesktop();
      } else {
        this.logout();
      }
    },
    logout() {
      if (this.scatter && this.scatter.identity) {
        this.scatter.forgetIdentity();
      }
      this[ActionType.SET_IDENTITY](null);
      this[ActionType.SET_IDENTITY_ACCOUNT](null);
      this[ActionType.SET_EOS_JS](null);
      this[ActionType.SET_EOS_ACCOUNT](null);
      this[ActionType.SET_BALANCE]([]);
      this[ActionType.SET_TRANSACTION](null);
      this[ActionType.SET_TOKENLIST](null);
      this[ActionType.SET_TOKENBALANCE](null);
    },
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
    initEosApi() {
      const eos = Eos(this.eosConfig);
      this[ActionType.SET_EOS_JSAPI](eos);
    },
    doOnLoginDesktop() {
      this.logout();
      ScatterJS.scatter.connect('Attic Wallet', { initTimeout: 3500 }).then((connected) => {
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
                  this.balanceUpdate();
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
      if (this.eosAccount) {
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
      }
    },
    getTokenBalances() {
      if (this.eos && this.eosAccount) {
        this.tokenList.forEach((token) => {
          bl.requestBalance(this.eos, this.eosAccount, token).then((respBalance) => {
            this[ActionType.SET_TOKENBALANCE]({ balance: respBalance, symbol: token.symbol });
            bl.logDebug(`bl.requestBalance(${token.symbol}).then...`, respBalance);
          });
        });
      }
    },
    balanceUpdate() {
      if (this.eos && this.eosAccount) {
        bl.requestBalance(this.eos, this.eosAccount).then((respBalance) => {
          this[ActionType.SET_BALANCE](respBalance);
          bl.logDebug('bl.requestBalance(eos).then...', respBalance);
        });
      }
    },
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    connectLedger() {
      this.logout();
      this.ledgerWallet.interface.getPublicKey(bip44Path, false)
        .then((key) => {
          this.eosApi.getKeyAccounts(key.wif)
            .then((accountFromKey) => {
              const name = accountFromKey.account_names[0];
              this.eosApi.getAccount(name)
                .then((account) => {
                  const authority = account.permissions.find((authObj) => {
                    const keys = authObj.required_auth.keys;
                    return keys.find((keyObj) => {
                      if (keyObj.key === key.wif) {
                        return true;
                      }
                      return false;
                    });
                  }).perm_name;
                  this[ActionType.SET_EOS_ACCOUNT](account);
                  this[ActionType.SET_IDENTITY_ACCOUNT]({ authority });
                  this.getTokenList();
                  this.balanceUpdate();
                });
            })
            .catch(e => console.log(e));
        })
        .catch(e => console.log(e));

      const eos = Eos(Object.assign(this.eosConfigLedger));
      this[ActionType.SET_EOS_JS](eos);

      // this.eosApi.transaction(
      //   {
      //     actions: [
      //       {
      //         account: 'eosio',
      //         name: 'voteproducer',
      //         authorization: [{
      //           actor: 'andryha2yha1',
      //           permission: 'ledger',
      //         }],
      //         data: {
      //           voter: 'andryha2yha1',
      //           proxy: '',
      //           producers: [
      //             'atticlabeosb',
      //           ],
      //         },
      //       },
      //     ],
      //   })
      //   .then((txres) => {
      //     console.log(txres);
      //   })
      //   .catch((txerr) => {
      //     console.log(txerr);
      //   });
    },
  },
};
</script>

<style lang="scss" scoped>

  .column {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background-color: rgba(255, 255, 255, 0);
    width: 100%;
  }
  .content {
    width: 100%;
    display: flex;
    /*height: auto;*/
    /*min-height: 100vh;*/
    flex-direction: column;
    /*justify-content: flex-start;*/
    /*background-color: rgba(255, 255, 255, 0);*/
  }
  .md-tabs-navigation {
    padding-right: 10%;
    padding-left: 10%;
  }

  .md-app-content {
    padding: 0;
    display: flex;
  }

  .md-tabs, .md-tab, .md-tabs-container {
    background-color: #18191d;
  }

  .center {
    /*margin: 0 auto;*/
  }

  .md-drawer{
    width: 260px;
  }

  .md-app-content {
    padding-left: 1%;
    padding-right: 1%;
    background-color: #18191d !important;
  }

  .md-title {
    font-size: 18px;
    margin-left: -4px;
    color: #7ac231 !important;
  }
  .content-top {
    flex: 1;
    /*margin: auto;*/
  }
  .content .md-toolbardrawer {
    background-color: #2a2b31 !important;
  }
</style>
