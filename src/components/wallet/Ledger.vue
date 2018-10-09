<template>
  <div id="main"></div>
</template>

<script>
import { ExternalWallet, EXT_WALLET_TYPES } from '../../models/ExternalWallet';

export default {
  name: 'Ledger',
  data() {
    return {
      hardwareReady: false,
      selected: null,
      hardwareType: EXT_WALLET_TYPES.LEDGER,
    };
  },
  methods: {
    // async watchHardware() {
    //   if (this.hardwareReady) return;
    //
    //   await this.setupHardware();
    //   await new Promise(r => setTimeout(() => r(true), 500));
    //
    //   const connectedOrError = await this.selected.external.interface.canConnect();
    //
    //   if (connectedOrError === null) {
    //     this.error = 'Error connecting to hardware';
    //     this.setupHardware();
    //     return;
    //   }
    //
    //   if (typeof connectedOrError === 'string') {
    //     this.hardwareReady = false;
    //     this.error = connectedOrError;
    //     return;
    //   }
    //
    //   this.error = null;
    //   this.hardwareReady = true;
    // },
    // async keyImported(snackbar) {
    //   const isHardware = !!this.selected.external;
    //   const existing = this.keypairs.find((x) => {
    //     const existingHardware = isHardware && x.external && this.selected.external.publicKey === x.external.publicKey;
    //     return existingHardware || (x.keyHash === this.selected.keyHash && x.id !== this.selected.id);
    //   });
    //
    //   if (existing){
    //     this.status = null;
    //     this.error = `This Secret already exists under the name ${existing.name}`;
    //     return false;
    //   }
    //
    //   if (!isHardware) await KeyPairService.makePublicKeys(this.selected);
    //   if (!this.selected.publicKeys.length) return false;
    //
    //   await KeyPairService.saveKeyPair(this.selected);
    //   this.status = 'Linking available accounts. Please wait.';
    //   await AccountService.importAllAccounts(this.selected);
    //   PopupService.push(Popup.snackbar(snackbar));
    //
    //   this.isNew = false;
    //   this.status = null;
    //   this.exporting = null;
    //   this.exportType = null;
    //   this.importType = null;
    //   this.importing = false;
    //   this.selected = this.keypairs.find(x => x.id === this.selected.id).clone();
    //   await PriceService.getBalances();
    // },
    // setupHardware() {
    //   this.selected.external = new ExternalWallet(this.hardwareType);
    //   this.hardwareReady = false;
    // },
    connect() {

    },
  },
  created() {
    this.connect();
  },
};
</script>

<style scoped>

</style>
