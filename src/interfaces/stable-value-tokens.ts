import { TokenModel } from "src/service/Data"

export default interface StableValueTokensAPI {
  totalStableValueInUSD: number
  tokens: TokenModel[]
}
