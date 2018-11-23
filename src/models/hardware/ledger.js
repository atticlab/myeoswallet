/* eslint-disable */
import Actions from '../../store/constants';
import {EXT_WALLET_TYPES} from '../ExternalWallet';
import TransportU2F from '@ledgerhq/hw-transport-u2f';
import EosLedger from './eosledjer';
import store from '../../store';

export const LEDGER_PATHS = {
  eos: "44'/194'/0'/0/0",
};

const cache = {};

export default class LedgerWallet {

  constructor(blockchain){
    this.blockchain = blockchain;
    this.init();
  }

  static typeToInterface(blockchain){
    if(!cache.hasOwnProperty(blockchain)) cache[blockchain] = new LedgerWallet(blockchain);
    return cache[blockchain];
  };

  async init(){
    this.getPublicKey = async () => { throw new Error('not initialized') };
    this.sign = async () => { throw new Error('not initialized') };
    this.canConnect = async () => { return 'Open and unlock your Ledger.'; };

    const setHardware = async () => {
      let hardware = null;

      try {
        hardware = {
          type:EXT_WALLET_TYPES.LEDGER,
          transport:null,
          transportInstance: null,
          eos: null,
          disconnect: async () => {
            store.dispatch(Actions.SET_HARDWARE, null);
            delete cache[this.blockchain];
          }
        }
        hardware.transportInstance = await TransportU2F.create()
        hardware.eos = new EosLedger(hardware.transportInstance)
        this.getPublicKey = hardware.eos.getPublicKey;
        this.sign = hardware.eos.signTransaction;
        this.canConnect = hardware.eos.getAppConfiguration;
      } catch (e) {
        console.error(e)
        throw e
      }

      return store.dispatch(Actions.SET_HARDWARE, hardware);
    }

    if(store.state.hardware) {
      await store.state.hardware.disconnect();
      return await setHardware();
    } else return await setHardware();
  }

}
