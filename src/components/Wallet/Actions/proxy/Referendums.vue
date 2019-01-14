<template>
  <div id="main">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header"><h4 class="title">Referendums</h4></div>
          <div class="card-body">
            <div class="row">
              <div class="col-lg-4 col-md-6 col-sm-12 proposals" v-for="(proposal, i) in proposals" :key="i">
                <stats-card type="warning"
                            :small-title="'by ' + proposal.proposer"
                            :title="proposal.proposal_json.content">
                  <div class="stats" slot="footer">
                    <i class="stats.footerIcon"></i>
                    up down
                  </div>
                </stats-card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bl from '@/bl';
import {mapActions, mapGetters, mapState} from 'vuex';
import ActionType from '../../../../store/constants';
import StatsCard from 'src/components/UIComponents/Cards/StatsCard';

export default {
  name: 'Referendums',
  components: {
    StatsCard,
  },
  data() {
    return {
      proposals: [],
    };
  },
  mounted() {
    this.getProposals();
  },
  watch: {
    eosApi() {
      this.getProposals();
    },
  },
  computed: {
    ...mapState([
      'eos',
      'eosApi',
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
    async getProposals() {
      if (!this.eosApi) return;

      let lowerBound = 0
      let tempRes = []
      let res = []
      while (1) {
        try {
          tempRes = await this.eosApi.getTableRows({ //eslint-disable-line
            code: 'eosio.forum',
            scope: 'eosio.forum',
            table: 'proposal',
            json: true,
            lower_bound: lowerBound,
            limit: 1000,
          });
          if (!tempRes || !tempRes.rows || !tempRes.rows.length) break;

          res = res.concat(tempRes.rows);
          lowerBound = tempRes.rows[tempRes.rows.length - 1].owner;
          if (!tempRes.more) break;
        } catch (e) {
          bl.handleError(e, 'place-for-transaction');
        }
      }
      for (let r of res) { // eslint-disable-line
        r.proposal_json = JSON.parse(r.proposal_json);
      }
      console.log(res)
      this.proposals = res;
    },
    onPropose() {

    }
  },
};
</script>

<style>
.proposals .card-title {
  font-size: 0.5em;
}
</style>
