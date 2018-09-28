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
    <TextActionAgree/>
  </md-card>
  <md-card class="md-card-style md-layout-item help">
    <md-toolbar class="md-transparent" :md-elevation="0">
      <div class="md-title">Help</div>
    </md-toolbar>

    <md-card-content class="alw-first-child">
      <div>Please follow up all the tips and messages pop-uped on the background.</div>
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
      'getAuthority',
    ]),
  },
  methods: {
    ...mapActions([
      ActionType.SET_TRANSACTION,
    ]),
    onClaimReward() {
      this.eos.transaction(
        {
          actions: [
            {
              account: 'eosio',
              name: 'claimrewards',
              authorization: [{
                actor: this.getAccountName,
                permission: this.getAuthority,
              }],
              data: {
                owner: this.getAccountName,
              },
            },
          ],
        },
      ).then((res) => {
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
