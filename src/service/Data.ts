export type Tokens =  "BTC" | "DAI" | "ETH" | "CELO" | "cUSD" | "cEUR"
export interface Address {
  address: string
  label: string
  token: Tokens
  status?: "active" | "inactive"
}


export interface TokenModel {
  token: Tokens
  units: number
  value: number
  updated: number
  hasError: boolean
}

export interface Rebalancing {
  "Period" : string
  "CELO Delta": number
  "BTC Delta": number
  "ETH Delta": number
  "DAI Delta": number
  "Dollar Value Start": number
}