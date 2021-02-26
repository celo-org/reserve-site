import { errorResult, Providers } from "./ProviderSource"


export default async function euroToUSD() {
  try {
    const response = await fetch("https://api.exchangeratesapi.io/latest")
    const data = await response.json()
    return {hasError: false, source: Providers.exchangeRates, value: data.rates.USD, time: new Date(data.date).valueOf() }
  } catch (error) {
    return  errorResult(error, Providers.exchangeRates)
  }
}