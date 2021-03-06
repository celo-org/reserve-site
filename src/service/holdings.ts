import { getBTCBalance as getBlockChainBTCBalance } from 'src/providers/BlockchainDotCom'
import getBlockStreemBTCBalance from 'src/providers/Blockstream'
import { getFrozenBalance, getInCustodyBalance, getUnFrozenBalance } from 'src/providers/Celo'
import * as etherscan from 'src/providers/Etherscan'
import * as ethplorer from 'src/providers/Ethplorerer'
import consensus, { Consensus, sumMerge } from './consensus'
import getRates from "./rates"
import {refresh, getOrSave} from "src/service/cache"
import { MINUTE } from "src/utils/TIME"
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

refresh("btc-balance", 30 * MINUTE, fetchBTCBalance)

export async function btcBalance() {
  return getOrSave<Consensus>("btc-balance", fetchBTCBalance)
}

async function fetchETHBalance() {
  return getSumBalance("ETH", address => {
    return consensus(etherscan.getETHBalance(address), ethplorer.getETHBalance(address))
  })
}
refresh("eth-balance", 30 * MINUTE, fetchETHBalance)

export async function ethBalance() {
  return getOrSave<Consensus>("eth-balance", fetchETHBalance)
}

function fetchDaiBalance() {
  return getSumBalance("DAI", address => {
    return consensus(etherscan.getDaiBalance(address), ethplorer.getDaiBalance(address))
  })
}
refresh("dai-balance", 30 * MINUTE, fetchDaiBalance)

export async function daiBalance() {
  return getOrSave<Consensus>("dai-balance", fetchDaiBalance)
}


export async function celoCustodiedBalance() {
  return getOrSave<ProviderSource>("celo-custody-balance", getInCustodyBalance)
}

refresh("celo-custody-balance", 30 * MINUTE, getInCustodyBalance)


export async function celoFrozenBalance() {
  return getOrSave<ProviderSource>("celo-frozen-balance", getFrozenBalance)
}

refresh("celo-frozen-balance", 30 * MINUTE, getFrozenBalance)


export async function celoUnfrozenBalance() {
  return getOrSave<ProviderSource>("celo-unfrozen-balance", getUnFrozenBalance)
}

refresh("celo-unfrozen-balance", 5 * MINUTE, getUnFrozenBalance)

export interface HoldingsApi {
  celo: {
    unfrozen: TokenModel
    frozen: TokenModel
    custody: TokenModel
  }
  otherAssets: TokenModel[]
}

export default async function getHoldings(): Promise<HoldingsApi> {
  const [btcHeld, ethHeld, daiHeld, celoCustodied, frozen, unfrozen, rates] = await Promise.all([
    btcBalance(),
    ethBalance(),
    daiBalance(),
    celoCustodiedBalance(),
    celoFrozenBalance(),
    celoUnfrozenBalance(),
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
        units: frozen.value,
        value: frozen.value * rates.celo.value,
        hasError: frozen.hasError,
        updated: frozen.time
      },
      unfrozen: {
        token: "CELO",
        units: unfrozen.value,
        value: unfrozen.value * rates.celo.value,
        hasError: unfrozen.hasError,
        updated: unfrozen.time
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