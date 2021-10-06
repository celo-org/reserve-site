import ProviderSource, { Providers, errorResult } from "./ProviderSource"
import normalizeBTCvalue from "src/utils/normalizeBTCValue"

//usage limits unknown
interface BlockstreamAddress {
  address: string
  chain_stats: {
    funded_txo_count: number
    funded_txo_sum: number
    spent_txo_count: number
    spent_txo_sum: number
    tx_count: number
  }
  mempool_stats: {
    funded_txo_count: number
    funded_txo_sum: number
    spent_txo_count: number
    spent_txo_sum: number
    tx_count: number
  }
}

export default async function getBTCBalance(address: string): Promise<ProviderSource> {
  try {
    const response = await fetch(`https://blockstream.info/api/address/${address}`)
    const time = Date.now()
    const data = (await response.json()) as BlockstreamAddress
    return {
      hasError: !data.chain_stats.funded_txo_sum,
      source: Providers.blockstream,
      value: normalizeBTCvalue(data.chain_stats.funded_txo_sum),
      time,
    }
  } catch (error) {
    return errorResult(error, Providers.blockchainDotCom)
  }
}
