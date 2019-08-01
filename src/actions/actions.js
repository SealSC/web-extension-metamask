import {types, consts} from "@sealsc/web-extension-protocol";
import {transfer} from "./transfer";
import {loadContract} from "./loadContract";
import {transferToken} from "./transferToken";
import {getAccount} from "./getAccount";
import ownMethods from "./ownMethods"
import Is from "is_js"

class MetamaskActions extends types.ExtensionActions {
  async transfer(to, amount, memo, extra) {
    return await transfer.call(this, to, amount, memo, extra)
  }

  async loadContract(abi, address) {
    return await loadContract.call(this, abi, address)
  }

  async transferToken(wrapper, to, amount, extra) {
    return await transferToken.call(this, wrapper, to, amount, extra)
  }

  async getAccount() {
    return await getAccount.call(this)
  }

  async invoke(method, ...args) {
    if(typeof ownMethods[method] !== 'function') {
      return new types.Result(null, consts.predefinedStatus.NOT_SUPPORT())
    }

    return await ownMethods[method](...args)
  }
}

export {
  MetamaskActions
}