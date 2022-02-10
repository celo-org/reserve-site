import { getBTCBalance as getBlockChainBTCBalance } from "src/providers/BlockchainDotCom"
import getBlockStreamBTCBalance from "src/providers/Blockstream"
import {
  getFrozenBalance,
  getInCustodyBalance,
  getUnFrozenBalance,
  getcMC02Balance,
} from "src/providers/Celo"
import * as etherscan from "src/providers/Etherscan"
import * as ethplorer from "src/providers/Ethplorerer"
import duel, { Duel, sumMerge } from "./duel"
import getRates, { celoPrice } from "./rates"
import { refresh, getOrSave } from "src/service/cache"
import { MINUTE } from "src/utils/TIME"
import { TokenModel, Tokens } from "./Data"
import ProviderSource from "src/providers/ProviderSource"
import { Token } from "@celo/contractkit"
import addressesConfig from "src/addresses.config"

export async function getGroupedNonCeloAddresses() {
  const groupedByToken = addressesConfig.reduce((groups, current) => {
    groups[current.token] = current.addresses
    return groups
  }, {})
  return groupedByToken as Record<Tokens, string[]>
}

async function fetchBTCBalance() {
  return getSumBalance("BTC", (address) => {
    return duel(getBlockChainBTCBalance(address), getBlockStreamBTCBalance(address))
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

export async function cMC02Balance() {
  return getOrSave<ProviderSource>("cmc02-balance", getcMC02Balance, 10 * MINUTE)
}

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
      token: Token.CELO,
      units: frozen.value,
      value: frozen.value * celoRate.value,
      hasError: frozen.hasError,
      updated: frozen.time,
    },
    unfrozen: {
      token: Token.CELO,
      units: unfrozen.value,
      value: unfrozen.value * celoRate.value,
      hasError: unfrozen.hasError,
      updated: unfrozen.time,
    },
    custody: {
      token: Token.CELO,
      units: celoCustodied.value,
      value: celoCustodied.value * celoRate.value,
      hasError: celoCustodied.hasError,
      updated: celoCustodied.time,
    },
  } as const
}

export async function getHoldingsOther() {
  try {
    const [rates, btcHeld, ethHeld, daiHeld, cmco2Held] = await Promise.all([
      getRates(),
      btcBalance(),
      ethBalance(),
      daiBalance(),
      cMC02Balance(),
    ])

    const otherAssets: TokenModel[] = [
      toToken("BTC", btcHeld, rates.btc),
      toToken("ETH", ethHeld, rates.eth),
      toToken("DAI", daiHeld),
      toToken("cMCO2", cmco2Held, rates.cmco2),
    ]

    return { otherAssets }
  } catch (e) {
    console.error(e)
  }
}

export default async function getHoldings(): Promise<HoldingsApi> {
  const [rates, btcHeld, ethHeld, daiHeld, celoCustodied, frozen, unfrozen, cmco2Held] =
    await Promise.all([
      getRates(),
      btcBalance(),
      ethBalance(),
      daiBalance(),
      celoCustodiedBalance(),
      celoFrozenBalance(),
      celoUnfrozenBalance(),
      cMC02Balance(),
    ])

  const otherAssets: TokenModel[] = [
    toToken("BTC", btcHeld, rates.btc),
    toToken("ETH", ethHeld, rates.eth),
    toToken("DAI", daiHeld),
    toToken("cMCO2", cmco2Held, rates.cmco2),
  ]

  return {
    celo: toCeloShape(frozen, rates.celo, unfrozen, celoCustodied),
    otherAssets,
  }
}

function toToken(label: Tokens, tokenData: Duel | ProviderSource, rate?: Duel): TokenModel {
  return {
    token: label,
    units: tokenData.value,
    value: (tokenData.value || 0) * (rate?.value || 1),
    hasError: !tokenData.value,
    updated: tokenData.time,
  }
}
