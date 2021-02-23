import ProviderSource, {Providers, errorResult} from "./ProviderSource"
type BalanceReponse = Record<string,{
  final_balance: number
  n_tx: number
  total_received: number
}>

export async function getBTCBalance(address:string): Promise<ProviderSource> {
  try {
    const response = await fetch(`https://blockchain.info/balance?active=${address}`)
    const data = (await response.json()) as BalanceReponse
    return {hasError: false, source:Providers.blockchainDotCom, value: data[address].final_balance, time: Date.now() }
  } catch (error){
    return errorResult(error, Providers.blockchainDotCom)
  }
}

interface PriceResponse {
  "symbol":"BTC-USD",
  "price_24h":number,"volume_24h":number,
  "last_trade_price":number
}

export async function getBTCPrice(): Promise<ProviderSource> {
  try {
    const response = await fetch(`https://api.blockchain.com/v3/exchange/tickers/BTC-USD`)
    const data = (await response.json() as PriceResponse)
    return {hasError: false, source:Providers.blockchainDotCom, value: data.last_trade_price, time: Date.now() }
} catch (error){
    return errorResult(error, Providers.blockchainDotCom)
  }
}
