import { getBTCPrice } from "src/providers/BlockchainDotCom"
import * as coinbase from "src/providers/Coinbase"
import { euroToUSD } from "src/providers/ECB"
import euroToUSDRate from "src/providers/ExchangeRateAPI"
import {getCeloPrice} from "src/providers/Celo"
import { getEthPrice } from "src/providers/Etherscan"

import consensus from "./consensus"

async function btcPrice() {
  const price = await consensus(coinbase.getBTCInUSD(), getBTCPrice())
  return price
}

async function ethPrice() {
  const price = await consensus(coinbase.getETHInUSD(), getEthPrice())
  return price
}

async function euroPrice() {
  const rate = await consensus(euroToUSD(), euroToUSDRate())
  return rate
}

async function celoPrice() {
  const price = await consensus(getCeloPrice(),coinbase.getCELOPrice())
  return price
}

export default async function rates() {
  const [btc, eth, euro, celo] = await Promise.all([btcPrice(), ethPrice(), euroPrice(), celoPrice()])

  return {
    btc, eth, celo, euro
  }
}

