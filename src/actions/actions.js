import {types} from "@sealsc/web-extension-protocol";
import {transfer} from "./transfer";
import {loadContract} from "./loadContract";
import {transferToken} from "./transferToken";
import {getAccount} from "./getAccount";

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
}

export {
  MetamaskActions
}