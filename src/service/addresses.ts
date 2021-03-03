import { getAddresses as getCeloAddresses } from 'src/providers/Celo'
import { getOrSave } from './cache'
import { getNonCeloAddresses } from 'src/providers/airtable'



export default async function getAddresses() {
  const celoAddresses = await getOrSave("onchain-addresses", getCeloAddresses)
  const offchain = await getNonCeloAddresses()
  return celoAddresses.concat(offchain.sort((a,b) => a.label > b.label ? 1: -1))
}


