export interface HoldingsData {
  updatedDate: string
  unfrozen: number
  frozen: number
  inCustody: number
  BTC: number
  ETH: number
  DAI: number
  cUSD: number
  ratio: number
  unFrozenRatio: number
}

export interface Address {
  address: string
  label: string
  status?: "active" | "inactive"
  link?: string
}

export interface TokenModel {
  token: string
  units: number
  value: number
  updated: number
  hasError: boolean
}