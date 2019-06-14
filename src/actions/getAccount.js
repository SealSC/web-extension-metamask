import {types, consts} from "@sealsc/web-extension-protocol";

async function getAccount() {
  if(web3.eth && web3.eth.accounts) {
    if(web3.eth.accounts.length > 0) {
      return new types.Result(web3.eth.accounts[0], consts.predefinedStatus.SUCCESS())
    } else {
      return new types.Result(null, consts.predefinedStatus.NOT_LOGIN())
    }
  } else {
    return ethereum.selectedAddress ?
      new types.Result(ethereum.selectedAddress, consts.predefinedStatus.SUCCESS()) :
      new types.Result(null, consts.predefinedStatus.NOT_LOGIN())
  }
}

export {
  getAccount
}