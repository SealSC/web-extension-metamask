import {types, consts} from "@sealsc/web-extension-protocol";

class MetamaskConnector extends types.ExtensionConnector {
  async link() {
    let checkInstall = await this.extension.checker.installed()
    if(!checkInstall.data) {
      return checkInstall
    }

    if(!ethereum.enable) {
      let accounts = await web3.eth.accounts
      if (accounts.length === 0) {
        return new types.Result(null, consts.predefinedStatus.NOT_LOGIN(null))
      } else {
        return new types.Result(accounts[0], consts.predefinedStatus.SUCCESS(null))
      }
    } else {
      let account = ethereum.selectedAddress
      if(!account) {
        ethereum.enable()
        return new types.Result(null, consts.predefinedStatus.NOT_LOGIN(null))
      } else {
        return new types.Result(null, consts.predefinedStatus.SUCCESS(null))
      }
    }
  }
}

export {
  MetamaskConnector
}