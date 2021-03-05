
import { css } from '@emotion/core'
import useSWR from "swr"
import Amount from 'src/components/Amount'
import Heading from 'src/components/Heading'
import { BreakPoints } from 'src/components/styles'
import PieChart,{ChartData} from 'src/components/PieChart'
import { HoldingsApi} from "src/service/holdings"
import Head from 'next/head'
import { Tokens} from "src/service/Data"
import { fetcher } from 'src/utils/fetcher'
import { skipZeros } from 'src/utils/skipZeros'

const initalToken = {
  value: 0,
  units: 0,
  hasError: false,
  token: "CELO" as Tokens,
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


export function sumCeloTotal(holdings: HoldingsApi) {
  const { custody, frozen, unfrozen } = holdings.celo
  return custody.value + unfrozen.value + frozen.value
}

export function sumNonCelo({otherAssets}: HoldingsApi) {
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
        <Heading title="CELO" gridArea="celo" iconSrc="/assets/tokens/CELO.svg" />
        <Amount loading={isLoading} label="Frozen" units={celo.frozen.units} value={celo.frozen.value} gridArea="total" />
        <Amount loading={isLoading} label="Unfrozen" units={celo.unfrozen.units} value={celo.unfrozen.value} gridArea="onChain" />
        <Amount loading={isLoading} label="In Custody" units={celo.custody.units} value={celo.custody.value} gridArea="custody" />
        <Heading title="Additional Crypto Assets" gridArea="crypto" marginTop={30} />
        {data?.otherAssets?.filter(skipZeros)?.map(asset => (
          <Amount loading={isLoading} label={asset.token} units={asset.units} value={asset.value} gridArea={""} />
        ))}
      </div>
      <PieChart label={"Current Composition"} slices={percentages} />
    </>
  )
}

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

