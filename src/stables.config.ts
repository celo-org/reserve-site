import { StableToken } from "@celo/contractkit"
import { ISO427SYMBOLS } from "src/interfaces/ISO427SYMBOLS"

export interface Stables {
  symbol: StableToken
  iso4217: ISO427SYMBOLS
}
export const STABLES: Stables[] = [
  { symbol: StableToken.cUSD, iso4217: "USD" },
  {
    symbol: StableToken.cEUR,
    iso4217: "EUR",
  },
  {
    symbol: StableToken.cREAL,
    iso4217: "BRL",
  },
]
