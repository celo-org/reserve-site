
interface CBResponse {
   "data":
      {"base":"BTC" | "ETH",
      "currency":"USD",
      "amount":string
   }
}

export async  function getBTCInUSD() {
   const response = await fetch("https://api.coinbase.com/v2/prices/BTC-USD/spot")
   return response.json() as Promise<CBResponse>
}

export async  function getETHInUSD() {
   const response = await fetch("https://api.coinbase.com/v2/prices/ETH-USD/spot")
   return response.json() as Promise<CBResponse>
}