import {types, consts} from "@sealsc/web-extension-protocol";

async function loadContract(abi, address) {
  let contract = null
  let wrapper = null
  let err = consts.predefinedStatus.SUCCESS()
  try {
    contract = new this.extension.webjsInstance.eth.Contract(abi, address)
    wrapper = new types.ContractWrapper(abi, address, contract)
  } catch(e) {
    err = consts.predefinedStatus.UNKNOWN(e)
  }
  return new types.Result(wrapper, err)
}

export {
  loadContract
}