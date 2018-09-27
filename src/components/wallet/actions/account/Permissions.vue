<template>
<div id="main" class="md-layout twocolumn">
  <md-card class="md-card-style md-layout-item">
    <md-toolbar class="md-transparent" :md-elevation="0">
      <div class="md-title">Change Permissions</div>
    </md-toolbar>

    <md-card-content>
      <md-field :class="activePermissionError ? 'md-invalid' : ''">
        <label>Active Permission (key or account)</label>
        <span class="md-error">Invalid value</span>
        <md-input type="text" v-model="activePermission" @change="activePermissionError = false"></md-input>
      </md-field>
      <md-field :class="ownerPermissionError ? 'md-invalid' : ''">
        <label>Owner Permission (key or account)</label>
        <span class="md-error">Invalid value</span>
        <md-input type="text" v-model="ownerPermission" @change="ownerPermissionError = false"></md-input>
      </md-field>
    </md-card-content>

    <md-card-content class="alw-buttons">
      <md-button @click="onUnpdate" style="color: #ffffff; box-shadow: none; width: 260px; "
                 class="md-raised md-primary" :disabled="validatePermission">Update
      </md-button>
    </md-card-content>
    <TextActionAgree/>
  </md-card>
  <md-card class="md-card-style md-layout-item help">
    <md-toolbar class="md-transparent" :md-elevation="0">
      <div class="md-title">Help</div>
    </md-toolbar>

    <md-card-content class="alw-first-child">
      <div>Pay special attention this action has tangible consequences
        Control every permission you assign.
        If you mix up and assign an account instead of a key, as permission, you risk to break down your account </div>
    </md-card-content>
  </md-card>
</div>
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
      activePermissionError: false,
      ownerPermission: '',
      ownerPermissionError: false,
    };
  },
  methods: {
    ...mapActions([
      ActionType.SET_TRANSACTION,
    ]),
    onUnpdate() {
      const actions = [];
      const temp = {
        account: 'eosio',
        name: 'updateauth',
        authorization: [{
          actor: this.getAccountName,
          permission: this.getAuthority,
        }],
        data: {
          account: this.getAccountName,
          permission: '',
          parent: '',
          auth: {
            threshold: 1,
            keys: [],
            accounts: [],
          },
        },
      };
      if (this.activePermission) {
        actions.push(Object.assign({}, temp));
        actions[actions.length - 1].data.permission = 'active';
        actions[actions.length - 1].data.parent = 'owner';
        if (this.activePermission === 12) {
          if (this.activePermission.length) {
            actions[actions.length - 1].data.auth.accounts.push({
              permission: {
                actor: this.activePermission,
                permission: 'active',
              },
              weight: 1,
            });
          } else {
            this.activePermissionError = true;
          }
        } else if (bl.validatePublicKey(this.activePermission)) {
          actions[actions.length - 1].data.auth.keys.push({
            key: this.activePermission,
            weight: 1,
          });
        } else {
          this.activePermissionError = true;
        }
      }
      if (this.ownerPermission) {
        actions.push(Object.assign({}, temp));
        actions[actions.length - 1].data.permission = 'owner';
        actions[actions.length - 1].data.parent = '';
        if (this.ownerPermission === 12) {
          if (this.ownerPermission.length) {
            actions[actions.length - 1].data.auth.accounts.push({
              permission: {
                actor: this.ownerPermission,
                permission: 'active',
              },
              weight: 1,
            });
          } else {
            this.ownerPermissionError = true;
          }
        } else if (bl.validatePublicKey(this.ownerPermission)) {
          actions[actions.length - 1].data.auth.keys.push({
            key: this.ownerPermission,
            weight: 1,
          });
        } else {
          this.ownerPermissionError = true;
        }
      }
      if (this.ownerPermissionError || this.activePermissionError) {
        return;
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
    validatePermission() {
      if ((this.activePermission || this.ownerPermission) && !this.ownerPermissionError && !this.activePermissionError) {
        return false;
      }
      return true;
    },
  },
};
</script>

<style scoped>
  @import '../../../../assets/css/walletaction.css';
</style>
