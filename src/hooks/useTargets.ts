import useSWR from "swr"
import { fetcher } from "src/utils/fetcher"
import ProviderSource from "src/providers/ProviderSource"
import Allocation from "src/interfaces/allocation"

const EMPTY_TARGETS: Allocation[] = [
  { type: "celo-native-asset" as const, token: "CELO", percent: 0 },
  { type: "other-crypto-assets" as const, token: "BTC", percent: 0 },
  { type: "other-crypto-assets" as const, token: "ETH", percent: 0 },
  { type: "other-crypto-assets" as const, token: "other", percent: 0 },
]

export default function useTargets() {
  const targetAllocation = useSWR<ProviderSource<Allocation[]>>("/api/targets", fetcher, {
    shouldRetryOnError: true,
  })
  const values = targetAllocation?.data?.value

  return { data: values ? group(values) : EMPTY_TARGETS, isLoading: targetAllocation.isValidating }
}

function group(list: Allocation[]) {
  const map = new Map<string, Allocation>()

  list.forEach((item) => {
    const key = item.type
    if (key === "stable-value" || key === "natural-capital") {
      const collection = map.get(key)
      if (!collection) {
        map.set(key, { ...item, token: key })
      } else {
        map.set(key, { ...collection, percent: collection.percent + item.percent })
      }
    } else {
      map.set(item.token, item)
    }
  })
  return Array.from(map.values())
}
