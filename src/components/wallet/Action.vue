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
    <md-dialog :md-active.sync="actionInfoPopUp" id="popup-transaction">
      <md-dialog-content class="infoimg">
        <span v-if="transaction && (transaction.isError || transaction.error)" class="fail">
          <img src="../../assets/transactionfail.png" alt="transaction fail">
        </span>
        <span v-else class="md-primary">
          <img src="../../assets/transactionsuccess.png" alt="transaction success">
        </span>
      </md-dialog-content>

      <md-dialog-content class="infotext">
        <span v-if="transaction && (transaction.isError || transaction.error)" class="fail">Fail</span>
        <span v-else class="success">Success</span>
      </md-dialog-content>

      <md-dialog-content class="transaction-content">
        <pre>{{ transaction }}</pre>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="closePopUp">Ok</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ActionType from '@/store/constants';
import Resources from './Resources';

export default {
  name: 'Action',
  components: {
    Resources,
  },
  computed: {
    ...mapState([
      'transaction',
      'actionInfoPopUp',
    ]),
  },
  methods: {
    ...mapActions([
      ActionType.SET_ACTIONINFOPOPUP,
    ]),
    closePopUp() {
      this[ActionType.SET_ACTIONINFOPOPUP](false);
    },
  },
};
</script>

<style scoped>
  .blockchainrawdata {
    margin-left: 0;
    margin-right: 0;
  }
  .content-dashboard {
    /*margin-top: 8px;*/
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

  .fail {
    color: red;
  }

  .infoimg {
    margin: 0 auto;
    overflow: unset;
    text-align: center;
  }

  .infoimg img {
    width: 100px;
  }
  .infotext {
    text-align: center;
  }
  .success {
    color: #7ac231;
  }
</style>
