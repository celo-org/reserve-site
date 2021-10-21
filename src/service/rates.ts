import * as coinbase from "src/providers/Coinbase"
import { euroToUSD } from "src/providers/ECB"
import euroToUSDRate from "src/providers/ExchangeRateAPI"
import { getCeloPrice } from "src/providers/Celo"
import { getEthPrice } from "src/providers/Etherscan"
import { refresh, getOrSave } from "src/service/cache"
import { HOUR, MINUTE } from "src/utils/TIME"
import duel, { Duel } from "./duel"
import { getCMC02Price } from "src/providers/UbeSwapGraph"
import getCoinMarketCapPrice from "src/providers/CoinMarketCap"

async function fetchCMCO2price(): Promise<Duel> {
  const cmco2 = await duel(getCMC02Price(), getCoinMarketCapPrice("MCO2"))
  return cmco2
}

export async function CMC02Price() {
  return getOrSave<Duel>("cmco2-price", fetchCMCO2price, 5 * MINUTE)
}

async function fetchBTCPrice() {
  const price = await duel(coinbase.getBTCInUSD(), getCoinMarketCapPrice("BTC"))
  return price
}

refresh("btc-price", 20 * MINUTE, fetchBTCPrice)

export async function btcPrice() {
  return getOrSave<Duel>("btc-price", fetchBTCPrice, 5 * MINUTE)
}

async function fetchETHPrice() {
  const price = await duel(coinbase.getETHInUSD(), getEthPrice())
  return price
}
refresh("eth-price", 20 * MINUTE, fetchETHPrice)

export async function ethPrice() {
  return getOrSave<Duel>("eth-price", fetchETHPrice, 5 * MINUTE)
}

async function fetchEuroPrice() {
  const rate = await duel(euroToUSD(), euroToUSDRate())
  return rate
}

refresh("euro-price", 8 * HOUR, fetchEuroPrice)

export async function euroPrice() {
  return getOrSave<Duel>("euro-price", fetchEuroPrice, 6 * HOUR)
}

async function fetchCELOPrice() {
  const price = await duel(getCeloPrice(), coinbase.getCELOPrice())
  return price
}
refresh("celo-price", 5 * MINUTE, fetchCELOPrice)

export async function celoPrice() {
  return getOrSave<Duel>("celo-price", fetchCELOPrice, 1 * MINUTE)
}

export default async function rates() {
  const [btc, eth, celo, cmco2] = await Promise.all([
    btcPrice(),
    ethPrice(),
    celoPrice(),
    CMC02Price(),
  ])

  return {
    btc,
    eth,
    celo,
    cmco2,
  }
}
