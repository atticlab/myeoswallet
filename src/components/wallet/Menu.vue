<template>
  <!--<div class="content">-->
  <div class="full-control">
    <div class="list">
      <md-list>
        <md-list-item :to="{ name: 'Dashboard' }">
          <span class="md-list-item-text">
            <img src="../../assets/icons/dashboard.svg"/>
            Dashboard
          </span>
        </md-list-item>

        <md-list-item :to="{ name: 'Transfer' }">
          <span class="md-list-item-text">
            <img src="../../assets/icons/transfer.svg"/>
            Transfer
          </span>
        </md-list-item>

        <md-list-item :to="{ name: 'CreateAccount' }">
          <span class="md-list-item-text">
            <img src="../../assets/icons/createaccount.svg"/>
            Create Account
          </span>
        </md-list-item>

        <md-list-item md-expand>
          <span class="md-list-item-text">
            <img src="../../assets/icons/voting.svg"/>
            Voting
          </span>

          <md-list slot="md-expand">
            <md-list-item class="md-inset" :to="{ name: 'Vote'}">Vote</md-list-item>
            <md-list-item class="md-inset" :to="{ name: 'SetProxy'}">Set Proxy</md-list-item>
            <md-list-item class="md-inset" :to="{ name: 'AssignProxy'}">Assign Proxy</md-list-item>
            <md-list-item class="md-inset" :to="{ name: 'UnsetProxy'}">Unset Proxy</md-list-item>
          </md-list>
        </md-list-item>

        <md-list-item md-expand>
          <span class="md-list-item-text">
            <img src="../../assets/icons/manage.svg"/>
            Manage
          </span>

          <md-list slot="md-expand">
            <md-list-item class="md-inset" :to="{ name: 'AdvancedPermissions'}">Advanced Permissions</md-list-item>
            <md-list-item class="md-inset" :to="{ name: 'LinkAuth'}">Link Auth</md-list-item>
            <md-list-item class="md-inset" :to="{ name: 'Ram'}">Ram</md-list-item>
            <md-list-item class="md-inset" :to="{ name: 'Refund'}">Refund</md-list-item>
            <md-list-item class="md-inset" :to="{ name: 'Stake'}">Stake</md-list-item>
            <md-list-item class="md-inset" :to="{ name: 'NameAuction'}">Name Auction</md-list-item>
          </md-list>
        </md-list-item>

        <md-list-item md-expand>
          <span class="md-list-item-text">
            <img src="../../assets/icons/producer.svg"/>
            Producer
          </span>

          <md-list slot="md-expand">
            <md-list-item class="md-inset" :to="{ name: 'ClaimRewards'}">Claim Rewards</md-list-item>
            <md-list-item class="md-inset" :to="{ name: 'RegisterProducer'}">Register Producer</md-list-item>
            <md-list-item class="md-inset" :to="{ name: 'UnregisterProducer'}">Unregister Producer</md-list-item>
          </md-list>
        </md-list-item>

        <md-list-item :to="{ name: 'AirgrabTokens' }">
          <span class="md-list-item-text">
            <img src="../../assets/icons/airgrabtoken.svg"/>
            Airgrab Tokens
          </span>
        </md-list-item>

        <md-list-item :to="{ name: 'Faq' }">
          <span class="md-list-item-text">
            <img src="../../assets/icons/faq.svg"/>
            Tutorials
          </span>
        </md-list-item>
      </md-list>
    </div>
  </div>

    <!--<md-menu md-direction="bottom-start" md-active>-->
      <!--<md-button @click="$router.push({ name: 'Dashboard' })">-->
        <!--<img src="../../assets/icons/dashboard.svg"/> Dashboard</md-button>-->
    <!--</md-menu>-->
    <!--<md-menu md-direction="bottom-start">-->
      <!--<md-button :to="{ name: 'Transfer' }">-->
        <!--<img src="../../assets/icons/transfer.svg"/> Transfer</md-button>-->
    <!--</md-menu>-->
    <!--<md-menu>-->
      <!--<md-button :to="{ name: 'CreateAccount' }">-->
        <!--<img src="../../assets/icons/createaccount.svg"/> Create Account</md-button>-->
    <!--</md-menu>-->

    <!--<md-menu md-direction="bottom-start">-->
      <!--<md-button md-menu-trigger >-->
        <!--<img src="../../assets/icons/voting.svg"/> Voting-->
        <!--<md-icon class="fas fa-band-aid"></md-icon>-->
      <!--</md-button>-->
      <!--<md-menu-content>-->
        <!--<md-menu-item :to="{ name: 'Vote'}">Vote producers</md-menu-item>-->
        <!--<md-menu-item :to="{ name: 'SetProxy'}">Set Proxy</md-menu-item>-->
        <!--<md-menu-item :to="{ name: 'AssignProxy'}">Assign Proxy</md-menu-item>-->
        <!--<md-menu-item :to="{ name: 'UnsetProxy'}">Unset Proxy</md-menu-item>-->
      <!--</md-menu-content>-->
    <!--</md-menu>-->

    <!--<md-menu md-direction="bottom-start">-->
      <!--<md-button md-menu-trigger>-->
        <!--<img src="../../assets/icons/manage.svg"/> Manage</md-button>-->
      <!--<md-menu-content md-menu>-->
        <!--<md-menu-item :to="{ name: 'AdvancedPermissions'}">Advanced Permissions</md-menu-item>-->
        <!--<md-menu-item :to="{ name: 'LinkAuth'}">Link Auth</md-menu-item>-->
        <!--<md-menu-item :to="{ name: 'Permissions'}">Permissions</md-menu-item>-->
        <!--<md-menu-item :to="{ name: 'Ram'}">Ram</md-menu-item>-->
        <!--<md-menu-item :to="{ name: 'Refund'}">Refund</md-menu-item>-->
        <!--<md-menu-item :to="{ name: 'Stake'}">Stake</md-menu-item>-->
        <!--<md-menu-item :to="{ name: 'NameAuction'}">Name Auction</md-menu-item>-->
      <!--</md-menu-content>-->
    <!--</md-menu>-->
    <!--<md-menu md-direction="bottom-start">-->
      <!--<md-button md-menu-trigger>-->
        <!--<img src="../../assets/icons/producer.svg"/> Producer</md-button>-->
      <!--<md-menu-content>-->
        <!--<md-menu-item :to="{ name: 'ClaimRewards' }">Claim Rewards</md-menu-item>-->
        <!--<md-menu-item :to="{ name: 'RegisterProducer' }">Reg Producer</md-menu-item>-->
        <!--<md-menu-item :to="{ name: 'UnregisterProducer' }">Unreg Producer</md-menu-item>-->
      <!--</md-menu-content>-->
    <!--</md-menu>-->

    <!--<md-menu md-direction="bottom-start">-->
      <!--<md-button :to="{ name: 'AirgrabTokens' }">-->
        <!--<img src="../../assets/icons/airgrabtoken.svg"/> Airgrab Tokens</md-button>-->
    <!--</md-menu>-->

    <!--<md-menu md-direction="bottom-start">-->
      <!--<md-button :to="{ name: 'Faq' }">-->
        <!--<img src="../../assets/icons/faq.svg"/> Tutorials</md-button>-->
    <!--</md-menu>-->
    <!--<md-menu md-direction="bottom-start" md-active>-->
      <!--<md-button @click="$router.push({ name: 'Dashboard' })">-->
        <!--<img src="../../assets/icons/dashboard.svg"/> Dashboard</md-button>-->
    <!--</md-menu>-->
    <!--<md-menu md-direction="bottom-start">-->
      <!--<md-button :to="{ name: 'Transfer' }">-->
        <!--<img src="../../assets/icons/transfer.svg"/> Transfer</md-button>-->
    <!--</md-menu>-->
    <!--<md-menu>-->
      <!--<md-button :to="{ name: 'CreateAccount' }">-->
        <!--<img src="../../assets/icons/createaccount.svg"/> Create Account</md-button>-->
    <!--</md-menu>-->

    <!--<md-menu md-direction="bottom-start">-->
      <!--<md-button md-menu-trigger >-->
        <!--<img src="../../assets/icons/voting.svg"/> Voting-->
        <!--<md-icon class="fas fa-band-aid"></md-icon>-->
      <!--</md-button>-->
      <!--<md-menu-content>-->
        <!--<md-menu-item :to="{ name: 'Vote'}">Vote producers</md-menu-item>-->
        <!--<md-menu-item :to="{ name: 'SetProxy'}">Set Proxy</md-menu-item>-->
        <!--<md-menu-item :to="{ name: 'AssignProxy'}">Assign Proxy</md-menu-item>-->
        <!--<md-menu-item :to="{ name: 'UnsetProxy'}">Unset Proxy</md-menu-item>-->
      <!--</md-menu-content>-->
    <!--</md-menu>-->

    <!--<md-menu md-direction="bottom-start">-->
      <!--<md-button md-menu-trigger>-->
        <!--<img src="../../assets/icons/manage.svg"/> Manage</md-button>-->
      <!--<md-menu-content md-menu>-->
        <!--<md-menu-item :to="{ name: 'AdvancedPermissions'}">Advanced Permissions</md-menu-item>-->
        <!--<md-menu-item :to="{ name: 'LinkAuth'}">Link Auth</md-menu-item>-->
        <!--<md-menu-item :to="{ name: 'Permissions'}">Permissions</md-menu-item>-->
        <!--<md-menu-item :to="{ name: 'Ram'}">Ram</md-menu-item>-->
        <!--<md-menu-item :to="{ name: 'Refund'}">Refund</md-menu-item>-->
        <!--<md-menu-item :to="{ name: 'Stake'}">Stake</md-menu-item>-->
        <!--<md-menu-item :to="{ name: 'NameAuction'}">Name Auction</md-menu-item>-->
      <!--</md-menu-content>-->
    <!--</md-menu>-->
    <!--<md-menu md-direction="bottom-start">-->
      <!--<md-button md-menu-trigger>-->
        <!--<img src="../../assets/icons/producer.svg"/> Producer</md-button>-->
      <!--<md-menu-content>-->
        <!--<md-menu-item :to="{ name: 'ClaimRewards' }">Claim Rewards</md-menu-item>-->
        <!--<md-menu-item :to="{ name: 'RegisterProducer' }">Reg Producer</md-menu-item>-->
        <!--<md-menu-item :to="{ name: 'UnregisterProducer' }">Unreg Producer</md-menu-item>-->
      <!--</md-menu-content>-->
    <!--</md-menu>-->

    <!--<md-menu md-direction="bottom-start">-->
      <!--<md-button :to="{ name: 'AirgrabTokens' }">-->
        <!--<img src="../../assets/icons/airgrabtoken.svg"/> Airgrab Tokens</md-button>-->
    <!--</md-menu>-->

    <!--<md-menu md-direction="bottom-start">-->
      <!--<md-button :to="{ name: 'Faq' }">-->
        <!--<img src="../../assets/icons/faq.svg"/> Tutorials</md-button>-->
    <!--</md-menu>-->

    <!--<md-menu md-direction="bottom-start">-->
      <!--<md-button md-menu-trigger>Community Features</md-button>-->
      <!--<md-menu-content>-->
        <!--<md-menu-item @click="$emit('changeMenu', 'ForumStatus')">Forum Status</md-menu-item>-->
        <!--&lt;!&ndash;<md-menu-item @click="$emit('changeMenu', 'ForumPost')">Forum Post</md-menu-item>&ndash;&gt;-->
        <!--&lt;!&ndash;<md-menu-item @click="$emit('changeMenu', 'ForumProposal')">Forum Proposal</md-menu-item>&ndash;&gt;-->
        <!--&lt;!&ndash;<md-menu-item @click="$emit('changeMenu', 'ForumVote')">Forum Vote</md-menu-item>&ndash;&gt;-->
        <!--<md-menu-item @click="$emit('changeMenu', 'Tweet')">Tweet</md-menu-item>-->
      <!--</md-menu-content>-->
    <!--</md-menu>-->
  <!--</div>-->
</template>

<script>
export default {
  name: 'Menu',
};
</script>

<style scoped>
  .content {
    display: flex;
    align-items: left;
    text-align: left;
    margin-left: 30px;
    margin-top: 20px;
    flex-direction: column;
  }
  .content button {
    /*width: 100%;*/
    text-align: left;
    /*display: inline !important;;*/
  }

  .content button .md-ripple {
    justify-content: left !important;
  }
  .md-button .md-ripple {
    /*justify-content: left !important;*/
  }
  .md-menu {
    /*display: flex;*/
    align-content: left;
    margin-top: 10px;
  }
  .md-menu img {
    margin-right: 5px;
  }
  .fa-band-aid {
    color: red !important;
  }
</style>

<style lang="scss" scoped>
  img.white {
    /*fill: red !important;*/
    /*color: red;*/
  }
  .list img {
    width: 16px;
    display: inline;
    margin-right: 4px;
    /*fill: white !important;*/
    /*background-color: transparent;*/
  }
  .md-list-item-text {
    display: inline;
  }

  .md-list.md-theme-default {
    background-color: #2a2b31 !important;
  }
</style>
