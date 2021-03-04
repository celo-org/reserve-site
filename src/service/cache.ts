import Cache from "node-cache"

const CACHE = new Cache()

interface Cachable  {value: number | null | Array<any>, hasError?: boolean}

export function getOrSave<T extends Cachable>(key: string, fetcher: () => Promise<T>) {
  return get<T>(key) || set<T>(key,fetcher)
}

export function get<T>(key:string) {
  const data = CACHE.get<T>(key)
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
    // set the pending promise
    IN_TRANSIT[key] = fetcher()
    const data = await IN_TRANSIT[key]

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

export async function refresh<T>(key: string, interval: number, fetcher: () => Promise<T>) {
  const setData = async () => {
    set<T>(key, fetcher)
  }
  return setInterval(setData,interval)
}

export const SECOND = 1000

export const MINUTE = 60 * SECOND
export const HOUR = 60 * MINUTE