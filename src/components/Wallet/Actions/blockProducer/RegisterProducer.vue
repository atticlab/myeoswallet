<template>
<div id="main">
  <div class="row">
    <div class="col-md-8 col-12">
      <div class="card">
        <div class="card-header"><h4 class="title">Register Producer</h4></div>
        <div class="card-body">
          <form>
            <div class="row">
              <div class="col-md-6 col-12">
                <fg-input label="Account name" :value="getAccountName" maxlength="12" readonly></fg-input>
              </div>
              <div class="col-md-6 col-12">
                <fg-input label="Producer key" type="text" v-model="producerKey" required
                          name="producerKey" v-validate="modelValidation.producerKey" :error="getError('producerKey')" data-vv-as="producer key"
                ></fg-input>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 col-12">
                <fg-input label="Url" type="text" v-model="url"
                          name="url" v-validate="modelValidation.url" :error="getError('url')"
                ></fg-input>
              </div>
              <div class="col-md-6 col-12">
                <fg-input label="Location" type="number" v-model.number="location"
                          name="location" v-validate="modelValidation.location" :error="getError('location')"
                ></fg-input>
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
    <div class="col-md-4 col-12">
      <div class="card">
        <div class="card-header"><h4 class="title">Help</h4></div>
        <div class="card-body pb-4">
          <div>Enter producer key, url and location, following the instructions tipped on the background. Click ‘Register’.</div>
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
      url: '',
      location: 0,
      modelValidation: {
        producerKey: {
          required: true,
          max: 64,
          publicKey: true,
        },
        url: {
          url: true,
        },
        location: {
          numeric: true,
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
    onRegister() {
      if (!this.eos) {
        bl.logInPopUP();
        return;
      }
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
      // if (this.producerKey && !this.producerKeyError) {
      //   return false;
      // }
      // return true;
      return !Object.keys(this.fields).every(key => this.fields[key].valid);
    },
  },
};
</script>

<style scoped>
</style>
