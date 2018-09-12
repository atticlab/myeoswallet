<template>
  <div class="column">
    <div class="content">
      <md-menu md-direction="bottom-start">
        <md-button @click="currentComponent = 'Transfer'">Transfer</md-button>
      </md-menu>
      <md-menu>
        <md-button @click="currentComponent = 'CreateAccount'">Create Account</md-button>
      </md-menu>
      <md-menu md-direction="bottom-start">
        <md-button md-menu-trigger>Voting</md-button>
        <md-menu-content>
          <md-menu-item @click="currentComponent = 'Vote'">Vote producers</md-menu-item>
          <md-menu-item @click="currentComponent = 'SetProxy'">Set Proxy</md-menu-item>
          <md-menu-item @click="currentComponent = 'AssignProxy'">Assign Proxy</md-menu-item>
          <md-menu-item @click="currentComponent = 'UnsetProxy'">Unset Proxy</md-menu-item>
        </md-menu-content>
      </md-menu>
      <md-menu md-direction="bottom-start">
        <md-button md-menu-trigger>Account</md-button>
        <md-menu-content md-menu>
          <md-menu-item @click="currentComponent = 'AdvancedPermissions'">Advanced Permissions</md-menu-item>
          <md-menu-item @click="currentComponent = 'LinkAuth'">Link Auth</md-menu-item>
          <md-menu-item @click="currentComponent = 'Permissions'">Permissions</md-menu-item>
          <md-menu-item @click="currentComponent = 'Ram'">Ram</md-menu-item>
          <md-menu-item @click="currentComponent = 'Refund'">Refund</md-menu-item>
          <md-menu-item @click="currentComponent = 'Stake'">Stake</md-menu-item>
        </md-menu-content>
      </md-menu>
      <md-menu>
        <md-button @click="currentComponent = 'ClaimRewards'">Claim Rewards</md-button>
      </md-menu>
    </div>
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
import Transfer from './actions/Transfer';
import CreateAccount from './actions/CreateAccount';
import SetProxy from './actions/proxy/SetProxy';
import AssignProxy from './actions/proxy/AssignProxy';
import UnsetProxy from './actions/proxy/UnsetProxy';
import Vote from './actions/proxy/Vote';
import { AdvancedPermissions, LinkAuth, Permissions, Ram, Refund, Stake } from './actions/stake';
import ClaimRewards from './actions/blockProducer/ClaimRewards';

export default {
  name: 'Dashboard',
  components: {
    CreateAccount,
    Transfer,
    Resources,
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
    ClaimRewards,
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
  /*.actions {*/
    /*height: 370px; !* TODO: review *!*/
  /*}*/

</style>
