<template>
  <div id="main">
    <div class="md-layout twocolumn">
      <md-card class="md-card-style md-layout-item">
        <md-toolbar class="md-transparent" :md-elevation="0">
          <div class="md-title">Link Auth</div>
        </md-toolbar>

        <md-card-content class="alw-first-child">
          <md-field>
            <label>Account name</label>
            <span class="md-prefix">@ </span>
            <md-input :value="getAccountName" maxlength="12" required readonly></md-input>
          </md-field>
          <md-field>
            <label>Account Permission</label>
            <span class="md-prefix">@ </span>
            <md-input type="text" v-model="accountPermission" required></md-input>
          </md-field>
        </md-card-content>

        <md-card-content>
          <md-field>
            <label>Contract Name</label>
            <span class="md-error">Invalid name</span>
            <md-input type="text" v-model="linkContractName" required></md-input>
          </md-field>
          <md-field>
            <label>Contract Action</label>
            <md-input type="text" v-model="linkContractAction" required></md-input>
          </md-field>
        </md-card-content>

        <md-card-content class="alw-buttons">
          <md-button @click="onLinkAuth" style="color: #ffffff; box-shadow: none; width: 260px; "
                     class="md-raised md-primary" :disabled="validateLinkAuth">Link Auth
          </md-button>
        </md-card-content>
        <TextActionAgree/>
      </md-card>
      <md-card class="md-card-style md-layout-item help">
      <md-toolbar class="md-transparent" :md-elevation="0">
        <div class="md-title">Help</div>
      </md-toolbar>

      <md-card-content class="alw-first-child">
        <div>Special permissions to set some specific actions are available through the option.
          You can create special permissions on your account that are allowed to execute specific contract actions.
          Please fill in the info tipped on the background and hit the button ‘link auth’.</div>
      </md-card-content>
    </md-card>
    </div>

    <div class="md-layout twocolumn">
      <md-card class="md-card-style md-layout-item">
        <md-toolbar class="md-transparent" :md-elevation="0">
          <div class="md-title">Unlink Auth</div>
        </md-toolbar>

        <md-card-content class="alw-first-child">
          <md-field>
            <label>Account Name</label>
            <span class="md-prefix">@ </span>
            <md-input :value="getAccountName" maxlength="12" required readonly></md-input>
          </md-field>
        </md-card-content>

        <md-card-content>
          <md-field>
            <label>Contract Name</label>
            <span class="md-error">Invalid name</span>
            <md-input type="text" v-model="unlinkContractName" required></md-input>
          </md-field>
          <md-field>
            <label>Contract Action</label>
            <md-input type="text" v-model="unlinkContractAction" required></md-input>
          </md-field>
        </md-card-content>

        <md-card-content class="alw-buttons">
          <md-button @click="onUnlinkAuth" style="color: #ffffff; box-shadow: none; width: 260px; "
                     class="md-raised md-primary" :disabled="validateUnlinkAuth">Unlink Auth
          </md-button>
        </md-card-content>
        <TextActionAgree/>
      </md-card>
      <md-card class="md-card-style md-layout-item help">
        <md-toolbar class="md-transparent" :md-elevation="0">
          <div class="md-title">Help</div>
        </md-toolbar>

        <md-card-content class="alw-first-child">
          <div>If you want to remove a link simply, specify correctly the contract name and action.</div>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import bl from '@/bl';
import ActionType from '@/store/constants';
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'LinkAuth',
  data() {
    return {
      accountPermission: '',
      linkContractName: '',
      linkContractAction: '',
      unlinkContractName: '',
      unlinkContractAction: '',
    };
  },
  methods: {
    ...mapActions([
      ActionType.SET_TRANSACTION,
    ]),
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
      if (this.accountPermission && this.linkContractName && this.linkContractAction) {
        return false;
      }
      return true;
    },
    validateUnlinkAuth() {
      if (this.unlinkContractName && this.unlinkContractAction) {
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
