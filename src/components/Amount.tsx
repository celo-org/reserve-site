import { css } from '@emotion/core'
import { BreakPoints } from 'src/components/styles'
import colors from './colors'
interface AmountProps {
  label: string
  units: number
  value?: number
  gridArea: string
  context?: string
}

export default function Amount({ label, units, gridArea, context, value }: AmountProps) {
  const display = new Intl.NumberFormat('default').format(Math.round(units))
  const displayValue = value && Math.round(value).toLocaleString()
  return (
    <div title={context} css={css(amountStyle, { gridArea })}>
      <p>{label}</p>
      <span css={numberStyle}>{display}</span>
      {displayValue && <span css={dollarValueStyle}>${displayValue}<sup css={supCss}>*</sup></span>}
    </div>
  )
}

const supCss = css({
  fontSize: 18
})

const numberStyle = css({
  fontSize: 36,
  [BreakPoints.tablet]: {
    fontSize: 28,
    marginBottom: 8,
  },
})

const dollarValueStyle = css(numberStyle, {
  color: colors.gray,
  marginTop: 16,
  display: "block"
})

const amountStyle = css({
  [BreakPoints.tablet]: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
})
