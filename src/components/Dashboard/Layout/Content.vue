<template>
  <div class="content">
    <div class="row">
      <div class="col-lg-3 col-sm-6">
        <div class="card card-resources">
          <div class="card-header text-center"><h5 class="card-title">Balance</h5></div>
          <div class="card-body text-center pb-5">
            <p>Total: {{ getBalance + getStacked + getRefund }} EOS</p>
            <p>Unstaked: {{ getBalance }} EOS</p>
            <p>Staked: {{ getStacked }} EOS</p>
            <p>Refund: {{ getRefund }} EOS</p>
          </div>
        </div>
      </div>

      <div class="col-lg-3 col-sm-6">
        <circle-chart-card :percentage="getRamPercentage"
                           title="RAM"
                           :description="getRamUsed + ' / ' + getRamTotal"
                           color="#fcc468" class="card-resources">
        </circle-chart-card>
      </div>

      <div class="col-lg-3 col-sm-6">
        <circle-chart-card :percentage="getCpuPercentage"
                           title="CPU"
                           :description="getCpuUsed + ' / ' + getCpuTotal"
                           color="#f17e5d" class="card-resources">
        </circle-chart-card>
      </div>

      <div class="col-lg-3 col-sm-6">
        <circle-chart-card :percentage="getNetPercentage"
                           title="NET"
                           :description="getNetUsed + ' / ' + getNetTotal"
                           color="#66615b" class="card-resources">
        </circle-chart-card>
      </div>
    </div>
    <div class="row">
      <div class="col" v-for="(token, i) in getTokens" :key="i">
        <div class="card card-resources">
          <div class="card-header text-center"><h5 class="card-title">{{ token.account.toUpperCase() }}</h5></div>
          <div class="card-body text-center">
            <p>Total: {{ token.balance }}</p>
          </div>
        </div>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import CircleChartCard from 'src/components/UIComponents/Cards/CircleChartCard.vue'
import { mapGetters } from 'vuex';

export default {
  components: {
    CircleChartCard,
  },
  data() {
    return {
      balance: 1.0010,
    };
  },
  computed: {
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
  },
  created() {
    console.log(this.getTokens);
  },
};
</script>
<style scoped>
  .card-resources {
    min-height: 90%;
  }
</style>
