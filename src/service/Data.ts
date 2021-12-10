import { StableToken, Token } from "@celo/contractkit"

export type Tokens = "BTC" | "DAI" | "ETH" | "cMCO2" | StableToken | Token
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
