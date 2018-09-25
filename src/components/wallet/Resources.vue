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

    <div class="md-card-style md-card">
      <md-toolbar class="flex-title">
        <div class="md-title flex-title-font-size">Resources Available</div>
      </md-toolbar>
      <div class="flex-wrap">
        <md-content>Balance<br>{{ getBalance }}</md-content>
        <md-content>Staked<br>{{ getStacked }} {{ getSymbol }}</md-content>
        <md-content>FREE RAM<br>{{ getRam }}%</md-content>
        <md-content>FREE CPU<br>{{ getCpu }}%</md-content>
        <md-content>FREE NET<br>{{ getNet }}%</md-content>
      </div>
    </div>

    <div class="md-card-style md-card">
      <md-toolbar class="flex-title">
        <div class="md-title flex-title-font-size">Tokens Available</div>
      </md-toolbar>
      <div class="flex-wrap">
        <md-content v-for="(token, i) in getTokens" :key="i">{{token.balance}}<br>{{token.account | toUpper}}</md-content>
      </div>
    </div>
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
    border: 2px rgb(233, 236, 239) solid;
    box-shadow: none;
    border-radius: 2px;
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

  .md-content {
    min-height: 80px;
    min-width: 190px;
    margin: 1px 5px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    text-align: center;
    /*align-self: end;*/
  }
  .flex-title {
    max-width: 190px;
    flex-wrap: wrap;
  }
  .flex-title-font-size {
    font-size: 15px;
  }
</style>
