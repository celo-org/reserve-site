import Cache from "node-cache"
import { MINUTE } from "src/utils/TIME"

const DAY = 60 * 60 * 24

const CACHE = new Cache({stdTTL: DAY})

interface Cachable  {value: number | null | Array<any>, hasError?: boolean}

export function getOrSave<T extends Cachable>(key: string, fetcher: () => Promise<T>) {
  return get<T>(key) || set<T>(key,fetcher)
}

export function get<T>(key:string) {
  const data = CACHE.get<T>(key)
  if (!data) {
    console.info("missed", key)
  }
  return data
}

const IN_TRANSIT: Record<string, Promise<Cachable>> = {}

// sets the result of promise fetcher in cache under key
// if currently waiting for a promise at key will not start another fetch
export async function set<T extends Cachable>(key: string, fetcher: () => Promise<T>): Promise<T> {
  // return the already used promise
  if (IN_TRANSIT[key]) {
    return IN_TRANSIT[key] as Promise<T>
  } else {
    const unique = `fetch-${key}-${Math.random()}`
    // set the pending promise
    console.time(unique)
    IN_TRANSIT[key] = fetcher()
    const data = await IN_TRANSIT[key]
    console.timeEnd(unique)

    // dont save bad data
    if (data.hasError || data.hasOwnProperty("value") && data.value === null) {
      return data as T
    }

    CACHE.set(key,data)

    // wait a moment to delete
    setTimeout((() => {
      IN_TRANSIT[key] = null
    }),100)

    return data as T
  }
}

export async function refresh<T extends Cachable>(key: string, interval: number, fetcher: () => Promise<T>) {
  const setData = async () => {
    try {
      set<T>(key, fetcher)
    } catch (e) {
      console.error('refresh failed',key, e)
    }
  }
  return setInterval(setData,interval)
}

setInterval(() => console.info(CACHE.getStats()), 30 * MINUTE)
