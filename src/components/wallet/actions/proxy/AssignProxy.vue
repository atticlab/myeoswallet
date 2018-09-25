<template>
<div id="main" class="md-layout twocolumn">
  <md-card class="md-card-style md-layout-item">
    <md-toolbar class="md-transparent" :md-elevation="0">
      <div class="md-title">Assign proxy</div>
    </md-toolbar>

    <md-card-content class="alw-first-child">
      <md-field>
        <label>Account</label>
        <span class="md-prefix">@ </span>
        <md-input :value="getAccountName" maxlength="12" required readonly></md-input>
      </md-field>
      <md-field>
        <label>Proxy</label>
        <span class="md-prefix">@ </span>
        <md-input v-model="proxy" maxlength="12" required @change="validateAccount"></md-input>
      </md-field>
    </md-card-content>

    <md-card-content class="alw-buttons">
      <md-button @click="onAssignProxy" style="color: #ffffff; box-shadow: none; width: 260px; "
                 class="md-raised md-primary" :disabled="validate">Assign Account
      </md-button>
    </md-card-content>
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
</template>

<script>
import bl from '@/bl';
import { mapState, mapGetters, mapActions } from 'vuex';
import ActionType from '../../../../store/constants';

export default {
  name: 'AssignProxy',
  data() {
    return {
      proxy: '',
      proxyError: false,
    };
  },
  computed: {
    ...mapState([
      'eos',
    ]),
    ...mapGetters([
      'getAccountName',
    ]),
    validate() {
      if (this.getAccountName && this.proxy && !this.proxyError) {
        return false;
      }
      return true;
    },
  },
  methods: {
    ...mapActions([
      ActionType.SET_TRANSACTION,
    ]),
    validateAccount() {
      this.eos.getAccount(this.proxy)
        .then(() => {
          this.proxyError = false;
        })
        .catch(() => {
          this.proxyError = true;
        });
    },
    onAssignProxy() {
      this.eos.voteproducer(this.getAccountName, this.proxy, [])
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
