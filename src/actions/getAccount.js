import {types, consts} from "@sealsc/web-extension-protocol";

async function getAccount() {
  if(ethereum) {
    return ethereum.selectedAddress ?
      new types.Result(ethereum.selectedAddress, consts.predefinedStatus.SUCCESS()) :
      new types.Result(null, consts.predefinedStatus.NOT_LOGIN())
  } else {
    let accountList = await this.webjsInstance.eth.getAccounts()
    if(accountList.length > 0) {
      return new types.Result(accountList[0], consts.predefinedStatus.SUCCESS())
    } else {
      return new types.Result(null, consts.predefinedStatus.NOT_LOGIN())
    }
  }
}

export {
  getAccount
}