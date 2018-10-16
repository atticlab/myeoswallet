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
// import TransportU2F from '@ledgerhq/hw-transport-u2f';
// import Eos from '../../models/hardware/eosledjer';
import Eos from 'eosjs';
import ExternalWallet, { EXT_WALLET_TYPES } from '../../models/ExternalWallet';

export default {
  name: 'TopBar',
  computed: {
    ...mapGetters([
      'getAccountNameWithAuthority',
    ]),
    ...mapState([
      'identity',
      'eos',
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
    handleEvents({ type, device }) {
      console.log('event in handleEvents');
      console.log(type);
      console.log(device);
      this[type](device);
    },
    async connectLedger() {
      const bip44Path = "44'/194'/0'/0/0";
      const externalWallet = new ExternalWallet(this.hardwareType);
      console.log('top bar');
      // console.log(await externalWallet.interface.canConnect());
      let pubKey = await externalWallet.interface.getPublicKey("44'/194'/0'/0/0", false);

      const expireInSeconds = 60 * 60;

      const info = await this.eos.getInfo({});

      const block = await this.eos.getBlock(info.last_irreversible_block_num);

      const transactionHeaders = {
        expiration: new Date(new Date().getTime() + (expireInSeconds * 1000)).toISOString().split('.')[0],
        ref_block_num: (info.last_irreversible_block_num) & 0xFFFF, // eslint-disable-line
        ref_block_prefix: block.ref_block_prefix,
      };
      const EOS = Eos({
        httpEndpoint: null,
        broadcast: false,
        sign: false,
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        transactionHeaders,
        // checkChainId: false - enable after merge of https://github.com/EOSIO/eosjs/pull/179
      });

      const transfer = await EOS.transfer('andryha2yha1', 'rgsnryfcksye', '0.0001 EOS', '');
      console.log(transfer);
      externalWallet.interface.sign(pubKey.wif, JSON.stringify(transfer.transaction))
        .then((r) => {
          console.log(r);
        })
        .catch((e) => {
          console.log(e);
        });
      console.log(transfer);
      // transferTransaction = transfer.transaction

      // TransportU2F.create()
      //   .then((transport) => {
      //     console.log(transport);
      //     const eos = new Eos(transport);
      //     eos.getPublicKey(bip44Path, false).then((o) => {
      //       console.log(o);
      //     });
      //   });


      // const paths = await TransportU2F.listen({
      //   next: async (e) => {
      //     console.log(e);
      //     if (e.type === 'add') {
      //       // const transport = await Transport.open(e.descriptor);
      //       // console.log(transport);
      //     }
      //   },
      //   error: (error) => {
      //     console.log(error);
      //   },
      //   complete: () => {},
      // });
      // console.log(paths);
      // const t = Transport;
      // Transport.default.listen({
      //   next: event => this.handleEvents(event),
      // });
      // const sub = Transport.default.listen({
      //   next: async (e) => {
      //     if (e.type === 'add') {
      //       sub.unsubscribe();
      //       const transport = await Transport.open(e.descriptor);
      //       console.log(transport);
      //     }
      //   },
      //   error: (error) => {
      //     console.log(error);
      //   },
      //   complete: () => {},
      // });
      // const transportu2f = new TransportU2F(transport);
      // console.log(transportu2f);
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
