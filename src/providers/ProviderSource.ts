export enum Providers {
  coinbase = "coinbase",
  blockstream = "blockstream",
  blockchainDotCom = "blockchain.com",
  etherscan = "etherscan",
  ethplorer = "ethplorer",
  forno = "forno.celo.org",
  ecb = "ecb.europa.eu",
  exchangeRates = "exchangeratesapi.io",
  ubeswap = "ubeswap",
}

export default interface ProviderSource<T = number> {
  value: T
  source: Providers
  time: number
  hasError: boolean
}

export function errorResult(error: any, source: Providers, value = 0) {
  console.info("ERROR", source, error)
  return { hasError: true, source, value, time: 0 }
}
