import Is from "is_js";
import {types, consts} from "@sealsc/web-extension-protocol"

const networkIdList = {
  MAIN: "1",
}

class MetamaskChecker extends types.ExtensionChecker {
  async installed() {
    if (Is.undefined(window.ethereum)) {
      return new types.Result(false, consts.predefinedStatus.NO_EXTENSION())
    }

    return ethereum.isMetaMask ?
      new types.Result(true, consts.predefinedStatus.SUCCESS()) :
      new types.Result(false, consts.predefinedStatus.NOT_SPECIFIED_EXTENSION())
  }

  async isMainnet() {
    let checkInstall = await this.installed()
    if(!checkInstall.data) {
      return checkInstall
    }
    return new types.Result(networkIdList.MAIN === ethereum.networkVersion, consts.predefinedStatus.SUCCESS(ethereum.networkVersion))
  }

  async isLogin() {
    let checkInstall = await this.installed()
    if(!checkInstall.data) {
      return checkInstall
    }

    return ethereum.selectedAddress ?
      new types.Result(true, consts.predefinedStatus.SUCCESS()) :
      new types.Result(false, consts.predefinedStatus.NOT_LOGIN())
  }
}

export {
  MetamaskChecker
}