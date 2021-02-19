import { newKit } from '@celo/contractkit'

const kit = newKit('https://alfajores-forno.celo-testnet.org')

export async function getFrozenBalance() {
 const reserve = await kit.contracts.getReserve()

}

export async function getUnFrozenBalance() {
  const reserve = await kit.contracts.getReserve()
}

export async function getInCustodyBalance() {
  const reserve = await kit.contracts.getReserve()
  const nativeToken = await kit.contracts.getGoldToken()
  const contractBalance = await nativeToken.balanceOf(reserve.address)
  // reserveCeloBalance includes both in contract and other address balances. need to subtract out
  const totalBalance = await reserve.getReserveGoldBalance()
  return totalBalance.minus(contractBalance)
}

export async function getcUSDSupply() {
  const stableToken = await kit.contracts.getStableToken()

  return stableToken.totalSupply()
}

// TODO once EUR comes out
export async function getcEURSupply() {
  // const stableToken = await kit.contracts.getStableToken()

  // return stableToken.totalSupply()
}

export async function getTotalRatio() {

}


export async function getUnFrozenRatio() {

}