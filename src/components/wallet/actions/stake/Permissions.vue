<template>
  <md-card class="md-card-style">
    <md-toolbar class="md-transparent" :md-elevation="0">
      <div class="md-title">Change Permissions</div>
    </md-toolbar>

    <md-card-content>
      <md-field>
        <label>Active Permission (public key or account name)</label>
        <md-input type="text" v-model="activePermission"></md-input>
      </md-field>
      <md-field>
        <label>Owner Permission (public key or account name)</label>
        <md-input type="text" v-model="ownerPermission"></md-input>
      </md-field>
    </md-card-content>

    <md-card-content class="alw-buttons">
      <md-button @click="onUnpdate" style="color: #ffffff; box-shadow: none; width: 260px; "
                 class="md-raised md-primary">Update
      </md-button>
    </md-card-content>
  </md-card>
</template>

<script>
import bl from '@/bl';
import ActionType from '@/store/constants';
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'Permissions',
  data() {
    return {
      activePermission: '',
      ownerPermission: '',
    };
  },
  methods: {
    ...mapActions([
      ActionType.SET_TRANSACTION,
    ]),
    onUnpdate() {
      const actions = [];
      if (this.activePermission) {
        actions.push({
          account: 'eosio',
          name: 'updateauth',
          authorization: [{
            actor: this.getAccountName,
            permission: this.getAuthority,
          }],
          data: {
            account: this.getAccountName,
            permission: 'active',
            parent: 'owner',
            auth: {
              threshold: 1,
              keys: [],
              accounts: [
                {
                  permission: {
                    actor: this.activePermission,
                    permission: 'active',
                  },
                  weight: 1,
                },
              ],
            },
          },
        });
      }
      if (this.ownerPermission) {
        actions.push({
          account: 'eosio',
          name: 'updateauth',
          authorization: [{
            actor: this.getAccountName,
            permission: this.getAuthority,
          }],
          data: {
            account: this.getAccountName,
            permission: 'owner',
            parent: '',
            auth: {
              threshold: 1,
              keys: [],
              accounts: [
                {
                  permission: {
                    actor: this.ownerPermission,
                    permission: 'active',
                  },
                  weight: 1,
                },
              ],
            },
          },
        });
      }
      this.eos.transaction({
        actions,
      })
        .then((res) => {
          console.debug(`${this.$options.name} RESULT`, res);
          this[ActionType.SET_TRANSACTION](res);
          bl.renderJSON(res, 'place-for-transaction');
        })
        .catch((e) => {
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
      'getAuthority',
    ]),
  },
};
</script>

<style scoped>
  @import '../../../../assets/css/walletaction.css';
</style>
