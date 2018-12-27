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
                  <p-button @click="sendAirgrab(props.row.account)" type="primary" :disabled="props.row.disabled">AIRGRAB</p-button>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <div class="row mt-2 text-center">
            <div class="col">Have an Airgrab you want here? Email us: <a href="mailto:myeoswalletsup@gmail.com"> myeoswalletsup@gmail.com</a></div>
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
import _ from 'lodash';

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
          disabled: false,
        },
        {
          account: 'infinicoinio',
          action: 'open',
          symbol: 'INF',
          site: 'https://www.infiniverse.net',
          description: 'Infiniverse is a decentralized augmented reality platform and virtual world on top of the real world. Infinicoin lets you register land and transact on the Infiniverse marketplace.',
          disabled: false,
        },
        {
          account: 'poormantoken',
          action: 'signup',
          symbol: 'POOR',
          site: 'https://eostoolkit.io/airgrab',
          description: 'A reward for people who STAKE and VOTE for EOS Block Producers with MONTHLY drops.',
          disabled: false,
        },
        {
          account: 'trybenetwork',
          action: 'claim',
          symbol: 'TRYBE',
          site: 'https://trybe.one',
          description: 'A tokenized knowledge and content sharing platform. Airgrab now for 50 TRYBE tokens (dropped 11th September). Sign up to the platform for a bonus 100 tokens.',
          disabled: false,
        },
        {
          account: 'parslseed123',
          action: 'signup',
          symbol: 'SEED',
          site: 'https://www.parsl.co',
          description: 'Parsl is a supply chain technology company. People within the cannabis industry, who pay subscription fees to use the Parsl platform need to do so using SEED tokens. SEED token holders are entitled to rewards under the terms that are specified in documents on the Parsl website.',
          disabled: false,
        },
        {
          account: 'wizznetwork1',
          action: 'signup',
          symbol: 'WIZZ',
          site: 'https://wizz.network',
          description: 'Modern Decentralized Ecosystem, Built on EOSIO. Tools, Rewards, Chat, and more. AIGRAB NOW!',
          disabled: false,
        },
      ],
    };
  },
  methods: {
    ...mapActions([
      ActionType.SET_TRANSACTION,
    ]),
    sendAirgrab(val) {
      if (!this.eos) {
        bl.logInPopUP();
        return;
      }
      const actionObj = this.airgrabs.find(obj => obj.account === val);
      if (!actionObj) return;
      const data = {};
      if (actionObj.action === 'claim') {
        data.claimer = this.getAccountName;
      } else if (actionObj.action === 'signup' && actionObj.symbol === 'SEED') {
        data.owner = this.getAccountName;
        data.sym = `0.0000 ${actionObj.symbol}`;
      } else if (actionObj.action === 'signup') {
        data.owner = this.getAccountName;
        data.quantity = `0.0000 ${actionObj.symbol}`;
      } else if (actionObj.action === 'open') {
        data.symbol = `0.0000 ${actionObj.symbol}`;
        data.ram_payer = this.getAccountName;
        data.owner = this.getAccountName;
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
    disabledAction() {
      for (const i in this.airgrabs) { // eslint-disable-line
        this.airgrabs[i].disabled = _.find(this.getTokens, { symbol: this.airgrabs[i].symbol });
      }
    },
  },
  computed: {
    ...mapState([
      'eos',
    ]),
    ...mapGetters([
      'getAccountName',
      'getAuthority',
      'getTokens',
    ]),
  },
  watch: {
    getTokens() {
      this.disabledAction();
    },
  },
  created() {
    this.disabledAction();
  },
};
</script>

<style scoped>
</style>
