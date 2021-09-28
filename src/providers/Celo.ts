import { newKit, StableToken } from "@celo/contractkit"
import BigNumber from "bignumber.js"
import { Address, Tokens } from "src/service/Data"
import { CMCO2_ADDRESS, RESERVE_CMCO2_ADDRESS } from "src/contract-addresses"

import ProviderSource, { errorResult, Providers } from "./ProviderSource"
const MIN_ABI_FOR_GET_BALANCE = [
  // balanceOf
  {
    constant: true,

    inputs: [{ name: "_owner", type: "address" }],

    name: "balanceOf",

    outputs: [{ name: "balance", type: "uint256" }],

    type: "function" as const,
  },
]

const kit = newKit("https://forno.celo.org")

export async function getCeloPrice(): Promise<ProviderSource> {
  try {
    const exchange = await kit.contracts.getExchange()
    const rate = await exchange.quoteGoldSell(WEI_PER)
    const time = Date.now()
    return { hasError: false, value: formatNumber(rate), source: Providers.forno, time }
  } catch (error) {
    return errorResult(error, Providers.forno)
  }
}

export async function getFrozenBalance(): Promise<ProviderSource> {
  try {
    const [reserve, nativeToken] = await Promise.all([
      kit.contracts.getReserve(),
      kit.contracts.getGoldToken(),
    ])
    const [total, unfrozen] = await Promise.all([
      nativeToken.balanceOf(reserve.address),
      reserve.getUnfrozenBalance(),
    ])

    const time = Date.now()
    return {
      hasError: false,
      value: formatNumber(total.minus(unfrozen)),
      source: Providers.forno,
      time,
    }
  } catch (error) {
    return errorResult(error, Providers.forno)
  }
}

export async function getUnFrozenBalance() {
  try {
    const reserve = await kit.contracts.getReserve()
    const balance = await reserve.getUnfrozenBalance()

    const time = Date.now()
    return { hasError: false, value: formatNumber(balance), source: Providers.forno, time }
  } catch (error) {
    return errorResult(error, Providers.forno)
  }
}

export async function getcMC02Balance() {
  return getERC20Balance(CMCO2_ADDRESS, RESERVE_CMCO2_ADDRESS)
}

async function getERC20Balance(contractAddress: string, walletAddress: string) {
  try {
    const erc20 = new kit.web3.eth.Contract(MIN_ABI_FOR_GET_BALANCE, contractAddress)

    const balance: string = await erc20.methods.balanceOf(walletAddress).call()

    return {
      hasError: false,
      value: formatNumber(new BigNumber(balance)),
      source: Providers.forno,
      time: Date.now(),
    }
  } catch (error) {
    console.error(error)
    return errorResult(error, Providers.forno)
  }
}

export async function getInCustodyBalance(): Promise<ProviderSource> {
  try {
    const [reserve, nativeToken] = await Promise.all([
      kit.contracts.getReserve(),
      kit.contracts.getGoldToken(),
    ])
    const contractBalance = await nativeToken.balanceOf(reserve.address)
    const totalBalance = await reserve.getReserveCeloBalance()

    const time = Date.now()
    // reserveCeloBalance includes both in contract and other address balances. need to subtract out
    return {
      hasError: false,
      value: formatNumber(totalBalance.minus(contractBalance)),
      source: Providers.forno,
      time,
    }
  } catch (error) {
    return errorResult(error, Providers.forno)
  }
}

export async function getcUSDSupply(): Promise<ProviderSource> {
  try {
    const stableToken = await kit.contracts.getStableToken(StableToken.cUSD)
    const totalSupply = await stableToken.totalSupply()

    const time = Date.now()
    return { hasError: false, value: formatNumber(totalSupply), source: Providers.forno, time }
  } catch (error) {
    return errorResult(error, Providers.forno)
  }
}

export async function getcEURSupply(): Promise<ProviderSource> {
  try {
    const stableToken = await kit.contracts.getStableToken(StableToken.cEUR)
    const totalSupply = await stableToken.totalSupply()
    const time = Date.now()
    return { hasError: false, value: formatNumber(totalSupply), source: Providers.forno, time }
  } catch (error) {
    return errorResult(error, Providers.forno)
  }
}

export async function getAddresses(): Promise<{ value: Address[] | null }> {
  try {
    const reserve = await kit.contracts.getReserve()
    const addresses = await reserve.getOtherReserveAddresses()

    return {
      value: [{ label: "Celo Reserve", token: "CELO" as Tokens, address: reserve.address }].concat(
        addresses.map((address) => ({
          address,
          token: "CELO" as Tokens,
          label: "CELO with Custodian",
        }))
      ),
    }
  } catch {
    return { value: null }
  }
}

export const WEI_PER = 1_000_000_000_000_000_000

function formatNumber(value: BigNumber) {
  return value.dividedBy(WEI_PER).toNumber()
}
