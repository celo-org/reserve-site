import { getAddresses as getCeloAddresses } from 'src/providers/Celo'
import getAirtable, { Record, TableNames } from 'src/service/airtable'
import { getOrSave } from './cache'
import { Address } from 'src/service/Data'

const IS_LIVE = 'Status="active"'


export default async function getAddresses() {
  const celoAddresses = await getOrSave("onchain-addresses", getCeloAddresses)
  const offchain = await getOrSave<Address[]>("offchain-addresses", fetchAddresses)
  return celoAddresses.concat(offchain.sort((a,b) => a.label > b.label ? 1: -1))
}

async function fetchAddresses() {
  try {
  const records = (await getAirtable(TableNames.ReserveAddresses)
    .select({
      filterByFormula: IS_LIVE,
    })
    .firstPage()) as Record<Address>[]
    return records.map((record) => record.fields)
  } catch (e) {
    console.error("could not fetch addresses", e)
    return []
  }
}
