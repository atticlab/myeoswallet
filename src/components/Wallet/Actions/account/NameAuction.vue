<template>
<div id="main">
  <div class="row">
    <div class="col-md-8 col-12">
      <div class="card">
        <div class="card-header"><h4 class="title">Bid name</h4></div>
        <div class="card-body">
          <form>
            <div class="row">
              <div class="col-md-6 col-12">
                <fg-input label="Bidder" :value="getAccountName" maxlength="12" readonly></fg-input>
              </div>
              <div class="col-md-6 col-12">
                <fg-input label="Account name" type="text" v-model="newname" maxlength="12" required
                          name="newname" v-validate="modelValidation.newname" :error="getError('newname')" data-vv-as="new name"
                ></fg-input>
              </div>
            </div>

            <div class="row">
              <div class="col-12">
                <fg-input label="Bid (in EOS)" type="number" v-model.number="bid" required
                          name="bid" v-validate="modelValidation.bid" :error="getError('bid')"
                ></fg-input>
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
    <div class="col-md-4 col-12">
      <div class="card">
        <div class="card-header"><h4 class="title">Help</h4></div>
        <div class="card-body pb-4">
          <div>Enter the name of the account you wish to buy and your bid and click ‘bid’.</div>
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
      newname: '',
      bid: 0,
      modelValidation: {
        newname: {
          required: true,
          accountNotExist: true,
        },
        bid: {
          required: true,
          decimal: true,
          min_value: 0.0001,
        },
      },
    };
  },
  methods: {
    ...mapActions([
      ActionType.SET_TRANSACTION,
    ]),
    getError(fieldName) {
      return this.errors.first(fieldName);
    },
    validateBid() {
      return !Object.keys(this.fields).every(key => this.fields[key].valid);
    },
    onBid() {
      if (!this.eos) {
        bl.logInPopUP();
        return;
      }
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
                bid: `${this.bid.toFixed(4)} EOS`,
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
      return !Object.keys(this.fields).every(key => this.fields[key].valid);
    },
  },
};
</script>

<style scoped>
</style>
