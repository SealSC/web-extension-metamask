import {types, consts, utils} from "@sealsc/web-extension-protocol";
import metamaskTypes from "../types";
import {buildGasSetting} from "../utils";
import {transactionResultGetter} from "../utils";

async function transfer(to, amount, memo, extra) {
  if(!extra) {
    extra = new metamaskTypes.TransactionExtraInfo()
  } else {
    if(!(extra instanceof metamaskTypes.TransactionExtraInfo)) {
      return new types.Result(null, consts.predefinedStatus.BAD_PARAM(extra))
    }
  }

  let web3Instance = this.extension.webjsInstance

  let gasSetting = buildGasSetting(extra)
  amount = web3.toWei(amount)
  let data = undefined
  if(memo) {
    data = web3.toHex(memo)
  }

  let accountResult = await this.extension.actions.getAccount()
  let account = accountResult.data

  const transferParameters = {
    from: account,
    to: to,
    value: amount,
    data: data,
    gasPrice: gasSetting.gasPrice,
    gas: gasSetting.gasLimit,
  }

  return await new Promise(r =>{
    try {
      web3Instance.eth.sendTransaction(transferParameters, (err, hash) => {
        transactionResultGetter(r, err, hash)
      }).then(function(receipt){
        if('function' === typeof extra.onReceipt) {
          extra.onReceipt(receipt)
        }
      }).catch(reason => {
        transactionResultGetter(r, reason, null)
      })
    } catch (reason) {
      transactionResultGetter(r, reason, null)
    }
  })
}

export {
  transfer
}