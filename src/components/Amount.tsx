import { css } from '@emotion/core'
import { BreakPoints } from 'src/components/styles'
import colors from './colors'
interface AmountProps {
  label: string
  units: number
  value?: number
  gridArea: string
  context?: string
  loading?: boolean
}

export default function Amount({ label, units, gridArea, context, value, loading }: AmountProps) {
  const display = new Intl.NumberFormat('default').format(Math.round(units))
  const displayValue = value && Math.round(value).toLocaleString()
  return (
    <div title={context} css={css(amountStyle, { gridArea })}>
      <p css={labelCss}>{label}</p>
      <span css={css(numberStyle, loading && notShowing )}>{display}</span>
      <span css={css(dollarValueStyle, loading && notShowing)}>
        {loading ? " ": !!value && `$${displayValue}`}
      </span>
    </div>
  )
}

const notShowing = css({
  opacity: 0
})

const labelCss = css({
  textAlign: "left"
})

const numberStyle = css({
  textAlign: "left",
  display: "block",
  transitionProperty: "opacity",
  transitionDuration: "500ms",
  opacity: 1,
  fontSize: 36,
  [BreakPoints.tablet]: {
    fontSize: 28,
    marginBottom: 8,
  },
})

const dollarValueStyle = css(numberStyle, {
  color: colors.gray,
  marginTop: 16,
})

const amountStyle = css({
  [BreakPoints.tablet]: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
})
