import { getBTCBalance as getBlockChainBTCBalance } from 'src/providers/BlockchainDotCom'
import getBlockStreemBTCBalance from 'src/providers/Blockstream'
import * as etherscan from 'src/providers/Etherscan'
import * as ethplorer from 'src/providers/Ethplorerer'
import getAddressess from "src/service/addresses"
import { HoldingsData } from 'src/service/Data'
import consensus from './consensus'

interface Fields {
  live?: boolean
  'Updated Date': string
  Unfrozen: number
  Frozen: number
  Custody: number
  BTC: number
  ETH: number
  DAI: number
  cUSD: number
  'Reserve Ratio': number
  UnfrozenReserveRatio: number
}

async function btcBalance() {
  const address = "38EPdP4SPshc5CiUCzKcLP9v7Vqo5u1HBL"
  const btc = await consensus(getBlockChainBTCBalance(address), getBlockStreemBTCBalance(address))
  return btc
}

async function ethBalance() {
  const address = "0xe1955eA2D14e60414eBF5D649699356D8baE98eE"
  const eth = await consensus(etherscan.getETHBalance(address), ethplorer.getETHBalance(address))
  return eth
}

async function daiBalance() {
  const address = "0x16B34Ce9A6a6F7FC2DD25Ba59bf7308E7B38E186"
  const eth = await consensus(etherscan.getDaiBalance(address), ethplorer.getDaiBalance(address))
  return eth
}

export default async function getHoldings() {
  const [btcHeld, ethHeld, daiHeld] = await Promise.all([
    btcBalance(),
    ethBalance(),
    daiBalance(),
  ])

  return {
    BTC: btcHeld,
    ETH: ethHeld,
    dai: daiHeld
  }
}


function convert(fields: Fields): HoldingsData {
  return {
    updatedDate: fields['Update Date'],
    unfrozen: fields.Unfrozen,
    frozen: fields.Frozen,
    inCustody: fields.Custody,
    ratio: fields['Reserve Ratio'],
    unFrozenRatio: fields.UnfrozenReserveRatio,
    BTC: fields.BTC,
    ETH: fields.ETH,
    DAI: fields.DAI,
    cUSD: fields.cUSD,
  }
}
