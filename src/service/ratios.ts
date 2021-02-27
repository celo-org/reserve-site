import {btcBalance, ethBalance, daiBalance} from "src/service/holdings"
import {btcPrice, ethPrice, euroPrice} from "src/service/rates"
import {getcUSDSupply, getcEURSupply} from "src/providers/Celo"

export default async  function getRatios() {
  return {
    total: 0,
    unfrozen: 0
  }
}

export async function unfrozenReserveAssetsValueInUSD() {

}

export async function totalReserveAssetsValueInUSD() {

}

export async function totalOutstandingLiabilitiesInUSD(){
  const [totalCUSD, cEURValue] = await Promise.all([getcUSDSupply(),totalCeloEuroValueInUSD()])
  return totalCUSD.value + cEURValue
}

async function totalCeloEuroValueInUSD(): Promise<number> {
  const [units,price] = await  Promise.all([getcEURSupply(),euroPrice()])
  return price.value * units.value
}


export async function nonCeloAssetValue() {
  const values = await Promise.all([btcValue(), ethValue(), daiValue()])

  return values.reduce((prev, current) => {
    return prev + current
  }, 0)
}

export async function btcValue(): Promise<number> {
  const [units, price] = await Promise.all([btcBalance(), btcPrice()])

  return units.value * price.value
}

export async function ethValue(): Promise<number> {
  const [units, price] = await Promise.all([ethBalance(), ethPrice()])
  return units.value * price.value
}

export async function daiValue(): Promise<number> {
  const units = await daiBalance()
  return units.value
}
