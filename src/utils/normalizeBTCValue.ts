

import BigNumber from "bignumber.js"

export default function normalizeBTCvalue(value: number) {
  return new BigNumber(value).dividedBy(100_000_000).toNumber()
}