import BigNumber from "bignumber.js"
import { getcEURSupply, getcUSDSupply, getcREALSupply } from "src/providers/Celo"
import { euroPrice } from "src/service/rates"
import { TokenModel } from "src/service/Data"
import { refresh, getOrSave } from "src/service/cache"
import { MINUTE, SECOND } from "src/utils/TIME"

async function cUSDSupply() {
  return getOrSave("cUSD-supply", getcUSDSupply, 5 * SECOND)
}

refresh("cUSD-supply", 5 * MINUTE, getcUSDSupply)

async function cEURSupply() {
  return getOrSave("cEURO-supply", getcEURSupply, 5 * SECOND)
}

async function cREALSupply() {
  return getOrSave("cREAL-supply", getcREALSupply, 5 * SECOND)
}

refresh("cEURO-supply", 5 * MINUTE, getcEURSupply)

export default async function stables(): Promise<TokenModel[]> {
  const [cUSD, cEUR, cREAL, cEURValueInUSD, cREALValueInUSD] = await Promise.all([
    cUSDSupply(),
    cEURSupply(),
    cREALSupply(),
    totalCeloEuroValueInUSD(),
    totalCeloRealValueInUSD(),
  ])
  return [
    {
      token: "cUSD",
      units: cUSD.value,
      value: cUSD.value,
      updated: cUSD.time,
      hasError: cUSD.hasError,
    },
    {
      token: "cEUR",
      units: cEUR.value,
      value: cEURValueInUSD,
      updated: cEUR.time,
      hasError: cEUR.hasError,
    },
    {
      token: "cREAL",
      units: cREAL.value,
      value: cREALValueInUSD,
      updated: cREAL.time,
      hasError: cREAL.hasError,
    },
  ]
}

export async function getTotalStableValueInUSD() {
  const [totalCUSD, cEURValue] = await Promise.all([cUSDSupply(), totalCeloEuroValueInUSD()])
  return new BigNumber(totalCUSD.value + cEURValue).decimalPlaces(2).toNumber()
}

async function totalCeloEuroValueInUSD(): Promise<number> {
  const [units, price] = await Promise.all([cEURSupply(), euroPrice()])
  return price.value * units.value
}

// TODO get BRL REAL price not euro
async function totalCeloRealValueInUSD(): Promise<number> {
  const [units, price] = await Promise.all([cEURSupply(), euroPrice()])
  return price.value * units.value
}
