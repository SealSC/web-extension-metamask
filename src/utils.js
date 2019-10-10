import {types, consts} from "@sealsc/web-extension-protocol"

const defGasSetting = {
  price: "4000000000",
  limit: "150000"
}

function buildGasSetting(setting) {
  setting.gasPrice = setting.gasPrice ? setting.gasPrice : defGasSetting.price
  setting.gasLimit = setting.gasLimit ? setting.gasLimit : defGasSetting.limit

  return setting
}

let transactionResultGetter = function (resolve, err, data) {
  let result = null
  if(err) {
    result = new types.Result(null, consts.predefinedStatus.UNKNOWN(err))
  } else {
    result = new types.Result(data, consts.predefinedStatus.SUCCESS())
  }

  resolve(result)
}

export {
  buildGasSetting,
  transactionResultGetter,
}