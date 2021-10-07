import { Fragment } from "react"
import { css } from "@emotion/react"
import colors from "src/components/colors"
import { loadingStyle } from "./loadingKeyframes"

enum KeyAsHuman {
  "stable-value" = "Stable Value Assets*",
  "natural-capital" = "Natural Capital Backed Assets**",
}

enum TokenColor {
  BTC = colors.blue,
  ETH = colors.red,
  CELO = colors.gold,
  "stable-value" = colors.violet,
  DAI = colors.violet,
  "natural-capital" = colors.green,
  cMCO2 = colors.green,
}

interface Props {
  slices: ChartData[]
  label: string
  showFinePrint?: boolean
  isLoading?: boolean
}

const RADIUS = 10
const CIRCUMFERENCE = Math.PI * 2 * RADIUS

export default function PieChart({ slices, label, showFinePrint, isLoading }: Props) {
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
        <h3 css={labelStyle}>{label}</h3>
        {slices.map(({ token, percent }) => (
          <ChartKey key={token} token={token} percent={isLoading ? NaN : percent} />
        ))}
        {showFinePrint && (
          <>
            <br />
            <small>
              * Crypto Assets with low volatility. Candidates are decentralised stablecoins e.g. DAI
            </small>
            <br />
            <small>** Includes cMCO2</small>
          </>
        )}
      </figcaption>
      <div css={css(pieStyle, isLoading && loadingStyle)}>
        <svg viewBox="-20 -20 40 40" transform="rotate(-90)" width="100%" height="100%">
          {dataWithOffsets.map(({ percent, offset, token }) => {
            const displayedPercent = percent < 0.1 ? 0.1 : percent
            return (
              <Fragment key={token}>
                <circle
                  cx="0"
                  cy="0"
                  opacity={0.8}
                  r={RADIUS}
                  fill="transparent"
                  stroke={isLoading ? colors.gray : TokenColor[token]}
                  strokeWidth={RADIUS - 1}
                  strokeDasharray={`${CIRCUMFERENCE * (displayedPercent / 100)} ${
                    CIRCUMFERENCE * (1 - displayedPercent / 100)
                  }`}
                  transform={`rotate(${(offset * 360) / 100})`}
                />
                <line
                  x1="0"
                  x2={RADIUS + 1}
                  y1="0"
                  y2={RADIUS + 1}
                  stroke="white"
                  strokeWidth="0.1"
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
  minWidth: "260",
  flex: 3,
})

const labelStyle = css({
  marginBottom: 24,
  fontSize: 28,
  lineHeight: "48px",
  display: "block",
  width: "100%",
})

const pieStyle = css({ display: "flex", flex: 3, minWidth: 250 })

const rootStyle = css({
  paddingTop: 48,
  margin: 0,
  display: "flex",
  flexWrap: "wrap",
  maxWidth: "100%",
  width: 670,
})

export interface ChartData {
  token: string
  percent: number
}

const formatter = new Intl.NumberFormat(undefined, { style: "decimal", maximumFractionDigits: 2 })

function ChartKey({ token, percent }: ChartData) {
  return (
    <div css={chartKeyStyle}>
      <div css={css(squareStyle, { backgroundColor: TokenColor[token] })} />
      <span css={percentStyle}>{isNaN(percent) ? "??" : formatter.format(percent)}%</span>
      <span>{KeyAsHuman[token] || token}</span>
    </div>
  )
}

const squareStyle = css({ width: 20, height: 20, borderRadius: 3 })
const chartKeyStyle = css({
  display: "flex",
  marginBottom: 10,
  fontSize: 20,
})

const percentStyle = css({
  fontWeight: "bold",
  paddingLeft: 10,
  paddingRight: 8,
})
