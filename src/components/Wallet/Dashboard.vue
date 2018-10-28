<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header"><h4 class="title">Welcome to my eos wallet</h4></div>
        <div class="card-body">
          <div class="row">
            <div class="col-12">
              <p>You must have <a href="http://get-scatter.com/" target="_blank">Scatter</a> installed to safely and securely send transactions to the EOS Network. If you would like to ask any questions check out our
                <a href="https://t.me/atticlabeosb/">Telegram group.</a></p>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <p>MY EOS WALLET offers a free, open-source, client-oriented interface for
                transferring EOS & Tokens.</p>
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
