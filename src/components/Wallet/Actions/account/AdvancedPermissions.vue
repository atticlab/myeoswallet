<template>
<div id="main">
  <div class="row">
    <div class="col-md-8 col-12">
      <div class="card">
        <div class="card-header"><h4 class="title">Change Advanced Permissions</h4></div>
        <div class="card-body">
          <form>
            <div class="row">
              <div class="col-md-6 col-12">
                <fg-input label="Account" :value="getAccountName" maxlength="12" readonly></fg-input>
              </div>
              <div class="col-md-6 col-12">
                <fg-input label="Threshold" type="number" v-model.number="threshold" required
                          name="threshold" :error="getError('threshold')" v-validate="modelValidation.threshold"
                ></fg-input>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 col-12">
                <fg-input label="Permission" type="text" v-model="permission" required
                          name="permission" :error="getError('permission')" v-validate="modelValidation.permission"></fg-input>
              </div>
              <div class="col-md-6 col-12">
                <fg-input label="Parent" type="text" v-model="parent"></fg-input>
              </div>
            </div>

            <div class="row" v-for="(authority, index) in authorities" :key="index">
              <div class="col-md-4 col-12">
                <fg-input label="Name or Pub Key" type="text" v-model="authority.authority" required
                ></fg-input>
              </div>
              <div class="col-md-4 col-12">
                <fg-input label="Account permission" type="text" v-model="authority.permission"
                ></fg-input>
              </div>
              <div class="col-md-4 col-12">
                <fg-input label="Weight" type="number" v-model.number="authority.weight" required
                ></fg-input>
              </div>
            </div>

            <div class="row text-center">
              <div class="col-md-4 col-12">
                <el-tooltip content="Add new row for permission" placement="top">
                  <p-button @click="addRow" type="primary">
                    Add Row
                  </p-button>
                </el-tooltip>
              </div>

              <div class="col-md-4 col-12">
                <el-tooltip content="Delete permission row" placement="top">
                  <p-button @click="deleteRow" type="primary">
                    Delete Row
                  </p-button>
                </el-tooltip>
              </div>
              <div class="col-md-4 col-12">
                <el-tooltip content="Update permission" placement="top">
                  <p-button @click="onUnpdate" :disabled="validatePermission" type="primary">
                    Update
                  </p-button>
                </el-tooltip>
              </div>
            </div>
            <div class="row">
              <TextActionAgree/>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="col-md-4 col-12">
      <div class="card">
        <div class="card-header"><h4 class="title">Help</h4></div>
        <div class="card-body pb-4">
          <div>By this very action, you make your account irrecoverable.
            EOS accounts are based on complex permission structures, which include parent&child relationships, where parent ones are empowered to influence child ones: to change, remove the child permissions.
            Adding or modifying permissions
            Threshold needs a sum of permission weights to execute an action.
            You can add and change permissions, create new permissions, any other possibilities.
            Weight means some measure of weight the Authority provides to the Threshold.
            You can add or remove rows as required to meet your multisig requirements.</div>
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
import { Tooltip } from 'element-ui';

export default {
  name: 'AdvancedPermissions',
  data() {
    return {
      thresholdError: false,
      modelValidation: {
        threshold: {
          required: true,
          numeric: true,
          min_value: 0,
        },
      },
      threshold: 1,
      permission: '',
      parent: '',
      authorities: [{ authority: '', permission: '', weight: 1, error: false }],
    };
  },
  components: {
    [Tooltip.name]: Tooltip,
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
      const actions = [{
        account: 'eosio',
        name: 'updateauth',
        authorization: [{
          actor: this.getAccountName,
          permission: this.getAuthority,
        }],
        data: {
          account: this.getAccountName,
          permission: this.permission,
          parent: this.parent,
          auth: {
            threshold: this.threshold,
            keys: [],
            accounts: [],
          },
        },
      }];
      this.authorities.forEach((obj, i) => {
        if (obj.authority.length <= 12) {
          if (obj.permission.length) {
            actions[0].data.auth.accounts.push({
              permission: {
                actor: obj.authority,
                permission: obj.permission,
              },
              weight: obj.weight,
            });
          } else {
            this.authorities[i].error = true;
          }
        } else if (bl.validatePublicKey(obj.authority)) {
          actions[0].data.auth.keys.push({
            key: obj.authority,
            weight: obj.weight,
          });
        } else {
          this.authorities[i].error = true;
        }
      });
      if (this.authorities.some(obj => obj.error)) {
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
    addRow() {
      this.authorities.push({ authority: '', permission: '', weight: 1, error: false });
    },
    deleteRow() {
      if (this.authorities.length > 1) {
        this.authorities.splice(-1);
      }
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
      return !Object.keys(this.fields).every(key => this.fields[key] && this.fields[key].valid) || !this.authorities.every(obj => !obj.error && obj.authority && obj.weight > 0);
    },
  },
};
</script>

<style scoped>
</style>
