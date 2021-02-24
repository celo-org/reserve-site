import ProviderSource, {Providers, errorResult} from "./ProviderSource"
import BigNumber from "bignumber.js"


interface TokenInfo {
  address: string
  name: string
  symbol: string
  decimals: string
}


interface Token {
  tokenInfo: TokenInfo // token data (same format as token info),
  balance:   string // token balance (as is, not reduced to a floating point value),
  totalIn:   string // total incoming token value
  totalOut:  string // total outgoing token value
}

interface AcountInfo {
  error?: {
    code: number
    message: string
  }
  address: string // address,
  ETH: {   //# ETH specific information
      balance: string // # ETH balance
      totalIn:  string // Total incoming ETH value (showETHTotals parameter should be set to get this value)
      totalOut: string // Total outgoing ETH value (showETHTotals parameter should be set to get this value)
  },
  contractInfo?: {   // exists if specified address is a contract
     creatorAddress:  string // contract creator address,
     transactionHash: string // contract creation transaction hash,
     timestamp:       string // contract creation timestamp
  },
  tokenInfo?:  TokenInfo // exists if specified address is a token contract address (same format as token info),
  tokens: Token[]  // exists if specified address has any token balances
  countTxs: string // Total count of incoming and outgoing transactions (including creation one),
}

const API_KEY = process.env.ETHPLORER_KEY

const BASE_URL = "https://api.ethplorer.io"

export  async function getETHBalance(address: string): Promise<ProviderSource> {
  try {
    const response = await fetch(`${BASE_URL}/getAddressInfo/${address}?apiKey=${API_KEY}`)
    const time = Date.now()
    const data = await response.json() as AcountInfo
    return {hasError: !!data.error, source: Providers.ethplorer, value: formatETHBalance(data?.ETH?.balance), time }
  } catch (error) {
    return errorResult(error, Providers.ethplorer)
  }
}
const WEI_PER_DAI = 1_000_000_000_000_000_000
const DAI_TOKEN_ADDRESS = "0x6b175474e89094c44da98b954eedeac495271d0f"

export async function getDaiBalance(address: string): Promise<ProviderSource> {
  try {
    const response = await fetch(`${BASE_URL}/getAddressInfo/${address}?apiKey=${API_KEY}`)
    const time = Date.now()
    const data = await response.json() as AcountInfo
    const dai = data.tokens?.find((token) => token?.tokenInfo?.address === DAI_TOKEN_ADDRESS )
    const balance = new BigNumber(dai.balance)
    return {hasError: !!data.error , source: Providers.ethplorer, value: balance.dividedBy(WEI_PER_DAI).toNumber(), time }
  } catch (error) {
    return errorResult(error, Providers.ethplorer)
  }
}

function formatETHBalance(value: string) {
  return new BigNumber(value).decimalPlaces(8).toNumber()
}