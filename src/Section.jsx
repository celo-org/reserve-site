/** @jsx jsx */

import { jsx, css, } from '@emotion/core'
import Markdown from 'src/Markdown'

export default function Section({title, content}) {
  return <section css={rootStyle}>
          <div css={headingAreaStyle}>
            <h2>
              {title}
            </h2>
          </div>
          <div css={contentAreaStyle}>
            <Markdown source={content} />
          </div>
  </section>
}

const rootStyle = css({
  display: 'flex',
  flexWrap: "wrap",
  flex: 1,
  paddingLeft: 16,
  paddingRight: 16,
})

const headingAreaStyle = css({
  paddingRight: 20,
  marginTop: 5,
  flexBasis: 230
})

const contentAreaStyle = css({flex: 1, minWidth: 300})