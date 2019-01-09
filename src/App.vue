<template>
  <div :class="{'nav-open': $sidebar.showSidebar}">
    <notifications transition-name="notification-list" transition-mode="out-in">

    </notifications>
    <router-view name="header"></router-view>
    <transition name="fade"
                mode="out-in">
      <router-view @signInScatter="doOnLoginDesktop" @signInLedger="connectLedger"></router-view>
    </transition>
    <router-view name="footer"></router-view>
  </div>
</template>

<script>
import 'sweetalert2/dist/sweetalert2.css';
import 'vue-notifyjs/themes/default.css';
import bl from 'src/bl';
import swal from 'sweetalert2';
import { mapActions, mapGetters, mapState } from 'vuex';
import ActionType from 'src/store/constants';
import axios from 'axios';
import Eos from 'eosjs';
// import ScatterJS from 'scatter-js/dist/scatter.esm';
import ScatterJS from 'scatterjs-core'
import ScatterEOS from 'scatterjs-plugin-eosjs'

ScatterJS.plugins( new ScatterEOS() );
import ExternalWallet, { EXT_WALLET_TYPES, bip44Path } from 'src/models/ExternalWallet';

export default {
  data() {
    return {
      isLedgerConnected: false,
      currentLogin: '',
    };
  },
  created() {
    if (this.isMobileDevice()) {
      this.$router.replace({
        name: 'MobileDevice',
      });
    }
    this.doOnLoginDesktop();
    this.initEosApi();
    setInterval(() => {
      this.getTokenBalances();
    }, 50000);
    setInterval(() => {
      this.balanceUpdate();
    }, 20000);
    const ledgerWallet = new ExternalWallet(EXT_WALLET_TYPES.LEDGER)
    this[ActionType.SET_LEDGER_WALLET](ledgerWallet)
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
      'currentNode',
    ]),
    ...mapGetters([
      'httpEndpoint',
      'eosConfig',
      'eosConfigLedger',
    ]),
  },
  watch: {
    currentNode() {
      this.initEosApi();
      this.relogin();
    },
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
      ActionType.LOGOUT,
      ActionType.RELOGIN_SCATTER_EOS,
    ]),
    relogin() {
      if (this.currentLogin === 'scatter') {
        this.doOnLoginDesktop();
      } else if (this.currentLogin === 'ledger') {
        this.connectLedger();
      }
    },
    isMobileDevice() {
      return (typeof window.orientation !== 'undefined') || (navigator.userAgent.indexOf('IEMobile') !== -1)
    },
    logout() {
      this[ActionType.LOGOUT]();
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
    noScatterAlert() {
      swal({
        title: 'No scatter detected!',
        html: 'Please <a href="https://get-scatter.com/" target="_blank">install Scatter plugin or desktop application</a> and refresh this page.',
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-info btn-fill',
      });
    },
    doOnLoginDesktop() {
      this.currentLogin = 'scatter';
      // this.logout();
      this[ActionType.RELOGIN_SCATTER_EOS]();
      ScatterJS.scatter.connect('Attic Wallet', { initTimeout: 3500 })
        .then((connected) => {
          if (!connected) {
            this.noScatterAlert();
            return false;
          }
          const scatter = ScatterJS.scatter;
          window.scatter = null;
          this[ActionType.SET_SCATTER](scatter);
          const requiredFields = { accounts: [this.eosConfig] };
          return setTimeout(() => {
            scatter.getIdentity(requiredFields).then((identity) => {
              console.dir(identity);
              if (this.initIdentity(identity)) {
                const identityAccount = this.initIdentityAccount(identity);
                if (identityAccount) {
                  const eos = this.initEos();

                  if (eos && identityAccount.name) {
                    eos.getAccount(identityAccount.name).then((respEosAccount) => {
                      bl.logDebug(`getAccount('${identityAccount.name}').then((eosAccount) => ...`, respEosAccount);
                      this[ActionType.SET_EOS_ACCOUNT](respEosAccount);

                      this.getTokenList();
                      this.balanceUpdate();
                    });
                  }
                }
              }
            })
              .catch((error) => {
                console.error(error);
              });
            return true;
          }, 1000);
        }).catch((e) => {
          console.error(e);
        });
    },
    getTokenList() {
      if (this.eosAccount) {
        axios.get('https://raw.githubusercontent.com/eoscafe/eos-airdrops/master/tokens.json')
          .then((res) => {
            let data = res.data;
            data.push({ account: 'eosio.token', symbol: 'EOS' })
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
      if (this.eos && this.eosAccount && this.tokenList) {
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
    failConnectLedger(json) {
      let text = 'For more information check <a href="https://support.ledgerwallet.com/hc/en-us/articles/115005165269-Fix-connection-issues" target="_blank">documentation</a>';
      if (json) {
        let parsedJson = json;
        if (typeof json === 'string') {
          parsedJson = JSON.parse(json);
        }
        text = `${text}<div style="text-align: left;"><pre id="json-pop-up">${JSON.stringify(parsedJson, null, 1)}</pre></div>`;
      }
      swal({
        title: 'Error, connect Ledger',
        html: text,
        buttonsStyling: false,
        showCloseButton: true,
        showConfirmButton: false,
      });
    },
    connectLedger() {
      // this.logout();
      this[ActionType.RELOGIN_SCATTER_EOS]();
      this.currentLogin = 'ledger';
      if (this.isLedgerConnected) {
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
                    this[ActionType.SET_IDENTITY_ACCOUNT]({authority});
                    this.getTokenList();
                    this.balanceUpdate();
                  });
              })
              .catch((e) => {
                this.failConnectLedger(e);
                this.isLedgerConnected = false;
                console.error(e);
              });
          })
          .catch(e => console.error(e));
        const eos = Eos(Object.assign(this.eosConfigLedger));
        this[ActionType.SET_EOS_JS](eos);
      } else {
        swal({
          title: 'Connecting to EOS via Ledger',
          html: '<ol class="text-left">' +
            '<li>Connect Ledger Nano S. (<a href="https://support.ledgerwallet.com/hc/en-us/articles/360000613793-Initialize-your-device" target="_blank">Initialize your device</a>)</li>' +
            '<li>Enter your password.</li>' +
            '<li>Open EOS on your device. (<a href="https://support.ledgerwallet.com/hc/en-us/articles/360008913653-EOS-EOS-" target="_blank">Install EOS App</a>)</li>' +
            '</ol>',
          imageUrl: '/static/img/connectledger.png',
          imageClass: 'popup-img',
          buttonsStyling: false,
          showCloseButton: true,
          showConfirmButton: true,
          confirmButtonText: 'Ok',
          confirmButtonClass: 'btn btn-primary',
        });
        this.ledgerWallet.interface.canConnect()
          .then((res) => {
            if (res === 'Open and unlock your Ledger.') {
              this.failConnectLedger({ message: 'Open and unlock your Ledger.' });
              this.isLedgerConnected = false;
              return
            }
            swal({
              title: 'Success, Ledger is connected',
              buttonsStyling: false,
              showCloseButton: true,
              showConfirmButton: true,
              focusConfirm: true,
              type: 'success',
              confirmButtonText: 'Ok',
              confirmButtonClass: 'btn btn-primary',
            });
            this.isLedgerConnected = true;
            this.connectLedger();
          })
          .catch((e) => {
            console.error(e);
            this.failConnectLedger(e);
            this.isLedgerConnected = false;
          })
      }
    },
  },
}
</script>
<style>
  .select-primary.el-select .el-input input, span.el-tag, .card {
    border-radius: 4px !important;
  }

  .el-select {
    width: 100%;
  }

  #json-pop-up {
    overflow: auto !important;
    max-height: 35vh;
  }

  .popup-img {
    max-height: 20vh;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .15s
  }

  .fade-enter,
  .fade-leave-to
  {
    opacity: 0
  }
  h4 {
    margin-top: 10px !important;
    margin-bottom: 0 !important;
  }
</style>
