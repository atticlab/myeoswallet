<template>
  <div class="md-toolbar">
    <div>
      <md-button class="md-icon-button hide-menu" @click="toggleMenu">
        <font-awesome-icon icon="bars"></font-awesome-icon>
      </md-button>
      <md-button
        style="text-transform: none; box-shadow: none; width: 260px;"
        class="md-raised md-primary md-medium-hide" :to="{ name: 'Vote' }">VOTE FOR ATTICLABEOSB
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
        class="md-raised md-primary wider md-small-hide"
        @click="connectLedger">
        <span>Connect ledger (coming soon...)</span>
      </md-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import TransportU2F from '@ledgerhq/hw-transport-u2f';
import ExternalWallet, { EXT_WALLET_TYPES } from '../../models/ExternalWallet';

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
  data() {
    return {
      menuVisible: false,
      hardwareReady: false,
      selected: null,
      hardwareType: EXT_WALLET_TYPES.LEDGER,
    };
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
      this.$emit('toggleMenu');
    },
    async connectLedger() {
      const externalWallet = new ExternalWallet(this.hardwareType);
      console.log(externalWallet);
      TransportU2F.default.listen().then((transport) => {
        console.log(transport);
      });
      // if (externalWallet) {
      //   console.log(externalWallet.interface.getPublicKey());
      // }
    },
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

  .wider {
    width: 260px;
    /*padding-left: 4%;*/
    /*padding-right: 4%;*/
  }
  .md-toolbar {
    padding: 0;
  }
  @media (min-width: 600px) {
    .hide-menu {
      display: none;
    }
  }
</style>
