<template>
  <md-table class="md-card-style" md-card>
    <md-table-toolbar class="md-toolbar">
      <span class="md-title">Resources Available</span>
    </md-table-toolbar>

    <md-table-row>
      <md-table-cell align="left">Balance</md-table-cell>
      <md-table-cell></md-table-cell>
      <md-table-cell align="right">{{ getBalance }} </md-table-cell>
    </md-table-row>

    <md-table-row>
      <md-table-cell align="left">Staked</md-table-cell>
      <md-table-cell>
        <md-progress-bar md-mode="determinate" :md-value="stackedPercent"/>
      </md-table-cell>
      <md-table-cell align="right">{{ getStacked }} {{ getSymbol }}</md-table-cell>
    </md-table-row>

    <md-table-row>
      <md-table-cell align="left">RAM</md-table-cell>
      <md-table-cell>
        <md-progress-bar md-mode="determinate" :md-value="getRam"/>
      </md-table-cell>
      <md-table-cell align="right">{{ getRam }}%</md-table-cell>
    </md-table-row>

    <md-table-row>
      <md-table-cell align="left">CPU</md-table-cell>
      <md-table-cell>
        <md-progress-bar md-mode="determinate" :md-value="getCpu"/>
      </md-table-cell>
      <md-table-cell align="right">{{ getCpu }}%</md-table-cell>
    </md-table-row>

    <md-table-row>
      <md-table-cell align="left">NET</md-table-cell>
      <md-table-cell>
        <md-progress-bar md-mode="determinate" :md-value="getNet"/>
      </md-table-cell>
      <md-table-cell align="right">{{ getNet }}%</md-table-cell>
    </md-table-row>

    <md-table-row>
      <md-table-cell align="left">Tokens</md-table-cell>
      <md-table-cell>
        <md-chip class="md-primary" v-for="(token, i) in getTokens" :key="i">{{token.balance}}</md-chip>
      </md-table-cell>
    </md-table-row>
  </md-table>
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
</style>
