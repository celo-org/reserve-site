import {Fragment, useMemo} from "react"
import { css } from '@emotion/core'
import colors from 'src/components/colors'
export const INITAL_TARGET: ChartData[] = [
  {  token: 'CELO', percent: 50 },
  {  token: 'BTC', percent: 30 },
  {  token: 'ETH', percent: 15 },
  {  token: 'Stable value portfolio*', percent: 5 },
]

enum TokenColor {
  BTC = colors.blue,
  ETH = colors.red,
  CELO = colors.gold,
  DAI = colors.green,
  "Stable value portfolio*" = colors.green
}

interface Props {
  slices: ChartData[]
  label: string
  showFinePrint?: boolean
  isLoading?: boolean
}

export default function PieChart({slices,label,showFinePrint, isLoading}: Props) {
  const radius = 10
  const circumfrance = Math.PI * 2 * radius

  const dataWithOffsets = slices.map((data, index) => {
    let offset = 0
    let i = index - 1

    while (i >= 0) {
      offset = offset + (slices[i].percent || 0)
      --i
    }
    return { offset, ...data }
  })

  return (
    <figure css={rootStyle}>
      <figcaption css={legendStyle}>
        <h4>{label}</h4>
        {slices.map(({token, percent }) => (
          <ChartKey key={token} token={token} percent={percent} />
        ))}
        {showFinePrint &&<small>
          *Crypto Assets with low volatility. Candidates are decentralised stablecoins e.g. DAI
        </small>}
      </figcaption>
      <div css={pieStyle}>
        <svg viewBox="-25 -25 50 50" transform="rotate(-90)" width="100%" height="100%">
          {dataWithOffsets.map(({ percent, offset, token }) => {
            return (
              <Fragment key={token}>
                <circle
                  cx="0"
                  cy="0"
                  opacity={0.8}
                  r={radius}
                  fill="transparent"
                  stroke={TokenColor[token]}
                  strokeWidth="9"
                  strokeDasharray={`${circumfrance * (percent / 100)} ${circumfrance *
                    (1 - percent / 100)}`}
                  transform={`rotate(${(offset * 360) / 100})`}
                />
                <line
                  x1="0"
                  x2="11"
                  y1="0"
                  y2="11"
                  stroke="white"
                  strokeWidth="0.25"
                  transform={`rotate(${((offset - 12.5) * 360) / 100})`}
                />
              </Fragment>
            )
          })}
        </svg>
      </div>
    </figure>
  )
}

const legendStyle = css({
  minWidth: 200,
  flex: 2,
})

const pieStyle = css({ display: 'flex', flex: 3, minWidth: 250 })

const rootStyle = css({
  paddingTop: 36,
  margin: 0,
  display: 'flex',
  flexWrap: 'wrap',
  maxWidth: '100%',
  width: 670,
})

export interface ChartData {
  token: string
  percent: number
}

function ChartKey({token, percent }: ChartData) {
  return (
    <div css={chartKeyStyle}>
      <div css={css(squareStyle, { backgroundColor: TokenColor[token]})} />
      <span css={percentStyle}>{ isNaN(percent) ? 0 : percent.toPrecision(2)}%</span>
      <span>{token}</span>
    </div>
  )
}

const squareStyle = css({ width: 20, height: 20, borderRadius: 3 })
const chartKeyStyle = css({
  display: 'flex',
  marginBottom: 10,
  fontSize: 20,
})

const percentStyle = css({
  fontWeight: 'bold',
  paddingLeft: 10,
  paddingRight: 8,
})
