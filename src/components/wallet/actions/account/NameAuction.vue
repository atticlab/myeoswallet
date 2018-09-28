<template>
<div id="main" class="md-layout twocolumn">
  <md-card class="md-card-style md-layout-item">
    <md-toolbar class="md-transparent" :md-elevation="0">
      <div class="md-title">Bid name</div>
    </md-toolbar>

    <md-card-content class="alw-first-child">
      <md-field>
        <label>Bidder</label>
        <span class="md-prefix">@ </span>
        <md-input :value="getAccountName" maxlength="12" required readonly></md-input>
      </md-field>
      <md-field :class="newnameError ? 'md-invalid' : ''">
        <label>Account name</label>
        <span class="md-prefix">@ </span>
        <span class="md-error">Invalid name</span>
        <md-input type="text" v-model="newname" maxlength="12" required @change="validateAccount"></md-input>
      </md-field>
    </md-card-content>

    <md-card-content>
      <md-field :class="bidError ? 'md-invalid' : ''">
        <label>Bid (in EOS)</label>
        <span class="md-error">Invalid value</span>
        <span class="md-prefix">EOS </span>
        <md-input type="number" v-model="bid" required @change="validateBid"></md-input>
      </md-field>
    </md-card-content>

    <md-card-content class="alw-buttons">
      <md-button @click="onBid" style="color: #ffffff; box-shadow: none; width: 260px; "
                 class="md-raised md-primary" :disabled="bidNameValidation">Bid
      </md-button>
    </md-card-content>
    <TextActionAgree/>
  </md-card>
  <md-card class="md-card-style md-layout-item help">
    <md-toolbar class="md-transparent" :md-elevation="0">
      <div class="md-title">Help</div>
    </md-toolbar>

    <md-card-content class="alw-first-child">
      <div>Enter a name you wish to bid on.
        Enter the amount you wish to bid.
        Click the button.</div>
    </md-card-content>
  </md-card>

</div>
</template>

<script>
import bl from '@/bl';
import ActionType from '@/store/constants';
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'NameAuction',
  data() {
    return {
      newnameError: false,
      bidError: false,
      newname: '',
      bid: '0',
    };
  },
  methods: {
    ...mapActions([
      ActionType.SET_TRANSACTION,
    ]),
    validateAccount() {
      const rg = /^[a-z1-5]{1,12}$/;
      this.newnameError = !rg.test(this.amount);
    },
    validateBid() {
      if (this.bid && parseFloat(this.bid) > 0 && parseFloat(this.bid) < parseFloat(this.getBalance)) {
        this.bidError = false;
      } else {
        this.bidError = true;
      }
    },
    onBid() {
      this.eos.transaction(
        {
          actions: [
            {
              account: 'eosio',
              name: 'bidname',
              authorization: [{
                actor: this.getAccountName,
                permission: this.getAuthority,
              }],
              data: {
                bidder: this.getAccountName,
                newname: this.newname,
                bid: `${parseFloat(this.bid).toFixed(4)} EOS`,
              },
            },
          ],
        },
      ).then((transactionResult) => {
        console.debug(`${this.$options.name} RESULT`, transactionResult);
        this[ActionType.SET_TRANSACTION](transactionResult);
        bl.renderJSON(transactionResult, 'place-for-transaction');
      }).catch((e) => {
        this[ActionType.SET_TRANSACTION](e);
        bl.handleError(e, 'place-for-transaction');
      });
    },
  },
  computed: {
    ...mapState([
      'eos',
    ]),
    ...mapGetters([
      'getAccountName',
      'getBalance',
      'getAuthority',
    ]),
    bidNameValidation() {
      if (this.newname && this.bid && !this.newnameError && !this.bidError) {
        return false;
      }
      return true;
    },
  },
};
</script>

<style scoped>
  @import '../../../../assets/css/walletaction.css';
</style>
