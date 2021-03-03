import Cache from "node-cache"

const CACHE = new Cache()


export function get(key:string) {
  return CACHE.get(key)
}

export async function set(key: string, dataPromise: Promise<any>) {
  const data = await dataPromise
  CACHE.set(key, data)
  return data
}

export async function refresh<T>(key: string, interval: number, fetcher: () => Promise<T>) {
  const setData = async () => {
    const data = await fetcher()
    console.log(data)
    CACHE.set(key, data)
  }

  setData()
  setInterval(setData,interval)
}

export const SECOND = 1000

export const MINUTE = 60 * SECOND
export const HOUR = 60 * MINUTE