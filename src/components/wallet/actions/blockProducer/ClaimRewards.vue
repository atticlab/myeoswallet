<template>
<div id="main" class="md-layout twocolumn">
  <md-card class="md-card-style md-layout-item">
    <md-toolbar class="md-transparent" :md-elevation="0">
      <div class="md-title">Claim Rewards</div>
    </md-toolbar>

    <md-card-content class="alw-first-child">
      <md-field>
        <label>Claimer</label>
        <span class="md-prefix">@ </span>
        <md-input :value="getAccountName" maxlength="12" required readonly></md-input>
      </md-field>
    </md-card-content>

    <md-card-content class="alw-buttons">
      <md-button @click="onClaimReward" style="color: #ffffff; box-shadow: none; width: 260px; "
                 class="md-raised md-primary">Claim
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
  name: 'ClaimRewards',
  computed: {
    ...mapState([
      'eos',
    ]),
    ...mapGetters([
      'getAccountName',
    ]),
  },
  methods: {
    ...mapActions([
      ActionType.SET_TRANSACTION,
    ]),
    onClaimReward() {
      this.eos.claimrewards(this.getAccountName)
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
