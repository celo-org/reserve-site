import { getCStableSupply } from "src/providers/Celo"
import { fiatPrices } from "src/service/rates"
import { TokenModel } from "src/service/Data"
import { getOrSave } from "src/service/cache"
import { SECOND } from "src/utils/TIME"
import { StableToken } from "@celo/contractkit"
import { ISO427SYMBOLS } from "src/interfaces/ISO427SYMBOLS"
import ProviderSource from "src/providers/ProviderSource"
import { STABLES } from "../stables.config"

async function cStableSupply(token: StableToken) {
  return getOrSave(`cSTABLE-${token}-supply`, () => getCStableSupply(token), 5 * SECOND)
}

interface Circulation {
  units: ProviderSource<number>
  symbol: StableToken
  iso4217: ISO427SYMBOLS
}

async function getCirculations(): Promise<Circulation[]> {
  return Promise.all<Circulation>(
    STABLES.map(async (stable) => {
      return new Promise((resolve, reject) => {
        cStableSupply(stable.symbol)
          .then((units) =>
            resolve({
              units: units,
              symbol: stable.symbol,
              iso4217: stable.iso4217,
            })
          )
          .catch(reject)
      })
    })
  )
}

export default async function stables(): Promise<TokenModel[]> {
  const [prices, circulations] = await Promise.all([fiatPrices(), getCirculations()])
  return circulations.map((tokenData) => {
    let value = 0

    try {
      value = prices.value[tokenData.iso4217] * tokenData.units.value
    } catch (e) {
      // for those times when there isnt any value yet
    }
    return {
      token: tokenData.symbol,
      units: tokenData.units.value || 0,
      value,
      updated: tokenData.units.time,
      hasError: tokenData.units.hasError,
    }
  })
}

export async function getTotalStableValueInUSD() {
  const all = await stables()
  return Number(all.reduce((sum, { value }) => sum + value, 0).toFixed(2))
}
