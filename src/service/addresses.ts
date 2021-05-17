
import { getAddresses as getCeloAddresses } from "src/providers/Celo"
import { getOrSave } from "./cache"
import { getNonCeloAddresses } from "src/providers/airtable"
import { Address } from "src/service/Data"
import { MINUTE } from "src/utils/TIME"

export default async function getAddresses(): Promise<Address[]> {
  const [celoAddresses, offchain] = await Promise.all([
    getOrSave("onchain-addresses", getCeloAddresses, 5 * MINUTE),
    getNonCeloAddresses(),
  ])
  return (
    (celoAddresses.value || []).concat(
      (offchain.value || []).sort((a, b) => (a.label > b.label ? 1 : -1))
    ) || []
  )
}
