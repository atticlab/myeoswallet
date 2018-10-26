<template>
<div id="main">
  <div class="row">
    <div class="col-8">
      <div class="card">
        <div class="card-header"><h4 class="title">Bid name</h4></div>
        <div class="card-body">
          <form>
            <div class="row">
              <div class="col-6">
                <fg-input label="Bidder" :value="getAccountName" maxlength="12" required readonly></fg-input>
              </div>
              <div class="col-6">
                <fg-input title="Invalid name" label="Account name" type="text" v-model="newname" maxlength="12" required @change="validateAccount"></fg-input>
              </div>
            </div>

            <div class="row">
              <div class="col-12">
                <fg-input label="Bid (in EOS)" type="number" v-model="bid" required @change="validateBid"></fg-input>
              </div>
            </div>

            <div class="row">
              <div class="col text-center">
                <p-button @click="onBid" :disabled="bidNameValidation" type="primary">Bid</p-button>
              </div>
            </div>

            <div class="row"><TextActionAgree/></div>
          </form>
        </div>
      </div>
    </div>
    <div class="col-4">
      <div class="card">
        <div class="card-header"><h4 class="title">Help</h4></div>
        <div class="card-body pb-4">
          <div>Enter a name you wish to bid on.
            Enter the amount you wish to bid.
            Click the button.</div>
        </div>
      </div>
    </div>
  </div>
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
</style>
