import BigNumber from "bignumber.js"
import { getcEURSupply, getcUSDSupply } from "src/providers/Celo"
import { euroPrice } from "src/service/rates"
import {TokenModel} from "src/service/Data"
import {refresh, getOrSave} from "src/service/cache"
import { MINUTE, SECOND } from "src/utils/TIME"

async function cUSDSupply() {
  return getOrSave("cUSD-supply", getcUSDSupply, 5 * SECOND)
}

refresh('cUSD-supply', 5 * MINUTE, getcUSDSupply)

async function cEURSupply() {
  return getOrSave("cEURO-supply", getcEURSupply, 5 * SECOND)
}

refresh('cEURO-supply', 5 * MINUTE, getcEURSupply)

export default async function stables(): Promise<TokenModel[]> {
  const [cUSD, cEUR, cEURValueInUSD] = await Promise.all([cUSDSupply(), cEURSupply(), totalCeloEuroValueInUSD()])
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
  const [totalCUSD, cEURValue] = await Promise.all([cUSDSupply(),totalCeloEuroValueInUSD()])
  return new BigNumber(totalCUSD.value + cEURValue).decimalPlaces(2).toNumber()
}

async function totalCeloEuroValueInUSD(): Promise<number> {
  const [units,price] = await  Promise.all([cEURSupply(),euroPrice()])
  return price.value * units.value
}

