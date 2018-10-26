<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header"><h4 class="title">Airgrab your Tokens!</h4></div>

        <div class="card-body">

          <div class="row">
            <el-table :data="airgrabs" header-row-class-name="text-primary">
              <el-table-column type="index">

              </el-table-column>
              <el-table-column prop="symbol"
                               label="Symbol"
                               align="center">
              </el-table-column>
              <el-table-column prop="description"
                               label="Description"
                               align="center">
              </el-table-column>
              <el-table-column prop="site"
                               label="Website"
                               align="center">
                <template slot-scope="props">
                  <a :href="props.row.site" target="_blank">{{ props.row.site }}</a>
                </template>
              </el-table-column>
              <el-table-column
                class-name="action-buttons td-actions"
                align="center"
                label="Grab">
                <template slot-scope="props">
                  <p-button @click="sendAirgrab(airgrab.account)" type="primary">AIRGRAB</p-button>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <div class="row mt-2 text-center">
            <div class="col">Have an Airgrab you want here? Email us: <a href="mailto:inbox@atticlab.net"> inbox@atticlab.net</a></div>
          </div>
          <div class="row">
            <TextActionAgree/>
          </div>
        </div>
      </div>
    </div>
  </div>
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
          this[ActionType.SET_TRANSACTION](e);
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
</style>
