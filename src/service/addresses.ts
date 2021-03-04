import { getAddresses as getCeloAddresses } from 'src/providers/Celo'
import { getOrSave } from './cache'
import { getNonCeloAddresses } from 'src/providers/airtable'



export default async function getAddresses() {
  const [celoAddresses, offchain] = await Promise.all([getOrSave("onchain-addresses", getCeloAddresses), getNonCeloAddresses()])
  return celoAddresses.concat(offchain.sort((a,b) => a.label > b.label ? 1: -1))
}


