<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header"><h3 class="title">FAQ</h3></div>
        <div class="card-body">
          <h4>Transfer</h4>

          <p class="">Please fill in the info tipped on the background and transfer your tokens.</p>

          <h4>Create acc</h4>
          <p class="">Please follow up the tips on the background. Enter account name, owner key, active key, cpu, net and ram to stake and hit the button ‘create account’.</p>

          <h4>Vote Prod</h4>
          <p class="">Ensure there are tokens available to be staked for CPU and NET
      Select up to 30 Block Producers listed.
      Hit ‘the Vote’ button or reset if you want to change your BP.</p>

          <h4>Set proxy / Register Proxy Info</h4>
          <p class="">Using a proxy option you can vote on behalf of others who set you as their proxy. Please fill in the proxy info that you want to assign. To resign a proxy you just cancel the weight and ability to vote on behalf of others who set you as their proxy.</p>

          <h4>Register Proxy Info</h4>
          <p class="">The dApp allows EOS proxy accounts to reg and place useful info about themselves, for instance, name, website, philosophy or slogan. This info is placed on the EOS and free for sharing through the portals.
      Please follow all the tips mentioned in the background.</p>

          <h4>Assign proxy</h4>
          <p class="">In case you want to assign a proxy and vote through this option, please fill in the info of your proxy chosen and hit the button on the right column. Please follow the tip on the background.</p>

          <h4>Unset proxy</h4>
          <p class="">In case you decided to resign your proxy, click the button ‘Unreg’. Remember you cancel all the weight given by the votes.
      Advanced permissions
      By this very action, you make your account irrecoverable.
      EOS accounts are based on complex permission structures, which include parent&child relationships, where parent ones are empowered to influence child ones: to change, remove the child permissions.
      Adding or modifying permissions
      Threshold needs a sum of permission weights to execute an action.
      You can add and change permissions, create new permissions, any other possibilities.
      Weight means some measure of weight the Authority provides to the Threshold.
      You can add or remove rows as required to meet your multisig requirements.</p>

          <h4>Remove a permission</h4>
          <p class="">Specify the Permission and Parent, and leave a single Authority row empty with the default Weight of 1.</p>

          <h4>Link auth</h4>
          <p class="">Special permissions to set some specific actions are available through the option.
      You can create special permissions on your account that are allowed to execute specific contract actions.
      Please fill in the info tipped on the background and hit the button ‘link auth’.</p>

          <h4>Unlink Authorization</h4>
          <p class="">If you want to remove a link simply, specify correctly the contract name and action.</p>

          <h4>Permission</h4>

          <p class="">Pay special attention this action has tangible consequences
      Control every permission you assign.
      If you mix up and assign an account instead of a key, as permission, you risk to break down your account</p>

          <h4>Ram</h4>

          <p class="">RAM can’t be transferred between accounts. Users can only buy, sell or delegate RAM. Please follow all the tips on the background.
      Note: Amount indicated in bytes</p>

          <h4>Refund</h4>
          <p class="">efunding your stake requires a 72-hour period. Be aware of the non-immediate action. Please hit the button in case you want to refund.</p>


          <h4>Stake</h4>
          <p class="">There are 3 Resources CPU, NET and RAM, running on the EOS network. Staking, you delegate some access for CPU and NET.
      To stake your tokens you need to follow up the instructions tipped on the background. Unstake the tokens you could by using ‘unstake’ button with 3 days period time set since the moment of hitting the button ‘unstake’.</p>

          <h4>Name action</h4>

          <p class="">Enter a name you wish to bid on.
      Enter the amount you wish to bid.
      Click the button.</p>

          <h4>Claim reward</h4>

          <p class="">Please follow up all the tips and messages pop-uped on the background.</p>

          <h4>Reg Producer</h4>

          <p class="">Enter producer key, url and location, following the instructions tipped on the background.
      Click the button ‘register’.</p>

          <h4>Unreg Prod</h4>

          <p class="">Click the button ‘unreg producer’.</p>

          <h4>Airgrab tokens</h4>

          <p class="">Look through the list, chose and hit the button ‘airgrab tokens’. You could add any other in case you can’t find your preference on the list. Enjoy the option.</p>

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
