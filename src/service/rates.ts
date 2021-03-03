import { getBTCPrice } from "src/providers/BlockchainDotCom"
import * as coinbase from "src/providers/Coinbase"
import { euroToUSD } from "src/providers/ECB"
import euroToUSDRate from "src/providers/ExchangeRateAPI"
import {getCeloPrice} from "src/providers/Celo"
import { getEthPrice } from "src/providers/Etherscan"
import {get,set, HOUR, refresh} from "src/service/cache"
import consensus, {Consensus} from "./consensus"



async function fetchBTCPrice() {
  const price = await consensus(coinbase.getBTCInUSD(), getBTCPrice())
  return price
}
refresh("btc-price", HOUR, fetchBTCPrice)

export async function btcPrice() {
  return get<Consensus>("btc-price") || set("btc-price",fetchBTCPrice())
}



async function fetchETHPrice() {
  const price = await consensus(coinbase.getETHInUSD(), getEthPrice())
  return price
}
refresh("eth-price", HOUR, fetchETHPrice)

export async function ethPrice() {
  return get<Consensus>("eth-price") || fetchETHPrice()
}


async function fetchEuroPrice() {
  const rate = await consensus(euroToUSD(), euroToUSDRate())
  return rate
}
refresh("euro-price", HOUR, fetchEuroPrice)

export async function euroPrice() {
  return get<Consensus>("euro-price") || fetchEuroPrice()
}

async function fetchCELOPrice() {
  const price = await consensus(getCeloPrice(),coinbase.getCELOPrice())
  return price
}
refresh("celo-price", HOUR, fetchCELOPrice)

export async function celoPrice() {
  return get<Consensus>("celo-price") || fetchCELOPrice()
}

export default async function rates() {
  const [btc, eth, euro, celo] = await Promise.all([btcPrice(), ethPrice(), euroPrice(), celoPrice()])

  return {
    btc, eth, celo, euro
  }
}

