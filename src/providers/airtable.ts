import AirtableAPI from "airtable"
import { getOrSave } from "src/service/cache"
import { Address } from "src/service/Data"
import { MINUTE } from "src/utils/TIME"

const IS_LIVE = 'Status="active"'
const AIRTABLE_TABLE_ID = "appFFSLHqjejvZgYM"

export async function getNonCeloAddresses() {
  return getOrSave<{ value: Address[] | null }>(
    "offchain-addresses",
    fetchNonCeloAddresses,
    5 * MINUTE
  )
}

async function fetchNonCeloAddresses() {
  try {
    const records = (await getAirtable(TableNames.ReserveAddresses)
      .select({
        filterByFormula: IS_LIVE,
      })
      .firstPage()) as Record<Address>[]
    return { value: records.map((record) => record.fields) }
  } catch (e) {
    console.error("could not fetch addresses", e)
    return { value: null }
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
  ReserveHoldings = "Reserve Holdings",
  ReserveAddresses = "Off Chain Addresses",
}

export interface Record<Fields> {
  id: string
  fields: Fields
}
