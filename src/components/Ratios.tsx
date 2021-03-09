import { css } from '@emotion/react'
import useSWR from "swr"
import Amount from 'src/components/Amount'
import { BreakPoints } from 'src/components/styles'
import { HoldingsApi } from "src/service/holdings"
import StableValueTokensAPI from 'src/interfaces/stable-value-tokens'
import { fetcher } from "src/utils/fetcher"
import { sumLiquidHoldings } from './sumLiquidHoldings'
import { sumTotalHoldings } from './sumTotalHoldings'

export function Ratios() {
  const stables = useSWR<StableValueTokensAPI>("/api/stable-value-tokens", fetcher)
  const holdings = useSWR<HoldingsApi>("/api/holdings", fetcher)
  const isLoading = !holdings.data || !stables.data

  const outstanding = stables.data?.totalStableValueInUSD || 1
  const totalReserveValue = holdings.data ? sumTotalHoldings(holdings.data) : 1
  const unfrozenReserveValue = holdings.data ? sumLiquidHoldings(holdings.data) : 1

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
const finePrintStyle = css({
  paddingBottom: 24,
})
const infoStyle = css({
  gridArea: 'info',
})
