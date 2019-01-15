<template>
  <div id="main">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header"><h4 class="title">Vote producer</h4></div>
          <div class="card-body">
            <div class="row">
              <div class="col-12">
                <div class="mb-2">Selected producers ({{ prodToVote.length }}/30):</div>
                <el-tag type="primary" :closable="true"
                        :close-transition="true" v-for="(prod, i) in prodToVote" :key="i"
                        @close="prodDeleteHandler(prod)">{{ prod }}
                </el-tag>
              </div>
            </div>

            <div class="row">
              <div class="btn-group col-4 col-xs-3 col-md-2 col-sm-2" role="group">
                <p-button @click="resetProducers" type="primary">Reset</p-button>
                <p-button @click="onVote" type="primary" class="ml-1">Vote</p-button>
              </div>
              <div class="col-8 offset-2 col-md-4 offset-md-6 col-sm-4 offset-sm-6">
                <fg-input class="input-sm"
                          placeholder="Search"
                          v-model="searchQuery"
                          addon-right-icon="nc-icon nc-zoom-split">
                </fg-input>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <TextActionAgree/>
              </div>
              <div class="col">
                <p-pagination class="pull-right"
                              v-model="pagination.page"
                              :per-page="pagination.itemPerPage"
                              :total="pagination.totalItems">
                </p-pagination>
              </div>
            </div>
            <div class="row">
              <el-table :data="producerToDisplay" header-row-class-name="text-primary">
                <el-table-column
                        prop="position"
                        label="Pos."
                        align="center"
                >

                </el-table-column>
                <el-table-column prop="owner"
                                 label="Owner"
                                 align="center">
                </el-table-column>
                <el-table-column label="URL"
                                 align="center">
                  <template slot-scope="props">
                    <a :href="props.row.url" target="_blank">{{ props.row.url }}</a>
                  </template>
                </el-table-column>
                <el-table-column prop="reward"
                                 label="Reward"
                                 align="center">
                </el-table-column>
                <el-table-column label="Votes (%)"
                                 align="center">
                  <template slot-scope="props">
                    <span>{{ (props.row.votesPercent * 100).toFixed(3) }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="Select">
                  <template slot-scope="props">
                    <p-button :disabled="disablePickProd || props.row.choosed"
                              @click="addProdToVoteArray(props.row.owner, props.row.choosed)" type="primary">ADD
                    </p-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="row mt-3">
              <div class="col">
                <p-pagination class="pull-right"
                              v-model="pagination.page"
                              :per-page="pagination.itemPerPage"
                              :total="pagination.totalItems">
                </p-pagination>
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
import PPagination from 'src/components/UIComponents/Pagination.vue';
import _ from 'lodash';
import {Tag} from 'element-ui';
import {mapActions, mapGetters, mapState} from 'vuex';
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
      pagination: {itemPerPage: 50, totalItems: 0, page: 1},
      producerToDisplay: [],
      disablePickProd: false,
      searchQuery: '',
    };
  },
  components: {
    // TablePaginations,
    [Tag.name]: Tag,
    PPagination,
  },
  computed: {
    ...mapState([
      'eos',
      'eosApi',
      'eosAccount',
    ]),
    ...mapGetters([
      'getAccountName',
      'getAuthority',
    ]),
    queriedData() {
      if (!this.searchQuery) {
        this.pagination.totalItems = this.producers.length;
        return this.producers;
      }
      const res = this.producers.filter(val => val && val.owner.includes(this.searchQuery));
      this.pagination.totalItems = res.length;
      return res;
    },
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
    resetProducers() {
      this.prodToVote = [];
      for (const index in this.producers) { // eslint-disable-line
        this.$set(this.producers[index], 'choosed', false);
      }
      this.updateProducerToDisplay();
    },
    onVote() {
      if (!this.eos) {
        bl.logInPopUP();
        return;
      }
      this.prodToVote.sort();
      this.eos.transaction(
        {
          actions: [
            {
              account: 'eosio',
              name: 'voteproducer',
              authorization: [{
                actor: this.getAccountName,
                permission: this.getAuthority,
              }],
              data: {
                voter: this.getAccountName,
                proxy: '',
                producers: this.prodToVote,
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
    prodDeleteHandler(prod) {
      const index = this.prodToVote.indexOf(prod);

      if (index > -1) {
        this.prodToVote.splice(index, 1);
      }
      const obj = _.find(this.producers, {owner: prod});
      if (obj) {
        this.$set(obj, 'choosed', false);
      }
      this.updateProducerToDisplay();
    },
    getAlreadyVoted() {
      if (this.eosAccount && this.eosAccount.voter_info && this.eosAccount.voter_info.producers && this.producers) {
        this.prodToVote = [];
        // eslint-disable-next-line
        for (const prod in this.eosAccount.voter_info.producers) {
          const obj = _.find(this.producers, {owner: this.eosAccount.voter_info.producers[prod]});
          if (obj) {
            this.$set(obj, 'choosed', !obj.choosed);
          }
          this.prodToVote.push(this.eosAccount.voter_info.producers[prod]);
        }
        if (!this.prodToVote.includes('atticlabeosb') && this.prodToVote.length < 30) {
          this.prodToVote.push('atticlabeosb');
          const obj = _.find(this.producers, {owner: 'atticlabeosb'});
          if (obj) {
            this.$set(obj, 'choosed', true);
          }
        }
      }
    },
    getProducers() {
      if (!this.eosApi) {
        bl.logInPopUP();
        return;
      }

      this.eosApi.getTableRows(true, 'eosio', 'eosio', 'global', '', 0, -1, 1)
        .then((response) => {
          this.chainStatus = response.rows[0];
          this.eosApi.getProducers({
            json: true,
            limit: 700,
            lower_bound: '',
          })
          .then(async (temp) => {
            let res = [];
            let lowerBound = '';

            while (temp.more) {
              res = res.concat(temp.rows);
              lowerBound = temp.rows[temp.rows.length - 1].owner;
              temp = await this.eosApi.getProducers({ // eslint-disable-line
                json: true,
                limit: 700,
                lower_bound: lowerBound,
              });
            }
            this.producers = res.concat(temp.rows);
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
              this.producers[index].choosed = false;
            }
            this.getAlreadyVoted();
            this.loading = false;
            this.pagination.totalItems = this.producers.length;
          })
          .catch(e => bl.handleError(e, 'place-for-transaction'));
        })
        .catch(e => bl.handleError(e, 'place-for-transaction'));
    },
    changeCurrentPageHandler(val) {
      this.pagination.page = val;
    },
    addProdToVoteArray(prod, choice) {
      const index = _.findIndex(this.producers, {owner: prod});
      if (index >= 0) {
        this.$set(this.producers[index], 'choosed', !choice);
      }

      this.prodToVote.push(prod);
      if (this.prodToVote.length > 2) {
        this.prodToVote = _.uniq(this.prodToVote);
      }

      this.disablePickProd = this.prodToVote.length === 30;
      if (this.prodToVote.length > 30) {
        this.prodToVote.splice(-1);
        this.$set(this.producers[index], 'choosed', false);
      }
      this.updateProducerToDisplay();
    },
    updateProducerToDisplay() {
      this.producerToDisplay = [];
      this.producerToDisplay = this.producers.slice(this.pagination.itemPerPage * (this.pagination.page - 1), this.pagination.itemPerPage * this.pagination.page);
    },
  },
  mounted() {
    this.getAlreadyVoted();
    this.getProducers();
  },
  watch: {
    eosAccount() {
      this.getAlreadyVoted();
    },
    eosApi() {
      this.getProducers();
    },
    pagination: {
      handler() {
        if (this.queriedData) {
          this.producerToDisplay = this.queriedData.slice(this.pagination.itemPerPage * (this.pagination.page - 1), this.pagination.itemPerPage * this.pagination.page);
        }
      },
      deep: true,
    },
    queriedData() {
      if (this.queriedData) {
        this.producerToDisplay = this.queriedData.slice(this.pagination.itemPerPage * (this.pagination.page - 1), this.pagination.itemPerPage * this.pagination.page);
      }
    },
  },
};
</script>

<style scoped>
</style>

<style scoped lang="scss">
  span.el-tag:first-of-type {
    margin-left: 0 !important;
  }

  .ml-1 {
    margin-left: 2px;
  }
</style>
