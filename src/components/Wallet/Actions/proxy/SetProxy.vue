<template>
<div id="main">
  <div class="row">
    <div class="col-8">
      <div class="card">
        <div class="card-header"><h4 class="title">Set proxy</h4></div>
        <div class="card-body">
          <form>
            <div class="row">
              <div class="col-12">
                <fg-input label="Account name" :value="getAccountName" maxlength="12" required readonly></fg-input>
              </div>
            </div>

            <div class="row">
              <div class="col text-center">
                <p-button @click="onSetProxy" type="primary">Set Account</p-button>
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
          <div>Using a proxy option you can vote on behalf of others who set you as their proxy. Please fill in the proxy info that you want to assign. To resign a proxy you just cancel the weight and ability to vote on behalf of others who set you as their proxy.</div>
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-8">
      <div class="card">
        <div class="card-header"><h4 class="title">Register Proxy Info</h4></div>
        <div class="card-body">
          <form>
            <div class="row">
              <div class="col-6">
                <fg-input label="Proxy Account" :value="getAccountName" maxlength="12" required readonly></fg-input>
              </div>
              <div class="col-6">
                <fg-input title="Invalid name" label="Proxy name" type="text" v-model="proxyName" maxlength="64" required></fg-input>
              </div>
            </div>

            <div class="row">
              <div class="col-12">
                <fg-input label="Slogan" v-model="slogan" maxlength="64"></fg-input>
              </div>
            </div>

            <div class="row">
              <div class="col-12">
                <fg-input label="Philosophy" v-model="philosophy" maxlength="1024" required></fg-input>
              </div>
            </div>

            <div class="row">
              <div class="col-12">
                <fg-input label="Background Information" v-model="backgroundInformation" maxlength="1024" required></fg-input>
              </div>
            </div>

            <div class="row">
              <div class="col-6">
                <fg-input label="Logo URL" v-model="logourl"></fg-input>
              </div>
              <div class="col-6">
                <fg-input label="Website" v-model="website"></fg-input>
              </div>
            </div>

            <div class="row">
              <div class="col-6">
                <fg-input label="Telegram" v-model="telegram"></fg-input>
              </div>
              <div class="col-6">
                <fg-input label="Steemit" v-model="steemit"></fg-input>
              </div>
            </div>

            <div class="row">
              <div class="col-6">
                <fg-input label="Twitter" v-model="twitter"></fg-input>
              </div>
              <div class="col-6">
                <fg-input label="WeChat" v-model="wechat"></fg-input>
              </div>
            </div>

            <div class="row">
              <div class="col text-center">
                <p-button @click="onRegisterProxyInfo" :disabled="validateRegisterProxyInfo" type="primary">Register Proxy Info</p-button>
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
          <div>The dApp allows EOS proxy accounts to reg and place useful info about themselves, for instance, name, website, philosophy or slogan. This info is placed on the EOS and free for sharing through the portals.
            Please follow all the tips mentioned in the background.</div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import bl from '@/bl';
import { mapState, mapGetters, mapActions } from 'vuex';
import ActionType from '@/store/constants';

export default {
  name: 'SetProxy',
  data() {
    return {
      proxyNameError: false,
      proxyName: '',
      slogan: '',
      philosophy: '',
      backgroundInformation: '',
      logourl: '',
      telegram: '',
      steemit: '',
      twitter: '',
      wechat: '',
      website: '',
    };
  },
  computed: {
    ...mapState([
      'eos',
      'transaction',
    ]),
    ...mapGetters([
      'getAccountName',
      'getAuthority',
    ]),
    validateRegisterProxyInfo() {
      if (this.proxyName && !this.proxyNameError) {
        return false;
      }
      return true;
    },
  },
  methods: {
    ...mapActions([
      ActionType.SET_TRANSACTION,
    ]),
    onSetProxy() {
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
                isproxy: 1,
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
    onRegisterProxyInfo() {
      this.eos.transaction(
        {
          actions: [
            {
              account: 'regproxyinfo',
              name: 'set',
              authorization: [{
                actor: this.getAccountName,
                permission: this.getAuthority,
              }],
              data: {
                proxy: this.getAccountName,
                name: this.proxyName,
                slogan: this.slogan,
                philosophy: this.philosophy,
                background: this.backgroundInformation,
                website: this.website,
                logo_256: this.logourl,
                telegram: this.telegram,
                steemit: this.steemit,
                twitter: this.twitter,
                wechat: this.wechat,
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
