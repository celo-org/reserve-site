import BigNumber from "bignumber.js"
import { getcEURSupply, getcUSDSupply } from "src/providers/Celo"
import { euroPrice } from "src/service/rates"

export default async function stables() {
  const [cUSD, cEUR] = await  Promise.all([getcUSDSupply(), getcEURSupply()])
  return {cUSD, cEUR}
}

export async function getTotalStableValueInUSD(){
  const [totalCUSD, cEURValue] = await Promise.all([getcUSDSupply(),totalCeloEuroValueInUSD()])
  return new BigNumber(totalCUSD.value + cEURValue).decimalPlaces(2).toNumber()
}

async function totalCeloEuroValueInUSD(): Promise<number> {
  const [units,price] = await  Promise.all([getcEURSupply(),euroPrice()])
  return price.value * units.value
}

