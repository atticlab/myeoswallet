<template>
  <div class="column">
    <Menu @changeMenu="menuChange" />
    <div class="content actions">
      <Resources/>
    </div>
    <div class="content actions">
      <keep-alive>
        <component :is="currentComponent"></component>
      </keep-alive>
    </div>
    <md-card class="content md-card-style">
      <md-toolbar class="md-transparent" :md-elevation="0">
        <div class="md-title">Blockchain Raw Data</div>
      </md-toolbar>
      <md-card-content class="transaction-content" id="place-for-transaction">
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Resources from './Resources';
import Menu from './Menu';
import Transfer from './actions/Transfer';
import CreateAccount from './actions/CreateAccount';
import SetProxy from './actions/proxy/SetProxy';
import AssignProxy from './actions/proxy/AssignProxy';
import UnsetProxy from './actions/proxy/UnsetProxy';
import Vote from './actions/proxy/Vote';
import { AdvancedPermissions, LinkAuth, Permissions, Ram, Refund, Stake, NameAuction } from './actions/account';
import { ForumPost, ForumProposal, ForumStatus, ForumVote, Tweet } from './actions/communityFeatures';
import ClaimRewards from './actions/blockProducer/ClaimRewards';
import RegisterProducer from './actions/blockProducer/RegisterProducer';
import AirgrabTokens from './actions/AirgrabTokens';
import UnregisterProducer from './actions/blockProducer/UnregisterProducer';

export default {
  name: 'Dashboard',
  components: {
    Menu,
    Resources,
    CreateAccount,
    Transfer,
    SetProxy,
    AssignProxy,
    UnsetProxy,
    Vote,
    AdvancedPermissions,
    LinkAuth,
    Permissions,
    Ram,
    Refund,
    Stake,
    NameAuction,
    ClaimRewards,
    RegisterProducer,
    AirgrabTokens,
    UnregisterProducer,
    ForumPost,
    ForumProposal,
    ForumStatus,
    ForumVote,
    Tweet,
  },
  computed: {
    ...mapState([
      'transaction',
    ]),
  },
  data() {
    return {
      currentComponent: 'Transfer',
    };
  },
  methods: {
    menuChange(val) {
      this.currentComponent = val;
    },
  },
};
</script>

<style lang="scss" scoped>

  .column {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background-color: rgba(255, 255, 255, 0);
  }

  .content {
    margin-top: 5px;
    display: block;
    justify-content: flex-start;
    flex-direction: row;
    height: auto;
    /*flex-grow: 1;*/
    background-color: rgba(255, 255, 255, 0);
  }

  .transaction-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    word-break: break-all;
    word-break-wrap: break-word;
    overflow-x: auto;
  }
  .md-card-style {
    border: 2px rgb(233, 236, 239) solid;
    box-shadow: none;
    border-radius: 2px;
    background-color: #fff;
  }
  .md-title {
    font-size: 20px;
  }
</style>
