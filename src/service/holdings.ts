import { getBTCBalance as getBlockChainBTCBalance } from "src/providers/BlockchainDotCom"
import getBlockStreemBTCBalance from "src/providers/Blockstream"
import { getFrozenBalance, getInCustodyBalance, getUnFrozenBalance } from "src/providers/Celo"
import * as etherscan from "src/providers/Etherscan"
import * as ethplorer from "src/providers/Ethplorerer"
import duel, { Duel, sumMerge } from "./duel"
import getRates, { celoPrice } from "./rates"
import { refresh, getOrSave } from "src/service/cache"
import { MINUTE } from "src/utils/TIME"
import { TokenModel, Tokens } from "./Data"
import ProviderSource from "src/providers/ProviderSource"
import { getNonCeloAddresses } from "src/providers/airtable"

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
  return getSumBalance("BTC", (address) => {
    return duel(getBlockChainBTCBalance(address), getBlockStreemBTCBalance(address))
  })
}

async function getSumBalance(token: Tokens, balanceFetcher: (address: string) => Promise<Duel>) {
  const addresses = await getGroupedNonCeloAddresses()
  const balances = await Promise.all(addresses[token].map(balanceFetcher))
  return balances.reduce(sumMerge)
}

refresh("btc-balance", 30 * MINUTE, fetchBTCBalance)

export async function btcBalance() {
  return getOrSave<Duel>("btc-balance", fetchBTCBalance, 10 * MINUTE)
}

async function fetchETHBalance() {
  return getSumBalance("ETH", (address) => {
    return duel(etherscan.getETHBalance(address), ethplorer.getETHBalance(address))
  })
}
refresh("eth-balance", 30 * MINUTE, fetchETHBalance)

export async function ethBalance() {
  return getOrSave<Duel>("eth-balance", fetchETHBalance, 10 * MINUTE)
}

function fetchDaiBalance() {
  return getSumBalance("DAI", (address) => {
    return duel(etherscan.getDaiBalance(address), ethplorer.getDaiBalance(address))
  })
}
refresh("dai-balance", 30 * MINUTE, fetchDaiBalance)

export async function daiBalance() {
  return getOrSave<Duel>("dai-balance", fetchDaiBalance, 10 * MINUTE)
}

export async function celoCustodiedBalance() {
  return getOrSave<ProviderSource>("celo-custody-balance", getInCustodyBalance, 5 * MINUTE)
}

refresh("celo-custody-balance", 30 * MINUTE, getInCustodyBalance)

export async function celoFrozenBalance() {
  return getOrSave<ProviderSource>("celo-frozen-balance", getFrozenBalance, 5 * MINUTE)
}

refresh("celo-frozen-balance", 30 * MINUTE, getFrozenBalance)

export async function celoUnfrozenBalance() {
  return getOrSave<ProviderSource>("celo-unfrozen-balance", getUnFrozenBalance, 2 * MINUTE)
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

export async function getHoldingsCelo() {
  const [celoRate, celoCustodied, frozen, unfrozen] = await Promise.all([
    celoPrice(),
    celoCustodiedBalance(),
    celoFrozenBalance(),
    celoUnfrozenBalance(),
  ])

  return { celo: toCeloShape(frozen, celoRate, unfrozen, celoCustodied) }
}

function toCeloShape(
  frozen: ProviderSource,
  celoRate: Duel,
  unfrozen: ProviderSource,
  celoCustodied: ProviderSource
) {
  return {
    frozen: {
      token: "CELO",
      units: frozen.value,
      value: frozen.value * celoRate.value,
      hasError: frozen.hasError,
      updated: frozen.time,
    },
    unfrozen: {
      token: "CELO",
      units: unfrozen.value,
      value: unfrozen.value * celoRate.value,
      hasError: unfrozen.hasError,
      updated: unfrozen.time,
    },
    custody: {
      token: "CELO",
      units: celoCustodied.value,
      value: celoCustodied.value * celoRate.value,
      hasError: celoCustodied.hasError,
      updated: celoCustodied.time,
    },
  } as const
}

export async function getHoldingsOther() {
  const [rates, btcHeld, ethHeld, daiHeld] = await Promise.all([
    getRates(),
    btcBalance(),
    ethBalance(),
    daiBalance(),
  ])

  const otherAssets: TokenModel[] = [
    toToken("BTC", btcHeld, rates.btc),
    toToken("ETH", ethHeld, rates.eth),
    toToken("DAI", daiHeld),
  ]

  return { otherAssets }
}

export default async function getHoldings(): Promise<HoldingsApi> {
  const [rates, btcHeld, ethHeld, daiHeld, celoCustodied, frozen, unfrozen] = await Promise.all([
    getRates(),
    btcBalance(),
    ethBalance(),
    daiBalance(),
    celoCustodiedBalance(),
    celoFrozenBalance(),
    celoUnfrozenBalance(),
  ])

  const otherAssets: TokenModel[] = [
    toToken("BTC", btcHeld, rates.btc),
    toToken("ETH", ethHeld, rates.eth),
    toToken("DAI", daiHeld),
  ]

  return {
    celo: toCeloShape(frozen, rates.celo, unfrozen, celoCustodied),
    otherAssets,
  }
}

function toToken(label: Tokens, tokenData: Duel, rate?: Duel): TokenModel {
  return {
    token: label,
    units: tokenData.value,
    value: (tokenData.value || 0) * (rate?.value || 1),
    hasError: !tokenData.value,
    updated: tokenData.time,
  }
}
