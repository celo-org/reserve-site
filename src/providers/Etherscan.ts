import BigNumber from "bignumber.js"
import ProviderSource, { Providers, errorResult } from "./ProviderSource"

// Usage limit 5 calls per second

interface EthScanPriceResponse {
  status: string
  message: string
  result: {
    ethbtc: string
    ethbtc_timestamp: string
    ethusd: string
    ethusd_timestamp: string
  }
}

interface EthScanBalanceResponse {
  status: string
  message: string
  result: string
}

const API_KEY = process.env.ETHERSCAN_API

export async function getEthPrice(): Promise<ProviderSource> {
  try {
    const response = await fetch(
      `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${API_KEY}`
    )
    const data = (await response.json()) as EthScanPriceResponse
    return {
      hasError: data.status === "0",
      source: Providers.etherscan,
      value: Number(data.result.ethusd),
      time: Number(data.result.ethusd_timestamp),
    }
  } catch (error) {
    return errorResult(error, Providers.etherscan)
  }
}

export async function getETHBalance(address: string): Promise<ProviderSource> {
  try {
    const response = await fetch(
      `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${API_KEY}`
    )
    const time = Date.now()
    const data = (await response.json()) as EthScanBalanceResponse
    return {
      hasError: data.status === "0",
      source: Providers.etherscan,
      value: formatNumber(data.result),
      time,
    }
  } catch (error) {
    return errorResult(error, Providers.etherscan)
  }
}

export async function getERC20onEthereumMainnetBalance(
  tokenAddress: string,
  accountAddress: string
) {
  try {
    const response = await fetch(
      `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${tokenAddress}&address=${accountAddress}&tag=latest&apikey=${API_KEY}`
    )
    const time = Date.now()
    const data = await response.json()
    return {
      hasError: data.status === "0",
      source: Providers.etherscan,
      value: formatNumber(data.result),
      time,
    }
  } catch (error) {
    return errorResult(error, Providers.etherscan)
  }
}

function formatNumber(value) {
  return new BigNumber(value).dividedBy(1_000_000_000_000_000_000).toNumber()
}
