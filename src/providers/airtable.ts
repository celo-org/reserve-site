import AirtableAPI from 'airtable'
import { getOrSave, refresh } from 'src/service/cache'
import { Address, Rebalancing } from 'src/service/Data'
import { MINUTE } from 'src/utils/TIME'

const IS_LIVE = 'Status="active"'
const AIRTABLE_TABLE_ID = 'appFFSLHqjejvZgYM'

export async function getNonCeloAddresses() {
  return getOrSave<{value:Address[]| null}>("offchain-addresses", fetchNonCeloAddresses)
}

export async function getHistory() {
  return getOrSave<{value:Rebalancing[]| null}>("rebalance-history", fetchHistory)
}
 refresh("rebalance-history", 3 * MINUTE, fetchHistory)

async function fetchNonCeloAddresses() {
  try {
    const records = (await getAirtable(TableNames.ReserveAddresses)
      .select({
        filterByFormula: IS_LIVE,
      })
      .firstPage()) as Record<Address>[]
    return {value: records.map((record) => record.fields)}
  } catch (e) {
    console.error("could not fetch addresses", e)
    return {value: null}
  }
}

type History = Array<Record<Rebalancing>>

async function fetchHistory() {
  try {
    const entries = await new Promise<Rebalancing[]>((resolve) => {
      const all: Rebalancing[] = []
      getAirtable(TableNames.History).select().eachPage((records: History, fetchNextPage: () => void) => {
        records.forEach(record => all.push(record.fields))

        fetchNextPage()
      }, () => {
        console.log("done", all)
        resolve(all)
      })
    })
    console.log("last", entries.length)
    return {value: entries}
  } catch (e) {
    console.error("could not fetch addresses", e)
    return {value: null}
  }
}


let airTableSingleton: AirtableAPI

function airtableInit(baseID: string) {
  if (!airTableSingleton) {
    airTableSingleton = new AirtableAPI({ apiKey: process.env.AIRTABLE_API_KEY })
  }
  return airTableSingleton.base(baseID)
}

export default function getAirtable(name: TableNames) {
  return airtableInit(AIRTABLE_TABLE_ID)(name)
}

export enum TableNames {
  ReserveHoldings = 'Reserve Holdings',
  ReserveAddresses = 'Off Chain Addresses',
  History = 'History'
}

export interface Record<Fields> {
  id: string
  fields: Fields
}
