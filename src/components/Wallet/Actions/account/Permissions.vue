<template>
<div id="main">
  <div class="row">
    <div class="col-md-8 col-12">
      <div class="card">
        <div class="card-header"><h4 class="title">Change Permissions</h4></div>
        <div class="card-body">
          <form>
            <div class="row">
              <div class="col-md-6 col-12">
                <fg-input label="Active Permission (key or account)" type="text" v-model="activePermission" placeholder="e.g. EOS1hQ1v8vut1V2giQC1ha7J225GCzFJtF317fy8JYuN7k6fG4n11"
                          name="activePermission" v-validate="modelValidation.activePermission" data-vv-as="active permission"
                          :error="getError('activePermission')"
                ></fg-input>
              </div>
              <div class="col-md-6 col-12">
                <fg-input label="Owner Permission (key or account)" v-model="ownerPermission" placeholder="e.g. EOS1hQ1v8vut1V2giQC1ha7J225GCzFJtF317fy8JYuN7k6fG4n11"
                          name="ownerPermission" v-validate="modelValidation.ownerPermission" data-vv-as="owner permission"
                          :error="getError('ownerPermission')"
                ></fg-input>
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
    <div class="col-md-4 col-12">
      <div class="card">
        <div class="card-header"><h4 class="title">Help</h4></div>
        <div class="card-body pb-4">
          <div>Please be aware of the consequences of this action. Mind every permission you assign. If you accidently assign an account instead of a key as a permission, your account will become irrecoverable.</div>
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
      ownerPermission: '',
      modelValidation: {
        activePermission: {
          max: 53,
          publicKey: true,
        },
        ownerPermission: {
          max: 53,
          publicKey: true,
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
    onUnpdate() {
      if (!this.eos) {
        bl.logInPopUP();
        return;
      }
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
      return !Object.keys(this.fields).every(key => this.fields[key].valid);
    },
  },
};
</script>

<style scoped>
</style>
