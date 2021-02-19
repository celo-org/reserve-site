interface EthScanResponse {
  "status":string,
  "message":string,
  "result":{
    "ethbtc":string,
    "ethbtc_timestamp":string,
    "ethusd":string,
    "ethusd_timestamp": string
  }
}

const API_KEY = process.env.ETHERSCAN_API

export async function getEthPrice() {
  const response = await fetch(`https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${API_KEY}`)
  return response.json() as Promise<EthScanResponse>
}

export  async function getETHBalance(address: string) {
  const response = await fetch(`https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&=${API_KEY}`)
  return response.json() as Promise<EthScanResponse>
}