<template>
  <md-card class="md-card-style">
    <md-toolbar class="md-transparent" :md-elevation="0">
      <div class="md-title">Airgrab your Tokens!</div>
    </md-toolbar>

    <md-card-content class="alw-first-child">
      <md-table>
        <md-table-row>
          <md-table-head>Symbol</md-table-head>
          <md-table-head>Description</md-table-head>
          <md-table-head>Website</md-table-head>
          <md-table-head>Grab</md-table-head>
        </md-table-row>

        <md-table-row v-for="(airgrab, index) in airgrabs" :key="index">
          <md-table-cell>{{ airgrab.symbol }}</md-table-cell>
          <md-table-cell>{{ airgrab.description }}</md-table-cell>
          <md-table-cell><a href="airgrab.site">{{ airgrab.site }}</a></md-table-cell>
          <md-table-cell><md-button class="md-raised md-primary" @click="sendAirgrab(airgrab.account)">AIRGRAB</md-button></md-table-cell>
        </md-table-row>
      </md-table>
    </md-card-content>

    <md-card-content class="alw-buttons">
      Have an Airgrab you want here? Email us: <a href="mailto:team@attic.tech"> team@attic.tech</a>
    </md-card-content>
  </md-card>
</template>

<script>
import bl from '@/bl';
import { mapState, mapGetters, mapActions } from 'vuex';
import ActionType from '@/store/constants';

export default {
  name: 'AirgrabTokens',
  data() {
    return {
      airgrabs: [
        {
          account: 'eosatidiumio',
          action: 'signup',
          symbol: 'ATD',
          site: 'https://www.atidium.io',
          description: 'Payments & Budget Management Decentralized App Leveraging the Blockchain, Cryptocurrency and AI Technologies. Drops happen every 24 hours, Airgrab Today!',
        },
        {
          account: 'poormantoken',
          action: 'signup',
          symbol: 'POOR',
          site: 'https://eostoolkit.io/airgrab',
          description: 'A reward for people who STAKE and VOTE for EOS Block Producers with MONTHLY drops.',
        },
        {
          account: 'eosatidiumio',
          action: 'trybenetwork',
          symbol: 'TRYBE',
          site: 'https://trybe.one',
          description: 'A tokenized knowledge and content sharing platform. Airgrab now for 50 TRYBE tokens (dropped 11th September). Sign up to the platform for a bonus 100 tokens.',
        },
        {
          account: 'wizznetwork1',
          action: 'signup',
          symbol: 'WIZZ',
          site: 'https://wizz.network',
          description: 'Modern Decentralized Ecosystem, Built on EOSIO. Tools, Rewards, Chat, and more. AIGRAB NOW!',
        },
      ],
    };
  },
  methods: {
    ...mapActions([
      ActionType.SET_TRANSACTION,
    ]),
    sendAirgrab(val) {
      const actionObj = this.airgrabs.find(obj => obj.account === val);
      if (!actionObj) return;
      const data = {};
      if (actionObj.action === 'claim') {
        data.claimer = this.getAccountName;
      } else {
        data.owner = this.getAccountName;
        data.quantity = `0.0000 ${actionObj.symbol}`;
      }
      this.eos.transaction(
        {
          actions: [
            {
              account: actionObj.account,
              name: actionObj.action,
              authorization: [{
                actor: this.getAccountName,
                permission: this.getAuthority,
              }],
              data,
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
  @import '../../../assets/css/walletaction.css';
  a {
    margin-left: 5px;
  }
</style>
