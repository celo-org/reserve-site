import { errorResult, Providers } from "./ProviderSource"

// Usage Limits: max 250 a day, recommended to cache data

export default async function euroToUSD() {
  try {
    const response = await fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=${process.env.EXCHANGE_RATE_API}`)
    const data = await response.json()
    return {hasError: false, source: Providers.exchangeRates, value: data.rates.USD, time: new Date(data.date).valueOf() }
  } catch (error) {
    return  errorResult(error, Providers.exchangeRates)
  }
}