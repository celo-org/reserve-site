import BigNumber from "bignumber.js"
import { getcEURSupply, getcUSDSupply } from "src/providers/Celo"
import { euroPrice } from "src/service/rates"
import {TokenModel} from "src/service/Data"

export default async function stables(): Promise<TokenModel[]> {
  const [cUSD, cEUR, cEURValueInUSD] = await Promise.all([getcUSDSupply(), getcEURSupply(), totalCeloEuroValueInUSD()])
  return [{
    token: 'cUSD',
    units: cUSD.value,
    value: cUSD.value,
    updated: cUSD.time,
    hasError: cUSD.hasError
  },
  {
    token: 'cEUR',
    units: cEUR.value,
    value: cEURValueInUSD,
    updated: cEUR.time,
    hasError: cEUR.hasError
  }]
}

export async function getTotalStableValueInUSD(){
  const [totalCUSD, cEURValue] = await Promise.all([getcUSDSupply(),totalCeloEuroValueInUSD()])
  return new BigNumber(totalCUSD.value + cEURValue).decimalPlaces(2).toNumber()
}

async function totalCeloEuroValueInUSD(): Promise<number> {
  const [units,price] = await  Promise.all([getcEURSupply(),euroPrice()])
  return price.value * units.value
}

