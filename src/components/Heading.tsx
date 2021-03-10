import { css } from '@emotion/core'
import bottomBorder from 'src/styles/bottomBorder'

interface HeadingProps {
  title: string
  gridArea: string
  iconSrc?: string
  marginTop?: number
}
export default function Heading({ title, gridArea, iconSrc, marginTop }: HeadingProps) {
  return (
    <div css={css(bottomBorder, { gridArea, marginTop })}>
      <h2 css={headingTextStyle}>
        {iconSrc && <img src={iconSrc} width={30} height={30} css={iconStyle} alt={`${title} token icon`} />}
        {title}
      </h2>
    </div>
  )
}

const headingTextStyle = css({
  display: 'inline-flex',
  alignItems: 'center',
  marginBottom: 16,
  fontWeight: "normal",
  fontSize: 28,
  lineHeight: "36px"
})

const iconStyle = css({ height: 30, width: 30, marginRight: 8 })
