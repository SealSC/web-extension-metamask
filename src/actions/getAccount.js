import {types, consts} from "@sealsc/web-extension-protocol";

async function getAccount() {
  return ethereum.selectedAddress ?
    new types.Result(ethereum.selectedAddress, consts.predefinedStatus.SUCCESS()) :
    new types.Result(null, consts.predefinedStatus.NOT_LOGIN())
}

export {
  getAccount
}