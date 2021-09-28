import { request, gql } from "graphql-request"
import { CMCO2_ADDRESS } from "src/contract-addresses"
import ProviderSource, { errorResult, Providers } from "./ProviderSource"

const query = gql`
{

  token(id: "${CMCO2_ADDRESS}") {
    id
    symbol
    derivedCUSD
  }
}
`

interface Token {
  id: string
  symbol: string
  derivedCUSD: number
}

export async function getCMC02Price(): Promise<ProviderSource> {
  try {
    const { token } = await request<{ token: Token }>(
      "https://api.thegraph.com/subgraphs/name/ubeswap/ubeswap",
      query
    )
    return {
      hasError: false,
      source: Providers.ubeswap,
      value: Number(token.derivedCUSD),
      time: Date.now(),
    }
  } catch (error) {
    console.error(error)
    return errorResult(error, Providers.ubeswap)
  }
}
