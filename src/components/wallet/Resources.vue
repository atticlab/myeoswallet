<template>
  <div id="main">
    <!--<md-table class="md-card-style" md-card>-->
      <!--<md-table-toolbar class="md-toolbar">-->
        <!--<span class="md-title">Resources Available</span>-->
      <!--</md-table-toolbar>-->

      <!--<md-table-row>-->
        <!--<md-table-cell align="left">Balance</md-table-cell>-->
        <!--<md-table-cell></md-table-cell>-->
        <!--<md-table-cell align="right">{{ getBalance }} </md-table-cell>-->
      <!--</md-table-row>-->

      <!--<md-table-row>-->
        <!--<md-table-cell align="left">Staked</md-table-cell>-->
        <!--<md-table-cell>-->
          <!--<md-progress-bar md-mode="determinate" :md-value="stackedPercent"/>-->
        <!--</md-table-cell>-->
        <!--<md-table-cell align="right">{{ getStacked }} {{ getSymbol }}</md-table-cell>-->
      <!--</md-table-row>-->

      <!--<md-table-row>-->
        <!--<md-table-cell align="left">RAM</md-table-cell>-->
        <!--<md-table-cell>-->
          <!--<md-progress-bar md-mode="determinate" :md-value="getRam"/>-->
        <!--</md-table-cell>-->
        <!--<md-table-cell align="right">{{ getRam }}%</md-table-cell>-->
      <!--</md-table-row>-->

      <!--<md-table-row>-->
        <!--<md-table-cell align="left">CPU</md-table-cell>-->
        <!--<md-table-cell>-->
          <!--<md-progress-bar md-mode="determinate" :md-value="getCpu"/>-->
        <!--</md-table-cell>-->
        <!--<md-table-cell align="right">{{ getCpu }}%</md-table-cell>-->
      <!--</md-table-row>-->

      <!--<md-table-row>-->
        <!--<md-table-cell align="left">NET</md-table-cell>-->
        <!--<md-table-cell>-->
          <!--<md-progress-bar md-mode="determinate" :md-value="getNet"/>-->
        <!--</md-table-cell>-->
        <!--<md-table-cell align="right">{{ getNet }}%</md-table-cell>-->
      <!--</md-table-row>-->
    <!--</md-table>-->

    <md-card class="md-card-style">
      <md-toolbar class="md-transparent" :md-elevation="0">
        <div class="md-title">Resources Available</div>
      </md-toolbar>

      <md-card-content>
        <div class="md-layout md-gutter" style="width: 100%">
          <div class="md-layout-item">Balance<br>{{ getBalance }}</div>
          <div class="md-layout-item">Staked<br>{{ getStacked }} EOS</div>
          <div class="md-layout-item">FREE RAM<br>{{ getRam }}%</div>
          <div class="md-layout-item">FREE CPU<br>{{ getCpu }}%</div>
          <div class="md-layout-item">FREE NET<br>{{ getNet }}%</div>
        </div>
      </md-card-content>
    </md-card>

    <md-card class="md-card-style">
      <md-toolbar class="md-transparent" :md-elevation="0">
        <div class="md-title">Tokens Available</div>
      </md-toolbar>

      <md-card-content>
        <div class="md-layout md-gutter flex-wrap">
          <div class="md-layout-item" v-for="(token, i) in getTokens" :key="i">{{token.balance}}<br>{{token.account | toUpper}}</div>
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'Resources',
  computed: {
    ...mapState([
      'balance',
    ]),
    ...mapGetters([
      'getBalance',
      'getStacked',
      'getRam',
      'getNet',
      'getCpu',
      'getSymbol',
      'getTokens',
    ]),
    stackedPercent() {
      return 100;
    },
  },
  filters: {
    toUpper(val) {
      return val.toUpperCase();
    },
  },
};
</script>

<style lang="scss" scoped>
  .md-title {
    text-align: left;
  }
  .md-progress-bar {
    min-width: 150px;
  }
  .md-card-style {
    /*border: 2px rgb(233, 236, 239) solid;*/
    box-shadow: none;
    /*border-radius: 2px;*/
  }
  .md-table {
    overflow-x: unset;
  }
  .md-table-cell-container {
    display: flex;
    flex-wrap: nowrap;
  }

  .flex-wrap {
    flex-wrap: wrap;
    display: flex;
    /*align-items: center;*/
  }
  .md-card-content .md-layout > .md-layout-item {
    margin-left: 5px;
  }

  /*.md-content {*/
    /*min-height: 80px;*/
    /*min-width: 190px;*/
    /*margin: 1px 5px;*/
    /*display: inline-flex;*/
    /*justify-content: center;*/
    /*align-items: center;*/
    /*padding: 5px;*/
    /*text-align: center;*/
    /*!*align-self: end;*!*/
  /*}*/
  /*.flex-title {*/
    /*max-width: 190px;*/
    /*flex-wrap: wrap;*/
  /*}*/
  /*.flex-title-font-size {*/
    /*font-size: 15px;*/
  /*}*/

  #main .md-card-style {
    margin-top: 8px;
  }
</style>

<style scoped>
  @import '../../assets/css/walletaction.css';
</style>
