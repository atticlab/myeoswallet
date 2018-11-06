<template>
  <div id="main">
    <div class="row">
      <div class="col-md-8 col-12">
        <div class="card">
          <div class="card-header"><h4 class="title">Unset proxy</h4></div>
          <div class="card-body">
            <form>
              <div class="row">
                <div class="col-12">
                  <fg-input label="Account name" :value="getAccountName" maxlength="12" required readonly></fg-input>
                </div>
              </div>

              <div class="row">
                <div class="col text-center">
                  <p-button @click="onSetProxy" type="primary">Unset Account</p-button>
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
            <div>In case you decide to unset your proxy, click ‘Unset Account’. Remember you cancel all the weight given by the votes.</div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-8 col-12">
        <div class="card">
          <div class="card-header"><h4 class="title">Unregister proxy info</h4></div>
          <div class="card-body">
            <form>
              <div class="row">
                <div class="col-12">
                  <fg-input label="Proxy" :value="getAccountName" maxlength="12" required readonly></fg-input>
                </div>
              </div>

              <div class="row">
                <div class="col text-center">
                  <p-button @click="onUnregisterProxyInfo" type="primary">Unregister proxy info</p-button>
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
  name: 'UnsetProxy',
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
    onSetProxy() {
      if (!this.eos) {
        bl.logInPopUP();
        return;
      }
      this.eos.transaction(
        {
          actions: [
            {
              account: 'eosio',
              name: 'regproxy',
              authorization: [{
                actor: this.getAccountName,
                permission: this.getAuthority,
              }],
              data: {
                proxy: this.getAccountName,
                isproxy: 0,
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
    onUnregisterProxyInfo() {
      if (!this.eos) {
        bl.logInPopUP();
        return;
      }
      this.eos.transaction(
        {
          actions: [
            {
              account: 'regproxyinfo',
              name: 'remove',
              authorization: [{
                actor: this.getAccountName,
                permission: this.getAuthority,
              }],
              data: {
                proxy: this.getAccountName,
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
