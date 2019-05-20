import {types, consts} from "@sealsc/web-extension-protocol";

class MetamaskConnector extends types.ExtensionConnector {
  async link() {
    let checkInstall = await this.extension.checker.installed()
    if(!checkInstall.data) {
      return checkInstall
    }

    let account = ethereum.selectedAddress
    if(!account) {
      ethereum.enable()
      return new types.Result(null, consts.predefinedStatus.NOT_LOGIN(null))
    }

    return new types.Result(account, consts.predefinedStatus.SUCCESS(null))
  }
}

export {
  MetamaskConnector
}