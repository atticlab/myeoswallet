<template>
  <div class="content">
    <md-menu md-direction="bottom-start">
      <md-button @click="$emit('changeMenu', 'Transfer')">Transfer</md-button>
    </md-menu>
    <md-menu>
      <md-button @click="$emit('changeMenu', 'CreateAccount')">Create Account</md-button>
    </md-menu>
    <md-menu md-direction="bottom-start">
      <md-button md-menu-trigger>Voting</md-button>
      <md-menu-content>
        <md-menu-item @click="$emit('changeMenu', 'Vote')">Vote producers</md-menu-item>
        <md-menu-item @click="$emit('changeMenu', 'SetProxy')">Set Proxy</md-menu-item>
        <md-menu-item @click="$emit('changeMenu', 'AssignProxy')">Assign Proxy</md-menu-item>
        <md-menu-item @click="$emit('changeMenu', 'UnsetProxy')">Unset Proxy</md-menu-item>
      </md-menu-content>
    </md-menu>
    <md-menu md-direction="bottom-start">
      <md-button md-menu-trigger>Account</md-button>
      <md-menu-content md-menu>
        <md-menu-item @click="$emit('changeMenu', 'AdvancedPermissions')">Advanced Permissions</md-menu-item>
        <md-menu-item @click="$emit('changeMenu', 'LinkAuth')">Link Auth</md-menu-item>
        <md-menu-item @click="$emit('changeMenu', 'Permissions')">Permissions</md-menu-item>
        <md-menu-item @click="$emit('changeMenu', 'Ram')">Ram</md-menu-item>
        <md-menu-item @click="$emit('changeMenu', 'Refund')">Refund</md-menu-item>
        <md-menu-item @click="$emit('changeMenu', 'Stake')">Stake</md-menu-item>
        <md-menu-item @click="$emit('changeMenu', 'NameAuction')">Name Auction</md-menu-item>
      </md-menu-content>
    </md-menu>
    <md-menu md-direction="bottom-start">
      <md-button md-menu-trigger>Producer</md-button>
      <md-menu-content>
        <md-menu-item @click="$emit('changeMenu', 'ClaimRewards')">Claim Rewards</md-menu-item>
        <md-menu-item @click="$emit('changeMenu', 'RegisterProducer')">Reg Producer</md-menu-item>
        <md-menu-item @click="$emit('changeMenu', 'UnregisterProducer')">Unreg Producer</md-menu-item>
      </md-menu-content>
    </md-menu>

    <md-menu md-direction="bottom-start">
      <md-button @click="$emit('changeMenu', 'AirgrabTokens')">Airgrab Tokens</md-button>
    </md-menu>

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
  </div>
</template>

<script>
export default {
  name: 'Menu',
};
</script>

<style scoped>

</style>
