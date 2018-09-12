<template>
<div id="main">
  <md-card class="md-card-style">
    <md-toolbar class="md-transparent" :md-elevation="0">
      <div class="md-title">Set proxy</div>
    </md-toolbar>

    <md-card-content class="alw-first-child">
      <md-field>
        <label>Account</label>
        <span class="md-prefix">@ </span>
        <md-input :value="getAccountName" maxlength="12" required readonly></md-input>
      </md-field>
    </md-card-content>

    <md-card-content class="alw-buttons">
      <md-button @click="onSetProxy" style="color: #ffffff; box-shadow: none; width: 260px; "
                 class="md-raised md-primary">Set Account
      </md-button>
    </md-card-content>
  </md-card>

  <md-card class="md-card-style">
    <md-toolbar class="md-transparent" :md-elevation="0">
      <div class="md-title">Register Proxy Info</div>
    </md-toolbar>

    <md-card-content class="alw-first-child">
      <md-field>
        <label>Proxy Account</label>
        <span class="md-prefix">@ </span>
        <md-input :value="getAccountName" maxlength="12" required readonly></md-input>
      </md-field>
      <md-field>
        <label>Proxy name</label>
        <span class="md-prefix">@ </span>
        <span class="md-error">Invalid name</span>
        <md-input v-model="proxyName" maxlength="64" required></md-input>
      </md-field>
    </md-card-content>

    <md-card-content>
      <md-field>
        <label>Slogan</label>
        <md-input v-model="slogan" maxlength="64"></md-input>
      </md-field>
    </md-card-content>

    <md-card-content>
      <md-field>
        <label>Philosophy</label>
        <md-input v-model="philosophy" maxlength="1024" required></md-input>
      </md-field>
    </md-card-content>

    <md-card-content>
      <md-field>
        <label>Background Information</label>
        <md-input v-model="backgroundInformation" maxlength="1024" required></md-input>
      </md-field>
    </md-card-content>

    <md-card-content>
      <md-field>
        <label>Logo URL</label>
        <md-input v-model="logourl"></md-input>
      </md-field>
      <md-field>
        <label>Website</label>
        <md-input v-model="website"></md-input>
      </md-field>
    </md-card-content>

    <md-card-content>
      <md-field>
        <label>Telegram</label>
        <md-input v-model="telegram"></md-input>
      </md-field>
      <md-field>
        <label>Steemit</label>
        <md-input v-model="steemit"></md-input>
      </md-field>
    </md-card-content>

    <md-card-content>
      <md-field>
        <label>Twitter</label>
        <md-input v-model="twitter"></md-input>
      </md-field>
      <md-field>
        <label>WeChat</label>
        <md-input v-model="wechat"></md-input>
      </md-field>
    </md-card-content>

    <md-card-content class="alw-buttons">
      <md-button @click="onRegisterProxyInfo" style="color: #ffffff; box-shadow: none; width: 260px; "
                 class="md-raised md-primary" :disabled="validateRegisterProxyInfo">Register Proxy Info
      </md-button>
    </md-card-content>
  </md-card>
</div>
</template>

<script>
import bl from '@/bl';
import { mapState, mapGetters, mapActions } from 'vuex';
import ActionType from '@/store/constants';

export default {
  name: 'SetProxy',
  data() {
    return {
      proxyNameError: false,
      proxyName: '',
      slogan: '',
      philosophy: '',
      backgroundInformation: '',
      logourl: '',
      telegram: '',
      steemit: '',
      twitter: '',
      wechat: '',
      website: '',
    };
  },
  computed: {
    ...mapState([
      'eos',
    ]),
    ...mapGetters([
      'getAccountName',
      'getAuthority',
    ]),
    validateRegisterProxyInfo() {
      if (this.proxyName && !this.proxyNameError) {
        return false;
      }
      return true;
    },
  },
  methods: {
    ...mapActions([
      ActionType.SET_TRANSACTION,
    ]),
    onSetProxy() {
      this.eos.regproxy(this.getAccountName, 1)
        .then((res) => {
          console.debug(`${this.$options.name} RESULT`, res);
          this[ActionType.SET_TRANSACTION](res);
          bl.renderJSON(res, 'place-for-transaction');
        })
        .catch((e) => {
          bl.handleError(e, 'place-for-transaction');
        });
    },
    onRegisterProxyInfo() {
      this.eos.transaction(
        {
          actions: [
            {
              account: 'regproxyinfo',
              name: 'set',
              authorization: [{
                actor: this.getAccountName,
                permission: this.getAuthority,
              }],
              data: {
                proxy: this.getAccountName,
                name: this.proxyName,
                slogan: this.slogan,
                philosophy: this.philosophy,
                background: this.backgroundInformation,
                website: this.website,
                logo_256: this.logourl,
                telegram: this.telegram,
                steemit: this.steemit,
                twitter: this.twitter,
                wechat: this.wechat,
              },
            },
          ],
        },
      )
        .then((res) => {
          console.debug(`${this.$options.name} RESULT`, res);
          this[ActionType.SET_TRANSACTION](res);
          bl.renderJSON(res, 'place-for-transaction');
        })
        .catch((e) => {
          bl.handleError(e, 'place-for-transaction');
        });
    },
  },
};
</script>

<style scoped>
  @import '../../../../assets/css/walletaction.css';
</style>
