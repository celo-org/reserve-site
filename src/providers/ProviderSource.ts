export enum Providers {
  coinbase = "coinbase",
  blockstream = "blockstream",
  blockchainDotCom = "blockchain.com",
  etherscan = "etherscan",
  ethplorer = "ethplorer",
  forno = "forno.celo.org",
  ecb = "ecb.europa.eu",
  exchangeRates = "exchangeratesapi.io",
}

export default interface ProviderSource {
  value: number
  source: Providers
  time: number
  hasError: boolean
}

export function errorResult(error: any, source: Providers) {
  console.info("ERROR", source, error)
  return { hasError: true, source, value: 0, time: 0 }
}
