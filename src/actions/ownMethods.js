import {types, consts} from "@sealsc/web-extension-protocol"

async function getTransaction(txHash) {
  let web3Instance = this.extension.webjsInstance

  try {
    let tx = await web3Instance.eth.getTransaction(txHash)
    return new types.Result(tx, consts.predefinedStatus.SUCCESS(tx))
  } catch (reason) {
    return new types.Result(null, consts.predefinedStatus.UNKNOWN(reason))
  }
}

async function getTransactionReceipt(txHash) {
  let web3Instance = this.extension.webjsInstance

  try {
    let tx = await web3Instance.eth.getTransactionReceipt(txHash)
    return new types.Result(tx, consts.predefinedStatus.SUCCESS(tx))
  } catch (reason) {
    return new types.Result(null, consts.predefinedStatus.UNKNOWN(reason))
  }
}


export default {
  getTransaction: getTransaction,
  getTransactionReceipt: getTransactionReceipt,
}