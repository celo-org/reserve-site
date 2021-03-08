import { getBTCPrice } from "src/providers/BlockchainDotCom"
import * as coinbase from "src/providers/Coinbase"
import { euroToUSD } from "src/providers/ECB"
import euroToUSDRate from "src/providers/ExchangeRateAPI"
import { getCeloPrice } from "src/providers/Celo"
import { getEthPrice } from "src/providers/Etherscan"
import {refresh, getOrSave} from "src/service/cache"
import { HOUR, MINUTE } from "src/utils/TIME"
import duel, {Duel} from "./duel"

async function fetchBTCPrice() {
  const price = await duel(coinbase.getBTCInUSD(), getBTCPrice())
  return price
}

refresh("btc-price", 5 * MINUTE, fetchBTCPrice)

export async function btcPrice() {
  return getOrSave<Duel>("btc-price", fetchBTCPrice)
}

async function fetchETHPrice() {
  const price = await duel(coinbase.getETHInUSD(), getEthPrice())
  return price
}
refresh("eth-price", 5 * MINUTE, fetchETHPrice)

export async function ethPrice() {
  return getOrSave<Duel>("eth-price",fetchETHPrice)
}

async function fetchEuroPrice() {
  const rate = await duel(euroToUSD(), euroToUSDRate())
  return rate
}

refresh("euro-price", 4 * HOUR, fetchEuroPrice)

export async function euroPrice() {
  return getOrSave<Duel>("euro-price",fetchEuroPrice)
}

async function fetchCELOPrice() {
  const price = await duel(getCeloPrice(),coinbase.getCELOPrice())
  return price
}
refresh("celo-price", 5 * MINUTE, fetchCELOPrice)

export async function celoPrice() {
  return getOrSave<Duel>("celo-price",fetchCELOPrice)
}

export default async function rates() {
  const [btc, eth, euro, celo] = await Promise.all([btcPrice(), ethPrice(), euroPrice(), celoPrice()])

  return {
    btc, eth, celo, euro
  }
}

