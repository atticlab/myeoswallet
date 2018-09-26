<template>
  <div class="content">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-accent">
        <TopBar/>
      </md-app-toolbar>

      <md-app-drawer md-permanent="full">
        <md-toolbar>
          <div class="center"><img class="logo" src="../assets/logo.png"></div>
        </md-toolbar>
        <Menu @changeMenu="menuChange" />
      </md-app-drawer>

      <md-app-content>
        <!--<md-tabs md-sync-route class="md-accent">-->
          <!--<md-tab to="/wallet/dashboard">-->
        <!--<div class="content">-->
        <div class="column">
          <div class="content-dashboard actions">
            <Resources/>
          </div>
          <div class="content-dashboard actions">
            <!--<keep-alive>-->
              <!--<component :is="currentComponent"></component>-->
            <!--</keep-alive>-->
            <router-view/>
          </div>
          <md-card class="content-dashboard md-card-style">
            <md-toolbar class="md-transparent" :md-elevation="0">
              <div class="md-title">Blockchain Raw Data</div>
            </md-toolbar>
            <md-card-content class="transaction-content" id="place-for-transaction">
            </md-card-content>
          </md-card>
        </div>
        <!--</div>-->
          <!--</md-tab>-->
          <!--<md-tab id="tab-faq" md-label="FAQ" to="/wallet/faq">-->
            <!--<router-view/>-->
          <!--</md-tab>-->
        <!--</md-tabs>-->
        <BottomBar/>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Dashboard from './wallet/Dashboard';
import TopBar from './wallet/TopBar';
import Resources from './wallet/Resources';
import Menu from './wallet/Menu';
import Transfer from './wallet/actions/Transfer';
import CreateAccount from './wallet/actions/CreateAccount';
import SetProxy from './wallet/actions/proxy/SetProxy';
import AssignProxy from './wallet/actions/proxy/AssignProxy';
import UnsetProxy from './wallet/actions/proxy/UnsetProxy';
import Vote from './wallet/actions/proxy/Vote';
import { AdvancedPermissions, LinkAuth, Permissions, Ram, Refund, Stake, NameAuction } from './wallet/actions/account';
import { ForumPost, ForumProposal, ForumStatus, ForumVote, Tweet } from './wallet/actions/communityFeatures';
import ClaimRewards from './wallet/actions/blockProducer/ClaimRewards';
import RegisterProducer from './wallet/actions/blockProducer/RegisterProducer';
import AirgrabTokens from './wallet/actions/AirgrabTokens';
import UnregisterProducer from './wallet/actions/blockProducer/UnregisterProducer';

export default {
  name: 'Wallet',
  data() {
    return {
      currentComponent: 'Transfer',
    };
  },
  created() {
    if (this.identity === null) {
      this.$router.push('/');
    }
  },
  computed: {
    ...mapState([
      'identity',
    ]),
  },
  components: {
    TopBar,
    Dashboard,
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

  .content-dashboard {
    margin-top: 5px;
    display: block;
    justify-content: flex-start;
    flex-direction: row;
    height: auto;
    /*flex-grow: 1;*/
    /*background-color: rgba(255, 255, 255, 0);*/
  }

  .content {
    width: 100%;
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    /*background-color: rgba(255, 255, 255, 0);*/
  }
  .md-tabs-navigation {
    padding-right: 10%;
    padding-left: 10%;
  }

  .md-app-content {
    padding: 0;
  }

  .md-tabs {
    background-color: #18191d;
  }

  .md-tab {
    background-color: #18191d;
  }

  .md-tabs-container {
    background-color: #18191d;
  }
  .center {
    margin: 0 auto;
  }

  .md-drawer{
    width: 260px;
  }

  .md-app-content {
    padding-left: 4%;
    padding-right: 4%;
    background-color: #18191d;
  }
  /*.md-app-scroller {*/
    /*background-color: red !important;*/
  /*}*/
</style>
