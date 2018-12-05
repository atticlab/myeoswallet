<template>
  <div id="main">
    <div class="row">
      <div class="col-md-8 col-12">
        <div class="card">
          <div class="card-header"><h4 class="title">Link Auth</h4></div>
          <div class="card-body">
            <form>
              <div class="row">
                <div class="col-md-6 col-12">
                  <fg-input label="Account name" :value="getAccountName" maxlength="12" readonly></fg-input>
                </div>
                <div class="col-md-6 col-12">
                  <el-tooltip content="Permission to link" placement="top">
                    <fg-input label="Account Permission" type="text" v-model="accountPermission" required
                              name="accountPermission" v-validate="modelValidation.accountPermission" :error="getError('accountPermission')"
                    ></fg-input>
                  </el-tooltip>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 col-12">
                    <fg-input label="Contract Name" type="text" v-model="linkContractName" required
                              name="linkContractName" v-validate="modelValidation.linkContractName" :error="getError('linkContractName')"
                    ></fg-input>
                </div>
                <div class="col-md-6 col-12">
                  <fg-input label="Contract Action" type="text" v-model="linkContractAction" required
                            name="linkContractAction" v-validate="modelValidation.linkContractAction" :error="getError('linkContractAction')"
                  ></fg-input>
                </div>
              </div>

              <div class="row">
                <div class="col text-center">
                  <p-button @click="onLinkAuth" :disabled="validateLinkAuth" type="primary">Link Auth</p-button>
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
            <div>This option provides special permissions to set some specific actions. You can add special permissions that are allowed to execute specific contract actions. Please fill in the info tipped on the background and click ‘link auth’</div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-8 col-12">
        <div class="card">
          <div class="card-header"><h4 class="title">Unlink Auth</h4></div>
          <div class="card-body">
            <form>
              <div class="row">
                <div class="col-12">
                  <fg-input label="Account Name" :value="getAccountName" maxlength="12" required readonly></fg-input>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 col-12">
                  <fg-input label="Contract Name" type="text" v-model="unlinkContractName" required
                            name="unlinkContractName" v-validate="modelValidation.unlinkContractName" :error="getError('unlinkContractName')"
                  ></fg-input>
                </div>
                <div class="col-md-6 col-12">
                  <fg-input label="Contract Action" type="text" v-model="unlinkContractAction" required
                            name="unlinkContractAction" v-validate="modelValidation.unlinkContractAction" :error="getError('unlinkContractAction')"
                  ></fg-input>
                </div>
              </div>

              <div class="row">
                <div class="col text-center">
                  <p-button @click="onUnlinkAuth" :disabled="validateUnlinkAuth" type="primary">Unlink Auth</p-button>
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
            <div>If you want to remove a link, indicate the contract name and action.</div>
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
  name: 'LinkAuth',
  components: {
    [Tooltip.name]: Tooltip,
  },
  data() {
    return {
      accountPermission: '',
      linkContractName: '',
      linkContractAction: '',
      unlinkContractName: '',
      unlinkContractAction: '',
      modelValidation: {
        accountPermission: {
          required: true,
        },
        linkContractName: {
          required: true,
        },
        linkContractAction: {
          required: true,
        },
      },
      unlinkmodelValidation: {
        unlinkContractName: {
          required: true,
        },
        unlinkContractAction: {
          required: true,
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
    onLinkAuth() {
      this.eos.transaction(
        {
          actions: [
            {
              account: 'eosio',
              name: 'linkauth',
              authorization: [{
                actor: this.getAccountName,
                permission: this.getAuthority,
              }],
              data: {
                account: this.getAccountName,
                code: this.linkContractName,
                type: this.linkContractAction,
                requirement: this.accountPermission,
              },
            },
          ],
        },
      ).then((transactionResult) => {
        console.debug(`${this.$options.name} RESULT`, transactionResult);
        this[ActionType.SET_TRANSACTION](transactionResult);
        bl.renderJSON(transactionResult, 'place-for-transaction');
      }).catch((e) => {
        this[ActionType.SET_TRANSACTION](e);
        bl.handleError(e, 'place-for-transaction');
      });
    },
    onUnlinkAuth() {
      if (!this.eos) {
        bl.logInPopUP();
        return;
      }
      this.eos.transaction(
        {
          actions: [
            {
              account: 'eosio',
              name: 'unlinkauth',
              authorization: [{
                actor: this.getAccountName,
                permission: this.getAuthority,
              }],
              data: {
                account: this.getAccountName,
                code: this.unlinkContractName,
                type: this.unlinkContractAction,
              },
            },
          ],
        },
      ).then((transactionResult) => {
        console.debug(`${this.$options.name} RESULT`, transactionResult);
        this[ActionType.SET_TRANSACTION](transactionResult);
        bl.renderJSON(transactionResult, 'place-for-transaction');
      }).catch((e) => {
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
    validateLinkAuth() {
      return !Object.keys(this.modelValidation).every(key => this.fields[key] && this.fields[key].valid);
    },
    validateUnlinkAuth() {
      return !Object.keys(this.unlinkmodelValidation).every(key => this.fields[key] && this.fields[key].valid);
    },
  },
};
</script>

<style scoped>
</style>
