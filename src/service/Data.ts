export type Tokens = "BTC" | "DAI" | "ETH" | "CELO" | "cUSD" | "cEUR" | "cREAL" | "cMCO2"
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
