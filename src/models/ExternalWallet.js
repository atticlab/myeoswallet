/* eslint-disable */
import IdGenerator from '../util/IdGenerator';
import LedgerWallet from './hardware/ledger';

export const EXT_WALLET_TYPES = {
  LEDGER: 'Ledger Nano S'
};
export const bip44Path = "44'/194'/0'/0/0";

export default class ExternalWallet {

  constructor(_type = EXT_WALLET_TYPES.LEDGER, _blockchain = 'eos'){
    this.id = IdGenerator.text(64);

    this.type = _type;
    this.blockchain = _blockchain;
    this.interface = getInterface(_type, _blockchain);
  }

  static placeholder(){ return new ExternalWallet(); }
  static fromJson(json){
    let p = Object.assign(this.placeholder(), json);
    p.interface = getInterface(p.type, p.blockchain);
    return p;
  }
}

const getInterface = (type, blockchain) => {
  switch (type) {
    case EXT_WALLET_TYPES.LEDGER: return LedgerWallet.typeToInterface(blockchain);
  }
}
