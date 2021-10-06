import ProviderSource, { Providers, errorResult } from "./ProviderSource"

// usage limits 10,000 requests per hour ()
interface CBResponse {
  data: { base: "BTC" | "ETH"; currency: "USD"; amount: string }
}

export async function getBTCInUSD(): Promise<ProviderSource> {
  try {
    const response = await fetch("https://api.coinbase.com/v2/prices/BTC-USD/spot")
    const time = Date.now()
    const data = (await response.json()) as CBResponse
    const value = Number(data.data.amount)
    return { hasError: !value, source: Providers.coinbase, value, time }
  } catch (error) {
    return errorResult(error, Providers.coinbase)
  }
}

export async function getETHInUSD(): Promise<ProviderSource> {
  try {
    const response = await fetch("https://api.coinbase.com/v2/prices/ETH-USD/spot")
    const time = Date.now()
    const data = (await response.json()) as CBResponse
    const value = Number(data.data.amount)
    return { hasError: !value, source: Providers.coinbase, value, time }
  } catch (error) {
    return errorResult(error, Providers.coinbase)
  }
}

export async function getCELOPrice(): Promise<ProviderSource> {
  try {
    const response = await fetch("https://api.coinbase.com/v2/prices/CGLD-USD/spot")
    const time = Date.now()
    const data = (await response.json()) as CBResponse
    const value = Number(data.data.amount)
    return { hasError: !value, source: Providers.coinbase, value, time }
  } catch (error) {
    return errorResult(error, Providers.coinbase)
  }
}
