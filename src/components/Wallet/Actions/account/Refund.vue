<template>
<div id="main">
  <div class="row">
    <div class="col-md-8 col-12">
      <div class="card">
        <div class="card-header"><h4 class="title">Refund Stake</h4></div>
        <div class="card-body">
          <form>
            <div class="row">
              <div class="col-12">
                <fg-input label="Owner" :value="getAccountName" maxlength="12" required readonly></fg-input>
              </div>
            </div>

            <div class="row">
              <div class="col text-center">
                <p-button @click="onRefund" type="primary">Refund</p-button>
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
          <div>Having connectivity issues or scatter not appearing when transacting? Please ensure
            you have updated to the latest scatter desktop</div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import bl from '@/bl';
import { mapState, mapGetters, mapActions } from 'vuex';
import ActionType from '../../../../store/constants';

export default {
  name: 'Refund',
  computed: {
    ...mapState([
      'eos',
    ]),
    ...mapGetters([
      'getAccountName',
      'getAuthority',
    ]),
  },
  methods: {
    ...mapActions([
      ActionType.SET_TRANSACTION,
    ]),
    onRefund() {
      this.eos.transaction({
        actions: [
          {
            account: 'eosio',
            name: 'refund',
            authorization: [{
              actor: this.getAccountName,
              permission: this.getAuthority,
            }],
            data: {
              owner: this.getAccountName,
            },
          },
        ],
      })
        .then((res) => {
          console.debug(`${this.$options.name} RESULT`, res);
          this[ActionType.SET_TRANSACTION](res);
          bl.renderJSON(res, 'place-for-transaction');
        })
        .catch((e) => {
          this[ActionType.SET_TRANSACTION](e);
          bl.handleError(e, 'place-for-transaction');
        });
    },
  },
};
</script>

<style scoped>
</style>
