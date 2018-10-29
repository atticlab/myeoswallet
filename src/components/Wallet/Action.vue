<template>
<div id="main">
  <div class="row">
    <div class="col-12">
      <div class="card card-resources">
        <div class="card-header text-center"><h5 class="card-title">Resources</h5></div>
        <div class="card-body text-center">
          <div class="row">
            <div class="col">
              <p>Total: {{ getBalance + getStacked + getRefund }} EOS</p>
              <p>Refund: {{ getRefund }} EOS</p>
            </div>

            <div class="col">
              <p>Unstaked: {{ getBalance }} EOS</p>
              <p>Staked: {{ getStacked }} EOS</p>
            </div>

            <div class="col">
              <p>RAM</p>
              <p>{{ getRamUsed + ' / ' + getRamTotal }}</p>
            </div>

            <div class="col">
              <p>CPU</p>
              <p>{{ getCpuUsed + ' / ' + getCpuTotal }}</p>
            </div>

            <div class="col">
              <p>NET</p>
              <p>{{ getNetUsed + ' / ' + getNetTotal }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    <!--<div class="col-lg-3 col-sm-6">-->
      <!--<circle-chart-card :percentage="getRamPercentage"-->
                         <!--title="RAM"-->
                         <!--:description="getRamUsed + ' / ' + getRamTotal"-->
                         <!--color="#fcc468" class="card-resources">-->
      <!--</circle-chart-card>-->
    <!--</div>-->

    <!--<div class="col-lg-3 col-sm-6">-->
      <!--<circle-chart-card :percentage="getCpuPercentage"-->
                         <!--title="CPU"-->
                         <!--:description="getCpuUsed + ' / ' + getCpuTotal"-->
                         <!--color="#f17e5d" class="card-resources">-->
      <!--</circle-chart-card>-->
    <!--</div>-->

    <!--<div class="col-lg-3 col-sm-6">-->
      <!--<circle-chart-card :percentage="getNetPercentage"-->
                         <!--title="NET"-->
                         <!--:description="getNetUsed + ' / ' + getNetTotal"-->
                         <!--color="#66615b" class="card-resources">-->
      <!--</circle-chart-card>-->
    <!--</div>-->
  <!--</div>-->
  <transition name="fade" mode="out-in">
    <div class="row" v-if="getTokens.length">
      <div class="col-12">
        <div class="card card-resources">
          <div class="card-header text-center"><h5 class="card-title">Tokens</h5></div>
          <div class="card-body text-center">
            <div class="row">
              <div class="col-2" v-for="(token, i) in getTokens" :key="i">
                <p>{{ token.balance }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--<div class="row">-->
      <!--<div class="col" v-for="(token, i) in getTokens" :key="i">-->
        <!--<div class="card card-resources">-->
          <!--<div class="card-header text-center"><h5 class="card-title">{{ token.account.toUpperCase() }}</h5></div>-->
          <!--<div class="card-body text-center">-->
            <!--<p>Total: {{ token.balance }}</p>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
  </transition>
  <router-view/>
  <div class="card" v-if="$router.currentRoute.name !== 'Dashboard'">
      <div class="card-header"><h4 class="title">Blockchain Raw Data</h4></div>
    <div class="card-body" id="place-for-transaction"></div>
  </div>
</div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import CircleChartCard from 'src/components/UIComponents/Cards/CircleChartCard.vue'
import ActionType from 'src/store/constants';
import swal from 'sweetalert2';


export default {
  name: 'Action',
  computed: {
    ...mapState([
      'transaction',
      'actionInfoPopUp',
    ]),
    ...mapGetters([
      'getBalance',
      'getStacked',
      'getRamPercentage',
      'getNetPercentage',
      'getCpuPercentage',
      'getRamUsed',
      'getNetUsed',
      'getCpuUsed',
      'getRamTotal',
      'getCpuTotal',
      'getNetTotal',
      'getTokens',
      'getRefund',
    ]),
    isError() {
      return this.transaction && ((this.transaction.isError || this.transaction.error) ||
        (this.transaction.status && this.transaction.status !== 200) || this.transaction.status === 0);
    },
  },
  components: {
    CircleChartCard,
  },
  methods: {
    ...mapActions([
      ActionType.SET_ACTIONINFOPOPUP,
    ]),
    closePopUp() {
      this[ActionType.SET_ACTIONINFOPOPUP](false);
    },
    copy() {
      this.$copyText(JSON.stringify(this.transaction));
    },
    initPopUp() {
      swal({
        title: this.isError ? 'Fail' : 'Success',
        type: this.isError ? 'error' : 'success',
        html: '<div style="text-align: left;"><pre id="json-pop-up">' + JSON.stringify(this.transaction, null, 1) + '</pre></div>',
        buttonsStyling: false,
        showCancelButton: true,
        showCloseButton: true,
        showConfirmButton: false,
        cancelButtonText: 'Copy',
        focusCancel: true,
        focusConfirm: false,
        confirmButtonClass: 'btn btn-primary',
        cancelButtonClass: 'btn btn-primary',
      })
        .catch((e) => {
          if (e === 'cancel') {
            this.copy();
          }
        })
        .finally(() => {
          this.closePopUp();
        });
    },
  },
  watch: {
    actionInfoPopUp() {
      if (this.actionInfoPopUp) {
        this.initPopUp();
      }
    },
  },
};
</script>

<style scoped>
  #place-for-transaction {
    overflow: auto;
  }
</style>
