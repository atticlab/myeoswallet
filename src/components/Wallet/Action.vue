<template>
  <div>
    <router-view/>
    <div class="card">
        <div class="card-header"><h4 class="title">Blockchain Raw Data</h4></div>
      <div class="card-body" id="place-for-transaction"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ActionType from 'src/store/constants';
import swal from 'sweetalert2';


export default {
  name: 'Action',
  computed: {
    ...mapState([
      'transaction',
      'actionInfoPopUp',
    ]),
    isError() {
      return this.transaction && ((this.transaction.isError || this.transaction.error) ||
        (this.transaction.status && this.transaction.status !== 200) || this.transaction.status === 0);
    },
  },
  methods: {
    ...mapActions([
      ActionType.SET_ACTIONINFOPOPUP,
    ]),
    closePopUp() {
      this[ActionType.SET_ACTIONINFOPOPUP](false);
    },
    copy() {
      this.$copyText(JSON.stringify(this.transaction));
    },
    initPopUp() {
      swal({
        title: this.isError ? 'Fail' : 'Success',
        type: this.isError ? 'error' : 'success',
        html: '<div id="json-pop-up" style="text-align: left;"><pre>' + JSON.stringify(this.transaction, null, 1) + '</pre></div>',
        buttonsStyling: false,
        showCancelButton: true,
        showCloseButton: true,
        showConfirmButton: false,
        cancelButtonText: 'Copy',
        focusCancel: true,
        focusConfirm: false,
        confirmButtonClass: 'btn btn-primary',
        cancelButtonClass: 'btn btn-primary',
      })
        .catch(e => {
          if (e === 'cancel') {
            this.copy();
          }
        })
        .finally(() => {
          this.closePopUp()
        })
    }
  },
  watch: {
    actionInfoPopUp() {
      if (this.actionInfoPopUp) {
        this.initPopUp()
      }
    }
  }
};
</script>

<style scoped>
  #json-pop-up {
    overflow: auto !important;
    max-height: 30vh;
  }

  #place-for-transaction {
    overflow: auto;
  }
</style>
