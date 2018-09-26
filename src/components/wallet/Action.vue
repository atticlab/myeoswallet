<template>
  <div class="content-top">
    <div class="content-dashboard actions">
      <Resources/>
    </div>
    <div class="content-dashboard actions" style="margin-top: 0">
      <router-view/>
    </div>
    <md-card class="content-dashboard md-card-style blockchainrawdata" v-if="$router.history.current.name !== 'Dashboard'">
      <md-toolbar class="md-transparent" :md-elevation="0">
        <div class="md-title">Blockchain Raw Data</div>
      </md-toolbar>
      <md-card-content class="transaction-content" id="place-for-transaction">
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import Resources from './Resources';

export default {
  name: 'Action',
  components: {
    Resources,
  },
};
</script>

<style scoped>
  /*.blockchainrawdata {*/
    /*margin-top: 20px;*/
  /*}*/

  .content-dashboard {
    margin: 0;
    margin-top: 8px;
    display: block;
    justify-content: flex-start;
    flex-direction: row;
    height: auto;
    /*flex-grow: 1;*/
    /*background-color: rgba(255, 255, 255, 0);*/
  }

  .md-title {
    font-size: 18px;
    margin-left: -4px;
    color: #7ac231 !important;
  } 
</style>
