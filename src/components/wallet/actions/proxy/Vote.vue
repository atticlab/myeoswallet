<template>
  <md-card class="md-card-style">
    <md-toolbar class="md-transparent" :md-elevation="0">
      <div class="md-title">Vote producer</div>
    </md-toolbar>

    <md-card-content>
      <div>Selected producers ({{ prodToVote.length }}/30): </div>
      <md-chip class="md-primary chips" md-deletable v-for="(prod, i) in prodToVote" :key="i" @md-delete="prodDeleteHandler(prod)">{{prod}}</md-chip>
    </md-card-content>

    <md-card-content>
      <md-button @click="producers = []" style="color: #ffffff; box-shadow: none; width: 260px;"
                 class="md-raised md-primary">Reset
      </md-button>
      <md-button @click="onVote" style="color: #ffffff; box-shadow: none; width: 260px; "
                 class="md-raised md-primary">Vote
      </md-button>
    </md-card-content>

    <md-card-content>
      <md-table v-model="producers" md-sort="position" md-sort-order="asc" md-card id="table">
        <md-table-toolbar>
          <div class="md-toolbar-section-start">
            <h2 class="md-title">Producers</h2>
          </div>
        </md-table-toolbar>

        <md-table-empty-state>
          <md-progress-spinner class="md-primary" md-mode="indeterminate"></md-progress-spinner>
        </md-table-empty-state>

        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="Position" md-sort-by="position" md-numeric>{{ item.position }}</md-table-cell>
          <md-table-cell md-label="Name" md-sort-by="owner">{{ item.owner }}</md-table-cell>
          <md-table-cell md-label="Url" md-sort-by="url"><a :href="item.url">{{ item.url }}</a></md-table-cell>
          <md-table-cell md-label="Reward" md-sort-by="reward">{{ item.reward }}</md-table-cell>
          <md-table-cell md-label="Votes (%)" md-sort-by="votesPercent">{{ (item.votesPercent * 100).toFixed(3) }}</md-table-cell>
          <md-table-cell md-label="Select"><md-checkbox v-model="prodToVote" :value="item.owner" class="md-primary"></md-checkbox></md-table-cell>
        </md-table-row>
      </md-table>
    </md-card-content>
  </md-card>
</template>

<script>
import bl from '@/bl';
import { format } from 'eosjs';
import { mapState, mapGetters, mapActions } from 'vuex';
import ActionType from '../../../../store/constants';

export default {
  name: 'Vote',
  data() {
    return {
      producers: [],
      chainStatus: [],
      prodToVote: [],
      loading: true,
      searched: [],
      search: '',
    };
  },
  computed: {
    ...mapState([
      'eos',
      'eosAccount',
    ]),
    ...mapGetters([
      'getAccountName',
    ]),
  },
  methods: {
    ...mapActions([
      ActionType.SET_TRANSACTION,
    ]),
    calculateVoteWeight() {
      const timestampEpoch = 946684800;
      const dates = (Date.now() / 1000) - (timestampEpoch);
      const weight = Math.floor(dates / 604800) / 52;
      // eslint-disable-next-line
      return Math.pow(2, weight);
    },
    onVote() {
      this.prodToVote.sort((a, b) => parseInt(format.encodeName(a, false), 10) - parseInt(format.encodeName(b, false), 10));
      this.eos.voteproducer(this.getAccountName, '', this.prodToVote)
        .then((res) => {
          console.debug(`${this.$options.name} RESULT`, res);
          this[ActionType.SET_TRANSACTION](res);
          bl.renderJSON(res, 'place-for-transaction');
        })
        .catch(e => bl.handleError(e, 'place-for-transaction'));
    },
    prodDeleteHandler(prod) {
      const index = this.prodToVote.indexOf(prod);

      if (index > -1) {
        this.prodToVote.splice(index, 1);
      }
    },
  },
  created() {
    if (this.eosAccount.voter_info && this.eosAccount.voter_info.producers) {
      // eslint-disable-next-line
      for (const prod in this.eosAccount.voter_info.producers) {
        this.prodToVote.push(this.eosAccount.voter_info.producers[prod]);
      }
    }
    this.eos.getTableRows(true, 'eosio', 'eosio', 'global', '', 0, -1, 1)
      .then((response) => {
        this.chainStatus = response.rows[0];
        this.eos.getProducers({
          json: true,
          limit: 700,
        })
          .then((res) => {
            this.producers = res.rows;
            this.producers.sort((a, b) => b.total_votes - a.total_votes);
            let votesToRemove = 0;
            // eslint-disable-next-line
            for (const index in this.producers) {
              const percentageVotes = ((this.producers[index].total_votes / this.chainStatus.total_producer_vote_weight) * 100);
              if (percentageVotes * 200 < 100) {
                votesToRemove += parseFloat(this.producers[index].total_votes);
              }
            }
            const voteWeight = this.calculateVoteWeight();
            // eslint-disable-next-line
            for (const index in this.producers) {
              const position = parseInt(index, 10) + 1;
              let reward = 0;
              const percentageVotes = (this.producers[index].total_votes / (this.chainStatus.total_producer_vote_weight));
              const percentageVotesRewarded = ((this.producers[index].total_votes / (this.chainStatus.total_producer_vote_weight - votesToRemove)) * 100);

              reward += percentageVotesRewarded * 200;

              if (percentageVotes * 200 * 100 < 100) {
                reward = 0;
              }

              if (position < 22) {
                reward += 318;
              }
              this.producers[index].position = position;
              this.producers[index].reward = reward.toFixed(0);
              this.producers[index].votesPercent = percentageVotes.toFixed(4);
              this.producers[index].numVotes = (this.producers[index].total_votes / voteWeight / 10000).toFixed(0);
            }
            this.loading = false;
          })
          .catch(e => bl.handleError(e, 'place-for-transaction'));
      })
      .catch(e => bl.handleError(e, 'place-for-transaction'));
  },
  watch: {
    prodToVote() {
      if (this.prodToVote.length > 30) {
        this.prodToVote.splice(-1);
      }
    },
  },
};
</script>

<style scoped>
  @import '../../../../assets/css/walletaction.css';

  .chips {
    color: white !important;
    margin-left: 2px;
  }
  .chips:hover {
    color: #7ac231 !important;
  }

</style>
