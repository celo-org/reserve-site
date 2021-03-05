import { getBTCPrice } from "src/providers/BlockchainDotCom"
import * as coinbase from "src/providers/Coinbase"
import { euroToUSD } from "src/providers/ECB"
import euroToUSDRate from "src/providers/ExchangeRateAPI"
import { getCeloPrice } from "src/providers/Celo"
import { getEthPrice } from "src/providers/Etherscan"
import {HOUR, refresh, getOrSave, MINUTE} from "src/service/cache"
import consensus, {Consensus} from "./consensus"

async function fetchBTCPrice() {
  const price = await consensus(coinbase.getBTCInUSD(), getBTCPrice())
  return price
}

refresh("btc-price", HOUR, fetchBTCPrice)

export async function btcPrice() {
  return getOrSave<Consensus>("btc-price", fetchBTCPrice)
}

async function fetchETHPrice() {
  const price = await consensus(coinbase.getETHInUSD(), getEthPrice())
  return price
}
refresh("eth-price", HOUR, fetchETHPrice)

export async function ethPrice() {
  return getOrSave<Consensus>("eth-price",fetchETHPrice)
}

async function fetchEuroPrice() {
  const rate = await consensus(euroToUSD(), euroToUSDRate())
  return rate
}
refresh("euro-price", 4 * HOUR, fetchEuroPrice)

export async function euroPrice() {
  return getOrSave<Consensus>("euro-price",fetchEuroPrice)
}

async function fetchCELOPrice() {
  const price = await consensus(getCeloPrice(),coinbase.getCELOPrice())
  return price
}
refresh("celo-price", 20 * MINUTE, fetchCELOPrice)

export async function celoPrice() {
  return getOrSave<Consensus>("celo-price",fetchCELOPrice)
}

export default async function rates() {
  const [btc, eth, euro, celo] = await Promise.all([btcPrice(), ethPrice(), euroPrice(), celoPrice()])

  return {
    btc, eth, celo, euro
  }
}

