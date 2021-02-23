
import ProviderSource, { Providers } from "src/providers/ProviderSource"
type ProviderPromise = Promise<ProviderSource>

interface Consensus {
  value: string | number
  sources: Providers[],
  message: string,
  time: number
}

export default async function consensus(alef:ProviderPromise, bet: ProviderPromise): Promise<Consensus> {
  const results = await Promise.all([alef, bet])
  const sourceA =results[0]
  const sourceB =results[1]

  if (sourceA.hasError && sourceB.hasError) {
    return {value: null, time: 0, sources: [], message: "could not get new data"}
  }

  if (sourceA.hasError && !sourceB.hasError) {
    return {value: sourceB.value, time: sourceB.time, sources: [sourceB.source], message: `Error with: ${sourceA.source}`}
  }

  if (sourceB.hasError && !sourceA.hasError) {
    return {value: sourceA.value, time: sourceA.time, sources: [sourceA.source], message: `Error with: ${sourceB.source}`}
  }

  if (sourceA.value === sourceB.value) {
    return {value: sourceA.value, time: Math.max(sourceA.time, sourceB.time), sources: results.map(result => result.source), message: "consensus" }
  }

  if (sourceA.value !== sourceB.value) {
    const recent = sourceA.time > sourceB.time ? sourceA : sourceB
    return {value: recent.value, time: recent.time, sources: [recent.source], message: `${sourceA.source} (${sourceA.value}) differs from ${sourceB.source}` }
  }
}