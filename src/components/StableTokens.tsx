import { css } from '@emotion/react'
import useSWR from "swr"
import Amount from 'src/components/Amount'
import Heading from 'src/components/Heading'
import { BreakPoints } from 'src/components/styles'
import StableValueTokensAPI from 'src/interfaces/stable-value-tokens'
import { fetcher } from 'src/utils/fetcher'
import { skipZeros } from "../utils/skipZeros"
import { SECOND } from "src/utils/TIME"

export function StableTokens() {
  const { data } = useSWR<StableValueTokensAPI>("/api/stable-value-tokens", fetcher, {refreshInterval: SECOND * 10})
  return (
    <div css={stableTokenStyle}>
      <Heading title="Outstanding Supply" gridArea="title" />
      {data?.tokens?.filter(skipZeros)?.map((token) => {
        return <Amount key={token.token} iconSrc={`/assets/tokens/${token.token}.svg`} label={token.token} units={token.units} value={token.value} gridArea={""} />
      })}
    </div>
  )
}
const stableTokenStyle = css({
  display: 'grid',
  gridColumnGap: 20,
  gridRowGap: 12,
  gridTemplateAreas: `"title title title"`,
  gridTemplateColumns: "1fr 1fr 1fr",
  gridAutoFlow: "dense",
  [BreakPoints.tablet]: {
    gridTemplateAreas: `"title"`,
    gridTemplateColumns: "100%",
  }
})
