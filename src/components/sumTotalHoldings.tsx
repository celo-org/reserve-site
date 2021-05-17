import { HoldingsApi } from "src/service/holdings"
import { sumCeloTotal, sumNonCelo } from "./Holdings"

export function sumTotalHoldings(holdings: HoldingsApi) {
  return sumCeloTotal(holdings) + sumNonCelo(holdings)
}
