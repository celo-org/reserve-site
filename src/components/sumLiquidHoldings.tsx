import { HoldingsApi } from "src/service/holdings"
import { sumNonCelo } from './Holdings'

export function sumLiquidHoldings(holdings: HoldingsApi) {
  const { custody, unfrozen } = holdings.celo
  const celoTotal = custody.value + unfrozen.value
  return celoTotal + sumNonCelo(holdings)
}
