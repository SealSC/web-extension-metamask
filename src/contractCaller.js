import Is from "is_js";
import {types, consts} from "@sealsc/web-extension-protocol";
import {transactionResultGetter, buildGasSetting} from "./utils";
import metamaskTypes from "./types";

function getContractMethod(contract, methodName) {
  let methodModel = contract.abiModel.getMethod(methodName)

  if(!methodModel) {
    return null
  }

  return {
    model: methodModel,
    func: contract.methods[methodName]
  }
}

class MetamaskContractCaller extends types.ExtensionContractCaller {
  async onChainCall(wrapper, methodName, param, amount, extra) {
    let accountResult = await this.extension.actions.getAccount()
    let account = accountResult.data

    if(!Is.array(param)) {
      return new types.Result(null, consts.predefinedStatus.BAD_PARAM(param))
    } else if(0 === param.length) {
      param = []
    }

    let method = getContractMethod(wrapper.contract, methodName)
    if(!method) {
      return new types.Result(null, consts.predefinedStatus.BAD_PARAM(methodName))
    }

    if(!extra) {
      extra = new metamaskTypes.TransactionExtraInfo()
    } else {
      if(!(extra instanceof metamaskTypes.TransactionExtraInfo)) {
        return new types.Result(null, consts.predefinedStatus.BAD_PARAM(extra))
      }
    }

    let gasSetting = buildGasSetting(extra)
    let sendParam = {
      from: account,
      gasPrice: gasSetting.gasPrice,
      gas: gasSetting.gasLimit
    }

    if(method.payable) {
      sendParam.value = web3.toWei(amount)
    }

    return await new Promise(rs => {
      method.func(...param)
        .send(sendParam, (err, tx) =>  {
          transactionResultGetter(rs, err, tx)
        })
    })
  }

  async offChainCall(wrapper, methodName, param = []) {
    let accountResult = await this.extension.actions.getAccount()
    let account = accountResult.data

    if(!Is.array(param)) {
      return new types.Result(null, consts.predefinedStatus.BAD_PARAM(param))
    } else if(0 === param.length) {
      param = []
    }

    let method = getContractMethod(wrapper.contract, methodName)
    if(!method) {
      return new types.Result(null, consts.predefinedStatus.BAD_PARAM(methodName))
    }

    return await new Promise(resolve => {
      method.func(...param).call({from: account}, (err, result) => {
        transactionResultGetter(resolve, err, result)
      }).catch(reason => {
        transactionResultGetter(resolve, reason, null)
      })
    })
  }
}

export {
  MetamaskContractCaller
}