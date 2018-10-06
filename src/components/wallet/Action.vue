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
    <md-dialog :md-active.sync="actionInfoPopUp" id="popup-transaction" class="md-scrollbar">
      <md-dialog-content class="infoimg">
        <span v-if="isError" class="fail">
          <img src="../../assets/transactionfail.png" alt="transaction fail">
        </span>
        <span v-else class="md-primary">
          <img src="../../assets/transactionsuccess.png" alt="transaction success">
        </span>
      </md-dialog-content>

      <md-dialog-content class="infotext">
        <span v-if="isError" class="fail md-display-1">Fail</span>
        <span v-else class="success md-display-1">Success</span>
      </md-dialog-content>

      <md-dialog-content class="transaction-content">
        <div id="json-pop-up"><pre>{{ transaction }}</pre></div>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-raised md-primary" @click="closePopUp" style="margin-bottom: 10px;">Ok</md-button>
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
    isError() {
      return this.transaction && ((this.transaction.isError || this.transaction.error) ||
        (this.transaction.status && this.transaction.status !== 200));
    },
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
    margin-left: 5px;
    margin-right: 5px;
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
  #json-pop-up {
    overflow: auto !important;
    max-height: 30vh;
  }
</style>
