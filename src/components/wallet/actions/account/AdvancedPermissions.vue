<template>
<div id="main" class="md-layout twocolumn">
  <md-card class="md-card-style md-layout-item">
    <md-toolbar class="md-transparent" :md-elevation="0">
      <div class="md-title">Change Advanced Permissions</div>
    </md-toolbar>

    <md-card-content class="alw-first-child">
       <md-field>
        <label>Account</label>
        <span class="md-prefix">@ </span>
        <md-input :value="getAccountName" maxlength="12" required readonly></md-input>
      </md-field>
      <md-field :class="thresholdError ? 'md-invalid' : ''">
        <label>Threshold</label>
        <span class="md-prefix">@ </span>
        <span class="md-error">Invalid value</span>
        <md-input type="number" v-model="threshold" required @change="validateThreshold"></md-input>
      </md-field>
    </md-card-content>

    <md-card-content>
      <md-field>
        <label>Permission</label>
        <md-input type="text" v-model="permission" required></md-input>
      </md-field>
      <md-field>
        <label>Parent</label>
        <md-input type="text" v-model="parent"></md-input>
      </md-field>
    </md-card-content>

    <md-card-content v-for="(authority, index) in authorities" :key="index">
      <md-field :class="authority.error ? 'md-invalid' : ''">
        <label>Authority</label>
        <md-input type="text" v-model="authority.authority" required @change="authority.error = false"></md-input>
      </md-field>
      <md-field>
        <label>Account permission</label>
        <md-input type="text" v-model="authority.permission"></md-input>
      </md-field>
      <md-field>
        <label>Weight</label>
        <md-input type="text" v-model="authority.weight" required></md-input>
      </md-field>
    </md-card-content>

    <md-card-content class="alw-buttons">
      <md-button @click="addRow" style="color: #ffffff; box-shadow: none; width: 200px; "
                 class="md-raised md-primary">Add Row
      </md-button>
      <md-button @click="deleteRow" style="color: #ffffff; box-shadow: none; width: 200px; "
                 class="md-raised md-primary">Delete Row
      </md-button>
      <md-button @click="onUnpdate" style="color: #ffffff; box-shadow: none; width: 200px; "
                 class="md-raised md-primary" :disabled="validatePermission">Update
      </md-button>
    </md-card-content>
  </md-card>
  <md-card class="md-card-style md-layout-item help">
    <md-toolbar class="md-transparent" :md-elevation="0">
      <div class="md-title">HELP</div>
    </md-toolbar>

    <md-card-content class="alw-first-child">
      <div>Having connectivity issues or scatter not appearing when transacting? Please ensure
        you have updated to the latest scatter desktop</div>
    </md-card-content>
  </md-card>
</div>
</template>

<script>
import bl from '@/bl';
import ActionType from '@/store/constants';
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'AdvancedPermissions',
  data() {
    return {
      thresholdError: false,
      threshold: '1',
      permission: '',
      parent: '',
      authorities: [{ authority: '', permission: '', weight: '1', error: false }],
    };
  },
  methods: {
    ...mapActions([
      ActionType.SET_TRANSACTION,
    ]),
    onUnpdate() {
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
            threshold: parseInt(this.threshold, 10),
            keys: [],
            accounts: [],
          },
        },
      }];
      this.authorities.forEach((obj, i) => {
        if (obj.authority.length === 12) {
          if (obj.permission.length) {
            actions[0].data.auth.accounts.push({
              permission: {
                actor: obj.authority,
                permission: obj.permission,
              },
              weight: parseInt(obj.weight, 10),
            });
          } else {
            this.authorities[i].error = true;
          }
        } else if (bl.validatePublicKey(obj.authority)) {
          actions[0].data.auth.keys.push({
            key: obj.authority,
            weight: parseInt(obj.weight, 10),
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
          bl.handleError(e, 'place-for-transaction');
        });
    },
    validateThreshold() {
      this.thresholdError = parseInt(this.threshold, 10) < 0;
    },
    addRow() {
      this.authorities.push({ authority: '', permission: '', weight: '1', error: false });
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
      if (this.permission && this.authorities.every(obj => !obj.error && obj.authority && parseInt(obj.weight, 10) > 0) && !this.thresholdError) {
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
