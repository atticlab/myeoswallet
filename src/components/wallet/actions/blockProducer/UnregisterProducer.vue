<template>
  <md-card class="md-card-style">
    <md-toolbar class="md-transparent" :md-elevation="0">
      <div class="md-title">Unregister Producer</div>
    </md-toolbar>

    <md-card-content class="alw-first-child">
      <md-field>
        <label>Account</label>
        <span class="md-prefix">@ </span>
        <md-input :value="getAccountName" maxlength="12" required readonly></md-input>
      </md-field>
    </md-card-content>

    <md-card-content class="alw-buttons">
      <md-button @click="onUnregisterProducer" style="color: #ffffff; box-shadow: none; width: 260px; "
                 class="md-raised md-primary">Unregister Producer
      </md-button>
    </md-card-content>
  </md-card>
</template>

<script>
import bl from '@/bl';
import ActionType from '@/store/constants';
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'UnregisterProducer',
  methods: {
    ...mapActions([
      ActionType.SET_TRANSACTION,
    ]),
    onUnregisterProducer() {
      this.eos.unregprod(this.getAccountName)
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
  computed: {
    ...mapState([
      'eos',
    ]),
    ...mapGetters([
      'getAccountName',
      'getAuthority',
    ]),
  },
};
</script>

<style scoped>
  @import '../../../../assets/css/walletaction.css';
</style>
