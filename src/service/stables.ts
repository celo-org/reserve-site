import { getcEURSupply, getcUSDSupply } from "src/providers/Celo"

export default async function stables() {
  const tokens = await  Promise.all([getcUSDSupply(), getcEURSupply()])
  return {tokens }
}