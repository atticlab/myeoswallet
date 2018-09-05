<template>
  <div class="column">
    <div class="content">
      <Resources/>
      <CreateAccount/>
    </div>
    <md-card class="column md-card-style">
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
import Transfer from './Transfer';
import CreateAccount from './CreateAccount';

export default {
  name: 'Dashboard',
  components: { CreateAccount, Transfer, Resources },
  computed: {
    ...mapState([
      'transaction',
    ]),
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
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
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

</style>
