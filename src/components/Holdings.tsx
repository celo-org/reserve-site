
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
  const response = await fetch(url)
  return response.json()
}
const initalToken = {
  value: 0,
  units: 0,
  hasError: false,
  token: "CELO",
  updated: 0
}

const INITAL_DATA: HoldingsApi = {
  celo: {
    custody: initalToken,
    unfrozen: initalToken,
    frozen: initalToken
  },
  otherAssets: []
}

function sumTotalHoldings(holdings:  HoldingsApi) {
  return  sumCeloTotal(holdings) +  sumNonCelo(holdings)
}

function sumCeloTotal(holdings: HoldingsApi) {
  const { custody, frozen, unfrozen } = holdings.celo
  return custody.value + unfrozen.value + frozen.value
}

function sumUnfrozenHoldings(holdings:  HoldingsApi) {
  const {custody, unfrozen} = holdings.celo
  const celoTotal =  custody.value + unfrozen.value
  return celoTotal + sumNonCelo(holdings)
}

function sumNonCelo({otherAssets}: HoldingsApi) {
  return otherAssets.reduce((prev, current) => (current.value + prev), 0)
}

function  getPercents(holdings: HoldingsApi): ChartData[] {
  const celoTotal =  sumCeloTotal(holdings)
  const total = celoTotal + sumNonCelo(holdings)

  function toPercent(value: number) {
    return (value / total) * 100
  }

  return [{token: "CELO", percent: toPercent(celoTotal) }].concat(holdings.otherAssets.map((asset) => {
    return {
      token: asset.token,
      percent: toPercent(asset.value)
    }
  }))
}

export default function Holdings() {
  const {data} = useSWR<HoldingsApi>("/api/holdings", fetcher, {initialData: INITAL_DATA, revalidateOnMount: true})
  const percentages = getPercents(data)
  const isLoading = data.otherAssets.length === 0
  const celo = data.celo
  return (
    <>
      <Head>
        <link rel="preload" href="/api/holdings" as="fetch" crossOrigin="anonymous"/>
      </Head>
      <div css={rootStyle}>
        <Heading title="CELO" gridArea="celo" iconSrc="/assets/CELO.png" />
        <Amount loading={isLoading} label="Frozen" units={celo.frozen.units} value={celo.frozen.value} gridArea="total" />
        <Amount loading={isLoading} label="Unfrozen" units={celo.unfrozen.units} value={celo.unfrozen.value} gridArea="onChain" />
        <Amount loading={isLoading} label="In Custody" units={celo.custody.units} value={celo.custody.value} gridArea="custody" />
        <Heading title="Additional Crypto Assets" gridArea="crypto" marginTop={30} />
        {data?.otherAssets?.map(asset => (
          <Amount loading={isLoading} label={asset.token} units={asset.units} value={asset.value} gridArea={""} />
        ))}
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
  const totalReserveValue = holdings.data ? sumTotalHoldings(holdings.data) : 1
  const unfrozenReserveValue = holdings.data ? sumUnfrozenHoldings(holdings.data) : 1

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
