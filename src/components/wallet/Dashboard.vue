<template>
  <md-card class="md-card-style md-layout-item">
    <md-toolbar class="md-transparent" :md-elevation="0">
      <div class="md-title">Welcome to my eos wallet</div>
    </md-toolbar>
    <md-card-content class="alw-first-child">
      <p>You must have <a href="http://get-scatter.com/" target="_blank">Scatter</a> installed to safely and securely send transactions to the EOS Network. If you would like to ask any questions check out our
        <a href="https://t.me/atticlabeosb/">Telegram group.</a></p>
    </md-card-content>
    <md-card-content>
      <p>MY EOS WALLET offers a free, open-source, client-oriented interface for
        transferring EOS & Tokens.</p>
    </md-card-content>
  </md-card>
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
  @import '../../assets/css/walletaction.css';
  .md-card p {
    margin: 5px 5px;
  }
</style>
