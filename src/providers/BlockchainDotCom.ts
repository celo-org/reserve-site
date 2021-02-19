type BalanceReponse = Record<string,{
 final_balnce: number
 n_tx: number
 total_received: number
}>

export async function getBTCBalance(address:string) {
 const response = await fetch(`https://blockchain.info/balance?active=${address}`)
 return response.json() as Promise<BalanceReponse>
}

interface PriceResponse {
  "symbol":"BTC-USD",
  "price_24h":number,"volume_24h":number,
  "last_trade_price":number
}

export async function getBTCPrice() {
  const response = await fetch(`https://api.blockchain.com/v3/exchange/tickers/BTC-USD`)
 return response.json() as Promise<PriceResponse>
}