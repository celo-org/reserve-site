import { getBTCBalance as getBlockChainBTCBalance } from 'src/providers/BlockchainDotCom'
import getBlockStreemBTCBalance from 'src/providers/Blockstream'
import { getInCustodyBalance } from 'src/providers/Celo'
import * as etherscan from 'src/providers/Etherscan'
import * as ethplorer from 'src/providers/Ethplorerer'
import consensus from './consensus'
import getRates from "./rates"
import {get, HOUR, SECOND, refresh, MINUTE} from "src/service/cache"

async function fetchBTCBalance() {
  const address = "38EPdP4SPshc5CiUCzKcLP9v7Vqo5u1HBL"
  return consensus(getBlockChainBTCBalance(address), getBlockStreemBTCBalance(address))
}

refresh("btc-balance", HOUR, fetchBTCBalance)

export async function btcBalance() {
  return get("btc-balance") || fetchBTCBalance()
}

async function fetchETHBalance() {
  const address = "0xe1955eA2D14e60414eBF5D649699356D8baE98eE"
  return consensus(etherscan.getETHBalance(address), ethplorer.getETHBalance(address))
}
refresh("eth-balance", HOUR, fetchETHBalance)

export async function ethBalance() {
  return get("eth-balance") || fetchETHBalance()
}

function fetchDaiBalance() {
  const address = "0x16B34Ce9A6a6F7FC2DD25Ba59bf7308E7B38E186"
  return consensus(etherscan.getDaiBalance(address), ethplorer.getDaiBalance(address))
}
refresh("dai-balance", HOUR, fetchDaiBalance)

export async function daiBalance() {
  return get("dai-balance") || fetchDaiBalance()
}

export async function celoCustodiedBalance() {
  return get("celo-custody-balance") || getInCustodyBalance()
}

refresh("celo-custody-balance", 2 * MINUTE, getInCustodyBalance)

export interface HoldingsApi {
  mktValue: {
    BTC: {value:number}
    ETH: {value:number}
    DAI: {value:number}
    CELO_CUSTODIED: {value:number}
    CELO_FROZEN: {value: number}
    CELO_UNFROZEN: {value: number}
  }
  units: {
    BTC: {value:number}
    ETH: {value:number}
    DAI: {value:number}
    CELO_CUSTODIED: {value:number}
    CELO_FROZEN: {value: number}
    CELO_UNFROZEN: {value: number}
  }
}

export default async function getHoldings(): Promise<HoldingsApi> {
  const [btcHeld, ethHeld, daiHeld, celoCustodied, rates] = await Promise.all([
    btcBalance(),
    ethBalance(),
    daiBalance(),
    celoCustodiedBalance(),
    getRates()
  ])


  return {
    mktValue: {
      BTC: {...rates, value: rates.btc.value * btcHeld.value},
      ETH: {...rates, value: rates.eth.value * ethHeld.value},
      DAI: {...rates, value: daiHeld.value},
      CELO_CUSTODIED: {...rates, value: rates.celo.value * celoCustodied.value},
      CELO_FROZEN: {value: 0},
      CELO_UNFROZEN: {value: 0}
    },
    units: {
      BTC: btcHeld,
      ETH: ethHeld,
      DAI: daiHeld,
      CELO_CUSTODIED: celoCustodied,
      CELO_FROZEN: {value: 0},
      CELO_UNFROZEN: {value: 0}

    }
  }
}