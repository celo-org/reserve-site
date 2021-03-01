
import { css } from '@emotion/core'
import useSWR from "swr"
import Amount from 'src/components/Amount'
import Heading from 'src/components/Heading'
import { BreakPoints } from 'src/components/styles'
import PieChart,{ChartData} from 'src/components/PieChart'
import { useMemo } from 'react'

async function fetchHoldings() {
  const response = await fetch("api/holdings")
  return response.json()
}

interface HoldingsApi {
  mktValue: {
    TOTAL: {value:number}
    BTC: {value:number}
    ETH: {value:number}
    CELO_CUSTODIED: {value:number}
    DAI: {value:number}
  }
  units: {
    BTC: {value:number}
    ETH: {value:number}
    CELO_CUSTODIED: {value:number}
    DAI: {value:number}
  }
}

const INITAL_DATA: HoldingsApi = {
  mktValue: {
    TOTAL: {value: 1},
    BTC: {value: 0},
    ETH: {value: 0},
    CELO_CUSTODIED: {value: 0},
    DAI: {value: 0}
  },
  units: {
    BTC: {value: 0},
    ETH: {value: 0},
    CELO_CUSTODIED: {value: 0},
    DAI: {value: 0}
  }
}

function useChartData(mktValue: HoldingsApi["mktValue"]): ChartData[] {
  const percentages = useMemo(() => {
      return Object.keys(mktValue).map(key => {
        console.log(key, mktValue[key])
        return {token: key, percent: mktValue[key].value / mktValue.TOTAL.value}
      })
  }, [mktValue])

  return percentages
}

export default function Holdings() {
  const {data} = useSWR<HoldingsApi>("api/holdings", fetchHoldings, {initialData: INITAL_DATA})
  const percentages = useChartData(data.mktValue)
  console.log(percentages)
  return (
    <>
    <div css={rootStyle}>
      <Heading title="CELO" gridArea="celo" iconSrc="/assets/CELO.png" />
      <Amount label="Frozen" units={100} value={150} gridArea="total" />
      <Amount label="Unfrozen" units={100} value={150} gridArea="onChain" />
      <Amount label="In Custody" units={data.units.CELO_CUSTODIED.value} value={data.mktValue.CELO_CUSTODIED.value} gridArea="custody" />
      <Heading title="Additional Crypto Assets" gridArea="crypto" marginTop={30} />
      <Amount label="BTC" units={data.units.BTC.value} value={data.mktValue.BTC.value} gridArea="btc" />
      <Amount label="ETH" units={data.units.ETH.value} value={data.mktValue.ETH.value} gridArea="eth" />
      <Amount label="DAI" units={data.units.DAI.value} value={data.mktValue.DAI.value} gridArea="dai" />
    </div>
    <PieChart label={"Current Composition"} slices={percentages} />
    </>
  )
}

export function StableTokens(props) {
  return (
    <div css={stableTokenStyle}>
      <Heading title="cUSD" gridArea="cUSD" iconSrc="/assets/CUSD.png" />
      <Amount label="Outstanding" units={props.cUSD} value={150} gridArea="outstanding" />
    </div>
  )
}

interface RatioProps {
  total: number
  unfrozen: number
}

export function Ratios(props: RatioProps) {
  return (
    <div css={ratiosSectionStyle}>
      <Amount label="Total" units={props.total} gridArea="ratio" />
      <Amount label="Unfrozen" units={props.unfrozen} gridArea="unfrozen" />

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

const stableTokenStyle = css(rootStyle, {
  gridTemplateAreas: `"cUSD cUSD cUSD"
                     "outstanding . ."`,
  [BreakPoints.tablet]: {
    gridTemplateAreas: `"cUSD"
                        "outstanding"`,
  },
})

const finePrintStyle = css({
  paddingBottom: 24,
})

const infoStyle = css({
  gridArea: 'info',
})
