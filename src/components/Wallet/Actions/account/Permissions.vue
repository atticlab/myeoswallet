<template>
<div id="main">
  <div class="row">
    <div class="col-8">
      <div class="card">
        <div class="card-header"><h4 class="title">Change Permissions</h4></div>
        <div class="card-body">
          <form>
            <div class="row">
              <div class="col-6">
                <fg-input label="Active Permission (key or account)" type="text" v-model="activePermission" @change="activePermissionError = false"></fg-input>
              </div>
              <div class="col-6">
                <fg-input title="Invalid name" label="Owner Permission (key or account)" v-model="ownerPermission" @change="ownerPermissionError = false"></fg-input>
              </div>
            </div>

            <div class="row">
              <div class="col text-center">
                <p-button @click="onUnpdate" :disabled="validatePermission" type="primary">Update</p-button>
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
          <div>Pay special attention this action has tangible consequences
            Control every permission you assign.
            If you mix up and assign an account instead of a key, as permission, you risk to break down your account </div>
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
          this[ActionType.SET_TRANSACTION](e);
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
</style>
