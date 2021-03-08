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
  iconSrc?: string
}

export default function Amount({iconSrc, label, units, gridArea, context, value, loading }: AmountProps) {
  const display = new Intl.NumberFormat('default').format(Math.round(units))
  const displayValue = value && Math.round(value).toLocaleString()
  const id = `a-${dasherize(label)}`
  return (
    <div title={context} css={css(amountStyle, { gridArea })}>
      <div css={labelAreaCss}>
        {iconSrc && <img width={30} height={30} src={iconSrc} css={iconStyle} alt="" />}
        <p id={id} css={labelCss}>{label}</p>
      </div>
      <span aria-labelledby={id} css={css(numberStyle, loading && notShowing )}>{display}</span>
      <span aria-label={`Value of ${label} in USD`} css={css(dollarValueStyle, loading && notShowing)}>
        {loading ? " ": !!value && `$${displayValue}`}
      </span>
    </div>
  )
}

const notShowing = css({
  opacity: 0,
  minHeight: "1.15em"
})

const labelCss = css({
  textAlign: "left"
})

function dasherize(str: string) {
  return str.toLowerCase().split(" ").join("-")
}

const labelAreaCss = css({
  display: "inline-flex",
  flexDirection: "row",
  marginBottom: 12,
  marginTop: 12
})

const numberStyle = css({
  textAlign: "left",
  display: "block",
  transitionProperty: "opacity",
  transitionDuration: "500ms",
  opacity: 1,
  fontSize: 36,
  [BreakPoints.tablet]: {
    textAlign: "right",
    fontSize: 28,
    marginBottom: 8,
  },
})

const dollarValueStyle = css(numberStyle, {
  color: colors.gray,
  marginTop: 16,
  [BreakPoints.tablet]: {
    textAlign: "right"
  },
  [BreakPoints.phablet]: {
    display: "none"
  },
  ["@media (min-width: 597px) and (max-width: 699px)"]: {
    display: "none"
  }
})

const amountStyle = css({
  [BreakPoints.tablet]: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
})
const iconStyle = css({ height: 30, width: 30, marginRight: 8 })
