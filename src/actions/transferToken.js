import {types, consts, utils} from "@sealsc/web-extension-protocol";

async function transferToken(wrapper, to, amount, extra) {
  let contractCaller = this.extension.contractCaller
  let decimalResult = await contractCaller.offChainCall(wrapper, 'decimals')
  if(consts.predefinedStatus.SUCCESS().code !== decimalResult.status.code) {
    return decimalResult
  }

  let tokenDecimal = decimalResult.data

  if(!tokenDecimal) {
    return new types.Result(null, consts.predefinedStatus.UNKNOWN('get token decimals failed.'))
  }
  amount = utils.mulWithPow(amount, 10, tokenDecimal)
  return await contractCaller.onChainCall(
    wrapper,
    'transfer',
    [to, amount],
    0,
    extra
  )
}

export {
  transferToken
}