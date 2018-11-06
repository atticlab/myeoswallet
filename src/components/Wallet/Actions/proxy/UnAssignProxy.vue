<template>
<div id="main">
  <div class="row">
    <div class="col-md-8 col-12">
      <div class="card">
        <div class="card-header"><h4 class="title">Unassign proxy</h4></div>
        <div class="card-body">
          <form>
            <div class="row">
              <div class="col-12">
                <fg-input label="Account" :value="getAccountName" maxlength="12" required readonly></fg-input>
              </div>
            </div>

            <div class="row">
              <div class="col text-center">
                <p-button @click="onUnAssignProxy" type="primary">Unassign</p-button>
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
          <div>After applying this command, you won’t be able to vote via proxy. You can vote via proxy again by executing the action at <router-link :to="{ name: 'AssignProxy' }">Assign Proxy</router-link></div>
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
  name: 'UnAssignProxy',
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
    onUnAssignProxy() {
      if (!this.eos) {
        bl.logInPopUP();
        return;
      }
      this.eos.transaction(
        {
          actions: [
            {
              account: 'eosio',
              name: 'voteproducer',
              authorization: [{
                actor: this.getAccountName,
                permission: this.getAuthority,
              }],
              data: {
                voter: this.getAccountName,
                proxy: '',
                producers: [],
              },
            },
          ],
        },
      )
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
