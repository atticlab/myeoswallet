<template>
  <md-card class="md-card-style">
    <md-toolbar class="md-transparent" :md-elevation="0">
      <div class="md-title">EOSIO Forum Status</div>
    </md-toolbar>

    <md-card-content class="alw-first-child">
      <md-field>
        <label>Username</label>
        <span class="md-prefix">@ </span>
        <md-input :value="getAccountName" maxlength="12" required readonly></md-input>
      </md-field>
      <md-field :class="statusError ? 'md-invalid' : ''">
        <label>Status</label>
        <span class="md-prefix">@ </span>
        <span class="md-error">Invalid value</span>
        <md-input type="text" v-model="status" required @change="validateStatus"></md-input>
      </md-field>
    </md-card-content>

    <md-card-content class="alw-buttons">
      <md-button @click="onStatus" style="color: #ffffff; box-shadow: none; width: 260px; "
                 class="md-raised md-primary" :disabled="statusValidation">Send
      </md-button>
    </md-card-content>
  </md-card>
</template>

<script>
import bl from '@/bl';
import { mapState, mapGetters, mapActions } from 'vuex';
import ActionType from '@/store/constants';

export default {
  name: 'ForumStatus',
  data() {
    return {
      statusError: false,
      status: '',
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
    statusValidation() {
      if (this.status && !this.statusError) {
        return false;
      }
      return true;
    },
  },
  methods: {
    ...mapActions([
      ActionType.SET_TRANSACTION,
    ]),
    onStatus() {
      this.eos.transaction(
        {
          actions: [
            {
              account: 'eosforumdapp',
              name: 'status',
              authorization: [{
                actor: this.getAccountName,
                permission: this.getAuthority,
              }],
              data: {
                account: this.getAccountName,
                content: this.status,
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
    validateStatus() {
      if (bl.lengthInUtf8Bytes(this.status) <= 255) {
        this.statusError = false;
      } else {
        this.statusError = true;
      }
    },
  },
};
</script>

<style scoped>
  @import '../../../../assets/css/walletaction.css';
</style>
