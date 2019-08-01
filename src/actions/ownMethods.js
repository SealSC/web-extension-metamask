import {types, consts} from "@sealsc/web-extension-protocol"

async function getTransactionByTx(txHash) {
  let web3Instance = this.extension.webjsInstance

  try {
    let tx = await web3Instance.eth.getTransaction(txHash)
    return new types.Result(tx, consts.predefinedStatus.SUCCESS(tx))
  } catch (reason) {
    return new types.Result(null, consts.predefinedStatus.UNKNOWN(reason))
  }
}

export default {
  getTransactionByTx: getTransactionByTx,
}