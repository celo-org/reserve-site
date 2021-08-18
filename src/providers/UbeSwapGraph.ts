import { request, gql } from "graphql-request"
import ProviderSource, { errorResult, Providers } from "./ProviderSource"

const CMCO2_ADDRESS = "0x32a9fe697a32135bfd313a6ac28792dae4d9979d"

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
    console.log(token)
    return {
      hasError: false,
      source: Providers.ubeswap,
      value: Number(token.derivedCUSD),
      time: Date.now(),
    }
  } catch (error) {
    return errorResult(error, Providers.ubeswap)
  }
}
