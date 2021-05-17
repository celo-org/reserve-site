import ProviderSource, { Providers } from "src/providers/ProviderSource"
type ProviderPromise = Promise<ProviderSource>

export interface Duel {
  value: number
  sources: Providers[]
  time: number
}

export default async function duel(alef: ProviderPromise, bet: ProviderPromise): Promise<Duel> {
  const results = await Promise.all([alef, bet])
  const sourceA = results[0]
  const sourceB = results[1]
  if (sourceA.hasError && sourceB.hasError) {
    console.warn(`Error ${sourceA.source} & ${sourceB.source} could not get new data`)
    return { value: null, time: 0, sources: [] }
  }

  if (sourceA.hasError && !sourceB.hasError) {
    console.warn(`Error with: ${sourceA.source}`)
    return { value: sourceB.value, time: sourceB.time, sources: [sourceB.source] }
  }

  if (sourceB.hasError && !sourceA.hasError) {
    console.warn(`Error with: ${sourceB.source}`)
    return { value: sourceA.value, time: sourceA.time, sources: [sourceA.source] }
  }

  if (sourceA.value === sourceB.value) {
    return {
      value: sourceA.value,
      time: Math.max(sourceA.time, sourceB.time),
      sources: results.map((result) => result.source),
    }
  }

  if (sourceA.value !== sourceB.value) {
    const recent = sourceA.time > sourceB.time ? sourceA : sourceB
    console.info(
      `Sources: ${sourceA.source} (${sourceA.value}) differs from ${sourceB.source} (${
        sourceB.value
      }) ${percentDif(sourceA.value, sourceB.value)}%`
    )
    return { value: recent.value, time: recent.time, sources: [recent.source] }
  }
}

export function sumMerge(acc: Duel, current: Duel) {
  return { ...acc, value: acc.value + current.value, time: current.time, source: current.sources }
}

function percentDif(x: number, y: number) {
  return Math.abs((1 - x / y) * 100).toPrecision(5)
}
