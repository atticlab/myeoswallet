<template>
  <div class="md-toolbar">
    <md-toolbar class="md-dense md-accent" md-elevation="0">
      <div>
        <md-button
          style="text-transform: none; box-shadow: none; width: 300px; color: white;"
          class="md-raised md-primary" :to="{ name: 'Vote' }">VOTE FOR ATTICLABEOSB
        </md-button>
      </div>
      <div class="flex-item-mid md-body-2">{{ getAccountNameWithAuthority }}</div>
      <div class="flex-item-right">
        <md-button
          style="text-transform: none; box-shadow: none;"
          class="md-raised" @click="$emit('authorizationEvent')">
          <span v-if="identity">Log out</span>
          <span v-else>Log in</span>
        </md-button>
        <md-button
          style="text-transform: none; box-shadow: none;"
          class="md-raised md-primary">
          <span>Connect ledger (coming soon...)</span>
        </md-button>
      </div>
    </md-toolbar>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'TopBar',
  computed: {
    ...mapGetters([
      'getAccountNameWithAuthority',
    ]),
    ...mapState([
      'identity',
    ]),
  },
};
</script>

<style lang="scss" scoped>
  @import "../../../src/assets/fonts/OpenSans-Bold.ttf";
    @font-face {
        font-family: 'Open Sans';
        src: url('../../../src/assets/fonts/OpenSans-Bold.ttf');
    }
  .title {
    padding-left: 10px;
    color: #9ca4ab;
  }
  .md-button {
    color: #0074D9;
    text-transform: none;
    box-shadow: none;
  }
  .md-raised {
    color: #0074D9;
    text-transform: none;
    box-shadow: none;
  }
  /*.md-toolbar {*/
    /*display: flex;*/
    /*display: -ms-flexbox;*/
    /*display: -webkit-flex;*/

    /*-webkit-flex-direction: row;*/
    /*-ms-flex-direction: row;*/
    /*flex-direction: row;*/

    /*flex-wrap: nowrap;*/
    /*-webkit-flex-wrap: nowrap;*/
    /*-ms-flex-wrap: nowrap;*/

    /*justify-content: flex-start;*/
    /*-webkit-justify-content: flex-start;*/
    /*-ms-flex-pack: start;*/

    /*align-content: stretch;*/
    /*-webkit-align-content: stretch;*/
    /*-ms-flex-line-pack: stretch;*/

    /*align-items: stretch;*/
    /*-webkit-align-items: stretch;*/
    /*-ms-flex-align: stretch;*/
    /*font-family: 'Open Sans';*/
    /*padding: 8px calc(5% + 16px);*/
  /*}*/

  .logo {
    max-height: 48px;
  }

  .flex-item-left {
    display: flex;
    align-items: center;
    align-self: auto;
    -webkit-flex: 0 1 auto;
    -ms-flex: 0 1 auto;
    flex: 0 1 auto;
    -webkit-align-self: auto;
    -ms-flex-item-align: auto;
  }

  .flex-item-mid {
    margin: 0 16px;
    display: flex;
    display: -ms-flexbox;
    display: -webkit-flex;

    justify-content: flex-end;
    -webkit-justify-content: flex-end;
    -ms-flex-pack: end;

    align-items: center;
    -webkit-align-items: center;
    -ms-flex-align: center;

    flex: 1 1 auto;
    -webkit-flex: 1 1 auto;
    -ms-flex: 1 1 auto;

    align-self: auto;
    -webkit-align-self: auto;
    -ms-flex-item-align: auto;
    color: #9ca4ab;
    font-family: 'Open Sans';
  }

  .flex-item-right {
    flex: 0 1 auto;
    -webkit-flex: 0 1 auto;
    -ms-flex: 0 1 auto;
    align-self: auto;
    -webkit-align-self: auto;
    -ms-flex-item-align: auto;
  }
</style>
