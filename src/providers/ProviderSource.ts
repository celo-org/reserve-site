
export enum Providers {
  coinbase = "coinbase",
  blockstream = "blockstream",
  blockchainDotCom = "blockchain.com",
  etherscan = "etherscan",
  ethplorer = "ethplorer",
  forno = "forno.celo.org"
}

export default interface ProviderSource {
  value: number | string
  source: Providers
  time: number
  hasError: boolean
}

export function errorResult(error: any, source: Providers) {
  console.error(source, error)
  return { hasError: true, source, value: 0, time: 0 }
}