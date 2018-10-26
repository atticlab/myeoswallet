<template>
<div id="main">
  <div class="row">
    <div class="col-8">
      <div class="card">
        <div class="card-header"><h4 class="title">Register Producer</h4></div>
        <div class="card-body">
          <form>
            <div class="row">
              <div class="col-6">
                <fg-input label="Account name" :value="getAccountName" maxlength="12" required readonly></fg-input>
              </div>
              <div class="col-6">
                <fg-input title="Invalid name" label="Producer key" type="text" v-model="producerKey" required @change="validateKey"></fg-input>
              </div>
            </div>

            <div class="row">
              <div class="col-6">
                <fg-input label="Url" type="text" v-model="url"></fg-input>
              </div>
              <div class="col-6">
                <fg-input label="Location" type="number" v-model="location"></fg-input>
              </div>
            </div>

            <div class="row">
              <div class="col text-center">
                <p-button @click="onRegister" :disabled="validateRegisterProducer" type="primary">Register</p-button>
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
          <div>Enter producer key, url and location, following the instructions tipped on the background.
            Click the button ‘register’.</div>
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
  name: 'RegisterProducer',
  data() {
    return {
      producerKey: '',
      producerKeyError: false,
      url: '',
      location: '0',
    };
  },
  methods: {
    ...mapActions([
      ActionType.SET_TRANSACTION,
    ]),
    onRegister() {
      this.eos.transaction(
        {
          actions: [
            {
              account: 'eosio',
              name: 'regproducer',
              authorization: [{
                actor: this.getAccountName,
                permission: this.getAuthority,
              }],
              data: {
                producer: this.getAccountName,
                producer_key: this.producerKey,
                url: this.url,
                location: parseInt(this.location, 10),
              },
            },
          ],
        },
      ).then((res) => {
        console.debug(`${this.$options.name} RESULT`, res);
        this[ActionType.SET_TRANSACTION](res);
        bl.renderJSON(res, 'place-for-transaction');
      })
        .catch((e) => {
          this[ActionType.SET_TRANSACTION](e);
          bl.handleError(e, 'place-for-transaction');
        });
    },
    validateKey() {
      this.producerKeyError = !bl.validatePublicKey(this.producerKey);
    },
  },
  computed: {
    ...mapState([
      'eos',
    ]),
    ...mapGetters([
      'getAccountName',
      'getAuthority',
    ]),
    validateRegisterProducer() {
      if (this.producerKey && !this.producerKeyError) {
        return false;
      }
      return true;
    },
  },
};
</script>

<style scoped>
</style>
