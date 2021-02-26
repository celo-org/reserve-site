import { getBTCPrice } from "src/providers/BlockchainDotCom"
import { getBTCInUSD, getETHInUSD } from "src/providers/Coinbase"
import { euroToUSD } from "src/providers/ECB"
import { getEthPrice } from "src/providers/Etherscan"

import consensus from "./consensus"



export async function btcPrice() {
  const price = await consensus(getBTCInUSD(), getBTCPrice())
  return price
}

export async function ethPrice() {
  const price = await consensus(getETHInUSD(), getEthPrice())
  return price
}

export async function euroPrice() {
   return  consensus(euroToUSD(),)
}

