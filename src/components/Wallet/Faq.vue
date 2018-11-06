<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header"><h3 class="title">FAQ</h3></div>
        <div class="card-body">
          <h4>Transfer</h4>
          <p class="">You can send EOS or EOS tokens to as many users as you like. Please be careful when checking the recipient’s address and remember the memo when sending tokens to exchange.</p>

          <h4>Create account</h4>
          <p class="">Please follow the tips on the background. Enter account name, owner key, active key, cpu, net and ram to stake and click ‘Create Account’.</p>

          <h4>Vote Producer</h4>
          <p class="">Ensure there are tokens available to be staked for CPU and NET
      Select up to 30 Block Producers listed.
      Hit ‘the Vote’ button or reset if you want to change your BP.</p>

          <h4>Register Proxy Info</h4>
          <p class="">The dApp allows EOS proxy accounts to reg and place useful info about themselves, for instance, name, website, philosophy or slogan. This info is placed on the EOS and free for sharing through the portals.
      Please follow all the tips mentioned in the background.</p>

          <h4>Set proxy / Register Proxy Info</h4>
          <p class="">Using a proxy option you can vote on behalf of others who set you as their proxy. Please fill in the proxy info that you want to assign. To resign a proxy you just cancel the weight and ability to vote on behalf of others who set you as their proxy.</p>

          <h4>Unset proxy</h4>
            <p class="">In case you decide to unset your proxy, click ‘Unset Account’. Remember you cancel all the weight given by the votes.</p>

          <h4>Assign proxy</h4>
          <p class="">In case you want to assign a proxy and vote through this option, please fill in the info of your proxy chosen and hit the button on the right column. Please follow the tip on the background.</p>

          <h4>Unassign proxy</h4>
          <p class="">After applying this command, you won’t be able to vote via proxy. You can vote via proxy again by executing the action at <router-link :to="{ name: 'AssignProxy' }">Assign Proxy</router-link></p>

          <h4>Advanced permissions</h4>
          <p class=""><b>Caution:</b> this action makes your account irrecoverable. The permission structures of EOS accounts are complex, and they include parent-child relationships. Parent permissions can alter or remove child permissions. To add or modify permissions, Threshold must have a sum of permission weights. You can add, change and create new permissions. “Weight” is the amount of weight assigned to Threshold by Authority. To meet your multisig requirements, you can add or remove as many rows as you need.</p>

          <h4>Remove a permission</h4>
          <p class="">Specify the Permission and Parent, and leave a single Authority row empty with the default Weight of 1.</p>

          <h4>Link Authorization</h4>
          <p class=""> This option provides special permissions to set some specific actions. You can add special permissions that are allowed to execute specific contract actions. Please fill in the info tipped on the background and click ‘link auth’</p>

          <h4>Unlink Authorization</h4>
          <p class="">If you want to remove a link, indicate the contract name and action.</p>

          <h4>Permission</h4>
          <p class="">Please be aware of the consequences of this action. Mind every permission you assign. If you accidently assign an account instead of a key as a permission, your account will become irrecoverable.</p>

          <h4>Ram</h4>
          <p class="">RAM can’t be transferred between accounts. Users can only buy, sell or delegate RAM. Please follow all the tips on the background.
      Note: Amount indicated in bytes</p>

          <h4>Refund</h4>
          <p class="">Refunding your takes 72 hours. Be aware of the non-immediate action. Please click the button in case you want to refund.</p>

          <h4>Stake</h4>
          <p class="">There are three resources running on the EOS network: CPU, NET and RAM. When staking, you delegate some access to CPU and NET. To stake your tokens, you need to follow the instructions tipped on the background. You can unstake tokens by clicking ‘unstake’, the period of set after the moment of clicking the button is three days.</p>

          <h4>Name action</h4>

          <p class="">Enter the name of the account you wish to buy and your bid and click ‘bid’.</p>

          <h4>Claim reward</h4>
          <p class="">To receive a reward for producing blocks, enter your Block Producer’s account and click ‘claim’</p>

          <h4>Register Producer</h4>
          <p class="">Enter producer key, url and location, following the instructions tipped on the background. Click ‘Register’.</p>

          <h4>Unregister Producer</h4>
          <p class="">If you wish to unregister a Block Producer, enter the account and click ‘unreg producer’.</p>

          <h4>Airgrab tokens</h4>
          <p class="">Look through the list, choose and click ‘AIRGRAB’. You could add any other in case you can’t find your preference on the list. Enjoy the option.</p>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Faq',
};
</script>

<style scoped>
</style>
