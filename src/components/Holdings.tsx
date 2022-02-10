import { css } from "@emotion/react"
import Amount, { DollarDisplay } from "src/components/Amount"
import Heading from "src/components/Heading"
import { BreakPoints } from "src/components/styles"
import PieChart, { ChartData } from "src/components/PieChart"
import { HoldingsApi } from "src/service/holdings"
import Head from "next/head"
import { skipZeros } from "src/utils/skipZeros"
import { Updated } from "src/components/Updated"
import Section from "src/components/Section"
import { sumTotalHoldings } from "./sumTotalHoldings"
import useHoldings from "src/hooks/useHoldings"

export function sumCeloTotal(holdings: HoldingsApi) {
  const { custody, frozen, unfrozen } = holdings.celo
  return custody.value + unfrozen.value + frozen.value
}

export function sumNonCelo({ otherAssets }: HoldingsApi) {
  return otherAssets.reduce((prev, current) => current.value + prev, 0)
}

function getPercents(holdings: HoldingsApi): ChartData[] {
  const celoTotal = sumCeloTotal(holdings)
  const total = celoTotal + sumNonCelo(holdings)

  function toPercent(value: number) {
    return (value / total) * 100
  }

  return [{ token: "CELO", percent: toPercent(celoTotal) }].concat(
    holdings.otherAssets.map((asset) => {
      return {
        token: asset.token,
        percent: toPercent(asset.value),
      }
    })
  )
}

function findOldestValueUpdatedAt(data?: HoldingsApi): number {
  if (!data) {
    return 0
  }

  return Math.min(
    ...data.otherAssets
      .map((token) => token.updated)
      .concat([data.celo.custody.updated, data.celo.frozen.updated, data.celo.unfrozen.updated])
  )
}

export default function Holdings() {
  const { data } = useHoldings()
  const percentages = getPercents(data)
  const isLoadingCelo = data.celo.frozen.updated === 0 || data.celo.unfrozen.updated === 0
  const isLoadingOther = !data.otherAssets.findIndex((coin) => coin.updated === 0)
  const oldestUpdate = findOldestValueUpdatedAt(data)
  const celo = data.celo

  return (
    <>
      <Head>
        <link rel="preload" href="/api/holdings/celo" as="fetch" crossOrigin="anonymous" />
        <link rel="preload" href="/api/holdings/other" as="fetch" crossOrigin="anonymous" />
      </Head>
      <Section
        title={"Current Reserve Holdings"}
        subHeading={
          <>
            <DollarDisplay
              loading={isLoadingCelo || isLoadingOther}
              label="Liquidity"
              value={sumTotalHoldings(data)}
            />
            <Updated date={oldestUpdate} />
          </>
        }
      >
        <div css={rootStyle}>
          <Heading title="Celo Assets" gridArea="celo" />
          {celo.frozen.value > 0 ? (
            <Amount
              iconSrc={"/assets/tokens/CELO.svg"}
              context="Funds frozen in on-chain Reserve contract"
              loading={isLoadingCelo}
              label="Frozen"
              units={celo.frozen.units}
              value={celo.frozen.value}
              gridArea="frozen"
            />
          ) : (
            <div css={hiddenCelo}></div>
          )}

          <Amount
            iconSrc={"/assets/tokens/CELO.svg"}
            context="Funds in on-chain Reserve contract and in custody"
            loading={isLoadingCelo}
            label={celo.frozen.value > 0 ? "Unfrozen" : "CELO"}
            units={celo.unfrozen.units + celo.custody.units}
            value={celo.unfrozen.value + celo.custody.value}
            gridArea="unfrozen"
          />

          <Heading title="Non-Celo Crypto Assets" gridArea="crypto" marginTop={30} />
          {data?.otherAssets?.filter(skipZeros)?.map((asset) => (
            <Amount
              key={asset.token}
              loading={isLoadingOther}
              label={asset.token}
              units={asset.units}
              value={asset.value}
              gridArea={""}
            />
          ))}
        </div>
        <PieChart
          label={"Current Composition"}
          slices={percentages}
          isLoading={isLoadingCelo || isLoadingOther}
        />
      </Section>
    </>
  )
}

const rootStyle = css({
  display: "grid",
  gridColumnGap: 20,
  gridRowGap: 12,
  gridAutoColumns: "1fr 1fr 1fr",
  gridTemplateAreas: `"celo celo celo"
                    "unfrozen unfrozen frozen"
                    "crypto crypto crypto"
                    "btc eth dai"
                    `,
  [BreakPoints.tablet]: {
    gridAutoColumns: "1fr",
    gridTemplateAreas: `"celo"
                        "unfrozen"
                        "frozen"
                        "crypto"
                        "btc"
                        "eth"
                        "dai"`,
  },
})

const hiddenCelo = css({
  visibility: "hidden",
  margin: 50,
})
