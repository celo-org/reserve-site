import { getBTCBalance as getBlockChainBTCBalance } from 'src/providers/BlockchainDotCom'
import getBlockStreemBTCBalance from 'src/providers/Blockstream'
import { getInCustodyBalance } from 'src/providers/Celo'
import * as etherscan from 'src/providers/Etherscan'
import * as ethplorer from 'src/providers/Ethplorerer'
import consensus, { Consensus, sumMerge } from './consensus'
import getRates from "./rates"
import {refresh, getOrSave, HOUR} from "src/service/cache"
import { TokenModel, Tokens } from './Data'
import ProviderSource from 'src/providers/ProviderSource'
import {getNonCeloAddresses} from "src/providers/airtable"

async function getGroupedNonCeloAddresses() {
  const addresses = await getNonCeloAddresses()
  const groupedByToken = addresses.value.reduce((groups, current) => {
    groups[current.token] = groups[current.token] || []
    groups[current.token].push(current.address)
    return groups
  }, {})

  return groupedByToken as Record<Tokens, string[]>
}

async function fetchBTCBalance() {
  return getSumBalance("BTC", address => {
    return consensus(getBlockChainBTCBalance(address), getBlockStreemBTCBalance(address))
  })
}

async function getSumBalance(token:Tokens, balanceFetcher: (address: string) => Promise<Consensus>) {
  const addresses = await getGroupedNonCeloAddresses()
  const balances = await Promise.all(addresses[token].map(balanceFetcher))
  return balances.reduce(sumMerge)
}

refresh("btc-balance", 2 * HOUR, fetchBTCBalance)

export async function btcBalance() {
  return getOrSave<Consensus>("btc-balance", fetchBTCBalance)
}

async function fetchETHBalance() {
  return getSumBalance("ETH", address => {
    return consensus(etherscan.getETHBalance(address), ethplorer.getETHBalance(address))
  })
}
refresh("eth-balance", 2 * HOUR, fetchETHBalance)

export async function ethBalance() {
  return getOrSave<Consensus>("eth-balance", fetchETHBalance)
}

function fetchDaiBalance() {
  return getSumBalance("DAI", address => {
    return consensus(etherscan.getDaiBalance(address), ethplorer.getDaiBalance(address))
  })
}
refresh("dai-balance", 2 * HOUR, fetchDaiBalance)

export async function daiBalance() {
  return getOrSave<Consensus>("dai-balance", fetchDaiBalance)
}

export async function celoCustodiedBalance() {
  return getOrSave<ProviderSource>("celo-custody-balance", getInCustodyBalance)
}

refresh("celo-custody-balance", 2 * HOUR, getInCustodyBalance)

export interface HoldingsApi {
  celo: {
    unfrozen: TokenModel
    frozen: TokenModel
    custody: TokenModel
  }
  otherAssets: TokenModel[]
}

export default async function getHoldings(): Promise<HoldingsApi> {
  const [btcHeld, ethHeld, daiHeld, celoCustodied, rates] = await Promise.all([
    btcBalance(),
    ethBalance(),
    daiBalance(),
    celoCustodiedBalance(),
    getRates()
  ])

  const otherAssets: TokenModel[] = [
    toToken("BTC", btcHeld, rates.btc),
    toToken("ETH", ethHeld, rates.eth),
    toToken("DAI", daiHeld),
  ]

  return {
    celo: {
      frozen: {
        token: "CELO",
        units: celoCustodied.value,
        value: celoCustodied.value * rates.celo.value,
        hasError: celoCustodied.hasError,
        updated: celoCustodied.time
      },
      unfrozen: {
        token: "CELO",
        units: celoCustodied.value,
        value: celoCustodied.value * rates.celo.value,
        hasError: celoCustodied.hasError,
        updated: celoCustodied.time
      },
      custody: {
        token: "CELO",
        units: celoCustodied.value,
        value: celoCustodied.value * rates.celo.value,
        hasError: celoCustodied.hasError,
        updated: celoCustodied.time
      }
    },
    otherAssets
  }
}

function toToken(label: Tokens, tokenData: Consensus, rate?: Consensus): TokenModel {
  return {
    token: label,
    units: tokenData.value,
    value: ( tokenData.value || 0) * (rate?.value ||1),
    hasError: !tokenData.value,
    updated: tokenData.time
  }
}