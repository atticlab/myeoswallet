<template>
  <div id="main">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header"><h4 class="title">Referendums</h4></div>
          <div class="card-body">
            <div class="row">
              <div class="col-8">
                <TextActionAgree/>
              </div>
              <div class="col-4">
                <div class="pull-right">
                <p-pagination class=""
                              v-model="pagination.page"
                              :per-page="pagination.itemPerPage"
                              :total="pagination.totalItems">
                </p-pagination>
                <p class="text-right">
                  <p-button type="primary" @click="getProposals" :disabled="!isLoaded">
                    Refresh
                  </p-button>
                </p>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12 proposals" v-for="(proposal, i) in proposalsToDisplay" :key="i">
                <stats-card type="warning"
                            :small-title="proposal.proposal_name"
                            :small-title2="'by ' + proposal.proposer"
                            :title="proposal.proposal_json.content"
                >
                  <div class="stats" slot="footer">
                    <el-tooltip content="vote yes" placement="top">
                      <p-button type="info" round icon class="btn-icon-mini btn-neutral proposal-action" @click="onVote(proposal.proposal_name, 1)">
                        <i :class="['nc-icon', 'nc-simple-add', proposal.curUser === 1 ? 'green' : '']"></i>
                      </p-button>
                    </el-tooltip>
                    <el-tooltip content="vote no" placement="top">
                      <p-button type="info" round icon class="btn-icon-mini btn-neutral proposal-action" @click="onVote(proposal.proposal_name, 0)">
                        <i :class="['nc-icon', 'nc-simple-delete', proposal.curUser === 0 ? 'red' : '']"></i>
                      </p-button>
                    </el-tooltip>
                    <el-tooltip content="unvote allows a user to remove their vote" placement="top">
                      <p-button type="info" round icon class="btn-icon-mini btn-neutral proposal-action" @click="onUnVote(proposal.proposal_name)">
                        <i class="nc-icon nc-simple-remove"></i>
                      </p-button>
                    </el-tooltip>
                    <div class="proposal-info">
                      <el-tooltip content="expires" placement="top">
                          <i class="nc-icon nc-time-alarm"> {{ new Date(proposal.expires_at).toLocaleDateString()}}</i>
                      </el-tooltip>
                      <el-tooltip content="yes" placement="top">
                        <i class="nc-icon nc-minimal-up"> {{ proposal.yes }}</i>
                      </el-tooltip>
                      <el-tooltip content="no" placement="top">
                        <i class="nc-icon nc-minimal-down"> {{ proposal.no }}</i>
                      </el-tooltip>
                    </div>
                    <el-tooltip content="expire is used to modify the value of expires_at to the current time" placement="top">
                      <p-button type="primary" class="pull-right" @click="onExpire(proposal.proposal_name)">
                        expire
                      </p-button>
                    </el-tooltip>
                    <el-tooltip content="this action is used to clear the RAM being used to store all information " placement="top">
                      <p-button id="oncleanbutton" type="primary" class="pull-right" @click="onClean(proposal.proposal_name)">
                        clean
                      </p-button>
                    </el-tooltip>
                  </div>
                </stats-card>
              </div>
            </div>
            <!--pagination-->
            <div class="row mt-3">
              <div class="col">
                <div class="pull-right">
                  <p-pagination
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
  </div>
</template>

<script>
import bl from '@/bl';
import { mapActions, mapGetters, mapState } from 'vuex';
import ActionType from '../../../../store/constants';
import StatsCard from 'src/components/UIComponents/Cards/StatsCard';
import PPagination from 'src/components/UIComponents/Pagination.vue';
import { Tooltip } from 'element-ui';

export default {
  name: 'Referendums',
  components: {
    StatsCard,
    [Tooltip.name]: Tooltip,
    PPagination,
  },
  data() {
    return {
      proposals: [],
      proposalsToDisplay: [],
      voters: [],
      mapProposalsVoter: new Map(),
      isLoaded: false,
      pagination: { itemPerPage: 50, totalItems: 0, page: 1 },
    };
  },
  mounted() {
    this.getProposals();
  },
  watch: {
    eosApi() {
      this.getProposals();
      this.updateUser();
    },
    getAccountName() {
      this.updateUser();
    },
    pagination: {
      handler() {
        if (this.proposals) {
          this.proposalsToDisplay = this.proposals.slice(this.pagination.itemPerPage * (this.pagination.page - 1), this.pagination.itemPerPage * this.pagination.page);
        }
      },
      deep: true,
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

      this.isLoaded = false;
      this.proposals = []
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
          bl.handleError(e);
          this.isLoaded = true;
        }
      }
      for (let i = 0; i < res.length; i++) { // eslint-disable-line
        if (res[i].expires_at && new Date((res[i].expires_at)).getTime() < new Date().getTime()) {
          delete res[i]
          continue // eslint-disable-line
        }
        res[i].proposal_json = JSON.parse(res[i].proposal_json);
        res[i].yes = 0;
        res[i].no = 0;
        res[i].curUser = null;
      }
      this.proposals = res.filter(el => el);
      this.pagination.totalItems = this.proposals.length;
      this.getVoters();
    },
    async getVoters() {
      if (!this.eosApi) return;

      this.mapProposalsVoter = new Map()
      let lowerBound = 0
      let tempRes = []
      let res = []
      while (1) {
        try {
          tempRes = await this.eosApi.getTableRows({ //eslint-disable-line
            code: 'eosio.forum',
            scope: 'eosio.forum',
            table: 'vote',
            json: true,
            lower_bound: lowerBound,
            limit: 1000,
          });
          if (!tempRes || !tempRes.rows || !tempRes.rows.length) break;

          res = res.concat(tempRes.rows);
          lowerBound = tempRes.rows[tempRes.rows.length - 1].id;
          if (!tempRes.more) break;
        } catch (e) {
          bl.handleError(e);
          this.isLoaded = true;
        }
      }
      const curUser = this.getAccountName
      for (const v of res) { // eslint-disable-line
        if (!this.mapProposalsVoter.has(v.proposal_name)) {
          this.mapProposalsVoter.set(v.proposal_name, {
            yes: 0,
            no: 0,
            curUser: null,
          });
        }
        if (v.vote) {
          this.mapProposalsVoter.get(v.proposal_name).yes += 1;
        } else {
          this.mapProposalsVoter.get(v.proposal_name).no += 1;
        }
        if (curUser && v.voter === curUser) {
          this.mapProposalsVoter.get(v.proposal_name).curUser = v.vote;
        }
      }
      this.voters = res;

      for (let r of this.proposals) { // eslint-disable-line
        if (this.mapProposalsVoter.has(r.proposal_name)) {
          const temp = this.mapProposalsVoter.get(r.proposal_name)
          r.no = temp.no;
          r.yes = temp.yes;
          r.total = temp.no + temp.yes;
          r.curUser = temp.curUser;
        }
      }
      this.proposals.sort((a, b) => b.total - a.total);
      this.isLoaded = true;
      // setTimeout(() => this.getVoters(), 30000);
    },
    onExpire(proposalName) {
      if (!proposalName) {
        return;
      }

      this.eosForumWrapper('expire', {
        proposal_name: proposalName,
      });
    },
    onClean(proposalName) {
      if (!proposalName) {
        return;
      }

      this.eosForumWrapper('clnproposal', {
        proposal_name: proposalName,
        max_count: 100,
      });
    },
    onVote(proposalName, vote) {
      if (!proposalName || vote === undefined) {
        return;
      }

      this.eosForumWrapper('vote', {
        voter: this.getAccountName,
        proposal_name: proposalName,
        vote: vote ? 1 : 0,
        vote_json: '',
      });
    }, // onVote
    onUnVote(proposalName) {
      if (!proposalName) {
        return;
      }
      this.eosForumWrapper('unvote', {
        voter: this.getAccountName,
        proposal_name: proposalName,
      });
    },
    eosForumWrapper(action, data) {
      if (!this.getAccountName) {
        bl.logInPopUP();
        return;
      }

      this.eos.transaction(
        {
          actions: [
            {
              account: 'eosio.forum',
              name: action,
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
          this.getVoters();
        })
        .catch((e) => {
          this[ActionType.SET_TRANSACTION](e);
          bl.handleError(e, 'place-for-transaction');
        });
    },
    updateUser() {
      const curUser = this.getAccountName;
      if (!curUser) return;

      for (const v of this.voters) { // eslint-disable-line
        if (v.voter === curUser) {
          this.mapProposalsVoter.get(v.proposal_name).curUser = v.vote;
        } else {
          this.mapProposalsVoter.get(v.proposal_name).curUser = null;
        }
      }
      for (let r of this.proposals) { // eslint-disable-line
        if (this.mapProposalsVoter.has(r.proposal_name)) {
          r.curUser = this.mapProposalsVoter.get(r.proposal_name).curUser;
        }
      }
    },
  },
};
</script>

<style>
i.green {
  color: green !important;
}

i.red {
  color: red !important;
}

.proposals button {
  margin-left: 4px !important;
}

.proposals p {
  font-size: 0.5em;
}

.proposals h1 {
  font-size: 1em;
}

.proposals h2 {
  font-size: 0.9em;
}

.proposals h3 {
  font-size: 0.8em;
}

.proposals h4 {
  font-size: 0.7em;
}

.proposals li {
  font-size: 0.5em;
}

.proposals li p {
  font-size: 1em;
}
.proposals .proposal-action {
  padding-left: 8px;
}
.proposal-info {
  vertical-align: -webkit-baseline-middle;
  display: inline-block;
  margin-left: 20px;
}
.proposals button {
  margin-top: 2px !important;
}
.text-right {
  text-align: right;
}
</style>
