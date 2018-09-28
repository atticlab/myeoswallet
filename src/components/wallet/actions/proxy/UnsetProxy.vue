<template>
  <div id="main">
    <div class="md-layout twocolumn">
      <md-card class="md-card-style md-layout-item">
        <md-toolbar class="md-transparent" :md-elevation="0">
          <div class="md-title">Unset proxy</div>
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
                     class="md-raised md-primary">Unset Account
          </md-button>
        </md-card-content>
        <TextActionAgree/>
      </md-card>
      <md-card class="md-card-style md-layout-item help">
      <md-toolbar class="md-transparent" :md-elevation="0">
        <div class="md-title">Help</div>
      </md-toolbar>

      <md-card-content class="alw-first-child">
        <div>In case you decided to resign your proxy, click the button ‘Unreg’. Remember you cancel all the weight given by the votes.</div>
      </md-card-content>
    </md-card>
    </div>

    <div class="md-layout twocolumn">
      <md-card class="md-card-style md-layout-item">
        <md-toolbar class="md-transparent" :md-elevation="0">
          <div class="md-title">Unregister proxy info</div>
        </md-toolbar>

        <md-card-content class="alw-first-child">
          <md-field>
            <label>Proxy</label>
            <span class="md-prefix">@ </span>
            <md-input :value="getAccountName" maxlength="12" required readonly></md-input>
          </md-field>
        </md-card-content>

        <md-card-content class="alw-buttons">
          <md-button @click="onUnregisterProxyInfo" style="color: #ffffff; box-shadow: none; width: 260px; "
                     class="md-raised md-primary">Unregister proxy info
          </md-button>
        </md-card-content>
        <TextActionAgree/>
      </md-card>
      <md-card class="md-card-style md-layout-item help">
        <md-toolbar class="md-transparent" :md-elevation="0">
          <div class="md-title">HELP</div>
        </md-toolbar>

        <md-card-content class="alw-first-child">
          <div>Having connectivity issues or scatter not appearing when transacting? Please ensure
            you have updated to the latest scatter desktop</div>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import bl from '@/bl';
import { mapState, mapGetters, mapActions } from 'vuex';
import ActionType from '../../../../store/constants';

export default {
  name: 'UnsetProxy',
  computed: {
    ...mapState([
      'eos',
    ]),
    ...mapGetters([
      'getAccountName',
      'getAuthority',
    ]),
  },
  methods: {
    ...mapActions([
      ActionType.SET_TRANSACTION,
    ]),
    onSetProxy() {
      this.eos.transaction(
        {
          actions: [
            {
              account: 'eosio',
              name: 'regproxy',
              authorization: [{
                actor: this.getAccountName,
                permission: this.getAuthority,
              }],
              data: {
                proxy: this.getAccountName,
                isproxy: 0,
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
          this[ActionType.SET_TRANSACTION](e);
          bl.handleError(e, 'place-for-transaction');
        });
    },
    onUnregisterProxyInfo() {
      this.eos.transaction(
        {
          actions: [
            {
              account: 'regproxyinfo',
              name: 'remove',
              authorization: [{
                actor: this.getAccountName,
                permission: this.getAuthority,
              }],
              data: {
                proxy: this.getAccountName,
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
          this[ActionType.SET_TRANSACTION](e);
          bl.handleError(e, 'place-for-transaction');
        });
    },
  },
};
</script>

<style scoped>
  @import '../../../../assets/css/walletaction.css';
</style>
