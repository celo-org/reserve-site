import ProviderSource, {Providers, errorResult} from "./ProviderSource"

interface CBResponse {
  "data":
    {"base":"BTC" | "ETH",
    "currency":"USD",
    "amount":string
  }
}

export async  function getBTCInUSD(): Promise<ProviderSource> {
  try {
    const response = await fetch("https://api.coinbase.com/v2/prices/BTC-USD/spot")
    const time = Date.now()
    const data = await response.json() as CBResponse
    return {hasError: false, source: Providers.coinbase, value: Number(data.data.amount), time}
  } catch (error) {
    return errorResult(error, Providers.coinbase)
  }
}



export async  function getETHInUSD(): Promise<ProviderSource> {
   try {
    const response = await fetch("https://api.coinbase.com/v2/prices/ETH-USD/spot")
    const time = Date.now()
    const data = await response.json() as CBResponse
    return {hasError: false, source: Providers.coinbase, value: Number(data.data.amount), time}
  } catch (error) {
    return errorResult(error, Providers.coinbase)
  }
}

export async  function getCELOPrice(): Promise<ProviderSource> {
  try {
    const response = await fetch("https://api.coinbase.com/v2/prices/CGLD-USD/spot")
    const time = Date.now()
    const data = await response.json() as CBResponse
    return {hasError: false, source: Providers.coinbase, value: Number(data.data.amount), time}
  } catch (error) {
    return errorResult(error, Providers.coinbase)
  }
}