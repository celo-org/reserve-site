export default interface StableValueTokensAPI {
  totalStableValueInUSD: number
  tokens: {
    cUSD: any,
    cEUR: any
  }
}