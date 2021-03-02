import { getBTCBalance as getBlockChainBTCBalance } from 'src/providers/BlockchainDotCom'
import getBlockStreemBTCBalance from 'src/providers/Blockstream'
import { getInCustodyBalance } from 'src/providers/Celo'
import * as etherscan from 'src/providers/Etherscan'
import * as ethplorer from 'src/providers/Ethplorerer'
import consensus from './consensus'
import getRates from "./rates"

export async function btcBalance() {
  const address = "38EPdP4SPshc5CiUCzKcLP9v7Vqo5u1HBL"
  const btc = await consensus(getBlockChainBTCBalance(address), getBlockStreemBTCBalance(address))
  return btc
}

export async function ethBalance() {
  const address = "0xe1955eA2D14e60414eBF5D649699356D8baE98eE"
  const eth = await consensus(etherscan.getETHBalance(address), ethplorer.getETHBalance(address))
  return eth
}

export async function daiBalance() {
  const address = "0x16B34Ce9A6a6F7FC2DD25Ba59bf7308E7B38E186"
  const eth = await consensus(etherscan.getDaiBalance(address), ethplorer.getDaiBalance(address))
  return eth
}

export async function celoCustodiedBalance() {
  return await getInCustodyBalance()
}

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