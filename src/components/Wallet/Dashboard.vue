<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header"><h4 class="title">Welcome to my eos wallet</h4></div>
        <div class="card-body">
          <div class="row">
            <div class="col-12">
              <p>You must have <a href="http://get-scatter.com/" target="_blank">Scatter</a> installed to safely and securely send transactions to the EOS Network. If you have any questions, check out our
                <a href="https://t.me/myeoswallet_support" target="_blank"> Support.</a></p>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <p>MY EOS WALLET offers a free, open-source, client-oriented interface for
                transferring EOS & Tokens.</p>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <p>If you are going to <b>use Scatter</b>, we recommend Google Chrome, Opera or Mozilla Firefox.
                <br>If you are planning to <b>use Ledger</b>, we recommend using Google Chrome.
                <br>However, note that some of the wallet functions are not supported by the Ledger.
              </p>
              <p>The functions that are <b>not supported</b> by ledger:</p>
              <ul>
                <li>Create Account</li>
                <li>Set / Unset proxy</li>
                <li>Permissions</li>
                <li>Claim Rewards</li>
                <li>Register / Unregister Producer</li>
                <li>Airgrab</li>
                <li>Other actions with smart contracts different from eosio and eosio.token</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      currentComponent: 'Transfer',
    };
  },
};
</script>

<!--<style lang="scss" scoped>-->

  <!--.column {-->
    <!--display: flex;-->
    <!--flex-direction: column;-->
    <!--justify-content: flex-start;-->
    <!--background-color: rgba(255, 255, 255, 0);-->
  <!--}-->

  <!--.content {-->
    <!--margin-top: 5px;-->
    <!--display: block;-->
    <!--justify-content: flex-start;-->
    <!--flex-direction: row;-->
    <!--height: auto;-->
    <!--/*flex-grow: 1;*/-->
    <!--/*background-color: rgba(255, 255, 255, 0);*/-->
  <!--}-->

  <!--.transaction-content {-->
    <!--display: flex;-->
    <!--flex-direction: column;-->
    <!--align-items: flex-start;-->
    <!--word-break: break-all;-->
    <!--word-break-wrap: break-word;-->
    <!--overflow-x: auto;-->
  <!--}-->
  <!--.md-card-style {-->
    <!--/*border: 2px rgb(233, 236, 239) solid;*/-->
    <!--box-shadow: none;-->
    <!--/*border-radius: 2px;*/-->
    <!--/*background-color: #fff;*/-->
  <!--}-->
  <!--.md-title {-->
    <!--font-size: 20px;-->
    <!--color: #7ac231 !important;-->
  <!--}-->

  <!--.md-card {-->
    <!--margin-left: 0;-->
    <!--margin-right: 0;-->
  <!--}-->
<!--</style>-->

<style scoped>
  .md-card p {
    margin: 5px 5px;
  }
</style>
