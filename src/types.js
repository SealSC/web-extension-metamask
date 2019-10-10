let TransactionExtraInfo = function (gasPrice, gasLimit, onReceipt = null) {
  this.gasPrice = gasPrice
  this.gasLimit = gasLimit
  this.onReceipt = onReceipt
}

export default {
  TransactionExtraInfo
}