<template>
  <div class="root">
    <md-card class="md-card-style">
      <md-card-content>
        <div>
          <img class="logo" src="./../assets/eos_logo.png">
        </div>
      </md-card-content>

      <md-card-header class="md-headline">EOS WALLET</md-card-header>

      <md-card-actions style="padding: 0px 20px 20px">
        <md-button
          @click="doOnLogin"
          class="md-raised md-primary"
          style="color: #ffffff; text-transform: none; padding: 8px"
        >
          Login with Scatter
        </md-button>
      </md-card-actions>
      <bottom-bar style="border-bottom: none; border-left: none; border-right: none"/>
    </md-card>

    <md-dialog :md-active.sync="noScatterAlert">
      <md-dialog-title>No scatter plugin detected!</md-dialog-title>

      <md-dialog-content>
        Please <a href="https://get-scatter.com/" target="_blank">install Scatter plugin</a> and refresh this page.
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="noScatterAlert = false">Ok</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import Eos from 'eosjs';
import ActionType from '@/store/constants';
import bl from '@/bl';

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
    ]),
    ...mapGetters([
      'httpEndpoint',
      'eosConfig',
    ]),
  },
  methods: {
    ...mapActions([
      ActionType.SET_IDENTITY,
      ActionType.SET_IDENTITY_ACCOUNT,
      ActionType.SET_EOS_JS,
      ActionType.SET_EOS_ACCOUNT,
      ActionType.SET_BALANCE,
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
      const eos = this.scatter.eos(this.eosConfig, Eos, {});
      this[ActionType.SET_EOS_JS](eos);
      return eos;
    },
    doOnLogin() {
      if (this.scatter) {
        this.scatter.getIdentity({
          accounts: [this.eosConfig],
        }).then((identity) => {
          if (this.initIdentity(identity)) {
            this.scatter.authenticate().then((authResult) => {
              bl.logDebug('AUTH RESULT...', authResult);

              const identityAccount = this.initIdentityAccount(identity);
              if (identityAccount) {
                const eos = this.initEos();

                if (eos && identityAccount.name) {
                  eos.getAccount(identityAccount.name).then((respEosAccount) => {
                    bl.logDebug(`getAccount('${identityAccount.name}').then((eosAccount) => ...`, respEosAccount);
                    this[ActionType.SET_EOS_ACCOUNT](respEosAccount);

                    bl.requestBalance(eos, respEosAccount).then((respBalance) => {
                      this[ActionType.SET_BALANCE](respBalance);
                      bl.logDebug('bl.requestBalance(eos).then...', respBalance);

                      this.$router.push('/wallet');
                    });
                  });
                }
              }
            });
          }
        }).catch((e) => {
          console.error(e);
        });
      } else {
        this.noScatterAlert = true;
      }
    },
  },
};
</script>

<style scoped>

  .root {
    min-height: 100vh;
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
    border: 2px rgb(233, 236, 239) solid;
    box-shadow: none;
    border-radius: 2px;
  }

  .logo {
    max-height: 200px;
  }
</style>
