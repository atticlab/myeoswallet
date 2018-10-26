<template>
<div id="main">
  <div class="row">
    <div class="col-8">
      <div class="card">
        <div class="card-header"><h4 class="title">Assign proxy</h4></div>
        <div class="card-body">
          <form>
            <div class="row">
              <div class="col-6">
                <fg-input label="Account" :value="getAccountName" maxlength="12" required readonly></fg-input>
              </div>
              <div class="col-6">
                <fg-input title="Invalid name" label="Proxy" v-model="proxy" maxlength="12" required @change="validateAccount"></fg-input>
              </div>
            </div>

            <div class="row">
              <div class="col text-center">
                <p-button @click="onAssignProxy" :disabled="validate" type="primary">Assign Account</p-button>
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
          <div>In case you want to assign a proxy and vote through this option, please fill in the info of your proxy chosen and hit the button on the right column. Please follow the tip on the background.</div>
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
  name: 'AssignProxy',
  data() {
    return {
      proxy: '',
      proxyError: false,
    };
  },
  computed: {
    ...mapState([
      'eos',
    ]),
    ...mapGetters([
      'getAccountName',
      'getAuthority',
    ]),
    validate() {
      if (this.getAccountName && !this.proxyError) {
        return false;
      }
      return true;
    },
  },
  methods: {
    ...mapActions([
      ActionType.SET_TRANSACTION,
    ]),
    validateAccount() {
      this.eos.getAccount(this.proxy)
        .then(() => {
          this.proxyError = false;
        })
        .catch(() => {
          this.proxyError = true;
        });
    },
    onAssignProxy() {
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
                proxy: this.proxy,
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
