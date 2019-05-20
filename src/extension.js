import Web3 from "web3";
import {MetamaskChecker} from "./checker";
import {MetamaskConnector} from "./connector";
import {MetamaskActions} from "./actions/actions";
import {MetamaskContractCaller} from "./contractCaller";
import metamaskTypes from "./types";
import {types, consts} from "@sealsc/web-extension-protocol"

class MetamaskExtension extends types.ExtensionWrapper {
  constructor() {
    super()
    this.checker = new MetamaskChecker(this)
    this.connector = new MetamaskConnector(this)
    this.actions = new MetamaskActions(this)
    this.contractCaller = new MetamaskContractCaller(this)
  }

  load() {
    this.webjsInstance = new Web3(ethereum)
    return new types.Result(this.webjsInstance, consts.predefinedStatus.SUCCESS())
  }
}

let metamask = new MetamaskExtension()

export {
  metamask,
  metamaskTypes as types,
}