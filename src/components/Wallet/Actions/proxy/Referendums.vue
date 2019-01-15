<template>
  <div id="main">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header"><h4 class="title">Referendums</h4></div>
          <div class="card-body">
            <div class="row">
              <TextActionAgree/>
            </div>
            <div class="row">
              <div id="proposals" class="col-sm-12" v-for="(proposal, i) in proposals" :key="i">
                <stats-card type="warning"
                            :small-title="proposal.proposal_name"
                            :small-title2="'by ' + proposal.proposer"
                            :title="proposal.proposal_json.content"
                >
                  <div class="stats" slot="footer">
                    <el-tooltip content="vote yes" placement="top">
                      <p-button type="info" round icon class="btn-icon-mini btn-neutral" @click="onVote(proposal.proposal_name, 1)">
                        <i :class="['nc-icon', 'nc-simple-add', proposal.curUser === 1 ? 'green' : '']"></i>
                      </p-button>
                    </el-tooltip>
                    <el-tooltip content="vote no" placement="top">
                      <p-button type="info" round icon class="btn-icon-mini btn-neutral" @click="onVote(proposal.proposal_name, 0)">
                        <i :class="['nc-icon', 'nc-simple-delete', proposal.curUser === 0 ? 'red' : '']"></i>
                      </p-button>
                    </el-tooltip>
                    <el-tooltip content="unvote allows a user to remove their vote" placement="top">
                      <p-button type="info" round icon class="btn-icon-mini btn-neutral" @click="onUnVote(proposal.proposal_name)">
                        <i class="nc-icon nc-simple-remove"></i>
                      </p-button>
                    </el-tooltip>
                    <el-tooltip content="expires" placement="top">
                        <i class="nc-icon nc-time-alarm"> {{ new Date(proposal.expires_at).toLocaleDateString()}}</i>
                    </el-tooltip>
                    <el-tooltip content="yes" placement="top">
                      <i class="nc-icon nc-minimal-up"> {{ proposal.yes }}</i>
                    </el-tooltip>
                    <el-tooltip content="no" placement="top">
                      <i class="nc-icon nc-minimal-down"> {{ proposal.no }}</i>
                    </el-tooltip>

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
import { Tooltip } from 'element-ui';

export default {
  name: 'Referendums',
  components: {
    StatsCard,
    [Tooltip.name]: Tooltip,
  },
  data() {
    return {
      proposals: [],
      voters: [],
      mapProposalsVoter: new Map(),
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
        }
      }
      for (let r of res) { // eslint-disable-line
        r.proposal_json = JSON.parse(r.proposal_json);
        r.yes = 0;
        r.no = 0;
        r.curUser = null;
      }
      this.proposals = res;
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
          // this.$set(r, 'yes', temp.yes);
          // this.$set(r, 'no', temp.no);
          r.no = temp.no;
          r.yes = temp.yes;
          r.curUser = temp.curUser;
        }
      }
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
      if (!this.eos) {
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
          })
          .catch((e) => {
            this[ActionType.SET_TRANSACTION](e);
            bl.handleError(e, 'place-for-transaction');
          });
    },
    updateUser() {
      const curUser = this.getAccountName
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
#proposals .card-title {
  font-size: 0.5em;
}
i.green {
  color: green !important;
}

i.red {
  color: red !important;
}

#proposals button {
  margin-left: 4px;
}
</style>
