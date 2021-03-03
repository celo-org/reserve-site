
import { css } from '@emotion/core'
import useSWR from "swr"
import Amount from 'src/components/Amount'
import Heading from 'src/components/Heading'
import { BreakPoints } from 'src/components/styles'
import PieChart,{ChartData} from 'src/components/PieChart'
import { HoldingsApi} from "src/service/holdings"
import StableValueTokensAPI from 'src/interfaces/stable-value-tokens'
import Head from 'next/head'

async function fetcher(url: string) {
  console.log(url)
  const response = await fetch(url)
  return response.json()
}

const INITAL_DATA: HoldingsApi = {
  mktValue: {
    BTC: {value: 0},
    ETH: {value: 0},
    DAI: {value: 0},
    CELO_CUSTODIED: {value: 0},
    CELO_UNFROZEN: {value: 0},
    CELO_FROZEN: {value: 0},

  },
  units: {
    BTC: {value: 0},
    ETH: {value: 0},
    DAI: {value: 0},
    CELO_CUSTODIED: {value: 0},
    CELO_UNFROZEN: {value: 0},
    CELO_FROZEN: {value: 0},
  }
}

function sumTotalHoldings(mktValue:  HoldingsApi["mktValue"]) {
  const {CELO_CUSTODIED, CELO_UNFROZEN, CELO_FROZEN} = mktValue
  const celoTotal = CELO_CUSTODIED.value + CELO_UNFROZEN.value +  CELO_FROZEN.value
  return  celoTotal +  sumNonCelo(mktValue)
}

function sumUnfrozenHoldings(mktValue:  HoldingsApi["mktValue"]) {
  const {CELO_CUSTODIED, CELO_UNFROZEN} = mktValue
  const celoTotal =  CELO_CUSTODIED.value + CELO_UNFROZEN.value
  return celoTotal + sumNonCelo(mktValue)
}

function sumNonCelo({ETH, BTC, DAI}: HoldingsApi["mktValue"]) {
  return BTC.value + ETH.value + DAI.value
}

function  getPercents({CELO_CUSTODIED, CELO_UNFROZEN, CELO_FROZEN, ETH, BTC, DAI}: HoldingsApi["mktValue"]): ChartData[] {
  const celoTotal =  CELO_CUSTODIED.value + CELO_FROZEN.value + CELO_UNFROZEN.value
  const total = celoTotal + BTC.value + ETH.value + DAI.value

  function toPercent(value: number) {
    return (value / total) * 100
  }

  return [
    {token: "CELO", percent: toPercent(celoTotal) },
    {token: "BTC", percent: toPercent(BTC.value) },
    {token: "ETH", percent: toPercent(ETH.value) },
    {token: "DAI", percent: toPercent(DAI.value) }
  ]
}

export default function Holdings() {
  const {data} = useSWR<HoldingsApi>("/api/holdings", fetcher, {initialData: INITAL_DATA, revalidateOnMount: true})
  const {units, mktValue} = data
  const percentages = getPercents(mktValue)
  const isLoading = units.CELO_CUSTODIED.value === INITAL_DATA.units.CELO_CUSTODIED.value && units.BTC.value === INITAL_DATA.units.BTC.value
  return (
    <>
      <Head>
        <link rel="preload" href="/api/holdings" as="fetch" crossOrigin="anonymous"/>
      </Head>
      <div css={rootStyle}>
        <Heading title="CELO" gridArea="celo" iconSrc="/assets/CELO.png" />
        <Amount loading={isLoading} label="Frozen" units={units.CELO_FROZEN.value} value={mktValue.CELO_FROZEN.value} gridArea="total" />
        <Amount loading={isLoading} label="Unfrozen" units={units.CELO_UNFROZEN.value} value={mktValue.CELO_UNFROZEN.value} gridArea="onChain" />
        <Amount loading={isLoading} label="In Custody" units={units.CELO_CUSTODIED.value} value={mktValue.CELO_CUSTODIED.value} gridArea="custody" />
        <Heading title="Additional Crypto Assets" gridArea="crypto" marginTop={30} />
        <Amount loading={isLoading} label="BTC" units={units.BTC.value} value={mktValue.BTC.value} gridArea="btc" />
        <Amount loading={isLoading} label="ETH" units={units.ETH.value} value={mktValue.ETH.value} gridArea="eth" />
        <Amount loading={isLoading} label="DAI" units={units.DAI.value} value={mktValue.DAI.value} gridArea="dai" />
      </div>
      <PieChart label={"Current Composition"} slices={percentages} />
    </>
  )
}


export function StableTokens() {
  const { data } = useSWR<StableValueTokensAPI>("/api/stable-value-tokens",fetcher)
  return (
    <div css={stableTokenStyle}>
      <Heading title="Outstanding Supply" gridArea="title" />
      {data?.tokens?.map((token) => {
        return <Amount iconSrc={`/assets/tokens/${token.token}.svg`} label={token.token} units={token.units} value={token.value} gridArea={""} />
      })}
    </div>
  )
}

interface RatioProps {
  total: number
  unfrozen: number
}

export function Ratios(props: RatioProps) {
  const stables  = useSWR<StableValueTokensAPI>("/api/stable-value-tokens",fetcher)
  const holdings = useSWR<HoldingsApi>("/api/holdings", fetcher)
  const isLoading = !holdings.data || !stables.data

  const outstanding = stables.data?.totalStableValueInUSD || 1
  const totalReserveValue = holdings.data ? sumTotalHoldings(holdings.data?.mktValue) : 1
  const unfrozenReserveValue = holdings.data ? sumUnfrozenHoldings(holdings.data?.mktValue) : 1

  return (
    <div css={ratiosSectionStyle}>
      <Amount loading={isLoading} label="Total" units={totalReserveValue / outstanding} gridArea="ratio" />
      <Amount loading={isLoading} label="Unfrozen" units={unfrozenReserveValue / outstanding} gridArea="unfrozen" />

      <div css={infoStyle}>
        <div css={finePrintStyle}>
          <small>
            Ratios of the value of the reserve in USD (for total and for unfrozen) to the value of
            all outstanding cUSD (as well as other future stabilized tokens supported by the
            reserve)
          </small>
        </div>
      </div>
    </div>
  )
}

const ratiosSectionStyle = css({
  display: 'grid',
  gridAutoColumns: '1fr',
  gridColumnGap: 20,
  gridRowGap: 12,
  gridTemplateAreas: `
                     "ratio unfrozen ."
                     "info info ."
                     `,
  [BreakPoints.tablet]: {
    gridTemplateAreas: `
    "unfrozen"
    "ratio"
    "info"
    `,
  },
})

const rootStyle = css({
  display: 'grid',
  gridColumnGap: 20,
  gridRowGap: 12,
  gridTemplateAreas: `"celo celo celo"
                    "total onChain custody"
                    "crypto crypto crypto"
                    "btc eth dai"
                    `,
  [BreakPoints.tablet]: {
    gridTemplateAreas: `"celo"
                        "onChain"
                        "custody"
                        "total"
                        "crypto"
                        "btc"
                        "eth"
                        "dai"`,
  },
})

const stableTokenStyle = css({
  display: 'grid',
  gridColumnGap: 20,
  gridRowGap: 12,
  gridTemplateAreas: `"title title title"`,
  gridTemplateColumns: "1fr 1fr 1fr",
  gridAutoFlow: "dense",
  [BreakPoints.tablet] : {
    gridTemplateAreas: `"title"`,
    gridTemplateColumns: "100%",
  }
})

const finePrintStyle = css({
  paddingBottom: 24,
})

const infoStyle = css({
  gridArea: 'info',
})
