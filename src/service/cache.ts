import Cache from "node-cache"

const CACHE = new Cache()

export function getOrSave<T>(key: string, fetcher: () => Promise<T>) {
  return get<T>(key) || set<T>(key,fetcher())
}

export function get<T>(key:string) {
  return CACHE.get<T>(key)
}

export async function set<T>(key: string, dataPromise: Promise<T>) {
  const data = await dataPromise
  CACHE.set<T>(key, data)
  return data as T
}

export async function refresh<T>(key: string, interval: number, fetcher: () => Promise<T>) {
  const setData = async () => {
    const data = await fetcher()
    CACHE.set<T>(key, data)
  }

  setData()
  setInterval(setData,interval)
}

export const SECOND = 1000

export const MINUTE = 60 * SECOND
export const HOUR = 60 * MINUTE