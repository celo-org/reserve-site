import { getcEURSupply, getcUSDSupply, getTotalRatio } from "src/providers/Celo"



export default async function stables() {
  const tokens = await  Promise.all([getcUSDSupply(), getcEURSupply()])
  const ratio = await getTotalRatio()
  return {tokens, ratio }
}