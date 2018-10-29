<template>
<div id="main">
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">Vote producer</div>
        <div class="card-body">
          <div class="row">
            <div class="col-12">
              <div>Selected producers ({{ prodToVote.length }}/30): </div>
              <el-tag type="primary" :closable="true"
                      :close-transition="true" v-for="(prod, i) in prodToVote" :key="i" @close="prodDeleteHandler(prod)">{{ prod }}</el-tag>

            </div>
          </div>

          <div class="row">
            <div class="col-2">
              <p-button @click="prodToVote = []" type="primary">Reset</p-button>
            </div>
            <div class="col-2">
              <p-button @click="onVote" type="primary">Vote</p-button>
            </div>
          </div>

          <div class="row"><TextActionAgree /></div>

          <!--<div class="row">-->
            <!--<div class="col-sm-6">-->
              <!--<p-pagination class="pull-right"-->
                            <!--v-model="pagination.currentPage"-->
                            <!--:per-page="pagination.perPage"-->
                            <!--:total="pagination.total">-->
              <!--</p-pagination>-->
            <!--</div>-->
          <!--</div>-->
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
                  <!--<p-switch v-model="props.row.active">-->
                    <!--<i class="fa fa-check" slot="on"></i>-->
                    <!--<i class="fa fa-times" slot="off"></i>-->
                  <!--</p-switch>-->
                  <p-checkbox :disabled="disablePickProd && !props.row.choosed" :checked="props.row.choosed" @input="addProdToVoteArray(props.row.owner, props.row.choosed, this)"></p-checkbox>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>

    <!--<md-card-content>-->
      <!--<md-table v-model="producerToDisplay" md-sort="position" md-sort-order="asc" md-card id="table">-->
        <!--<md-table-toolbar>-->
          <!--<div class="md-toolbar-section-start">-->
            <!--<h2 class="md-title">Producers</h2>-->
          <!--</div>-->
          <!--<div>-->
            <!--<TablePaginations :itemsPerPage="pagination.itemPerPage" :totalItems="pagination.totalItems" @changeCurrentPageEvent="changeCurrentPageHandler" />-->
          <!--</div>-->
        <!--</md-table-toolbar>-->

        <!--<md-table-row slot="md-table-row" slot-scope="{ item }">-->
          <!--<md-table-cell md-label="Position" md-sort-by="position" md-numeric>{{ item.position }}</md-table-cell>-->
          <!--<md-table-cell md-label="Name" md-sort-by="owner">{{ item.owner }}</md-table-cell>-->
          <!--<md-table-cell md-label="Url" md-sort-by="url"><a target="_blank" :href="item.url">{{ item.url }}</a></md-table-cell>-->
          <!--<md-table-cell md-label="Reward" md-sort-by="reward">{{ item.reward }}</md-table-cell>-->
          <!--<md-table-cell md-label="Votes (%)" md-sort-by="votesPercent">{{ (item.votesPercent * 100).toFixed(3) }}</md-table-cell>-->
          <!--<md-table-cell md-label="Select"><md-checkbox v-model="prodToVote" :value="item.owner" class="md-primary"></md-checkbox></md-table-cell>-->
        <!--</md-table-row>-->
      <!--</md-table>-->
    <!--</md-card-content>-->
  </div>
</div>
</template>

<script>
import bl from '@/bl';
import TablePaginations from '@/components/helpers/TablePaginations';
import _ from 'lodash';
import { Tag } from 'element-ui';
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
      pagination: { itemPerPage: 50, totalItems: 0, page: 1 },
      producerToDisplay: [],
      disablePickProd: false,
    };
  },
  components: {
    TablePaginations,
    [Tag.name]: Tag
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
    },
    getAlreadyVoted() {
      if (this.eosAccount && this.eosAccount.voter_info && this.eosAccount.voter_info.producers && this.producers) {
        this.prodToVote = [];
        // eslint-disable-next-line
        for (const prod in this.eosAccount.voter_info.producers) {
          const obj = _.find(this.producers, { owner: this.eosAccount.voter_info.producers[prod] });
          if (obj) {
            this.$set(obj, 'choosed', !obj.choosed);
          }
          this.prodToVote.push(this.eosAccount.voter_info.producers[prod]);
        }
        if (!this.prodToVote.includes('atticlabeosb') && this.prodToVote.length < 30) {
          this.prodToVote.push('atticlabeosb');
          const obj = _.find(this.producers, { owner: 'atticlabeosb' });
          if (obj) {
            this.$set(obj, 'choosed', true);
          }
        }
      }
    },
    getProducers() {
      if (!this.eosApi) return;
      this.eosApi.getTableRows(true, 'eosio', 'eosio', 'global', '', 0, -1, 1)
        .then((response) => {
          this.chainStatus = response.rows[0];
          this.eosApi.getProducers({
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
      const index = _.findIndex(this.producers, { owner: prod });
      if (index >= 0) {
        this.$set(this.producers[index], 'choosed', !choice);
      }
      if (choice) {
        this.prodDeleteHandler(prod);
      } else {
        this.prodToVote.push(prod);
      }
      if (this.prodToVote.length > 2) {
        this.prodToVote = _.uniq(this.prodToVote);
      }

      this.disablePickProd = this.prodToVote.length === 30;
      if (this.prodToVote.length > 30) {
        this.prodToVote.splice(-1);
        console.log(this.producers[index])
        this.$set(this.producers[index], 'choosed', false);
        console.log(this.producers[index])
      }
    },
  },
  created() {
    this.getAlreadyVoted();
    this.getProducers();
  },
  watch: {
    eosAccount() {
      this.getAlreadyVoted();
    },
    eos() {
      this.getProducers();
    },
    pagination: {
      handler() {
        if (this.producers) {
          this.producerToDisplay = this.producers.slice(this.pagination.itemPerPage * (this.pagination.page - 1), this.pagination.itemPerPage * this.pagination.page);
        }
      },
      deep: true,
    },
    producers() {
      if (this.producers) {
        this.producerToDisplay = this.producers.slice(this.pagination.itemPerPage * (this.pagination.page - 1), this.pagination.itemPerPage * this.pagination.page);
      }
    },
  },
};
</script>

<style scoped>
</style>
