import * as coinbase from "src/providers/Coinbase"
import { ISO427SYMBOLS } from "src/interfaces/ISO427SYMBOLS"
import currencyInUSD from "src/providers/ExchangeRateAPI"
import { getCeloPrice } from "src/providers/Celo"
import { getEthPrice } from "src/providers/Etherscan"
import { getOrSave, Cachable } from "src/service/cache"
import { HOUR, MINUTE } from "src/utils/TIME"
import duel, { Duel } from "./duel"
import { getCMC02Price } from "src/providers/UbeSwapGraph"
import getCoinMarketCapPrice from "src/providers/CoinMarketCap"
import { Tokens } from "./Data"

async function fetchCMCO2price(): Promise<Duel> {
  const cmco2 = await duel(getCMC02Price(), getCoinMarketCapPrice("MCO2"))
  return cmco2
}

export async function CMC02Price() {
  return getOrSave<Duel>("cmco2-price", fetchCMCO2price, 2 * MINUTE)
}

async function fetchBTCPrice() {
  const price = await duel(coinbase.getBTCInUSD(), getCoinMarketCapPrice("BTC"))
  return price
}

export async function btcPrice() {
  return getOrSave<Duel>("btc-price", fetchBTCPrice, 4 * MINUTE)
}

async function fetchETHPrice() {
  const price = await duel(coinbase.getETHInUSD(), getEthPrice())
  return price
}

export async function ethPrice() {
  return getOrSave<Duel>("eth-price", fetchETHPrice, 4 * MINUTE)
}

export async function fiatPrices() {
  return getOrSave<Cachable<ISO427SYMBOLS>>("fiat-prices", currencyInUSD, 12 * HOUR)
}

async function fetchCELOPrice() {
  const price = await duel(getCeloPrice(), coinbase.getCELOPrice())
  return price
}

export async function celoPrice() {
  return getOrSave<Duel>("celo-price", fetchCELOPrice, 1 * MINUTE)
}

async function fetchCStablePrice(currencySymbol: Tokens): Promise<Duel> {
  const price = await getCoinMarketCapPrice(currencySymbol)
  return { value: price.value, sources: [price.source], time: price.time }
}

export async function tokenPriceInUSD(currencySymbol: Tokens) {
  return getOrSave<Duel>(
    `token-price=${currencySymbol}`,
    () => fetchCStablePrice(currencySymbol),
    10 * MINUTE
  )
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
